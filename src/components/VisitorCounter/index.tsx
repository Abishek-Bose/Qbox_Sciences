'use client'

import React, { useEffect, useState } from 'react'

const SESSION_KEY = 'qbox-visitor-registered'
const VISITOR_KEY = 'qbox-visitor-id'
const MIN_DIGITS = 4
const REFRESH_MS = 30_000

/**
 * "This site has [1][2][3][4] unique visitors". Each browser gets a random id
 * (no personal data) kept in localStorage, and the server counts distinct ids,
 * so returning visitors and page views never inflate the number. The id is
 * sent once per session; the footer is statically rendered, hence the
 * client-side fetch.
 */
const getVisitorId = (): string | null => {
  try {
    let id = localStorage.getItem(VISITOR_KEY)

    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(VISITOR_KEY, id)
    }

    return id
  } catch {
    // Storage blocked: this browser cannot be recognised, so it is not counted.
    return null
  }
}

export const VisitorCounter = () => {
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    let registered = false

    try {
      registered = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // Falls through to registering again, which is harmless: the server dedupes.
    }

    const id = registered ? null : getVisitorId()

    fetch('/visit-count', {
      method: id ? 'POST' : 'GET',
      ...(id && { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { total?: number } | null) => {
        if (typeof data?.total !== 'number') return

        setTotal(data.total)

        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          // Nothing to do.
        }
      })
      .catch(() => {
        // The counter is decorative; stay hidden rather than show a wrong number.
      })

    // Re-read the total so the number moves while the page is open. Skipped in a
    // background tab, so an idle tab left open all day costs no requests.
    const refresh = setInterval(() => {
      if (document.hidden) return

      fetch('/visit-count')
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { total?: number } | null) => {
          if (typeof data?.total === 'number') setTotal(data.total)
        })
        .catch(() => {
          // Keep showing the last known total.
        })
    }, REFRESH_MS)

    return () => clearInterval(refresh)
  }, [])

  if (total === null) return null

  const digits = String(total).padStart(MIN_DIGITS, '0').split('')

  return (
    <p className="flex flex-wrap items-center justify-center gap-3 text-base font-medium text-ink-muted sm:justify-start">
      This site has
      <span className="flex gap-1" role="img" aria-label={total.toLocaleString('en-IN')}>
        {digits.map((digit, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="flex h-10 w-8 items-center justify-center rounded-card bg-navy text-lg font-semibold tabular-nums text-white"
          >
            {digit}
          </span>
        ))}
      </span>
      unique visitors
    </p>
  )
}

export default VisitorCounter

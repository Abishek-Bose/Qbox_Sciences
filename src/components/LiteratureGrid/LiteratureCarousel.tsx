'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'

import { LiteratureCard, type LiteratureItem } from './LiteratureCard'

export type LiteratureCarouselProps = {
  label: string
  items: LiteratureItem[]
}

/** Matches the track's `gap-6`. */
const GAP = 24

// Phones: the arrows share the bottom row with the dots. md and up: they stand
// at either side of the cards, centred on them (the 1.875rem is half the height
// of the dots row underneath, which the wrapper also contains).
const arrowClass =
  'absolute bottom-0 z-10 flex size-11 items-center justify-center rounded-card border border-hairline bg-white text-navy transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-hairline disabled:hover:text-navy md:bottom-auto md:top-[calc(50%-1.875rem)] md:-translate-y-1/2'

/** How far one arrow press moves the track: a card and the gap after it. */
const stepOf = (el: HTMLElement) => {
  const card = el.firstElementChild as HTMLElement | null
  return card ? card.offsetWidth + GAP : el.clientWidth
}

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

/**
 * A scroll-snap carousel: the track is a plain horizontally scrolling list, so
 * touch, trackpad and keyboard (tabbing into a card scrolls it into view) all
 * work natively. The arrows page it by one card and disable at either end; the
 * dots show, and jump to, each position the track can rest at.
 */
export const LiteratureCarousel: React.FC<LiteratureCarouselProps> = ({ label, items }) => {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(items.length)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const step = stepOf(el)
    const max = el.scrollWidth - el.clientWidth
    // As many positions as the track can rest at: with 3 cards in view of 10,
    // that is 8, however wide the screen is.
    const positions = Math.max(1, Math.round(max / step) + 1)
    const atEnd = el.scrollLeft >= max - 1
    setCount(positions)
    setIndex(atEnd ? positions - 1 : Math.min(positions - 1, Math.round(el.scrollLeft / step)))
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const goTo = (target: number) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: target * stepOf(el), behavior: scrollBehavior() })
  }

  const atStart = index === 0
  const atEnd = index === count - 1

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <div className="md:px-16">
        <ul
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li
              key={item.href}
              className="shrink-0 basis-full snap-start sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <LiteratureCard {...item} />
            </li>
          ))}
        </ul>
      </div>

      {/* Pad either side on phones, so the dots stay clear of the arrows. */}
      <div className="mx-14 mt-4 flex h-11 items-center justify-center md:mx-0">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to study ${i + 1} of ${count}`}
            aria-current={i === index ? 'true' : undefined}
            // A 24px tap target around a 10px dot; narrower on phones so ten dots
            // fit on one line between the arrows.
            className="group flex h-6 w-[18px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand md:w-6"
          >
            <span
              aria-hidden="true"
              className={`block rounded-full transition-all duration-200 ${
                i === index ? 'size-2.5 bg-brand' : 'size-2 bg-navy/25 group-hover:bg-navy/50'
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        disabled={atStart}
        aria-label="Previous studies"
        className={`${arrowClass} left-0`}
      >
        <ChevronLeftIcon className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        disabled={atEnd}
        aria-label="Next studies"
        className={`${arrowClass} right-0`}
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </div>
  )
}

export default LiteratureCarousel

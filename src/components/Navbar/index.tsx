'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

type NavLink = {
  label: string
  href: string
}

/**
 * Single source of truth for the primary nav. When this content moves into a
 * Payload `Header` global, only this constant is replaced — the markup below
 * already maps over an arbitrary list.
 */
const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Therapy Areas', href: '/therapy-areas' },
  { label: 'Scientific Resources', href: '/resources' },
  { label: 'Careers', href: '/careers' },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  // `/about` should stay active on `/about/team`, but `/` must not match everything.
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-navy-dark backdrop-blur-sm">
      {/* h-20 (80px): the logo is a stacked lockup — wordmark above "sciences" —
          and goes unreadable in a shorter bar. Keep in sync with the Hero's
          `calc(100svh-5rem)`. */}
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Qbox Sciences — home"
          className="inline-flex items-center rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
        >
          {/*
            Declared at ~2x the rendered size (it displays 112x48 via h-12),
            keeping the source's 1600:686 ratio. Declaring the full intrinsic
            1600 here makes Next generate a 3840px-wide file for a 112px logo.
          */}
          <Image
            src="/images/logo.png"
            alt="Qbox Sciences"
            width={234}
            height={100}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Right-aligned, taking the space the Inquiry button used to occupy. */}
        <nav aria-label="Primary" className="hidden justify-end lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href)

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block py-1 text-[15px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6FDBF5] ${
                      active
                        ? 'font-semibold text-[#6FDBF5]'
                        : 'text-[#6FDBF5] hover:text-[#6FDBF5]'
                    } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-[#6FDBF5] after:transition-transform ${
                      active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-card text-[#6FDBF5] transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6FDBF5] lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              {/* Three bars that fold into an X. Positions are absolute so the
                  transform animates instead of the layout reflowing. */}
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${
                  isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-6 -translate-y-1/2 bg-current transition-opacity duration-200 ${
                  isOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-200 ${
                  isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Kept mounted so it can transition; `inert` keeps its links out of the
          tab order and the accessibility tree while collapsed. */}
      <div
        id={menuId}
        inert={!isOpen}
        className={`overflow-hidden border-t border-hairline bg-surface transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          isOpen ? 'max-h-128 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href)

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`block border-l-2 py-3 pl-4 text-base transition-colors ${
                      active
                        ? 'border-[#6FDBF5] bg-white font-semibold text-[#6FDBF5]'
                        : 'border-transparent text-[#6FDBF5] hover:border-[#6FDBF5] hover:text-[#6FDBF5]'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

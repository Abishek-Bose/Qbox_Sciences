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
  { label: 'Events', href: '/events' },
  { label: 'Contact Us', href: '/contact' },
]

export const Navbar = () => {
  const pathname = usePathname()
  // The path the mobile menu was opened on, not a plain boolean: deriving
  // "open" from it closes the menu on navigation without an effect that has to
  // call setState.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null)
  const isOpen = openOnPath === pathname
  const menuId = useId()

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenOnPath(null)
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
      {/* h-24 (96px): the logo is a stacked lockup, wordmark above "sciences",
          and goes unreadable in a shorter bar. */}
      <div className="mx-auto grid h-24 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/*
          Transparent cut-out of the client's logo (white ground removed, colours
          unchanged), so it sits directly on the navy bar.
        */}
        <Link
          href="/"
          aria-label="Qbox Sciences home"
          className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6FDBF5]"
        >
          {/*
            Declared at ~2x the rendered size (it displays about 183x72 via
            h-18), keeping the source's 717:282 ratio. Declaring far more than
            that makes Next generate a needlessly wide file for a small logo.
          */}
          <Image
            src="/images/logo-transparent.png"
            alt="Qbox Sciences"
            width={366}
            height={144}
            priority
            className="h-18 w-auto"
          />
        </Link>

        {/* Right-aligned, taking the space the Inquiry button used to occupy. */}
        <nav aria-label="Primary" className="hidden justify-end lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href)

              return (
                <li key={href}>
                  {/* Bold and pure white at every state; the current page is marked
                      by the cyan underline. */}
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block py-1 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6FDBF5] font-bold text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-[#6FDBF5] after:transition-transform ${
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
            onClick={() => setOpenOnPath(isOpen ? null : pathname)}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-card text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6FDBF5] lg:hidden"
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
          tab order and the accessibility tree while collapsed. Navy like the
          bar above it, so the white links keep their contrast. */}
      <div
        id={menuId}
        inert={!isOpen}
        className={`overflow-hidden border-t border-white/10 bg-navy-dark transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
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
                        ? 'border-[#6FDBF5] bg-white/5 font-bold text-white'
                        : 'border-transparent font-bold text-white hover:border-[#6FDBF5]'
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

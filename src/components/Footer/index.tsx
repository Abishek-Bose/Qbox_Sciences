import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { MailIcon, NetworkIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'

type FooterColumn = {
  heading: string
  links: { label: string; href: string }[]
}

/**
 * Site-wide footer content. Like the Navbar's NAV_LINKS, this is the single
 * place to edit until it moves into a Payload `Footer` global.
 */
const COLUMNS: FooterColumn[] = [
  {
    heading: 'Scientific Portals',
    links: [
      { label: 'Therapy Areas', href: '/therapy-areas' },
      { label: 'Pipeline Overview', href: '/pipeline' },
      { label: 'Clinical Trials', href: '/clinical-trials' },
    ],
  },
  {
    heading: 'Corporate',
    links: [{ label: 'Ethical Standards', href: '/ethics' }],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
]

const TAGLINE =
  'Redefining outcomes for the critically ill through relentless scientific innovation.'
const STRAPLINE = 'Precise Care, Proven Science.'

export const Footer = () => {
  // Computed, not hardcoded: a literal "2024" silently goes stale every January.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal y={16} className="max-w-xs">
            {/* Desaturated so the mark reads as a quiet sign-off rather than
                competing with the navbar's full-colour logo. */}
            <Image
              src="/images/logo.png"
              alt="Qbox Sciences"
              width={234}
              height={100}
              className="h-11 w-auto opacity-60 grayscale"
            />

            <p className="mt-6 text-sm leading-relaxed text-ink-muted">{TAGLINE}</p>
          </Reveal>

          {COLUMNS.map(({ heading, links }, index) => (
            <Reveal key={heading} y={16} delay={0.08 + index * 0.08}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
                {heading}
              </h2>

              <ul className="mt-6 space-y-4">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm font-medium text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* column-reverse on mobile so the icons sit above the legal line rather
            than being stranded at the very bottom of the page. */}
        <div className="mt-16 flex flex-col-reverse items-center gap-6 border-t border-hairline pt-8 sm:flex-row sm:justify-between">
          <p className="text-center text-sm font-semibold text-ink sm:text-left">
            © {year} Qbox Sciences. All rights reserved. {STRAPLINE}
          </p>

          <ul className="flex items-center gap-2">
            <li>
              <a
                href="https://qboxsciences.com"
                aria-label="Qbox Sciences website"
                className="flex size-10 items-center justify-center rounded-card text-ink-muted transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <NetworkIcon className="size-5" />
              </a>
            </li>
            <li>
              <a
                href="mailto:info@qboxsciences.com"
                aria-label="Email Qbox Sciences"
                className="flex size-10 items-center justify-center rounded-card text-ink-muted transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <MailIcon className="size-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer

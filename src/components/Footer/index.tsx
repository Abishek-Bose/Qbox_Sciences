import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { MailIcon, YouTubeIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'
import { COMPANY } from '@/lib/site'

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
      { label: 'Scientific Resources', href: '/resources' },
      { label: 'Events', href: '/events' },
    ],
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

/**
 * Contact details, drawn from the shared COMPANY constant so the Footer, the
 * Contact page and Careers cannot drift apart. `office` renders under the
 * wordmark in the first column; `email` heads the Contact Us column.
 */
const CONTACT = {
  heading: 'Contact Us',
  office: {
    label: COMPANY.office.label,
    name: COMPANY.name,
    lines: COMPANY.office.lines,
  },
  email: {
    label: 'Email Us',
    address: COMPANY.email,
  },
}

/**
 * TODO: still the placeholder handle — update it when the real channel exists.
 */
const YOUTUBE_CHANNEL = 'https://www.youtube.com/@qboxsciences'

const STRAPLINE = 'Precision in Critical Illness.'

export const Footer = () => {
  // Computed, not hardcoded: a literal "2024" silently goes stale every January.
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal y={16} className="max-w-xs">
            {/*
              The client's original logo. It is drawn for a white ground, so it
              needs no treatment on this footer. Sized to h-16, a little larger
              than the navbar's h-13.
            */}
            <Image
              src="/images/logo-original.png"
              alt="Qbox Sciences"
              width={285}
              height={112}
              className="h-16 w-auto"
            />

            {/* The legal name sits directly under the wordmark — the two identify
                the company — with the office address beneath. <address> is the
                right element; browsers italicise it by default, hence not-italic. */}
            <address className="mt-6 not-italic">
              <p className="text-xl font-semibold text-ink">{CONTACT.office.name}</p>

              <p className="mt-4 text-base font-medium text-navy">{CONTACT.office.label}</p>

              <p className="mt-1 text-xl leading-relaxed text-ink-muted">
                {CONTACT.office.lines.map((line) => (
                  // Each line is its own row, but they are one paragraph — a <ul>
                  // would have a screen reader announce a three-item list.
                  <React.Fragment key={line}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </address>
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
                      className="text-base font-medium text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Picks up where the link columns' stagger left off, so the row still
              reads as one movement across. */}
          <Reveal y={16} delay={0.08 + COLUMNS.length * 0.08}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
              {CONTACT.heading}
            </h2>

            <address className="mt-6 not-italic">
              <p className="text-base font-medium text-navy">{CONTACT.email.label}</p>

              <a
                href={`mailto:${CONTACT.email.address}`}
                className="mt-2 inline-block text-base font-medium text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                {CONTACT.email.address}
              </a>
            </address>
          </Reveal>
        </div>

        {/* column-reverse on mobile so the icons sit above the legal line rather
            than being stranded at the very bottom of the page. */}
        <div className="mt-16 flex flex-col-reverse items-center gap-6 border-t border-hairline pt-8 sm:flex-row sm:justify-between">
          <p className="text-center text-sm font-semibold text-ink sm:text-left">
            © {year} Qbox Sciences. All rights reserved. {STRAPLINE}
          </p>

          <ul className="flex items-center gap-2">
            <li>
              {/* Opens in its own tab, and `noopener` stops the channel page
                  reaching back here through `window.opener`. */}
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Qbox Sciences on YouTube"
                className="flex size-10 items-center justify-center rounded-card text-ink-muted transition-colors hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <YouTubeIcon className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email.address}`}
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

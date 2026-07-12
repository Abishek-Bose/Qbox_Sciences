import Link from 'next/link'
import React from 'react'

import { PdfIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'

export type LiteratureItem = {
  /** Short kind label shown as a chip, e.g. "Clinical Study". */
  tag: string
  /** Human-readable publication date, e.g. "Oct 2023". */
  date: string
  title: string
  body: string
  /** Where the PDF lives. */
  href: string
}

export type LiteratureGridProps = {
  title: string
  subtitle?: string
  link?: {
    label: string
    href: string
  }
  items: LiteratureItem[]
}

export const LiteratureGrid: React.FC<LiteratureGridProps> = ({ title, subtitle, link, items }) => {
  return (
    <section className="bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy">{title}</h2>
            {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
          </div>

          {link && (
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {link.label}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                <path
                  d="m8 5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </Reveal>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ tag, date, title: itemTitle, body, href }, index) => (
            <Reveal
              key={itemTitle}
              as="li"
              delay={index * 0.1}
              className="flex flex-col rounded-card border border-hairline bg-white p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-card bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand">
                  {tag}
                </span>
                <span className="text-xs text-ink-muted">{date}</span>
              </div>

              <h3 className="mt-5 text-lg font-semibold leading-snug text-navy">{itemTitle}</h3>

              {/* flex-1 pushes the button down, so every Download PDF button
                  lands on the same baseline however long the title runs. */}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{body}</p>

              <Link
                href={href}
                className="mt-6 flex items-center justify-center gap-2 rounded-card border border-brand/30 px-4 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <PdfIcon className="size-4" />
                Download PDF
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LiteratureGrid

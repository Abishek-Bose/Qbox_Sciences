import React from 'react'

import { PdfIcon } from '@/components/icons'

export type LiteratureItem = {
  /** Short kind label shown as a chip, e.g. "Clinical Study". */
  tag: string
  /** Human-readable publication date, e.g. "Oct 2024". */
  date: string
  /** The study's name, or its title when it has no short name. */
  title: string
  /** The descriptive title that goes under the name. */
  subtitle?: string
  /** Where the PDF lives. */
  href: string
}

/**
 * One study. Shared by the featured grid and the carousel so the two always
 * look the same. Fills its parent's height, so a row of cards stays level and
 * every Download PDF button lands on the same baseline.
 */
export const LiteratureCard: React.FC<LiteratureItem> = ({ tag, date, title, subtitle, href }) => (
  <div className="flex h-full flex-col rounded-card border border-hairline bg-white p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5">
    <div className="flex items-center justify-between gap-3">
      <span className="rounded-card bg-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand">
        {tag}
      </span>
      <span className="text-xs text-ink-muted">{date}</span>
    </div>

    <h3 className="mt-5 text-2xl font-semibold leading-snug text-navy">{title}</h3>

    {/* flex-1 pushes the button down however long the subtitle runs. */}
    <p className="mt-3 flex-1 text-xl leading-relaxed text-ink-muted">{subtitle}</p>

    <a
      href={href}
      download
      className="mt-6 flex items-center justify-center gap-2 rounded-card border border-brand/30 px-4 py-3 text-sm font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <PdfIcon className="size-4" />
      Download PDF
      <span className="sr-only"> {title}</span>
    </a>
  </div>
)

export default LiteratureCard

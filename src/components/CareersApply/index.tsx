import React from 'react'

import { CareersForm } from '@/components/CareersForm'
import { MailIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type CareersApplyProps = {
  title: string
  /** Each string becomes its own paragraph above the address card. */
  paragraphs: string[]
  /** Sits above the address, e.g. "Send your resume to". */
  emailLabel: string
  email: string
  /** Closing line under the address — what happens after you write in. */
  note?: string
  watermark?: WatermarkSide
}

/**
 * The apply block for the Careers page. There is no vacancy list to render:
 * Qbox collects speculative applications by email, so the whole section funnels
 * to a single address rather than to a form or a job board.
 *
 * A plain <a> for the mailto, matching the Footer — `next/link` is for routes.
 */
export const CareersApply: React.FC<CareersApplyProps> = ({
  title,
  paragraphs,
  emailLabel,
  email,
  note,
  watermark = 'left',
}) => {
  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-24">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{title}</h2>
        </Reveal>

        {paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph} delay={0.08 + index * 0.08}>
            <p className="mt-6 text-xl leading-relaxed text-ink-muted">{paragraph}</p>
          </Reveal>
        ))}

        <Reveal delay={0.08 + paragraphs.length * 0.08} y={32} className="mt-12">
          <CareersForm />
        </Reveal>

        {/* The address survives the form's arrival: it is the fallback for
            anyone whose CV will not upload, and the "or" says so plainly
            rather than leaving two competing calls to action side by side. */}
        <Reveal delay={0.16 + paragraphs.length * 0.08} className="mt-10">
          <p className="text-base font-semibold uppercase tracking-widest text-ink-muted">or</p>
        </Reveal>

        <Reveal delay={0.24 + paragraphs.length * 0.08} y={32}>
          <div className="mt-10 rounded-card border border-hairline bg-white p-8 shadow-lg shadow-navy/5 sm:p-10">
            <span className="inline-flex size-11 items-center justify-center rounded-card bg-brand/10 text-navy">
              <MailIcon className="size-5" />
            </span>

            <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-accent">
              {emailLabel}
            </p>

            {/* break-all: the address is long enough to overflow a 320px viewport
                otherwise, and an email has no space to wrap at. */}
            <a
              href={`mailto:${email}`}
              className="mt-3 inline-block break-all text-2xl font-bold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {email}
            </a>

            {note && <p className="mt-6 text-lg leading-relaxed text-ink-muted">{note}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CareersApply

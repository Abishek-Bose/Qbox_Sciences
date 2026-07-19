import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type ProseIntroProps = {
  /** Optional — see the note below on why Resources omits it. */
  title?: string
  /** Each string is its own paragraph. */
  paragraphs: string[]
  watermark?: WatermarkSide
}

/**
 * A centred band of plain prose — no cards, no CTA. For where a page needs to
 * say something in sentences before the content grids start.
 *
 * White, not `bg-surface`: this sits directly under the white PageHero and
 * reads as a continuation of it, leaving the first tinted band to mark where
 * the real content begins.
 *
 * Heading-less when `title` is omitted, and deliberately so — under a hero the
 * copy is that hero's lede, and inventing an h2 would add a rung to the
 * document outline that the content does not actually have. A <section> with
 * no accessible name is not exposed as a landmark, so this stays a plain
 * container rather than an unnamed region.
 */
export const ProseIntro: React.FC<ProseIntroProps> = ({
  title,
  paragraphs,
  watermark = 'left',
}) => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {title && (
          <Reveal>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-brand sm:text-4xl">
              {title}
            </h2>
          </Reveal>
        )}

        {/* space-y rather than a margin on each paragraph: it spaces the gaps
            between them without stranding one above the first. */}
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.08}>
              <p className="text-xl leading-relaxed text-ink-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProseIntro

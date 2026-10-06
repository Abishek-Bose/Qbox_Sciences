import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type PathwayStep = {
  title: string
  detail: string
}

export type Pathway = {
  label: string
  title: string
  /** One line naming what the pathway is made of. */
  components: string
  steps: PathwayStep[]
}

export type PathwaySectionProps = {
  eyebrow?: string
  title: string
  intro: string
  pathways: Pathway[]
  watermark?: WatermarkSide
}

/**
 * A subsection that sits under a TherapySection, so its title is an h3 and each
 * pathway an h4. Same white band as the section above, with no top padding of
 * its own: it reads as a continuation of it.
 */
export const PathwaySection: React.FC<PathwaySectionProps> = ({
  eyebrow,
  title,
  intro,
  pathways,
  watermark = 'right',
}) => {
  return (
    <section className="relative overflow-hidden bg-white pb-20 lg:pb-28">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </p>
          )}

          <h3 className={`text-3xl font-bold tracking-tight text-navy ${eyebrow ? 'mt-3' : ''}`}>
            {title}
          </h3>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-4xl text-xl leading-relaxed text-ink-muted">{intro}</p>
        </Reveal>

        {pathways.length > 0 && (
          <ul className="mt-10 grid gap-5 lg:grid-cols-2">
            {pathways.map((pathway, index) => (
              <Reveal
                key={`${pathway.label}-${index}`}
                as="li"
                delay={index * 0.1}
                className="rounded-card border border-hairline bg-white p-6 transition-shadow duration-200 hover:shadow-md hover:shadow-navy/5 lg:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                  {pathway.label}
                </p>

                <h4 className="mt-3 text-2xl font-semibold text-brand">{pathway.title}</h4>

                <p className="mt-2 text-xl leading-relaxed text-ink-muted">{pathway.components}</p>

                {/* Native list numbering, so a screen reader announces each step
                    number once and no decorative numerals are needed. */}
                <ol className="mt-6 list-decimal space-y-4 pl-6 marker:font-semibold marker:text-brand">
                  {pathway.steps.map((step, stepIndex) => (
                    <li key={`${step.title}-${stepIndex}`}>
                      <p className="text-xl font-semibold text-navy">{step.title}</p>
                      <p className="mt-1 text-xl leading-relaxed text-ink-muted">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default PathwaySection

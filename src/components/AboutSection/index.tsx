import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type AboutStatement = {
  icon: React.ReactNode
  title: string
  body: string
}

export type AboutSectionProps = {
  title: string
  /** Body copy, one entry per paragraph. The first is set as a lead. */
  paragraphs: string[]
  /** Vision and Mission, as cards stacked beside the copy. */
  statements?: AboutStatement[]
  watermark?: WatermarkSide
}

/**
 * The company statement that closes the homepage. Sits on the same dark abyss
 * band `CalloutGrid` used, so the page still ends on the deep colour before the
 * white footer — but it carries prose and declarations rather than a CTA.
 */
export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  paragraphs,
  statements,
  watermark = 'left',
}) => {
  const [lead, ...rest] = paragraphs
  const hasStatements = Boolean(statements?.length)

  return (
    <section className="relative overflow-hidden bg-abyss py-20 lg:py-28">
      <Watermark side={watermark} tone="dark" />

      {/* items-start, not items-center: the copy column runs a good deal longer
          than the cards, and centring would leave them floating mid-band. */}
      <div className="relative mx-auto grid max-w-7xl items-start gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-sky sm:text-4xl">{title}</h2>
          </Reveal>

          {/* White at a reduced opacity rather than a grey token: it keeps the
              copy tied to the band's own colour, so re-tinting `--color-abyss`
              never leaves the text stranded at the wrong contrast. The lead sits
              brighter than what follows so the eye has somewhere to start. */}
          <Reveal delay={0.08}>
            <p className="mt-8 text-xl leading-relaxed text-white/80">{lead}</p>
          </Reveal>

          {rest.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={0.16 + index * 0.08}>
              <p className="mt-6 text-lg leading-relaxed text-white/60">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        {hasStatements && (
          // Stacked, not side by side: Vision and Mission are full paragraphs,
          // and two narrow columns of them would set an unreadable measure.
          <ul className="grid gap-5">
            {statements!.map(({ icon, title: statementTitle, body }, index) => (
              <Reveal key={statementTitle} as="li" delay={index * 0.1}>
                <div className="h-full rounded-card border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08] lg:p-8">
                  {/* sky, not teal-cta: the accent teal is too dark against abyss
                      to hold its shape at this size. */}
                  <span className="inline-flex size-11 items-center justify-center rounded-card bg-white/10 text-sky">
                    {icon}
                  </span>

                  <h3 className="mt-6 text-2xl font-semibold text-white">{statementTitle}</h3>

                  <p className="mt-3 text-lg leading-relaxed text-white/60">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default AboutSection

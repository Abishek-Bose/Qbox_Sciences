import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

type CTA = {
  label: string
  href: string
}

export type CalloutCard = {
  icon: React.ReactNode
  title: string
  body: string
  /** Optional — when set, the whole card becomes a link. */
  href?: string
}

export type CalloutGridProps = {
  title: string
  description: string
  /** Optional. Omit both CTAs and the section is copy only. */
  primaryCta?: CTA
  secondaryCta?: CTA
  /** Optional. Omit and the band centres its copy instead of splitting in two. */
  cards?: CalloutCard[]
  watermark?: WatermarkSide
}

export const CalloutGrid: React.FC<CalloutGridProps> = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  cards,
  watermark = 'left',
}) => {
  const hasCards = Boolean(cards?.length)
  const hasCta = Boolean(primaryCta || secondaryCta)

  return (
    <section className="relative overflow-hidden bg-abyss py-20 lg:py-28">
      <Watermark side={watermark} tone="dark" />

      {/* Two columns only when there are cards to fill the second one. Without
          them the copy centres, rather than sitting in a half-empty grid. */}
      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          hasCards ? 'grid items-center gap-16 lg:grid-cols-2 lg:gap-20' : ''
        }`}
      >
        <Reveal className={hasCards ? 'max-w-lg' : 'mx-auto max-w-3xl text-center'}>
          <h2 className="text-3xl font-bold tracking-tight text-sky sm:text-[2rem]">{title}</h2>

          {/* White at 70% rather than a grey token: it keeps the copy tied to the
              band's own colour, so re-tinting `--color-abyss` never leaves the
              text stranded at the wrong contrast. */}
          <p className="mt-6 text-xl leading-relaxed text-white/70">{description}</p>

          {hasCta && (
            <div
              className={`mt-10 flex flex-wrap items-center gap-4 ${hasCards ? '' : 'justify-center'}`}
            >
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center rounded-card bg-teal-cta px-7 py-4 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-teal-cta/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                >
                  {primaryCta.label}
                </Link>
              )}

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center rounded-card border border-white/25 px-7 py-4 text-[15px] font-semibold leading-none text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </Reveal>

        {hasCards && (
          <ul className="grid gap-5 sm:grid-cols-2">
            {cards!.map(({ icon, title: cardTitle, body, href }, index) => {
              const content = (
                <>
                  <span className="text-teal-cta">{icon}</span>

                  <h3 className="mt-8 text-2xl font-semibold text-white">{cardTitle}</h3>

                  <p className="mt-2 text-xl leading-relaxed text-white/60">{body}</p>
                </>
              )

              const shell =
                'block h-full rounded-card border border-white/10 bg-white/5 p-6 transition-colors'

              return (
                <Reveal key={cardTitle} as="li" delay={index * 0.08}>
                  {href ? (
                    <Link
                      href={href}
                      className={`${shell} hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky`}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className={shell}>{content}</div>
                  )}
                </Reveal>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}

export default CalloutGrid

import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type Feature = {
  icon: React.ReactNode
  title: string
  body: string
}

export type FeatureGridProps = {
  title: string
  intro?: string
  features: Feature[]
  watermark?: WatermarkSide
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  intro,
  features,
  watermark = 'left',
}) => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">{title}</h2>

          {intro && <p className="mt-6 text-xl leading-relaxed text-ink-muted">{intro}</p>}
        </Reveal>

        {/*
          A list, not a row of divs — these are three sibling items of equal
          rank, and a screen reader should announce the count. `items-stretch`
          (the grid default) keeps the cards equal height regardless of how much
          body copy each one carries.
        */}
        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon, title: cardTitle, body }, index) => (
            // `as="li"` — wrapping the card in a div would break the <ul>/<li>
            // relationship and the screen-reader item count with it.
            <Reveal
              key={cardTitle}
              as="li"
              delay={index * 0.1}
              className="rounded-card border border-hairline bg-white p-8 transition-shadow duration-200 hover:shadow-lg hover:shadow-navy/5"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-card bg-brand/10 text-navy">
                {icon}
              </span>

              <h3 className="mt-8 text-2xl font-bold text-brand">{cardTitle}</h3>

              <p className="mt-4 text-xl leading-relaxed text-ink-muted">{body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FeatureGrid

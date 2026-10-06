import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

import { type LiteratureItem } from './LiteratureCard'
import { LiteratureCarousel } from './LiteratureCarousel'

export type { LiteratureItem }

export type LiteratureGridProps = {
  title: string
  subtitle?: string
  /** Every study, in order. The first three show; the arrows reveal the rest. */
  items: LiteratureItem[]
  watermark?: WatermarkSide
}

export const LiteratureGrid: React.FC<LiteratureGridProps> = ({
  title,
  subtitle,
  items,
  watermark = 'left',
}) => {
  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-24">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-navy">{title}</h2>
          {subtitle && <p className="mt-2 text-xl text-ink-muted">{subtitle}</p>}
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <LiteratureCarousel label={title} items={items} />
        </Reveal>
      </div>
    </section>
  )
}

export default LiteratureGrid

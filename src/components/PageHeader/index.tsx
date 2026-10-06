import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark } from '@/components/Watermark'

export type PageHeaderProps = {
  eyebrow?: string
  title: string
  description: string
}

/**
 * Centred title band for interior pages that have no hero photo. Plays
 * immediately: it is always above the fold.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, description }) => {
  return (
    <section className="relative overflow-hidden bg-surface py-16 lg:py-20">
      <Watermark side="right" position="top" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal immediate>
          {eyebrow && (
            <span className="inline-block rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-brand">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy sm:text-5xl">{title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-muted">{description}</p>
        </Reveal>
      </div>
    </section>
  )
}

export default PageHeader

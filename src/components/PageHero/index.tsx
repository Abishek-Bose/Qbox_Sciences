import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark } from '@/components/Watermark'

export type PageHeroCta = {
  label: string
  href: string
  /** Trailing icon, e.g. a download arrow or a play glyph. */
  icon?: React.ReactNode
}

export type PageHeroProps = {
  eyebrow?: string
  eyebrowIcon?: React.ReactNode
  title: string
  /** One paragraph, or several — each string in an array is its own paragraph. */
  description: string | string[]
  image?: {
    src: string
    alt: string
  }
  /**
   * `matte` wraps the photo in a padded white frame (Therapy Areas).
   * `plain` is the photo on its own (Resources).
   */
  frame?: 'matte' | 'plain'
  aspect?: 'square' | 'wide'
  primaryCta?: PageHeroCta
  secondaryCta?: PageHeroCta
}

/**
 * The hero for interior pages. Deliberately not the homepage `Hero`: a
 * single-colour headline and a framed, rounded media plate. CTAs are optional —
 * Therapy Areas opens a topic, Resources sends you somewhere.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  image,
  frame = 'matte',
  aspect = 'square',
  primaryCta,
  secondaryCta,
}) => {
  const aspectClass = aspect === 'wide' ? 'aspect-3/2' : 'aspect-square'
  const paragraphs = Array.isArray(description) ? description : [description]

  const media = (
    <div className={`relative overflow-hidden rounded-xl ${aspectClass}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-navy via-abyss to-teal"
        />
      )}
    </div>
  )

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Page heroes open the alternating rhythm on the right. */}
      <Watermark side="right" position="top" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        <div className="max-w-xl">
          {eyebrow && (
            <Reveal immediate>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
                {eyebrowIcon}
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal immediate delay={0.08}>
            <h1 className="mt-8 text-4xl font-bold leading-[1.15] tracking-tight text-navy sm:text-5xl">
              {title}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.16}>
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`max-w-2xl text-xl leading-relaxed text-ink-muted ${
                  index === 0 ? 'mt-6' : 'mt-4'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          {(primaryCta || secondaryCta) && (
            <Reveal immediate delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-card bg-navy px-7 py-3.5 text-sm font-semibold leading-none text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  {primaryCta.label}
                  {primaryCta.icon}
                </Link>
              )}

              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-card border border-hairline bg-white px-7 py-3.5 text-sm font-semibold leading-none text-navy transition-colors hover:border-navy hover:bg-brand/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                >
                  {secondaryCta.label}
                  {secondaryCta.icon}
                </Link>
              )}
            </Reveal>
          )}
        </div>

        {/* Deliberately rounder than the site's `rounded-card` (2px): the page
            hero's image is the one place the design asks for soft corners. */}
        <Reveal immediate delay={0.12} y={32}>
          {frame === 'matte' ? (
            <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-navy/10 ring-1 ring-hairline lg:p-10">
              {media}
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-navy/10 ring-1 ring-hairline">
              {media}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default PageHero

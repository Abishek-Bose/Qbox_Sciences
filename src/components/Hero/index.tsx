import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'

type CTA = {
  label: string
  href: string
}

export type HeroProps = {
  eyebrow?: string
  /** Rendered in brand blue. The first half of the headline. */
  titleLead: string
  /** Rendered in teal, closing the blue-to-teal colour run. */
  titleAccent: string
  description: string
  primaryCta: CTA
  image: {
    src: string
    alt: string
  }
  /** The credential card that overlaps the image. Omit it and the image stands alone. */
  credential?: {
    title: string
    body: string
  }
}

export const Hero: React.FC<HeroProps> = ({
  eyebrow,
  titleLead,
  titleAccent,
  description,
  primaryCta,
  image,
  credential,
}) => {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/*
        The Q motive as an ambient watermark. Painted as a CSS background rather
        than next/image on purpose: the optimizer rejects SVG unless you enable
        `dangerouslyAllowSVG`, and that flag is not worth turning on for a piece
        of decoration. It is decoration, not content — aria-hidden and inert.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 hidden size-184 select-none bg-[url('/images/q-motive.svg')] bg-contain bg-no-repeat opacity-[0.07] lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        {/* Above the fold, so these play on mount (`immediate`) rather than
            waiting for a scroll that already happened. Ladder of small delays
            reads as one movement rather than four separate ones. */}
        <div className="max-w-xl">
          {eyebrow && (
            <Reveal immediate>
              <p className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-base font-semibold uppercase tracking-[0.14em] text-brand">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-6 w-6">
                  <path
                    d="M3 2h10v3.2a2 2 0 0 1-.5 1.3L10 9.5V14H6V9.5L3.5 6.5A2 2 0 0 1 3 5.2V2Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal immediate delay={0.08}>
            <h1 className="mt-8 text-4xl font-bold leading-[1.15] tracking-tight text-brand sm:text-5xl">
              {titleLead} <span className="text-teal">{titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.16}>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-muted">{description}</p>
          </Reveal>

          <Reveal immediate delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center rounded-card bg-navy px-7 py-4 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              {primaryCta.label}
            </Link>
          </Reveal>
        </div>

        {/* Padded so the credential card can hang off the image without being
            clipped by the section's overflow-hidden. */}
        <Reveal immediate delay={0.12} y={32} className="relative lg:pb-12 lg:pl-12">
          {/*
            Two nested containers, by design: an outer matte that carries the
            shadow and a slightly larger radius, and an inner clipping box that
            holds the photo. The padding between them is what reads as a frame —
            collapse them into one element and the photo goes flush to the edge.
          */}
          <div className="rounded-card bg-white/70 p-3 shadow-2xl shadow-navy/15 ring-1 ring-white/80">
            {/* `aspect-square` at lg so the media column stops towering over the
                copy and leaving dead space above the headline. */}
            <div className="relative aspect-4/5 overflow-hidden rounded-card lg:aspect-square">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                // The LCP element on the homepage — preload rather than lazy-load.
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          {credential && (
            // Frosted glass: the card is translucent and `backdrop-blur` blurs
            // the photo *behind* it, rather than the card having a blurred
            // background of its own.
            <figure className="absolute bottom-0 left-0 w-64 rounded-card bg-white/80 p-5 shadow-xl shadow-navy/10 backdrop-blur-md lg:w-72">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-teal">
                <path
                  d="M9 3h6M10 3v6.2a2 2 0 0 1-.3 1L5.5 17a2.5 2.5 0 0 0 2.1 3.9h8.8a2.5 2.5 0 0 0 2.1-3.9l-4.2-6.8a2 2 0 0 1-.3-1V3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <figcaption className="mt-3">
                <span className="block font-semibold text-brand">{credential.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                  {credential.body}
                </span>
              </figcaption>
            </figure>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Hero

import Image from 'next/image'
import React from 'react'

import { AnimationIcon, PlayIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type Webinar = {
  title: string
  /** Supporting line, e.g. the channel that published the video. */
  meta?: string
  /** The video's own URL. */
  href: string
}

export type WebinarSectionProps = {
  title: string
  description: string
  /** The list beside the feature tile. */
  webinars: Webinar[]
  /** The video given the large tile. */
  feature: Webinar & {
    image?: {
      src: string
      alt: string
    }
  }
  /** Optional button under the list, e.g. to a channel. Omit it when there is nowhere to send people. */
  cta?: {
    label: string
    href: string
  }
  watermark?: WatermarkSide
}

/**
 * Every video affordance is an external anchor to YouTube — not a Next `Link`
 * and not an embedded player. `target="_blank"` with `rel="noopener noreferrer"`
 * so the video opens in its own tab and cannot reach back into this page
 * via `window.opener`.
 */
export const WebinarSection: React.FC<WebinarSectionProps> = ({
  title,
  description,
  webinars,
  feature,
  cta,
  watermark = 'right',
}) => {
  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-24">
      <Watermark side={watermark} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="max-w-lg">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-navy">{title}</h2>
            <p className="mt-4 text-xl leading-relaxed text-ink-muted">{description}</p>
          </Reveal>

          <ul className="mt-10 space-y-6">
            {webinars.map(({ title: webinarTitle, meta, href }, index) => (
              <Reveal key={href} as="li" y={12} delay={0.1 + index * 0.1}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-card bg-brand/10 text-brand">
                    <AnimationIcon className="size-4" />
                  </span>

                  <span className="block">
                    <span className="block text-xl font-semibold text-navy transition-colors group-hover:text-brand">
                      {webinarTitle}
                    </span>
                    {meta && <span className="mt-1 block text-base text-ink-muted">{meta}</span>}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          {cta && (
            <Reveal delay={0.3}>
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center rounded-card bg-navy px-7 py-3.5 text-sm font-semibold leading-none text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                {cta.label}
              </a>
            </Reveal>
          )}
        </div>

        <Reveal y={32}>
          <a
            href={feature.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${feature.title} – watch on YouTube`}
            className="group relative block aspect-video overflow-hidden rounded-card shadow-xl shadow-navy/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            {feature.image ? (
              <Image
                src={feature.image.src}
                alt={feature.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-br from-abyss via-navy to-teal"
              />
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-abyss/95 via-abyss/40 to-transparent"
            />

            {/* A rounded square, not a circle — the design calls for a soft-cornered
              tile. Rounder than the site's `rounded-card` on purpose. */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-brand text-white shadow-lg transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            >
              <PlayIcon className="size-9" />
            </span>

            <span className="absolute inset-x-0 bottom-0 block p-6">
              <span className="block text-sm font-semibold text-white">{feature.title}</span>
              {feature.meta && (
                <span className="mt-1 block text-xs text-white/70">{feature.meta}</span>
              )}
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default WebinarSection

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CheckCircleIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

export type TherapyCard = {
  icon?: React.ReactNode
  title: string
  body: string
}

export type TherapySectionProps = {
  icon: React.ReactNode
  title: string
  body: string
  /** Ticked list under the body copy. */
  bullets?: string[]
  /** The two supporting cards. */
  cards?: TherapyCard[]
  media?: {
    /** Omit until the photo exists — the frame falls back to a brand gradient. */
    src?: string
    alt?: string
    /** When present, the image is darkened and this copy is laid over it. */
    overlay?: {
      eyebrow: string
      title: string
      body: string
    }
  }
  quote?: {
    text: string
    author: string
  }
  link?: {
    label: string
    href: string
  }
  /** Which side the media column sits on. Copy stays first in the DOM either way. */
  mediaSide?: 'left' | 'right'
  /** Cards above the image instead of below it. */
  cardsFirst?: boolean
  tinted?: boolean
  watermark?: WatermarkSide
}

export const TherapySection: React.FC<TherapySectionProps> = ({
  icon,
  title,
  body,
  bullets,
  cards,
  media,
  quote,
  link,
  mediaSide = 'right',
  cardsFirst = false,
  tinted = false,
  watermark = 'left',
}) => {
  const mediaLeft = mediaSide === 'left'

  const cardGrid = cards && cards.length > 0 && (
    <ul className="grid gap-5 sm:grid-cols-2">
      {cards.map(({ icon: cardIcon, title: cardTitle, body: cardBody }, index) => (
        <Reveal
          key={cardTitle}
          as="li"
          delay={index * 0.1}
          className="rounded-card border border-hairline bg-white p-5 transition-shadow duration-200 hover:shadow-md hover:shadow-navy/5"
        >
          {cardIcon && <span className="block text-brand">{cardIcon}</span>}

          <h3 className="mt-4 text-2xl font-semibold text-brand">{cardTitle}</h3>
          {/* pre-line: a `\n` in the body starts a new line, for short lists. */}
          <p className="mt-2 whitespace-pre-line text-xl leading-relaxed text-ink-muted">
            {cardBody}
          </p>
        </Reveal>
      ))}
    </ul>
  )

  const mediaBlock = media && (
    <Reveal
      y={32}
      className="relative aspect-16/10 overflow-hidden rounded-card shadow-xl shadow-navy/10"
    >
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt ?? ''}
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

      {media.overlay && (
        <>
          {/* Scrim, not a flat tint: the copy sits at the bottom, so the darkening
              is heaviest there and clears off the top of the photo. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-abyss/95 via-abyss/70 to-abyss/20"
          />

          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              {media.overlay.eyebrow}
            </p>
            <p className="mt-3 text-2xl font-bold text-white">{media.overlay.title}</p>
            <p className="mt-3 max-w-md text-xl leading-relaxed text-white/70">
              {media.overlay.body}
            </p>
          </div>
        </>
      )}
    </Reveal>
  )

  return (
    <section
      className={`relative overflow-hidden py-20 lg:py-28 ${tinted ? 'bg-surface' : 'bg-white'}`}
    >
      <Watermark side={watermark} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Copy is always first in the DOM so the reading order stays sane; only
            the visual order flips. */}
        <div className={mediaLeft ? 'lg:order-2' : undefined}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-card bg-brand/10 text-brand">
                {icon}
              </span>

              <h2 className="text-3xl font-bold tracking-tight text-navy">{title}</h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 text-xl leading-relaxed text-ink-muted">{body}</p>
          </Reveal>

          {bullets && bullets.length > 0 && (
            <ul className="mt-8 space-y-3">
              {bullets.map((bullet, index) => (
                <Reveal
                  key={bullet}
                  as="li"
                  y={12}
                  delay={0.16 + index * 0.08}
                  className="flex items-start gap-3"
                >
                  <CheckCircleIcon className="mt-1.5 size-5 shrink-0 text-teal" />
                  <span className="text-xl text-ink-muted">{bullet}</span>
                </Reveal>
              ))}
            </ul>
          )}

          {quote && (
            <Reveal delay={0.16}>
              <blockquote className="mt-8 rounded-card border-l-[3px] border-brand bg-brand/5 p-6">
                <p className="text-xl italic leading-relaxed text-ink-muted">“{quote.text}”</p>
                <footer className="mt-3 text-xs font-semibold text-brand">– {quote.author}</footer>
              </blockquote>
            </Reveal>
          )}

          {link && (
            <Link
              href={link.href}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {link.label}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                <path
                  d="M3 10h13M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        <div className={`flex flex-col gap-6 ${mediaLeft ? 'lg:order-1' : ''}`}>
          {cardsFirst ? (
            <>
              {cardGrid}
              {mediaBlock}
            </>
          ) : (
            <>
              {mediaBlock}
              {cardGrid}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default TherapySection

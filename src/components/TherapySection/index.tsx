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
  /** Optional: a section can be just a heading, cards and a quote. */
  body?: string
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
  /** Button that opens `href` in a new tab, e.g. a deck or PDF. */
  action?: {
    label: string
    href: string
  }
  /** Which side the media column sits on. Copy stays first in the DOM either way. */
  mediaSide?: 'left' | 'right'
  /** Cards above the image instead of below it. */
  cardsFirst?: boolean
  /** Cards in the copy column, under the heading, instead of the image column. */
  cardsWithCopy?: boolean
  tinted?: boolean
  /** Dark (abyss) band with light text; the page alternates light and dark. */
  dark?: boolean
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
  action,
  mediaSide = 'right',
  cardsFirst = false,
  cardsWithCopy = false,
  tinted = false,
  dark = false,
  watermark = 'left',
}) => {
  const mediaLeft = mediaSide === 'left'

  // Every colour that flips between the light and dark band lives here.
  const t = dark
    ? {
        band: 'bg-abyss',
        heading: 'text-white',
        iconChip: 'bg-white/10 text-sky',
        copy: 'text-white/70',
        tick: 'text-sky',
        quoteBox: 'border-sky bg-white/5',
        quoteText: 'text-white/70',
        quoteAuthor: 'text-sky',
        card: 'border-white/10 bg-white/5 hover:shadow-none hover:border-white/25 hover:bg-white/[0.08]',
        cardIcon: 'text-sky',
        cardTitle: 'text-white',
        cardBody: 'text-white/60',
        button: 'bg-white text-navy hover:bg-white/90 focus-visible:outline-white',
        link: 'text-sky hover:text-white focus-visible:outline-sky',
      }
    : {
        band: tinted ? 'bg-surface' : 'bg-white',
        heading: 'text-navy',
        iconChip: 'bg-brand/10 text-brand',
        copy: 'text-ink-muted',
        tick: 'text-teal',
        quoteBox: 'border-brand bg-brand/5',
        quoteText: 'text-ink-muted',
        quoteAuthor: 'text-brand',
        card: 'border-hairline bg-white hover:shadow-md hover:shadow-navy/5',
        cardIcon: 'text-brand',
        cardTitle: 'text-brand',
        cardBody: 'text-ink-muted',
        button: 'bg-navy text-white hover:bg-navy-dark focus-visible:outline-brand',
        link: 'text-brand hover:text-brand-dark focus-visible:outline-brand',
      }

  const cardGrid = cards && cards.length > 0 && (
    <ul className="grid gap-5 sm:grid-cols-2">
      {cards.map(({ icon: cardIcon, title: cardTitle, body: cardBody }, index) => (
        <Reveal
          key={cardTitle}
          as="li"
          delay={index * 0.1}
          className={`rounded-card border p-5 transition-[box-shadow,background-color,border-color] duration-200 ${t.card}`}
        >
          {cardIcon && <span className={`block ${t.cardIcon}`}>{cardIcon}</span>}

          <h3 className={`mt-4 text-2xl font-semibold ${t.cardTitle}`}>{cardTitle}</h3>
          {/* pre-line: a `\n` in the body starts a new line, for short lists. */}
          <p className={`mt-2 whitespace-pre-line text-xl leading-relaxed ${t.cardBody}`}>
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
    <section className={`relative overflow-hidden py-20 lg:py-28 ${t.band}`}>
      <Watermark side={watermark} tone={dark ? 'dark' : 'light'} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Copy is always first in the DOM so the reading order stays sane; only
            the visual order flips. */}
        <div className={mediaLeft ? 'lg:order-2' : undefined}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span
                className={`inline-flex size-10 shrink-0 items-center justify-center rounded-card ${t.iconChip}`}
              >
                {icon}
              </span>

              <h2 className={`text-3xl font-bold tracking-tight ${t.heading}`}>{title}</h2>
            </div>
          </Reveal>

          {body && (
            <Reveal delay={0.08}>
              <p className={`mt-6 text-xl leading-relaxed ${t.copy}`}>{body}</p>
            </Reveal>
          )}

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
                  <CheckCircleIcon className={`mt-1.5 size-5 shrink-0 ${t.tick}`} />
                  <span className={`text-xl ${t.copy}`}>{bullet}</span>
                </Reveal>
              ))}
            </ul>
          )}

          {cardsWithCopy && cardGrid && <div className="mt-8">{cardGrid}</div>}

          {action && (
            <Reveal delay={0.16}>
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center rounded-card px-7 py-3.5 text-sm font-semibold leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${t.button}`}
              >
                {action.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>
          )}

          {quote && (
            <Reveal delay={0.16}>
              <blockquote className={`mt-8 rounded-card border-l-[3px] p-6 ${t.quoteBox}`}>
                <p className={`text-xl italic leading-relaxed ${t.quoteText}`}>“{quote.text}”</p>
                <footer className={`mt-3 text-xs font-semibold ${t.quoteAuthor}`}>
                  {quote.author}
                </footer>
              </blockquote>
            </Reveal>
          )}

          {link && (
            <Link
              href={link.href}
              className={`group mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${t.link}`}
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
          {cardsWithCopy ? (
            mediaBlock
          ) : cardsFirst ? (
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

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'

type Media = {
  src: string
  alt: string
}

export type SplitFeatureItem = {
  title: string
  body: string
}

export type SplitFeatureProps = {
  title: string
  items: SplitFeatureItem[]
  link?: {
    label: string
    href: string
  }
  /**
   * Exactly two images, shown as an offset pair. Either may be omitted — a
   * missing photo degrades to a brand-tinted block rather than a broken layout.
   */
  media?: [Media?, Media?]
  watermark?: WatermarkSide
}

const MediaTile: React.FC<{ media?: Media; className?: string; priority?: boolean }> = ({
  media,
  className = '',
  priority = false,
}) => (
  <div
    className={`relative aspect-square overflow-hidden rounded-card shadow-xl shadow-navy/10 ${className}`}
  >
    {media ? (
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 25vw, 45vw"
        className="object-cover"
      />
    ) : (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-teal/25 via-brand/15 to-navy/25"
      />
    )}
  </div>
)

export const SplitFeature: React.FC<SplitFeatureProps> = ({
  title,
  items,
  link,
  media,
  watermark = 'right',
}) => {
  const [first, second] = media ?? []

  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-28">
      <Watermark side={watermark} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Both tiles share a baseline and an equal height — `items-stretch` (the
            grid default) plus a shared aspect ratio on the tiles themselves. */}
        <div className="grid grid-cols-2 gap-5">
          <Reveal>
            <MediaTile media={first} priority />
          </Reveal>

          {/* The trailing tile still arrives a beat later, so the pair reads as
              one movement rather than two. */}
          <Reveal delay={0.12}>
            <MediaTile media={second} />
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-brand">{title}</h2>
          </Reveal>

          <ul className="mt-8 space-y-8">
            {items.map(({ title: itemTitle, body }, index) => (
              <Reveal
                key={itemTitle}
                as="li"
                delay={0.1 + index * 0.1}
                className="border-l-[3px] border-teal pl-5"
              >
                <h3 className="text-2xl font-bold text-brand">{itemTitle}</h3>
                <p className="mt-2 text-xl leading-relaxed text-ink-muted">{body}</p>
              </Reveal>
            ))}
          </ul>

          {link && (
            <Link
              href={link.href}
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {link.label}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              >
                <path
                  d="m8 5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default SplitFeature

import React from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { Watermark, type WatermarkSide } from '@/components/Watermark'
import type { Announcement } from '@/content/events'
import { formatEventDate, sortNewestFirst } from '@/lib/event-dates'

export type AnnouncementListProps = {
  title: string
  items: Announcement[]
  watermark?: WatermarkSide
}

export const AnnouncementList: React.FC<AnnouncementListProps> = ({
  title,
  items,
  watermark = 'left',
}) => {
  const sorted = sortNewestFirst(items)

  return (
    <section className="relative overflow-hidden bg-surface py-20 lg:py-24">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-navy">{title}</h2>
        </Reveal>

        {sorted.length === 0 ? (
          <p className="mt-10 text-xl text-ink-muted">Updates coming soon.</p>
        ) : (
          <ul className="mt-10 grid gap-6">
            {sorted.map((item, index) => (
              <Reveal
                // Indexed: two announcements may share a date and a title.
                key={`${index}-${item.date}-${item.title}`}
                as="li"
                delay={index * 0.08}
                className="rounded-card border border-hairline bg-white p-6"
              >
                <p className="text-sm font-semibold text-brand-accent">
                  {formatEventDate(item.date)}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-snug text-navy">{item.title}</h3>
                <p className="mt-3 text-xl leading-relaxed text-ink-muted">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default AnnouncementList

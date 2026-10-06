'use client'

import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/icons'
import { Watermark, type WatermarkSide } from '@/components/Watermark'
import type { EventAlbum } from '@/content/events'
import { formatEventDate, sortNewestFirst } from '@/lib/event-dates'

export type EventGalleryProps = {
  title: string
  albums: EventAlbum[]
  watermark?: WatermarkSide
}

/** Indexes into the newest-first list of albums. */
type Open = { album: number; photo: number }

/** Next position, or the same one when `delta` would step past either end. */
const move = (current: Open | null, delta: number, albums: EventAlbum[]): Open | null => {
  if (!current) return current
  const total = albums[current.album]?.photos.length ?? 0
  const next = current.photo + delta
  return next < 0 || next >= total ? current : { ...current, photo: next }
}

const controlClass =
  'inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white aria-disabled:cursor-default aria-disabled:opacity-30 aria-disabled:hover:bg-white/10'

/**
 * Albums as thumbnail grids, with an enlarged-photo dialog. The only client
 * component on the Events page: it owns the open state, focus and scroll lock.
 *
 * The dialog has no enter animation, so there is nothing to switch off for
 * `prefers-reduced-motion`; only the thumbnail hover zoom is motion, and it
 * is guarded with `motion-reduce`.
 *
 * Previous and Next are marked `aria-disabled` at either end, never `disabled`.
 * A button that becomes natively disabled while it holds focus drops that focus
 * to <body>, which is outside the dialog; `move` already makes the click a
 * no-op, so the attribute only has to say so.
 */
export const EventGallery: React.FC<EventGalleryProps> = ({
  title,
  albums,
  watermark = 'right',
}) => {
  const sorted = useMemo(() => sortNewestFirst(albums), [albums])
  const [open, setOpen] = useState<Open | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const isOpen = open !== null
  const album = open ? sorted[open.album] : undefined
  const photo = album && open ? album.photos[open.photo] : undefined

  const close = () => setOpen(null)
  const step = (delta: number) => setOpen((current) => move(current, delta, sorted))

  // Focus in on open, back to the thumbnail on close; lock page scroll between.
  useEffect(() => {
    if (!isOpen) return
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const step = (delta: number) => setOpen((current) => move(current, delta, sorted))

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(null)
      } else if (event.key === 'ArrowLeft') {
        step(-1)
      } else if (event.key === 'ArrowRight') {
        step(1)
      } else if (event.key === 'Tab') {
        // Keep focus inside the dialog.
        const dialog = dialogRef.current
        const focusable = dialog?.querySelectorAll<HTMLElement>('button')
        if (!dialog || !focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement

        if (!dialog.contains(active)) {
          // Focus has strayed to the page behind; pull it back in.
          event.preventDefault()
          first.focus()
        } else if (event.shiftKey && (active === first || active === dialog)) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [isOpen, sorted])

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <Watermark side={watermark} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-navy">{title}</h2>

        {sorted.length === 0 ? (
          <p className="mt-10 text-xl text-ink-muted">Updates coming soon.</p>
        ) : (
          <div className="mt-10 space-y-14">
            {sorted.map((item, albumIndex) => (
              // The index is part of both keys: nothing stops two albums sharing
              // a date and title, or one album listing the same file twice.
              <div key={`${albumIndex}-${item.date}-${item.title}`}>
                <h3 className="text-2xl font-semibold text-navy">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-accent">
                  {formatEventDate(item.date)}
                </p>

                <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {item.photos.map((p, photoIndex) => (
                    <li key={`${photoIndex}-${p.src}`}>
                      <button
                        type="button"
                        onClick={(event) => {
                          triggerRef.current = event.currentTarget
                          setOpen({ album: albumIndex, photo: photoIndex })
                        }}
                        aria-label={`Enlarge photo: ${p.alt}`}
                        className="group relative block aspect-4/3 w-full overflow-hidden rounded-card border border-hairline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        <Image
                          src={p.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                          className="object-cover transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {open && album && photo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-abyss/90 p-4"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${album.title} – photo ${open.photo + 1} of ${album.photos.length}`}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4 outline-none"
          >
            <div className="flex w-full items-center justify-between gap-4 text-white">
              <p className="text-sm font-semibold">
                {album.title} – {open.photo + 1} of {album.photos.length}
              </p>
              <button type="button" onClick={close} className={controlClass}>
                <CloseIcon className="size-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <div className="flex w-full items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-disabled={open.photo === 0 || undefined}
                className={controlClass}
              >
                <ChevronLeftIcon className="size-5" />
                <span className="sr-only">Previous</span>
              </button>

              <div className="relative h-[70vh] min-w-0 flex-1">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-disabled={open.photo === album.photos.length - 1 || undefined}
                className={controlClass}
              >
                <ChevronRightIcon className="size-5" />
                <span className="sr-only">Next</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default EventGallery

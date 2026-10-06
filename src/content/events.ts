/**
 * Events content. This is the single place to edit until it moves into Payload
 * collections. Photos go under `public/images/events/` (next.config already
 * allows `/images/**` for `next/image`), e.g. `/images/events/summit-2026/1.jpg`.
 *
 * Dates are ISO `yyyy-mm-dd`. Order does not matter: the page sorts newest first.
 */

export type EventPhoto = {
  src: string
  alt: string
}

export type EventAlbum = {
  title: string
  /** ISO date, yyyy-mm-dd. */
  date: string
  photos: EventPhoto[]
}

export type Announcement = {
  title: string
  /** ISO date, yyyy-mm-dd. */
  date: string
  body: string
}

// Empty until the client supplies content.
export const EVENT_ALBUMS: EventAlbum[] = []

export const ANNOUNCEMENTS: Announcement[] = []

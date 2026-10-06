import React from 'react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import EventsPage from '@/app/(frontend)/events/page'
import { AnnouncementList } from '@/components/AnnouncementList'
import { EventGallery } from '@/components/EventGallery'
import type { Announcement, EventAlbum } from '@/content/events'
import { formatEventDate } from '@/lib/event-dates'

import { cleanup, click, keyDown, render, stubBrowserApis } from './dom-helpers'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

beforeAll(stubBrowserApis)
afterEach(cleanup)

const photos = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    src: `/images/events/a/${i + 1}.jpg`,
    alt: `Photo ${i + 1}`,
  }))

const ALBUMS: EventAlbum[] = [
  { title: 'Old Summit', date: '2025-01-05', photos: photos(1) },
  { title: 'New Summit', date: '2026-03-12', photos: photos(3) },
]

const texts = (container: ParentNode, selector: string) =>
  Array.from(container.querySelectorAll(selector)).map((el) => el.textContent)

const byName = (container: ParentNode, name: string) =>
  Array.from(container.querySelectorAll('button')).find((b) => b.textContent === name)!

/**
 * React reports two siblings sharing a key through console.error. Returns a
 * reader for those warnings alone, so unrelated noise cannot fail a test.
 */
const watchDuplicateKeys = () => {
  const errors = vi.spyOn(console, 'error').mockImplementation(() => {})

  return {
    count: () => errors.mock.calls.filter((args) => String(args[0]).includes('same key')).length,
    restore: () => errors.mockRestore(),
  }
}

describe('empty states', () => {
  it('shows both headings and "Updates coming soon." for each section', () => {
    const container = render(<EventsPage />)
    expect(container.querySelector('h1')?.textContent).toBe('Events')
    expect(texts(container, 'h2')).toEqual(['Photo Gallery', 'Announcements'])
    expect(texts(container, 'p').filter((t) => t === 'Updates coming soon.')).toHaveLength(2)
  })
})

describe('formatEventDate', () => {
  it('formats as "12 Mar 2026"', () => {
    expect(formatEventDate('2026-03-12')).toBe('12 Mar 2026')
    expect(formatEventDate('2026-01-05')).toBe('5 Jan 2026')
  })

  it('does not shift under a negative UTC offset', () => {
    const original = process.env.TZ
    process.env.TZ = 'America/Los_Angeles'
    try {
      // new Date('2026-01-01').getDate() would be 31 here.
      expect(formatEventDate('2026-01-01')).toBe('1 Jan 2026')
    } finally {
      if (original === undefined) delete process.env.TZ
      else process.env.TZ = original
    }
  })
})

describe('AnnouncementList', () => {
  const items: Announcement[] = [
    { title: 'Middle', date: '2026-02-01', body: 'm' },
    { title: 'Newest', date: '2026-03-12', body: 'n' },
    { title: 'Oldest', date: '2025-12-31', body: 'o' },
  ]

  it('renders newest first with formatted dates and does not mutate the input', () => {
    const before = items.map((i) => i.title)
    const container = render(<AnnouncementList title="Announcements" items={items} />)

    expect(texts(container, 'h3')).toEqual(['Newest', 'Middle', 'Oldest'])
    expect(texts(container, 'li > p:first-child')).toEqual([
      '12 Mar 2026',
      '1 Feb 2026',
      '31 Dec 2025',
    ])
    expect(items.map((i) => i.title)).toEqual(before)
  })

  it('renders two announcements that share a date and a title', () => {
    const duplicateKeys = watchDuplicateKeys()
    const twin: Announcement = { title: 'Notice', date: '2026-01-01', body: 'first' }

    const container = render(
      <AnnouncementList title="Announcements" items={[twin, { ...twin, body: 'second' }]} />,
    )

    expect(texts(container, 'h3')).toEqual(['Notice', 'Notice'])
    expect(duplicateKeys.count()).toBe(0)
    duplicateKeys.restore()
  })
})

describe('EventGallery', () => {
  const setup = () => {
    const container = render(<EventGallery title="Photo Gallery" albums={ALBUMS} />)
    const thumbs = Array.from(container.querySelectorAll<HTMLButtonElement>('ul button'))
    return { container, thumbs }
  }
  const dialog = () => document.querySelector('[role="dialog"]') as HTMLElement | null
  const shown = () => dialog()!.querySelector('img')!.getAttribute('alt')
  const prev = () => byName(dialog()!, 'Previous') as HTMLButtonElement
  const next = () => byName(dialog()!, 'Next') as HTMLButtonElement
  const atEnd = (button: HTMLButtonElement) => button.getAttribute('aria-disabled') === 'true'

  it('lists albums newest first with formatted dates and leaves the input alone', () => {
    const { container } = setup()
    expect(texts(container, 'h3')).toEqual(['New Summit', 'Old Summit'])
    expect(container.textContent).toContain('12 Mar 2026')
    expect(ALBUMS[0].title).toBe('Old Summit')
  })

  it('opens an accessible dialog, locks scroll, and Esc closes it and restores focus', () => {
    const { thumbs } = setup()
    expect(dialog()).toBeNull()

    // The first thumbnails belong to the newest album (3 photos); open its second.
    thumbs[1].focus()
    click(thumbs[1])

    const d = dialog()!
    expect(d.getAttribute('aria-modal')).toBe('true')
    expect(d.getAttribute('aria-label')).toContain('New Summit')
    expect(d.contains(document.activeElement)).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')
    expect(shown()).toBe('Photo 2')

    keyDown('Escape')

    expect(dialog()).toBeNull()
    expect(document.activeElement).toBe(thumbs[1])
    expect(document.body.style.overflow).toBe('')
  })

  it('closes from the Close button and from the backdrop', () => {
    const { thumbs } = setup()

    click(thumbs[0])
    click(byName(dialog()!, 'Close'))
    expect(dialog()).toBeNull()
    expect(document.activeElement).toBe(thumbs[0])

    click(thumbs[0])
    // Clicks inside the dialog do not close it.
    click(dialog()!)
    expect(dialog()).not.toBeNull()
    click(dialog()!.parentElement!)
    expect(dialog()).toBeNull()
  })

  it('moves with arrow keys and Previous/Next, stopping at both ends', () => {
    const { thumbs } = setup()
    click(thumbs[0])

    expect(shown()).toBe('Photo 1')
    expect(atEnd(prev())).toBe(true)
    expect(atEnd(next())).toBe(false)

    // At the first photo, going back is a no-op by key or by button.
    keyDown('ArrowLeft')
    click(prev())
    expect(shown()).toBe('Photo 1')

    keyDown('ArrowRight')
    expect(shown()).toBe('Photo 2')
    expect(atEnd(prev())).toBe(false)
    click(next())
    expect(shown()).toBe('Photo 3')
    expect(atEnd(next())).toBe(true)

    // At the last photo, going forward is a no-op by key or by button.
    keyDown('ArrowRight')
    click(next())
    expect(shown()).toBe('Photo 3')

    click(prev())
    expect(shown()).toBe('Photo 2')
    keyDown('ArrowLeft')
    expect(shown()).toBe('Photo 1')
  })

  it('keeps focus on a control that reaches an end, and traps Tab in the dialog', () => {
    const { thumbs } = setup()
    click(thumbs[0])
    const close = byName(dialog()!, 'Close')

    // Walk to the last photo with Next focused, as a keyboard user would. A
    // natively `disabled` button would drop focus to <body> at this point.
    next().focus()
    click(next())
    click(next())
    expect(shown()).toBe('Photo 3')
    expect(next().disabled).toBe(false)
    expect(document.activeElement).toBe(next())

    // Tab from the last control wraps to the first, and Shift+Tab back again.
    keyDown('Tab')
    expect(document.activeElement).toBe(close)
    keyDown('Tab', { shiftKey: true })
    expect(document.activeElement).toBe(next())

    // Focus that has strayed to the page behind is pulled back in.
    next().blur()
    expect(dialog()!.contains(document.activeElement)).toBe(false)
    keyDown('Tab')
    expect(document.activeElement).toBe(close)
  })

  it('marks both controls as at an end for a one–photo album', () => {
    const { thumbs } = setup()

    // The last thumbnail is the older album's only photo.
    click(thumbs[3])
    expect(dialog()!.getAttribute('aria-label')).toContain('Old Summit')
    expect(atEnd(prev())).toBe(true)
    expect(atEnd(next())).toBe(true)

    keyDown('ArrowRight')
    keyDown('ArrowLeft')
    click(next())
    click(prev())
    expect(shown()).toBe('Photo 1')
  })

  it('restores scroll, focus and its key listener across repeated opens', () => {
    const add = vi.spyOn(document, 'addEventListener')
    const remove = vi.spyOn(document, 'removeEventListener')
    const keydowns = (spy: typeof add | typeof remove) =>
      spy.mock.calls.filter(([type]) => type === 'keydown').length

    const { thumbs } = setup()

    // Three opens, switching between the two albums.
    for (const thumb of [thumbs[0], thumbs[3], thumbs[2]]) {
      thumb.focus()
      click(thumb)
      expect(document.body.style.overflow).toBe('hidden')

      keyDown('Escape')
      expect(dialog()).toBeNull()
      expect(document.body.style.overflow).toBe('')
      expect(document.activeElement).toBe(thumb)
    }

    expect(keydowns(add)).toBe(3)
    expect(keydowns(remove)).toBe(3)

    // With the dialog shut, its keys do nothing.
    keyDown('ArrowRight')
    keyDown('Escape')
    expect(dialog()).toBeNull()

    add.mockRestore()
    remove.mockRestore()
  })

  it('renders an album with no photos, and albums and photos that repeat', () => {
    const duplicateKeys = watchDuplicateKeys()
    const [photo] = photos(1)
    // Same date, same title, and the same file listed twice.
    const twin: EventAlbum = { title: 'Annual Meet', date: '2026-02-02', photos: [photo, photo] }

    const container = render(
      <EventGallery
        title="Photo Gallery"
        albums={[twin, { ...twin }, { title: 'Empty', date: '2024-01-01', photos: [] }]}
      />,
    )

    expect(texts(container, 'h3')).toEqual(['Annual Meet', 'Annual Meet', 'Empty'])
    expect(container.querySelectorAll('ul button')).toHaveLength(4)
    expect(duplicateKeys.count()).toBe(0)
    duplicateKeys.restore()
  })
})

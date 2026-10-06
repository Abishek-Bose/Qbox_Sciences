import React from 'react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import TherapyAreasPage from '@/app/(frontend)/therapy-areas/page'

import { cleanup, render, stubBrowserApis } from './dom-helpers'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

beforeAll(stubBrowserApis)
afterEach(cleanup)

const heading = (container: ParentNode, tag: string, text: string) =>
  Array.from(container.querySelectorAll(tag)).find((el) => el.textContent === text)

describe('Therapy Areas page', () => {
  it('has no standalone IPF Platform Technology section', () => {
    const page = render(<TherapyAreasPage />)

    expect(heading(page, 'h3', 'IPF Platform Technology')).toBeUndefined()
    expect(page.querySelector('ol')).toBeNull()
  })

  it('opens the Enzomune deck in a new tab from the Immune Modulation section', () => {
    const page = render(<TherapyAreasPage />)
    const section = heading(page, 'h2', 'Immune Modulation')!.closest('section')!
    const button = Array.from(section.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('IPF Platform Technology'),
    )!

    expect(button.getAttribute('href')).toContain('enzomune-ipf-mode-of-action.pptx')
    expect(button.getAttribute('target')).toBe('_blank')
    expect(button.getAttribute('rel')).toContain('noopener')
  })

  it('has no hyphen, en dash or em dash in any visible text', () => {
    const page = render(<TherapyAreasPage />)
    const text = page.textContent ?? ''

    expect(text).not.toContain('-')
    expect(text).not.toContain('—')
    expect(text).not.toContain('–')
  })
})

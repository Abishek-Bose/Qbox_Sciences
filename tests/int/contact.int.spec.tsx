import React from 'react'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import ContactPage, { metadata } from '@/app/(frontend)/contact/page'
import { COMPANY } from '@/lib/site'

import { cleanup, render, stubBrowserApis } from './dom-helpers'

beforeAll(stubBrowserApis)
afterEach(cleanup)

const linkByText = (container: HTMLElement, text: string) =>
  Array.from(container.querySelectorAll('a')).find((a) => a.textContent?.includes(text))

describe('ContactPage', () => {
  it('has the expected title and header copy', () => {
    expect(metadata.title).toBe('Contact Us – Qbox Sciences')
    const container = render(<ContactPage />)
    expect(container.querySelector('h1')?.textContent).toBe('Contact Us')
    expect(container.textContent).toContain('Get in Touch')
    expect(container.querySelector('h2')?.textContent).toBe(COMPANY.name)
  })

  it('shows the address from COMPANY in an <address> element', () => {
    const container = render(<ContactPage />)
    const address = container.querySelector('address')
    expect(address).not.toBeNull()
    for (const line of COMPANY.office.lines) {
      expect(address?.textContent).toContain(line)
    }
  })

  it('links the email with mailto: built from COMPANY.email', () => {
    const container = render(<ContactPage />)
    const link = linkByText(container, COMPANY.email)
    expect(link?.getAttribute('href')).toBe(`mailto:${COMPANY.email}`)
  })

  it('opens the address in Google Maps in a new tab, safely', () => {
    const container = render(<ContactPage />)
    const link = linkByText(container, 'Google Maps')
    const query = [COMPANY.name, ...COMPANY.office.lines].join(' ')

    expect(link?.getAttribute('href')).toBe(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    )
    expect(link?.getAttribute('target')).toBe('_blank')
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
  })
})

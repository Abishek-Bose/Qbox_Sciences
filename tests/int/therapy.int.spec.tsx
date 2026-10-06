import React from 'react'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import TherapyAreasPage from '@/app/(frontend)/therapy-areas/page'
import { PathwaySection } from '@/components/PathwaySection'

import { cleanup, render, stubBrowserApis } from './dom-helpers'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}))

beforeAll(stubBrowserApis)
afterEach(cleanup)

const texts = (container: ParentNode, selector: string) =>
  Array.from(container.querySelectorAll(selector)).map((el) => el.textContent)

const heading = (container: ParentNode, tag: string, text: string) =>
  Array.from(container.querySelectorAll(tag)).find((el) => el.textContent === text)!

const renderBlock = () => {
  const page = render(<TherapyAreasPage />)
  const block = heading(page, 'h3', 'IPF Platform Technology').closest('section')!
  return { page, block }
}

describe('IPF Platform Technology on the Therapy Areas page', () => {
  it('sits between the Immune Modulation and Critical Care Medicine headings', () => {
    const { page } = renderBlock()
    const immune = heading(page, 'h2', 'Immune Modulation')
    const ipf = heading(page, 'h3', 'IPF Platform Technology')
    const critical = heading(page, 'h2', 'Critical Care Medicine')

    expect(immune.compareDocumentPosition(ipf) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(ipf.compareDocumentPosition(critical) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('titles each pathway with an h4', () => {
    const { block } = renderBlock()
    expect(texts(block, 'h4')).toEqual(['Immune Activation Pathway', 'Anti Viral Pathway'])
  })

  it('lists five steps per pathway in an ordered list, in order', () => {
    const { block } = renderBlock()
    const lists = Array.from(block.querySelectorAll('ol'))

    expect(lists).toHaveLength(2)
    expect(lists.map((ol) => ol.querySelectorAll(':scope > li').length)).toEqual([5, 5])
    expect(texts(lists[0], ':scope > li > p:first-child')).toEqual([
      'IPF binds gp96',
      'The gp96–IPF complex engages CD91',
      'CD91–mediated internalization',
      'Antigen cross–presentation',
      'Th1 polarization and CTL activation',
    ])
    expect(texts(lists[1], ':scope > li > p:first-child')).toEqual([
      'IPF–6 binds HIV–1 envelope proteins',
      'IPF–6 binds the human CD4 receptor',
      'Steric and conformational interference',
      'Entry blockade',
      'γδ T–cell activation',
    ])
  })

  it('has no hyphen–minus or em dash in any visible text, and uses en dashes', () => {
    const { block } = renderBlock()
    const text = block.textContent ?? ''

    expect(text).not.toContain('-')
    expect(text).not.toContain('—')
    expect(text).toContain('–')
  })
})

describe('PathwaySection', () => {
  const step = (n: number) => ({ title: `Step ${n}`, detail: `Detail ${n}` })

  it('renders any number of pathways and steps', () => {
    const container = render(
      <PathwaySection
        title="Title"
        intro="Intro"
        pathways={[
          { label: 'One', title: 'First', components: 'c1', steps: [step(1)] },
          { label: 'Two', title: 'Second', components: 'c2', steps: [step(1), step(2), step(3)] },
          { label: 'Three', title: 'Third', components: 'c3', steps: [] },
        ]}
      />,
    )

    expect(container.querySelector('h3')?.textContent).toBe('Title')
    expect(texts(container, 'h4')).toEqual(['First', 'Second', 'Third'])
    expect(
      Array.from(container.querySelectorAll('ol')).map((ol) => ol.querySelectorAll('li').length),
    ).toEqual([1, 3, 0])
  })

  it('renders no list at all for no pathways', () => {
    const container = render(<PathwaySection title="Title" intro="Intro" pathways={[]} />)

    expect(container.querySelector('h3')?.textContent).toBe('Title')
    expect(container.querySelector('ul')).toBeNull()
    expect(container.querySelector('h4')).toBeNull()
  })

  it('renders nothing in place of an omitted eyebrow', () => {
    const without = render(<PathwaySection title="Title" intro="Intro" pathways={[]} />)
    expect(without.querySelector('h3')?.previousElementSibling).toBeNull()
    expect(without.textContent).toBe('TitleIntro')

    const withEyebrow = render(
      <PathwaySection eyebrow="Eyebrow" title="Title" intro="Intro" pathways={[]} />,
    )
    expect(withEyebrow.textContent).toBe('EyebrowTitleIntro')
  })
})

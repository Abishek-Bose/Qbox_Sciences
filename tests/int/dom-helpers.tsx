import React, { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { vi } from 'vitest'

/**
 * Minimal render helpers on react-dom + act. `@testing-library/react` is
 * installed, but its `@testing-library/dom` peer is not, so it cannot load.
 */

const actGlobal = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
actGlobal.IS_REACT_ACT_ENVIRONMENT = true

const mounted: { root: Root; container: HTMLElement }[] = []

export function render(ui: React.ReactElement): HTMLElement {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  act(() => root.render(ui))
  mounted.push({ root, container })
  return container
}

export function cleanup() {
  for (const { root, container } of mounted.splice(0)) {
    act(() => root.unmount())
    container.remove()
  }
  document.body.style.overflow = ''
}

export function click(element: Element) {
  act(() => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
  })
}

export function keyDown(key: string, init: KeyboardEventInit = {}, target: EventTarget = document) {
  act(() => {
    target.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }),
    )
  })
}

/** framer-motion (via Reveal) needs these; jsdom has neither. */
export function stubBrowserApis() {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', IO)
  vi.stubGlobal(
    'matchMedia',
    (query: string) =>
      ({
        matches: false,
        media: query,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  )
}

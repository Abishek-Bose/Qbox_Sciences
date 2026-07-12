'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import React from 'react'

type Element = 'div' | 'li' | 'section' | 'span' | 'p'

export type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Seconds to wait before starting. Use to stagger siblings. */
  delay?: number
  /** Distance travelled, in px. Negative moves down. */
  y?: number
  /** Play immediately on mount rather than on scroll — for above-the-fold content. */
  immediate?: boolean
  /** The rendered tag. `li` matters: wrapping a list item in a div breaks the list. */
  as?: Element
}

/**
 * The single animation primitive for the site.
 *
 * It is the only thing that carries `'use client'`. Sections stay server
 * components and simply wrap their content in this, so the markup itself is
 * still server-rendered — only the ~1kb of animation logic ships to the browser.
 *
 * Every reveal is `once: true`. Content that re-animates each time it scrolls
 * back into view is nauseating on a long marketing page.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 24,
  immediate = false,
  as = 'div',
}) => {
  const prefersReducedMotion = useReducedMotion()

  // Honour the OS setting: fade only, no travel. Never suppress the animation
  // entirely — the element must still end up visible.
  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y }
  const shown = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  const variants: Variants = { hidden, shown }

  const Component = motion[as]

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      {...(immediate
        ? { animate: 'shown' }
        : {
            whileInView: 'shown',
            viewport: { once: true, amount: 0.15, margin: '0px 0px -60px' },
          })}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  )
}

export default Reveal

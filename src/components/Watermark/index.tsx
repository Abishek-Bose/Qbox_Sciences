import React from 'react'

export type WatermarkSide = 'left' | 'right'

export type WatermarkProps = {
  /** Which edge it hangs off. Pages alternate these to give the scroll a rhythm. */
  side?: WatermarkSide
  /** `top` hangs it off the section's top edge (heroes); `center` pins it mid-section. */
  position?: 'top' | 'center'
  /** Dark bands swallow the mark, so they get a little more opacity. */
  tone?: 'light' | 'dark'
}

/**
 * The Q motive as an ambient background mark.
 *
 * Painted as a CSS background rather than next/image on purpose: the optimizer
 * rejects SVG unless you enable `dangerouslyAllowSVG`, and that flag is not
 * worth turning on for decoration.
 *
 * Decoration only — aria-hidden, non-interactive, and never a contrast hazard:
 * the opacity is low enough that body copy passing over it keeps its ratio.
 *
 * The parent section MUST be `relative overflow-hidden`. The mark is deliberately
 * wider than its column and bleeds past the edge; without `overflow-hidden` that
 * bleed becomes horizontal page scroll.
 */
export const Watermark: React.FC<WatermarkProps> = ({
  side = 'right',
  position = 'center',
  tone = 'light',
}) => {
  const sideClass = side === 'right' ? '-right-40' : '-left-40'
  const positionClass = position === 'top' ? '-top-32' : 'top-1/2 -translate-y-1/2'
  const opacityClass = tone === 'dark' ? 'opacity-[0.12]' : 'opacity-[0.16]'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden size-184 select-none bg-[url('/images/q-motive.svg')] bg-contain bg-no-repeat lg:block ${sideClass} ${positionClass} ${opacityClass}`}
    />
  )
}

export default Watermark

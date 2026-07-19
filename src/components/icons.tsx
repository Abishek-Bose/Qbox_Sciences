import React from 'react'

/**
 * Shared line icons. All are 24x24, stroke-based, and painted with
 * `currentColor` so the consuming component controls size and colour via
 * `className` rather than each icon hardcoding its own.
 */

type IconProps = {
  className?: string
}

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const ResearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <rect x="6" y="9" width="4.5" height="4" rx="1" />
    <path d="M14 9.5h4M14 13h4M6.5 16h11" />
  </svg>
)

export const IntegrityIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M10.5 4.5 13 3l2 3.5-2.5 1.5z" />
    <path d="m12.5 8-3 5.5a4.5 4.5 0 0 0 4 6.5" />
    <path d="M9 12.5 6.5 17" />
    <path d="M5 21h14" />
    <path d="M13.5 21a5 5 0 0 0 5-5" />
  </svg>
)

export const NetworkIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="3.8" ry="9" />
    <path d="M3.2 9.5h17.6M3.2 14.5h17.6" />
  </svg>
)

export const DocumentIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5z" />
    <path d="M14 3v4.5h4.5" />
  </svg>
)

export const AnimationIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
    <path d="M10 12.5v3.5l3.5-1.75z" />
  </svg>
)

export const ChartIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="M8 20v-6M13 20V8M18 20v-9" />
  </svg>
)

export const WebinarIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4" />
    <path d="M5 5a10 10 0 0 0 0 14M19 19a10 10 0 0 0 0-14" />
  </svg>
)

export const FlaskIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M9 3h6M10 3v6.2a2 2 0 0 1-.3 1L5.5 17a2.5 2.5 0 0 0 2.1 3.9h8.8a2.5 2.5 0 0 0 2.1-3.9l-4.2-6.8a2 2 0 0 1-.3-1V3" />
  </svg>
)

export const SparkIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
  </svg>
)

export const LeafIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M4 20c0-8 6-14 16-14 0 10-6 14-12 14H4Z" />
    <path d="M4 20c4-6 8-9 12-10.5" />
  </svg>
)

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" />
  </svg>
)

export const MonitorIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M6 11h2.5l1.5-2.5L12 14l1.5-3h4.5" />
    <path d="M9 21h6M12 17v4" />
  </svg>
)

export const DropletIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3.5c3.4 3.4 5.5 6 5.5 9a5.5 5.5 0 0 1-11 0c0-3 2.1-5.6 5.5-9Z" />
    <path d="M9.5 14.5a2.8 2.8 0 0 0 2.5 2.3" />
  </svg>
)

export const InnovationIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.6l.1.6h5.2l.1-.6c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
  </svg>
)

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M12 3v12" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4 20h16" />
  </svg>
)

/**
 * The triangle's centroid sits at x≈12 so the glyph is optically centred inside
 * its own box — no `ml-` nudge needed at the call site.
 */
export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M8.4 5.9v12.2a1.1 1.1 0 0 0 1.68.94l9.6-6.1a1.1 1.1 0 0 0 0-1.88l-9.6-6.1a1.1 1.1 0 0 0-1.68.94Z" />
  </svg>
)

export const PdfIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5z" />
    <path d="M14 3v4.5h4.5" />
    <path d="M8.5 16.5h7" />
  </svg>
)

export const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </svg>
)

export const EyeIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M2.6 12S6.4 5.8 12 5.8 21.4 12 21.4 12 17.6 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="3.1" />
  </svg>
)

export const TargetIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.8" />
    <circle cx="12" cy="12" r="1.4" />
  </svg>
)

/**
 * Outlined rather than YouTube's solid brand mark: it sits beside `MailIcon` in
 * the footer, and a filled glyph next to a stroked one reads as a weight error.
 */
export const YouTubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...base} className={className}>
    <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
)

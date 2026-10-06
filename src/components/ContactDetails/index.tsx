import React from 'react'

import { MailIcon, MapPinIcon } from '@/components/icons'
import { Reveal } from '@/components/motion/Reveal'
import { Watermark } from '@/components/Watermark'

export type ContactDetailsProps = {
  name: string
  email: string
  officeLabel: string
  addressLines: readonly string[]
}

const linkClass =
  'font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:text-brand hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'

/** Company name, head office address and email. Details only, no form. */
export const ContactDetails: React.FC<ContactDetailsProps> = ({
  name,
  email,
  officeLabel,
  addressLines,
}) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    [name, ...addressLines].join(' '),
  )}`

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-24">
      <Watermark side="left" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight text-navy">{name}</h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-card border border-hairline bg-white p-8 shadow-lg shadow-navy/5">
            <span className="inline-flex size-11 items-center justify-center rounded-card bg-brand/10 text-navy">
              <MapPinIcon className="size-5" />
            </span>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-accent">
              {officeLabel}
            </h3>
            <address className="mt-3 text-xl not-italic leading-relaxed text-ink-muted">
              {addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-block ${linkClass}`}
            >
              View on Google Maps
            </a>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-card border border-hairline bg-white p-8 shadow-lg shadow-navy/5"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-card bg-brand/10 text-navy">
              <MailIcon className="size-5" />
            </span>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Email
            </h3>
            <a
              href={`mailto:${email}`}
              className={`mt-3 inline-block break-all text-xl ${linkClass}`}
            >
              {email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ContactDetails

import React from 'react'

import { CareersApply } from '@/components/CareersApply'
import { IntegrityIcon } from '@/components/icons'
import { PageHero } from '@/components/PageHero'

export const metadata = {
  title: 'Careers — Qbox Sciences',
  description:
    'Build a meaningful career in the pharmaceutical and healthcare industry with Qbox Sciences.',
}

/** Also the address in the Footer — applications and enquiries share an inbox. */
const CAREERS_EMAIL = 'qboxsciences@gmail.com'

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Our Team"
        eyebrowIcon={<IntegrityIcon className="size-3.5" />}
        title="Careers"
        description="At Qbox Sciences, our greatest strength lies in the passion, talent, and dedication of our people. We are committed to providing a positive and knowledge-driven environment that supports both personal and professional growth."
        image={{
          src: '/images/career/team.png',
          alt: 'Three researchers in white lab coats leaning over a bench, discussing notes beside a rack of test tubes',
        }}
        // Padded white matte, as on Therapy Areas — every interior hero frames
        // its photo the same way.
        frame="matte"
        aspect="wide"
        primaryCta={{ label: 'Send Your Resume', href: '#apply' }}
      />

      <div id="apply">
        <CareersApply
          title="Work With Us"
          paragraphs={[
            'If you are looking to build a meaningful career in the pharmaceutical and healthcare industry, we would love to hear from you.',
          ]}
          emailLabel="Send your resume to"
          email={CAREERS_EMAIL}
          note="Our team will connect with you whenever a suitable opportunity matching your profile becomes available."
        />
      </div>
    </>
  )
}

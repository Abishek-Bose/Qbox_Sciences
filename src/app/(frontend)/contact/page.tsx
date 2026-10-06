import React from 'react'

import { ContactDetails } from '@/components/ContactDetails'
import { PageHeader } from '@/components/PageHeader'
import { COMPANY } from '@/lib/site'

export const metadata = {
  title: 'Contact Us – Qbox Sciences',
  description:
    'Contact Qbox Sciences for product, partnership and general enquiries. Find our head office address and email.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Reach the Qbox Sciences team for product, partnership and general enquiries."
      />
      <ContactDetails
        name={COMPANY.name}
        email={COMPANY.email}
        officeLabel={COMPANY.office.label}
        addressLines={COMPANY.office.lines}
      />
    </>
  )
}

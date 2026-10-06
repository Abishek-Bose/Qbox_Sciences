import React from 'react'

import { DropletIcon, FlaskIcon, LeafIcon, MonitorIcon, SparkIcon } from '@/components/icons'
import { PageHero } from '@/components/PageHero'
import { TherapySection } from '@/components/TherapySection'
import { viewerHref } from '@/lib/site'

export const metadata = {
  title: 'Therapy Areas Qbox Sciences',
  description:
    'A broad portfolio of essential sterile injectables and critical care antibiotics, focused on India’s most pressing ICU challenges.',
}

export default function TherapyAreasPage() {
  return (
    <>
      <PageHero
        tinted
        eyebrow="Medical Innovation"
        title="Critical Care."
        description={[
          'At Qbox, our Critical Care portfolio is strategically focused on addressing India’s most pressing ICU challenges, including sepsis, trauma and acute organ failure. Our assets are being developed specifically for the realities of Indian healthcare, combining clinical efficiency with affordability and accessibility.',
          'We deal in a broad portfolio of essential sterile injectables and critical care antibiotics.',
        ]}
        image={{
          src: '/images/therapy_areas/vial_drop.png',
          alt: 'A glass pipette resting across a sealed vial and an open ampoule on a dark surface',
        }}
      />

      {/* The mark alternates down the page: hero right, then left, right, left. */}
      <TherapySection
        watermark="left"
        icon={<FlaskIcon className="size-5" />}
        title="Immune Modulation"
        body="Our Immune Modulation portfolio is focused on restoring balance to the body’s immune response through science driven therapies. From critical care to chronic inflammatory conditions, we aim to support clinicians with advanced solutions that help regulate immune activity, reduce excessive inflammation, and improve patient outcomes. By combining innovation, precision, and clinical relevance, we strive to address complex immune related challenges across diverse therapeutic areas."
        bullets={[
          'IPF (Irreversible Pepsinogen Fragment) Technology.',
          'Adaptive immune response stabilization.',
        ]}
        cards={[
          {
            title: 'Mechanism of Action',
            // Two pathways, one per line — the card body honours the line break.
            body: 'Immune Activation Pathway\nAnti Viral Pathway',
          },
          {
            title: 'Patient Profiles',
            body: 'Adult and geriatric populations presenting with dysregulated immune signaling.',
          },
        ]}
        action={{
          label: 'IPF Platform Technology',
          href: viewerHref('/documents/enzomune-ipf-mode-of-action.pptx'),
        }}
        // Cards sit above the image in this section, mirroring the layout below it.
        cardsFirst
        media={{
          src: '/images/therapy_areas/custer.png',
          alt: 'An abstract visualisation of a glowing, densely connected cellular network',
        }}
      />

      <TherapySection
        watermark="right"
        tinted
        mediaSide="left"
        cardsWithCopy
        icon={<SparkIcon className="size-5" />}
        title="Critical Care Medicine"
        media={{
          src: '/images/therapy_areas/therapy_room.png',
          alt: 'An intensive care room with a bed surrounded by monitoring and ventilation equipment',
          overlay: {
            eyebrow: 'Intensive Care Solutions',
            title: 'Acute Organ Support',
            body: 'Advanced pharmacotherapy designed for bedside intervention in sepsis and cardiovascular collapse.',
          },
        }}
        cards={[
          {
            icon: <MonitorIcon className="size-5" />,
            title: 'Hemodynamic Stability',
            body: 'Rapid acting formulations to manage vascular tone in critical scenarios.',
          },
          {
            icon: <DropletIcon className="size-5" />,
            title: 'Respiratory Support',
            body: 'Small molecule solutions for improving oxygenation efficiency.',
          },
        ]}
        quote={{
          text: 'Medicine is learned by the bedside and not in the classroom.',
          // Attribution checked: the line is Sir William Osler's.
          author: 'Sir William Osler',
        }}
      />

      {/* Bands: wash hero, white Immune Modulation, wash Critical Care, white Wellness. */}
      <TherapySection
        watermark="left"
        icon={<LeafIcon className="size-5" />}
        title="Wellness"
        body="We envision a future where wellness is an integral part of healthcare, not an afterthought. At Qbox Sciences, we curate innovative, science driven solutions that help individuals optimize health, enhance resilience, and improve quality of life. By bridging global research with practical healthcare needs, we strive to empower healthier living across every stage of the wellness journey."
        cardsFirst
        media={{
          src: '/images/therapy_areas/capsul.png',
          alt: 'Softgel capsules spilling from a glass bottle beside fresh green leaves and dried botanicals',
        }}
      />
    </>
  )
}

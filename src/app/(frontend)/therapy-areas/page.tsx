import React from 'react'

import {
  DropletIcon,
  FlaskIcon,
  LeafIcon,
  MonitorIcon,
  SparkIcon,
} from '@/components/icons'
import { PageHero } from '@/components/PageHero'
import { TherapySection } from '@/components/TherapySection'

export const metadata = {
  title: 'Therapy Areas — Qbox Sciences',
  description:
    'Advancing life-saving pharmaceutical solutions through rigorous scientific inquiry and clinical excellence.',
}

export default function TherapyAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Medical Innovation"
        title="Therapy Areas — Focusing on Critical Care."
        description="Advancing life-saving pharmaceutical solutions through rigorous scientific inquiry and clinical excellence. We focus on areas with high unmet medical needs."
        image={{
          src: '/images/therapy_areas/vial_drop.png',
          alt: 'A glass pipette resting across a sealed vial and an open ampoule on a dark surface',
        }}
      />

      <TherapySection
        icon={<FlaskIcon className="size-5" />}
        title="Immune Modulation"
        body="Immune modulation is a key therapeutic focus for us. We are building a science-led portfolio of pharmaceuticals and evidence-backed natural bioactives that help restore immune balance, supporting better patient outcomes across a wide range of acute and chronic conditions."
        bullets={[
          'Cytokine Storm Suppression (CSS) technology.',
          'Adaptive immune response stabilization.',
          'Clinical Phase III pathway for Auto-Immune Responders.',
        ]}
        cards={[
          {
            title: 'Mechanism of Action',
            body: 'Selective inhibition of pro-inflammatory enzymes without compromising the global immune landscape.',
          },
          {
            title: 'Patient Profiles',
            body: 'Adult and geriatric populations presenting with dysregulated immune signaling.',
          },
        ]}
        // Cards sit above the image in this section, mirroring the layout below it.
        cardsFirst
        media={{
          src: '/images/therapy_areas/custer.png',
          alt: 'An abstract visualisation of a glowing, densely connected cellular network',
        }}
      />

      <TherapySection
        tinted
        mediaSide="left"
        icon={<SparkIcon className="size-5" />}
        title="Critical Care Medicine"
        body="Our critical care portfolio is built on the highest standards of quality, scientific rigor, and manufacturing excellence. Every product is designed to deliver dependable performance in the moments when patients need it most. With an unwavering commitment to clinical reliability and patient safety, we strive to be a trusted partner to healthcare professionals in the most demanding care environments."
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
            body: 'Rapid-acting formulations to manage vascular tone in critical scenarios.',
          },
          {
            icon: <DropletIcon className="size-5" />,
            title: 'Respiratory Support',
            body: 'Small-molecule solutions for improving oxygenation efficiency.',
          },
        ]}
        quote={{
          text: 'In critical care, every second of therapeutic delay increases risk. Our goal is to eliminate that delay through superior pharmacokinetics.',
          author: 'Dr. A. Sterling, Chief Scientific Officer',
        }}
        link={{ label: 'Download Pipeline Data', href: '/resources' }}
      />

      {/* Same layout as Immune Modulation: copy left, cards above a plain
          (un-overlaid) image on the right. */}
      <TherapySection
        icon={<LeafIcon className="size-5" />}
        title="Wellness"
        body="We are building a science-backed wellness portfolio that combines clinically validated nutraceuticals with the power of nature to support preventive health and long-term well-being. Our focus is on evidence-based formulations that help people live healthier, stronger, and more resilient lives."
        cardsFirst
        media={{
          src: '/images/therapy_areas/capsul.png',
          alt: 'Softgel capsules spilling from a glass bottle beside fresh green leaves and dried botanicals',
        }}
      />
    </>
  )
}

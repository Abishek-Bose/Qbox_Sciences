import React from 'react'

import { DropletIcon, FlaskIcon, LeafIcon, MonitorIcon, SparkIcon } from '@/components/icons'
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

      {/* The mark alternates down the page: hero right, then left, right, left. */}
      <TherapySection
        watermark="left"
        icon={<FlaskIcon className="size-5" />}
        title="Immune Modulation"
        body="Our Immune Modulation portfolio is focused on restoring balance to the body’s immune response through science-driven therapies. From critical care to chronic inflammatory conditions, we aim to support clinicians with advanced solutions that help regulate immune activity, reduce excessive inflammation, and improve patient outcomes. By combining innovation, precision, and clinical relevance, we strive to address complex immune-related challenges across diverse therapeutic areas."
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
        watermark="right"
        tinted
        mediaSide="left"
        icon={<SparkIcon className="size-5" />}
        title="Critical Care Medicine"
        body="Our Critical Care portfolio is dedicated to supporting healthcare professionals in managing life-threatening and complex medical conditions with confidence and precision. We focus on delivering high-quality, evidence-based therapies for intensive care settings, addressing key areas such as severe infections, respiratory support, sedation, emergency care, and organ support. Through innovation and reliability, we aim to improve outcomes when every moment matters."
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
        watermark="left"
        icon={<LeafIcon className="size-5" />}
        title="Wellness"
        body="We envision a future where wellness is an integral part of healthcare, not an afterthought. At Qbox Sciences, we curate innovative, science-driven solutions that help individuals optimize health, enhance resilience, and improve quality of life. By bridging global research with practical healthcare needs, we strive to empower healthier living across every stage of the wellness journey."
        cardsFirst
        media={{
          src: '/images/therapy_areas/capsul.png',
          alt: 'Softgel capsules spilling from a glass bottle beside fresh green leaves and dried botanicals',
        }}
      />
    </>
  )
}

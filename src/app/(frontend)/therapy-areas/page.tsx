import React from 'react'

import { DropletIcon, FlaskIcon, LeafIcon, MonitorIcon, SparkIcon } from '@/components/icons'
import { PageHero } from '@/components/PageHero'
import { PathwaySection } from '@/components/PathwaySection'
import { TherapySection } from '@/components/TherapySection'

export const metadata = {
  title: 'Therapy Areas – Qbox Sciences',
  description:
    'A broad portfolio of essential sterile injectables and critical care antibiotics, focused on India’s most pressing ICU challenges.',
}

export default function TherapyAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Medical Innovation"
        title="Therapy Areas – Critical Care."
        description={[
          'At Qbox, our Critical Care portfolio is strategically focused on addressing India’s most pressing ICU challenges, including sepsis, trauma and acute organ failure. Our assets are being developed specifically for the realities of Indian healthcare, combining clinical efficiency with affordability and accessibility.',
          'We deal in a broad portfolio of essential sterile injectables and critical care antibiotics.',
        ]}
        image={{
          src: '/images/therapy_areas/vial_drop.png',
          alt: 'A glass pipette resting across a sealed vial and an open ampoule on a dark surface',
        }}
      />

      {/* The mark alternates down the page: hero right, then left, right, right, left —
          the IPF block repeats the side of the tinted section after it, which the
          background change keeps apart. */}
      <TherapySection
        watermark="left"
        icon={<FlaskIcon className="size-5" />}
        title="Immune Modulation"
        body="Our Immune Modulation portfolio is focused on restoring balance to the body’s immune response through science–driven therapies. From critical care to chronic inflammatory conditions, we aim to support clinicians with advanced solutions that help regulate immune activity, reduce excessive inflammation, and improve patient outcomes. By combining innovation, precision, and clinical relevance, we strive to address complex immune–related challenges across diverse therapeutic areas."
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
        // Cards sit above the image in this section, mirroring the layout below it.
        cardsFirst
        media={{
          src: '/images/therapy_areas/custer.png',
          alt: 'An abstract visualisation of a glowing, densely connected cellular network',
        }}
      />

      <PathwaySection
        watermark="right"
        eyebrow="Immune Modulation"
        title="IPF Platform Technology"
        intro="IPF – irreversibly inactivated pepsin fragments – are derived from porcine pepsinogen through irreversible inactivation at a controlled pH of 6.2 to 6.8. The process eliminates proteolytic activity while preserving the immunomodulatory structure. A single molecular scaffold supports two distinct mechanisms of action."
        pathways={[
          {
            label: 'Pathway A',
            title: 'Immune Activation Pathway',
            components: 'IPF–1 to IPF–5 · ~45 kDa fragments',
            steps: [
              {
                title: 'IPF binds gp96',
                detail: 'A 96 kDa heat shock glycoprotein resident in the endoplasmic reticulum.',
              },
              {
                title: 'The gp96–IPF complex engages CD91',
                detail: 'A receptor on dendritic cells and macrophages.',
              },
              {
                title: 'CD91–mediated internalization',
                detail: 'Triggers dendritic cell maturation and cytokine release.',
              },
              {
                title: 'Antigen cross–presentation',
                detail: 'gp96 chaperones peptides into the MHC class I pathway.',
              },
              {
                title: 'Th1 polarization and CTL activation',
                detail: 'Activates CD8+ cytotoxic T–cells.',
              },
            ],
          },
          {
            label: 'Pathway B',
            title: 'Anti Viral Pathway',
            components: 'IPF–6 · 14–mer peptide',
            steps: [
              {
                title: 'IPF–6 binds HIV–1 envelope proteins',
                detail: 'gp41 and the surface glycoprotein gp120.',
              },
              {
                title: 'IPF–6 binds the human CD4 receptor',
                detail: 'The primary HIV receptor on T–helper cells.',
              },
              {
                title: 'Steric and conformational interference',
                detail: 'Prevents gp120–CD4 engagement and gp41–mediated membrane fusion.',
              },
              {
                title: 'Entry blockade',
                detail: 'With membrane fusion prevented, the virus cannot enter host cells.',
              },
              {
                title: 'γδ T–cell activation',
                detail: 'The IPF–6–gp41 complex triggers non–conventional immune recognition.',
              },
            ],
          },
        ]}
      />

      <TherapySection
        watermark="right"
        tinted
        mediaSide="left"
        icon={<SparkIcon className="size-5" />}
        title="Critical Care Medicine"
        body="Our Critical Care portfolio is dedicated to supporting healthcare professionals in managing life–threatening and complex medical conditions with confidence and precision. We focus on delivering high–quality, evidence–based therapies for intensive care settings, addressing key areas such as severe infections, respiratory support, sedation, emergency care, and organ support. Through innovation and reliability, we aim to improve outcomes when every moment matters."
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
            body: 'Rapid–acting formulations to manage vascular tone in critical scenarios.',
          },
          {
            icon: <DropletIcon className="size-5" />,
            title: 'Respiratory Support',
            body: 'Small–molecule solutions for improving oxygenation efficiency.',
          },
        ]}
        quote={{
          text: 'Medicine is learned by the bedside and not in the classroom.',
          // Attribution checked: the line is Sir William Osler's.
          author: 'Sir William Osler',
        }}
      />

      {/* Same layout as Immune Modulation: copy left, cards above a plain
          (un-overlaid) image on the right. */}
      <TherapySection
        watermark="left"
        icon={<LeafIcon className="size-5" />}
        title="Wellness"
        body="We envision a future where wellness is an integral part of healthcare, not an afterthought. At Qbox Sciences, we curate innovative, science–driven solutions that help individuals optimize health, enhance resilience, and improve quality of life. By bridging global research with practical healthcare needs, we strive to empower healthier living across every stage of the wellness journey."
        cardsFirst
        media={{
          src: '/images/therapy_areas/capsul.png',
          alt: 'Softgel capsules spilling from a glass bottle beside fresh green leaves and dried botanicals',
        }}
      />
    </>
  )
}

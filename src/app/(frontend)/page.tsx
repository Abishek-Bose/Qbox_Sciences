import React from 'react'

import { AboutSection } from '@/components/AboutSection'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Hero } from '@/components/Hero'
import {
  DocumentIcon,
  EyeIcon,
  InnovationIcon,
  IntegrityIcon,
  TargetIcon,
} from '@/components/icons'
import './styles.css'

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Advancing Pharmaceutical Science"
        titleLead="Precision in"
        titleAccent="Critical Illness"
        description="Science that supports recovery. Solutions that restore well–being. Our commitment lies in developing transformative therapies for life–threatening conditions."
        image={{
          src: '/images/hero.png',
          alt: 'A nurse holding the hands of an older patient in a bright clinical room',
        }}
      />

      {/* The mark alternates down the page: hero right, then left, right. */}
      <FeatureGrid
        watermark="left"
        title="Science–Driven Philosophy"
        intro="Qbox Sciences stands at the intersection of biological innovation and clinical application. We believe that true medical progress is achieved through rigid empirical evidence and a deep understanding of cellular pathology."
        features={[
          {
            icon: <IntegrityIcon className="size-5" />,
            title: 'Clinical Integrity',
            body: 'Our unwavering commitment to place scientific evidence, patient outcomes, and ethical medical practice above commercial interests.',
          },
          {
            icon: <DocumentIcon className="size-5" />,
            title: 'Guideline–Driven Portfolio',
            body: 'Our portfolio is aligned with evidence–based clinical guidelines, empowering healthcare professionals with trusted therapies that support the highest standards of patient care.',
          },
          {
            icon: <InnovationIcon className="size-5" />,
            title: 'Responsible Innovation',
            body: 'We innovate with purpose, developing solutions that address real clinical needs while upholding the highest standards of safety and scientific integrity. Every innovation is guided by evidence, ensuring it delivers meaningful value to healthcare professionals and the patients they serve.',
          },
        ]}
      />

      <AboutSection
        watermark="right"
        title="About Us"
        paragraphs={[
          'Founded in 2026, Qbox Sciences Pvt. Ltd. was built on a singular vision – to advance healthcare through innovation, scientific thinking, and meaningful clinical collaboration.',
          'At Qbox Sciences, we believe that the future of healthcare lies in identifying real–world medical gaps and developing creative, outcome–driven solutions that truly make a difference in patient care. Backed by a passionate leadership team and a strong scientific foundation, we are committed to delivering high–quality pharmaceutical and healthcare solutions tailored to evolving clinical needs.',
          'Our integrated approach brings us closer to clinicians, healthcare professionals, and patients, enabling us to support therapies that contribute to better treatment outcomes and improved quality of life.',
          'Driven by integrity, innovation, and patient–centricity, we aspire to emerge as a trusted and leading force in the Indian pharmaceutical and healthcare industry.',
        ]}
        statements={[
          {
            icon: <EyeIcon className="size-5" />,
            title: 'Our Vision',
            body: 'To establish ourselves as the leading integrated hospital pharmaceutical company, converging diverse therapeutic verticals into a unified product ecosystem that addresses the full spectrum of institutional healthcare needs.',
          },
          {
            icon: <TargetIcon className="size-5" />,
            title: 'Our Mission',
            body: 'To build a hospital–focused pharmaceutical portfolio grounded in clinical guidelines and robust evidence, delivering best–in–class products that support physician decision–making and drive faster, deeper market penetration in institutional care settings.',
          },
        ]}
      />
    </>
  )
}

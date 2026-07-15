import React from 'react'

import { CalloutGrid } from '@/components/CalloutGrid'
import { FeatureGrid } from '@/components/FeatureGrid'
import { Hero } from '@/components/Hero'
import {
  AnimationIcon,
  ChartIcon,
  DocumentIcon,
  InnovationIcon,
  IntegrityIcon,
  WebinarIcon,
} from '@/components/icons'
import { SplitFeature } from '@/components/SplitFeature'
import './styles.css'

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Advancing Pharmaceutical Science"
        titleLead="Precision in"
        titleAccent="Critical Illness"
        description="Science that supports recovery. Solutions that restore well-being. Our commitment lies in developing transformative therapies for life-threatening conditions."
        primaryCta={{ label: 'Contact Us', href: '/contact' }}
        image={{
          src: '/images/hero.png',
          alt: 'A nurse holding the hands of an older patient in a bright clinical room',
        }}
      />

      <FeatureGrid
        title="Science-Driven Philosophy"
        intro="Qbox Sciences stands at the intersection of biological innovation and clinical application. We believe that true medical progress is achieved through rigid empirical evidence and a deep understanding of cellular pathology."
        features={[
          {
            icon: <IntegrityIcon className="size-5" />,
            title: 'Clinical Integrity',
            body: 'Our unwavering commitment to place scientific evidence, patient outcomes, and ethical medical practice above commercial interests.',
          },
          {
            icon: <DocumentIcon className="size-5" />,
            title: 'Guideline-Driven Portfolio',
            body: 'Our portfolio is aligned with evidence-based clinical guidelines, empowering healthcare professionals with trusted therapies that support the highest standards of patient care.',
          },
          {
            icon: <InnovationIcon className="size-5" />,
            title: 'Responsible Innovation',
            body: 'We innovate with purpose, developing solutions that address real clinical needs while upholding the highest standards of safety and scientific integrity. Every innovation is guided by evidence, ensuring it delivers meaningful value to healthcare professionals and the patients they serve.',
          },
        ]}
      />

      <SplitFeature
        title="Therapy Focus"
        items={[
          {
            title: 'Immune Modulation',
            body: 'Developing precision therapies that recalibrate the immune response during acute inflammatory storms, preventing organ failure and systemic collapse.',
          },
          {
            title: 'Critical Care Medicine',
            body: 'Targeting the unique metabolic and physiological needs of patients in intensive care environments through innovative drug delivery systems.',
          },
        ]}
        link={{ label: 'View Therapeutic Pipeline', href: '/pipeline' }}
        media={[
          { src: '/images/otroom.png', alt: 'An operating theatre prepared for a procedure' },
          { src: '/images/vial.png', alt: 'Backlit glass vials of an injectable therapy' },
        ]}
      />

      <CalloutGrid
        title="Scientific Resources for Professionals"
        description="Access our digital library of clinical white papers, mechanism of action videos, and latest trial data updates designed for healthcare professionals and researchers."
        primaryCta={{ label: 'Access Resource Portal', href: '/resources' }}
        secondaryCta={{ label: 'Request Medical Info', href: '/contact' }}
        cards={[
          {
            icon: <DocumentIcon className="size-5" />,
            title: 'Clinical Protocol v.4',
            body: 'A comprehensive guide to critical care integration.',
            href: '/resources/clinical-protocol',
          },
          {
            icon: <AnimationIcon className="size-5" />,
            title: 'MOA Animation',
            body: 'Visualizing molecular pathway modulation.',
            href: '/resources/moa-animation',
          },
          {
            icon: <ChartIcon className="size-5" />,
            title: 'Q3 Trial Data',
            body: 'Preliminary results of immune-mod therapy.',
            href: '/resources/q3-trial-data',
          },
          {
            icon: <WebinarIcon className="size-5" />,
            title: 'Webinar Series',
            body: 'Expert discussions on critical illness science.',
            href: '/resources/webinars',
          },
        ]}
      />
    </>
  )
}

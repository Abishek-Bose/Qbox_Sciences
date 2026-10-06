import React from 'react'

import { CheckCircleIcon, DownloadIcon, PlayIcon } from '@/components/icons'
import { LiteratureGrid } from '@/components/LiteratureGrid'
import { PageHero } from '@/components/PageHero'
import { ProseIntro } from '@/components/ProseIntro'
import { WebinarSection } from '@/components/WebinarSection'

export const metadata = {
  title: 'Scientific Resources – Qbox Sciences',
  description:
    'Clinical evidence, peer–reviewed studies, and technical monographs for healthcare professionals.',
}

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="HCP Portal"
        eyebrowIcon={<CheckCircleIcon className="size-3.5" />}
        title="Scientific & Educational Resources"
        description="Access our comprehensive library of clinical evidence, peer–reviewed studies, and technical monographs designed to support healthcare professionals in evidence–based decision making."
        image={{
          src: '/images/scientific_resources/fliter_tube.png',
          alt: 'Backlit laboratory glassware – a separating funnel and graduated tubes on a lit stand',
        }}
        // Padded white matte, as on Therapy Areas — every interior hero frames
        // its photo the same way.
        frame="matte"
        aspect="wide"
        primaryCta={{
          label: 'Browse Library',
          href: '#latest-literature',
          icon: <DownloadIcon className="size-4" />,
        }}
        secondaryCta={{
          label: 'View Webinars',
          href: '#webinars',
          icon: <PlayIcon className="size-3.5" />,
        }}
      />

      {/* The mark alternates down the page: hero right, then left, right, left. */}
      <ProseIntro
        watermark="left"
        paragraphs={[
          'At Qbox Sciences Pvt. Ltd., we are dedicated to creating a comprehensive platform of scientific knowledge and healthcare innovation. Our resources are designed to support researchers, clinicians, academicians, students, and healthcare professionals across multiple scientific disciplines.',
          'To ensure quality and credibility, our content is curated from reputed academic institutions, peer–reviewed journals, and trusted scientific experts. Explore our platform to stay informed, enhance your expertise, and contribute to the advancement of healthcare and science.',
        ]}
      />

      {/* TODO: still the three placeholder items. They are replaced when the
          client's PDFs and articles arrive. */}
      <div id="latest-literature">
        <LiteratureGrid
          watermark="right"
          title="Latest Literature"
          subtitle="Recently published studies and clinical updates."
          link={{ label: 'View Archive', href: '/resources/archive' }}
          items={[
            {
              tag: 'Clinical Study',
              date: 'Oct 2023',
              title: 'Efficacy of Q–Block in Type 2 Diabetic Patients',
              body: 'A multicenter, double–blind, randomized controlled trial evaluating the metabolic impact of long–term therapy.',
              href: '/resources/q-block-type-2-diabetes.pdf',
            },
            {
              tag: 'Product Monograph',
              date: 'Aug 2023',
              title: 'NeuroCore Technical Specifications & Mechanism',
              body: 'Detailed molecular pathways and pharmacokinetic profile of NeuroCore targeted neuro–therapy.',
              href: '/resources/neurocore-monograph.pdf',
            },
            {
              tag: 'Literature',
              date: 'Nov 2023',
              title: 'Trends in Personalized Oncology: 2024 Report',
              body: 'A comprehensive review of emerging biomarkers and patient stratification strategies in modern oncology.',
              href: '/resources/personalized-oncology-2024.pdf',
            },
          ]}
        />
      </div>

      {/* The client's five picks. All are published by other organisations, so
          each carries its source channel as `meta` rather than implying Qbox
          produced it, and the titles are the publishers' own — hyphens included. */}
      <div id="webinars">
        <WebinarSection
          watermark="left"
          title="Expert Webinars & Insights"
          description="Watch leading medical experts discuss the latest therapeutic breakthroughs, clinical trial results, and future directions in biotechnology."
          feature={{
            title: 'Updates in Pulmonary and Critical Care Medicine for 2025',
            meta: 'CriticalCareMD',
            href: 'https://www.youtube.com/watch?v=ms0LVKiTmvY',
            image: {
              src: '/images/scientific_resources/youtube_frame.png',
              alt: 'A film camera and studio light facing a large screen showing clinical trial data',
            },
          }}
          webinars={[
            {
              title:
                'New Therapeutics in Lung Disease: The Age of Immunotherapy (Harvard Update 2025)',
              meta: 'Internal Lectures',
              href: 'https://www.youtube.com/watch?v=9wrdWMQrltU',
            },
            {
              title: 'What’s New and Different in the Surviving Sepsis Campaign 2026',
              meta: 'SCCM',
              href: 'https://www.youtube.com/watch?v=e7_RMaxyKwc',
            },
            {
              title: 'Critical Content: Pediatric Critical Care Medicine, July 2026',
              meta: 'SCCM',
              href: 'https://www.youtube.com/watch?v=kdRz2Aln9tk',
            },
            {
              title: 'SG-ANZICS 2019: Research in PICU: Why is it so difficult?',
              meta: 'SG ANZICS',
              href: 'https://www.youtube.com/watch?v=knfMaAIcGIk',
            },
          ]}
        />
      </div>
    </>
  )
}

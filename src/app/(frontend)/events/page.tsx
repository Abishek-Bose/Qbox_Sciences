import React from 'react'

import { AnnouncementList } from '@/components/AnnouncementList'
import { EventGallery } from '@/components/EventGallery'
import { PageHeader } from '@/components/PageHeader'
import { ANNOUNCEMENTS, EVENT_ALBUMS } from '@/content/events'

export const metadata = {
  title: 'Events Qbox Sciences',
  description: 'Photographs and announcements from Qbox Sciences events and scientific programmes.',
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title="Events"
        description="Photographs and announcements from Qbox Sciences events and scientific programmes."
      />
      <EventGallery title="Photo Gallery" albums={EVENT_ALBUMS} />
      <AnnouncementList title="Announcements" items={ANNOUNCEMENTS} />
    </>
  )
}

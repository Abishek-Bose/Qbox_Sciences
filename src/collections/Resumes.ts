import type { CollectionConfig } from 'payload'

import { RESUME_STORAGE_MIME_TYPES } from '@/lib/resume'

/**
 * CVs submitted through the careers form.
 *
 * Deliberately not stored in `media`: that collection is world-readable because
 * it backs the site's images, and a CV is personal data. Everything here is
 * closed by default and only opens to a signed-in staff user.
 */
export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    group: 'Careers',
    defaultColumns: ['filename', 'createdAt'],
  },
  access: {
    /*
     * All shut, including `create`. The careers form writes through the Local
     * API, which bypasses access control entirely, so the form still works
     * while the REST and GraphQL endpoints stay closed to the public. Opening
     * `create` here would expose an unauthenticated upload endpoint to the
     * whole internet — the form does not need it, so it stays shut.
     */
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    // Not `/media`: keeps CVs out of the directory that backs public images.
    staticDir: 'resumes',
    // Wider than the form's own list on purpose — see RESUME_STORAGE_MIME_TYPES
    // for why a legacy .doc has to be admitted as `application/x-cfb`.
    mimeTypes: [...RESUME_STORAGE_MIME_TYPES],
  },
  fields: [],
}

export default Resumes

import type { CollectionConfig } from 'payload'

/**
 * Speculative job applications from the careers form. The page invites people
 * to apply without a vacancy being open, so this is an inbox to triage rather
 * than a pipeline against specific roles — hence the flat `status`.
 */
export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    group: 'Careers',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'role', 'status', 'createdAt'],
  },
  access: {
    // Closed for the same reason as Resumes — the form writes via the Local
    // API, so the public REST/GraphQL endpoints never need to be open.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Role or area of interest',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resumes',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Applications

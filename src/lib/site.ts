/**
 * Company details shared by the Footer, the Contact page and Careers — kept in
 * one module so a change of address or inbox is a single edit. Like the
 * Navbar's NAV_LINKS, this is the place to edit until it moves into a Payload
 * global.
 *
 * Deliberately free of Payload and React imports so client components can take
 * it without dragging the CMS in with them.
 */
export const COMPANY = {
  name: 'Qbox Sciences Pvt. Ltd.',
  /** Enquiries and job applications share this inbox. */
  email: 'admin@qboxsciences.in',
  office: {
    label: 'Head Office',
    lines: ['232/59/62, MG Road,', 'Kolkata – 700104', 'West Bengal, India'],
  },
} as const

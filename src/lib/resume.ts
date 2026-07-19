/**
 * Constraints on an uploaded CV, shared by the three places that must agree:
 * the browser's file picker, the server action that validates the upload, and
 * the Payload collection that stores it.
 *
 * Deliberately free of Payload and React imports so the client bundle can take
 * these without dragging the CMS in with them.
 */

export const RESUME_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const

/**
 * What the Payload collection must allow, which is not the same list.
 *
 * Payload identifies an upload by sniffing its bytes, not by the type the
 * browser claims. A pre-2007 .doc is a generic Compound File Binary container
 * and sniffs as `application/x-cfb` — so without this entry a .doc is accepted
 * by the form, accepted by the server action, and then rejected deep inside the
 * create call, surfacing to the applicant as an unexplained failure.
 *
 * `x-cfb` also covers .xls and .msi. What keeps those out is `isAllowedResume`
 * below, which the action applies first and which admits only these three
 * extensions.
 */
export const RESUME_STORAGE_MIME_TYPES = [...RESUME_MIME_TYPES, 'application/x-cfb']

/** Extensions matching the types above, for the file picker's `accept`. */
export const RESUME_ACCEPT = '.pdf,.doc,.docx'

export const RESUME_MAX_BYTES = 5 * 1024 * 1024

export const RESUME_MAX_LABEL = '5 MB'

/**
 * Browsers are inconsistent about the MIME type they report for .doc/.docx —
 * some send `application/octet-stream` — so the extension is checked too and
 * either one passing is enough. The size cap is the real guard here.
 */
export const isAllowedResume = (file: { name: string; type: string }): boolean => {
  const byMimeType = (RESUME_MIME_TYPES as readonly string[]).includes(file.type)
  const byExtension = /\.(pdf|docx?)$/i.test(file.name)

  return byMimeType || byExtension
}

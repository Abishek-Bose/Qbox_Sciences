'use server'

import config from '@payload-config'
import { getPayload } from 'payload'

import { isAllowedResume, RESUME_MAX_BYTES, RESUME_MAX_LABEL } from '@/lib/resume'

export type ApplyFieldError = 'fullName' | 'email' | 'resume'

export type ApplyState = {
  status: 'idle' | 'success' | 'error'
  /** Shown above the form when the whole submission failed. */
  message?: string
  fieldErrors?: Partial<Record<ApplyFieldError, string>>
}

export const APPLY_INITIAL_STATE: ApplyState = { status: 'idle' }

/**
 * Caps on the free-text fields. The database columns are unbounded, so without
 * these a single request could write megabytes of text per field.
 */
const MAX_LENGTHS = {
  fullName: 120,
  email: 200,
  phone: 40,
  role: 160,
  message: 4000,
} as const

// Deliberately loose. Strict email regexes reject valid addresses; the address
// only has to be plausible here, since a reply is what really proves it.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const readText = (formData: FormData, key: string): string => {
  const value = formData.get(key)

  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Receives the careers form.
 *
 * Everything here is re-checked server-side even though the form checks it too:
 * the client validation is a courtesy to the applicant, and this is the part
 * that is actually load-bearing.
 */
export async function submitApplication(
  _prevState: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // Honeypot: a field positioned off-screen and hidden from assistive tech, so
  // a human never fills it and a naive bot fills everything. Answer with the
  // success state rather than an error — telling a bot it was detected only
  // helps it try again differently.
  if (readText(formData, 'company')) {
    return { status: 'success' }
  }

  const fullName = readText(formData, 'fullName')
  const email = readText(formData, 'email')
  const phone = readText(formData, 'phone')
  const role = readText(formData, 'role')
  const message = readText(formData, 'message')
  const resume = formData.get('resume')

  const fieldErrors: ApplyState['fieldErrors'] = {}

  if (!fullName) {
    fieldErrors.fullName = 'Please enter your name.'
  } else if (fullName.length > MAX_LENGTHS.fullName) {
    fieldErrors.fullName = `Please keep this under ${MAX_LENGTHS.fullName} characters.`
  }

  if (!email) {
    fieldErrors.email = 'Please enter your email address.'
  } else if (email.length > MAX_LENGTHS.email || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.'
  }

  // `instanceof File` also rejects the empty-string value a browser sends for
  // an untouched file input.
  if (!(resume instanceof File) || resume.size === 0) {
    fieldErrors.resume = 'Please attach your resume.'
  } else if (resume.size > RESUME_MAX_BYTES) {
    fieldErrors.resume = `That file is larger than ${RESUME_MAX_LABEL}.`
  } else if (!isAllowedResume(resume)) {
    fieldErrors.resume = 'Please attach a PDF or Word document.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors }
  }

  const file = resume as File

  try {
    const payload = await getPayload({ config })

    // Local API, so this bypasses the collections' access control by design —
    // which is what lets both collections stay closed to the public API.
    const storedResume = await payload.create({
      collection: 'resumes',
      data: {},
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    try {
      await payload.create({
        collection: 'applications',
        data: {
          fullName,
          email,
          phone: phone.slice(0, MAX_LENGTHS.phone) || undefined,
          role: role.slice(0, MAX_LENGTHS.role) || undefined,
          message: message.slice(0, MAX_LENGTHS.message) || undefined,
          resume: storedResume.id,
        },
      })
    } catch (error) {
      // The two writes are separate transactions, so a failure here would
      // otherwise leave the uploaded file orphaned on disk with no record
      // pointing at it. Clean up before surfacing the failure.
      await payload.delete({ collection: 'resumes', id: storedResume.id }).catch(() => {})
      throw error
    }

    return { status: 'success' }
  } catch (error) {
    // Logged rather than returned: the reason a write failed is for us, not
    // for whoever is filling in the form.
    console.error('Careers application failed to save:', error)

    return {
      status: 'error',
      message: 'Something went wrong sending your application. Please try again, or email us.',
    }
  }
}

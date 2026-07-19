/**
 * @vitest-environment node
 *
 * Overrides the suite-wide jsdom default. This exercises a server action, and
 * jsdom's `File` has no `arrayBuffer()` — testing it there would fail against
 * a stub of the platform rather than the Node runtime the action really runs on.
 */

import { readFile } from 'fs/promises'
import path from 'path'
import { getPayload, Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { submitApplication } from '@/app/(frontend)/careers/actions'
import config from '@/payload.config'

const INITIAL = { status: 'idle' } as const

/**
 * A structurally valid PDF. Payload inspects the bytes rather than trusting the
 * declared type — it wants a `%PDF-` header plus an `xref` table and `%%EOF` in
 * the tail — so a token string here is rejected exactly as a renamed .exe is.
 */
const PDF_BYTES = [
  '%PDF-1.4',
  '1 0 obj',
  '<< /Type /Catalog >>',
  'endobj',
  'xref',
  '0 2',
  '0000000000 65535 f ',
  '0000000009 00000 n ',
  'trailer',
  '<< /Size 2 /Root 1 0 R >>',
  'startxref',
  '0',
  '%%EOF',
  '',
].join('\n')

const pdfFile = (name = 'resume.pdf') =>
  new File([Buffer.from(PDF_BYTES, 'latin1')], name, { type: 'application/pdf' })

const formDataFor = (overrides: Record<string, string | File> = {}) => {
  const formData = new FormData()

  formData.set('fullName', 'Priya Menon')
  formData.set('email', 'priya.menon@example.com')
  formData.set('phone', '+91 98765 43210')
  formData.set('role', 'Clinical Research Associate')
  formData.set('message', 'Five years in critical care trials.')
  formData.set('resume', pdfFile())

  for (const [key, value] of Object.entries(overrides)) {
    formData.set(key, value)
  }

  return formData
}

let payload: Payload
const createdApplicationIds: (number | string)[] = []

describe('careers application', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  // The action writes to the real database, so anything it created has to go
  // again — otherwise a test run leaves junk in the client's admin panel.
  afterAll(async () => {
    for (const id of createdApplicationIds) {
      const application = await payload.findByID({
        collection: 'applications',
        id,
        depth: 0,
      })

      await payload.delete({ collection: 'applications', id })

      if (application.resume) {
        await payload.delete({ collection: 'resumes', id: application.resume as number })
      }
    }
  })

  it('stores a valid application and its resume', async () => {
    const before = await payload.count({ collection: 'applications' })

    const result = await submitApplication(INITIAL, formDataFor())
    expect(result.status).toBe('success')

    const after = await payload.find({
      collection: 'applications',
      sort: '-createdAt',
      limit: 1,
      depth: 1,
    })

    expect(after.totalDocs).toBe(before.totalDocs + 1)

    const application = after.docs[0]
    createdApplicationIds.push(application.id)

    expect(application.fullName).toBe('Priya Menon')
    expect(application.email).toBe('priya.menon@example.com')
    expect(application.role).toBe('Clinical Research Associate')
    // Defaulted, not submitted — the form has no say over triage state.
    expect(application.status).toBe('new')

    // depth: 1 populates the upload, proving the file was stored and linked.
    const resume = application.resume as { filename?: string | null; mimeType?: string | null }
    expect(resume.filename).toMatch(/\.pdf$/)
    expect(resume.mimeType).toBe('application/pdf')
  })

  it('rejects a missing name, a bad email and a missing resume', async () => {
    const formData = formDataFor({ fullName: '', email: 'not-an-address' })
    formData.delete('resume')

    const result = await submitApplication(INITIAL, formData)

    expect(result.status).toBe('error')
    expect(result.fieldErrors?.fullName).toBeDefined()
    expect(result.fieldErrors?.email).toBeDefined()
    expect(result.fieldErrors?.resume).toBeDefined()
  })

  /**
   * The form's file picker offers .doc, and Payload sniffs the bytes rather
   * than trusting the declared type — so a legacy Word file has to be proven
   * to survive that check, not assumed to.
   */
  it('accepts a legacy .doc resume', async () => {
    // Compound File Binary header — what a real pre-2007 .doc starts with.
    const doc = new File(
      [
        Buffer.concat([
          Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
          Buffer.alloc(600),
        ]),
      ],
      'resume.doc',
      { type: 'application/msword' },
    )

    const result = await submitApplication(INITIAL, formDataFor({ resume: doc }))

    if (result.status === 'success') {
      const latest = await payload.find({
        collection: 'applications',
        sort: '-createdAt',
        limit: 1,
        depth: 0,
      })
      createdApplicationIds.push(latest.docs[0].id)
    }

    expect(result.status).toBe('success')
  })

  /** Same reasoning as .doc — a real OOXML package, so detection is genuine. */
  it('accepts a .docx resume', async () => {
    const bytes = await readFile(path.join(import.meta.dirname, '../fixtures/resume.docx'))
    const docx = new File([bytes], 'resume.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })

    const result = await submitApplication(INITIAL, formDataFor({ resume: docx }))

    if (result.status === 'success') {
      const latest = await payload.find({
        collection: 'applications',
        sort: '-createdAt',
        limit: 1,
        depth: 0,
      })
      createdApplicationIds.push(latest.docs[0].id)
    }

    expect(result.status).toBe('success')
  })

  it('rejects a resume that is not a document', async () => {
    const image = new File([Buffer.from('binary')], 'headshot.png', { type: 'image/png' })
    const result = await submitApplication(INITIAL, formDataFor({ resume: image }))

    expect(result.status).toBe('error')
    expect(result.fieldErrors?.resume).toBeDefined()
  })

  it('writes nothing when the honeypot is filled', async () => {
    const before = await payload.count({ collection: 'applications' })

    // Reports success on purpose — a bot should not learn it was caught.
    const result = await submitApplication(INITIAL, formDataFor({ company: 'Spam Co' }))
    expect(result.status).toBe('success')

    const after = await payload.count({ collection: 'applications' })
    expect(after.totalDocs).toBe(before.totalDocs)
  })
})

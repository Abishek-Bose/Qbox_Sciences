'use client'

import React, { useActionState, useId } from 'react'

import {
  APPLY_INITIAL_STATE,
  submitApplication,
  type ApplyFieldError,
} from '@/app/(frontend)/careers/actions'
import { CheckCircleIcon } from '@/components/icons'
import { RESUME_ACCEPT, RESUME_MAX_LABEL } from '@/lib/resume'

const fieldShell =
  'mt-2 block w-full rounded-card border border-hairline bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-muted/60 focus:border-brand focus:outline-2 focus:outline-offset-2 focus:outline-brand'

const labelShell = 'block text-left text-sm font-semibold text-navy'

/**
 * A field's validation message; renders nothing while the field is valid.
 * Declared out here rather than inside the form: a component defined during
 * render is a new type every time, so React would remount it on each keystroke.
 */
const FieldError: React.FC<{ id: string; error?: string }> = ({ id, error }) => {
  if (!error) return null

  return (
    <p id={id} className="mt-2 text-left text-sm font-medium text-red-700">
      {error}
    </p>
  )
}

export const CareersForm: React.FC = () => {
  const [state, formAction, isPending] = useActionState(submitApplication, APPLY_INITIAL_STATE)
  const formId = useId()

  const fieldId = (name: string) => `${formId}-${name}`
  const errorId = (name: string) => `${formId}-${name}-error`

  const errorFor = (name: ApplyFieldError) => state.fieldErrors?.[name]

  /** Wires a field to its message so screen readers announce the two together. */
  const errorProps = (name: ApplyFieldError) => {
    const error = errorFor(name)

    return {
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId(name) : undefined,
    }
  }

  if (state.status === 'success') {
    return (
      <div
        // Announced on swap, since the form it replaces is gone from the page.
        role="status"
        className="rounded-card border border-hairline bg-white p-8 text-center shadow-lg shadow-navy/5 sm:p-10"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-card bg-brand/10 text-navy">
          <CheckCircleIcon className="size-5" />
        </span>

        <h3 className="mt-6 text-2xl font-bold text-brand">Thank you – we have your application</h3>

        <p className="mt-4 text-xl leading-relaxed text-ink-muted">
          Our team will connect with you whenever a suitable opportunity matching your profile
          becomes available.
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-card border border-hairline bg-white p-8 text-left shadow-lg shadow-navy/5 sm:p-10"
    >
      <h3 className="text-2xl font-bold text-brand">Apply online</h3>

      <p className="mt-2 text-base text-ink-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {state.status === 'error' && state.message && (
        <p
          role="alert"
          className="mt-6 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {state.message}
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('fullName')} className={labelShell}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId('fullName')}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            className={fieldShell}
            {...errorProps('fullName')}
          />
          <FieldError id={errorId('fullName')} error={errorFor('fullName')} />
        </div>

        <div>
          <label htmlFor={fieldId('email')} className={labelShell}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            className={fieldShell}
            {...errorProps('email')}
          />
          <FieldError id={errorId('email')} error={errorFor('email')} />
        </div>

        <div>
          <label htmlFor={fieldId('phone')} className={labelShell}>
            Phone
          </label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            className={fieldShell}
          />
        </div>

        <div>
          <label htmlFor={fieldId('role')} className={labelShell}>
            Role or area of interest
          </label>
          <input
            id={fieldId('role')}
            name="role"
            type="text"
            maxLength={160}
            className={fieldShell}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={fieldId('message')} className={labelShell}>
          Message
        </label>
        <textarea
          id={fieldId('message')}
          name="message"
          rows={4}
          maxLength={4000}
          className={`${fieldShell} resize-y`}
        />
      </div>

      <div className="mt-6">
        <label htmlFor={fieldId('resume')} className={labelShell}>
          Resume <span aria-hidden="true">*</span>
        </label>
        {/* file:* styles the button the browser renders inside the input, which
            is otherwise unstyled and looks nothing like the rest of the form. */}
        <input
          id={fieldId('resume')}
          name="resume"
          type="file"
          required
          accept={RESUME_ACCEPT}
          className={`${fieldShell} file:mr-4 file:rounded-card file:border-0 file:bg-brand/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-navy hover:file:bg-brand/20`}
          {...errorProps('resume')}
        />
        <p className="mt-2 text-left text-sm text-ink-muted">
          PDF or Word document, up to {RESUME_MAX_LABEL}.
        </p>
        <FieldError id={errorId('resume')} error={errorFor('resume')} />
      </div>

      {/* Honeypot. Off-screen rather than display:none — some bots skip hidden
          inputs — and removed from the tab order and the a11y tree so no real
          person can land on it by accident. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId('company')}>Company</label>
        <input
          id={fieldId('company')}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-8 inline-flex items-center gap-2 rounded-card bg-navy px-7 py-3.5 text-sm font-semibold leading-none text-white transition-colors hover:bg-navy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Sending…' : 'Submit Application'}
      </button>
    </form>
  )
}

export default CareersForm

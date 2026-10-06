const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * Formats an ISO `yyyy-mm-dd` date as `12 Mar 2026`. Reads the parts straight
 * from the string, so the result never depends on the machine's locale or
 * timezone (`new Date('2026-03-12')` is UTC midnight and shifts a day back
 * west of Greenwich).
 */
export function formatEventDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!match) return iso
  const month = MONTHS[Number(match[2]) - 1]
  if (!month) return iso
  return `${Number(match[3])} ${month} ${match[1]}`
}

/** Newest first. Returns a copy; the input is left untouched. */
export function sortNewestFirst<T extends { date: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

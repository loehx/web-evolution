import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

function ageUnit(value: number, unit: string) {
  return value === 1 ? `1 ${unit}` : `${value} ${unit}s`
}

/** Single-unit relative age: hours → days → weeks → months → years. */
export function formatAge(iso: string, now = Date.now()) {
  const ms = Math.max(0, now - new Date(iso).getTime())
  const hours = Math.floor(ms / HOUR_MS)

  if (hours < 24) return ageUnit(Math.max(1, hours), 'hour')

  const days = Math.floor(ms / DAY_MS)
  if (days < 7) return ageUnit(days, 'day')

  const weeks = Math.floor(days / 7)
  if (days < 30) return ageUnit(weeks, 'week')

  const months = Math.floor(days / 30)
  if (days < 365) return ageUnit(months, 'month')

  return ageUnit(Math.floor(days / 365), 'year')
}

import { createHash } from "node:crypto"

export function cleanText(value?: string | null) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function hashExternalId(...parts: string[]) {
  return createHash("sha256").update(parts.join("|")).digest("hex").slice(0, 32)
}

export function todayJakarta() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" })
}

export function isIsoDate(value: string | null | undefined) {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

export function normalizeName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

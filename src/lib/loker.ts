export const LOKER_JENIS = ["MBKM", "Magang", "Full-time"] as const

export type LokerJenis = (typeof LOKER_JENIS)[number]

export type Loker = {
  id: number
  posisi: string
  perusahaan: string
  lokasi: string
  jenis: LokerJenis
  gaji: string
  kontak: string
  email: string
  jadwal: string
  syarat: string[]
  logo: string
  link: string
}

export type LokerRow = Record<string, unknown>

export type LokerInput = Omit<Loker, "id">

function asText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback
}

function asSyarat(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

export function mapLokerRow(row: LokerRow, fallbackId = 0): Loker {
  const jenis = asText(row.jenis, "Magang")
  return {
    id: typeof row.id === "number" ? row.id : fallbackId,
    posisi: asText(row.posisi),
    perusahaan: asText(row.perusahaan),
    lokasi: asText(row.lokasi),
    jenis: (LOKER_JENIS as readonly string[]).includes(jenis)
      ? (jenis as LokerJenis)
      : "Magang",
    gaji: asText(row.gaji, "Tidak dicantumkan"),
    kontak: asText(row.kontak),
    email: asText(row.email),
    jadwal: asText(row.jadwal, "Tidak dicantumkan"),
    syarat: asSyarat(row.syarat),
    logo: asText(row.logo, "?"),
    link: asText(row.link),
  }
}

export function lokerToDb(input: LokerInput) {
  const clean = (value: string) => value.trim()

  return {
    posisi: clean(input.posisi),
    perusahaan: clean(input.perusahaan),
    lokasi: clean(input.lokasi),
    jenis: input.jenis,
    gaji: clean(input.gaji) || "Tidak dicantumkan",
    kontak: clean(input.kontak),
    email: clean(input.email) || null,
    jadwal: clean(input.jadwal) || "Tidak dicantumkan",
    syarat: input.syarat.map((item) => item.trim()).filter(Boolean),
    logo: clean(input.logo) || "?",
    link: clean(input.link),
  }
}

export function emptyLokerInput(): LokerInput {
  return {
    posisi: "",
    perusahaan: "",
    lokasi: "",
    jenis: "Magang",
    gaji: "",
    kontak: "",
    email: "",
    jadwal: "",
    syarat: [],
    logo: "",
    link: "",
  }
}

export function lokerToInput(loker: Loker): LokerInput {
  return {
    posisi: loker.posisi,
    perusahaan: loker.perusahaan,
    lokasi: loker.lokasi,
    jenis: loker.jenis,
    gaji: loker.gaji,
    kontak: loker.kontak,
    email: loker.email,
    jadwal: loker.jadwal,
    syarat: loker.syarat,
    logo: loker.logo,
    link: loker.link,
  }
}

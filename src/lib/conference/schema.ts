import { z } from "zod"

export const CONFERENCE_STATUSES = ["published", "pending", "archived"] as const
export type ConferenceStatus = (typeof CONFERENCE_STATUSES)[number]

const optionalDate = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), "Format tanggal harus YYYY-MM-DD")

export const conferenceFormSchema = z.object({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter"),
  penyelenggara: z.string().trim().optional(),
  deskripsi: z.string().trim().optional(),
  biaya: z.string().trim().optional(),
  lokasi: z.string().trim().optional(),
  tanggal_mulai: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal mulai wajib diisi"),
  tanggal_selesai: optionalDate,
  deadline_daftar: z.string().trim().optional(),
  subjek: z.string().trim().optional(),
  regional: z.string().trim().optional(),
  indeks: z.string().trim().optional(),
  link_detail: z.string().trim().optional(),
  status: z.enum(CONFERENCE_STATUSES),
})

export type ConferenceFormValues = z.infer<typeof conferenceFormSchema>

export type ConferenceSourceRow = {
  nama: string
  lokasi: string | null
  tanggal_mulai: string
  tanggal_selesai: string | null
  subjek: string | null
  regional: string | null
  indeks: string | null
  deadline_daftar: string | null
  link_detail: string | null
  penyelenggara: string | null
  deskripsi: string | null
  biaya: string | null
  sumber: string
  source_url: string | null
  external_id: string
  status: "pending"
}

export type ConferenceRow = {
  id: number
  nama: string
  lokasi: string | null
  tanggal_mulai: string
  tanggal_selesai: string | null
  subjek: string | null
  regional: string | null
  indeks: string | null
  deadline_daftar: string | null
  link_detail: string | null
  penyelenggara: string | null
  deskripsi: string | null
  biaya: string | null
  sumber: string
  source_url: string | null
  external_id: string | null
  last_synced_at: string | null
  status: ConferenceStatus
  created_at?: string | null
  updated_at?: string | null
}

export function emptyConferenceForm(): ConferenceFormValues {
  return {
    nama: "",
    penyelenggara: "",
    deskripsi: "",
    biaya: "",
    lokasi: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    deadline_daftar: "",
    subjek: "",
    regional: "",
    indeks: "",
    link_detail: "",
    status: "published",
  }
}

export function rowToForm(row: ConferenceRow): ConferenceFormValues {
  return {
    nama: row.nama ?? "",
    penyelenggara: row.penyelenggara ?? "",
    deskripsi: row.deskripsi ?? "",
    biaya: row.biaya ?? "",
    lokasi: row.lokasi ?? "",
    tanggal_mulai: row.tanggal_mulai ?? "",
    tanggal_selesai: row.tanggal_selesai ?? "",
    deadline_daftar: row.deadline_daftar ?? "",
    subjek: row.subjek ?? "",
    regional: row.regional ?? "",
    indeks: row.indeks ?? "",
    link_detail: row.link_detail ?? "",
    status: row.status ?? "published",
  }
}

const clean = (value: string | undefined) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export function formToDb(values: ConferenceFormValues) {
  return {
    nama: values.nama.trim(),
    penyelenggara: clean(values.penyelenggara),
    deskripsi: clean(values.deskripsi),
    biaya: clean(values.biaya),
    lokasi: clean(values.lokasi),
    tanggal_mulai: values.tanggal_mulai,
    tanggal_selesai: clean(values.tanggal_selesai),
    deadline_daftar: clean(values.deadline_daftar),
    subjek: clean(values.subjek),
    regional: clean(values.regional),
    indeks: clean(values.indeks),
    link_detail: clean(values.link_detail),
    status: values.status,
  }
}

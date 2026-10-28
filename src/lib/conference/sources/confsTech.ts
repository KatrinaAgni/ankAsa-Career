import type { ConferenceSourceRow } from "@/lib/conference/schema"
import { cleanText, hashExternalId, isIsoDate, todayJakarta } from "@/lib/conference/normalize"

type ConfsTechItem = {
  name?: string
  url?: string
  startDate?: string
  endDate?: string
  city?: string
  country?: string
  online?: boolean
  cfpUrl?: string
  cfpEndDate?: string
}

type GitHubFile = {
  name: string
  type: string
  download_url: string | null
}

const BASE_URL = "https://api.github.com/repos/tech-conferences/conference-data/contents/conferences"

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { "User-Agent": "ankasa-conference-sync" },
  })

  if (!response.ok) {
    throw new Error(`Gagal mengambil ${url}: ${response.status}`)
  }

  return (await response.json()) as T
}

function mapItem(item: ConfsTechItem, topic: string): ConferenceSourceRow | null {
  if (!item.name || !item.startDate) return null

  const start = item.startDate.slice(0, 10)
  if (!isIsoDate(start)) return null

  const end = item.endDate?.slice(0, 10) ?? start
  if (!isIsoDate(end)) return null

  const location = item.online
    ? "Online"
    : cleanText([item.city, item.country].filter(Boolean).join(", "))

  return {
    nama: item.name.trim(),
    lokasi: location,
    tanggal_mulai: start,
    tanggal_selesai: end,
    subjek: topic,
    regional: item.online ? "Online" : cleanText(item.country),
    indeks: "International",
    deadline_daftar: item.cfpEndDate?.slice(0, 10) ?? null,
    link_detail: item.cfpUrl ?? item.url ?? null,
    penyelenggara: null,
    deskripsi: null,
    biaya: null,
    sumber: "confs.tech",
    source_url: item.url ?? null,
    external_id: hashExternalId("confs.tech", item.name, start, item.url ?? ""),
    status: "pending",
  }
}

export async function fetchConfsTech(): Promise<ConferenceSourceRow[]> {
  const currentYear = new Date().getFullYear()
  const today = todayJakarta()
  const rows: ConferenceSourceRow[] = []
  let lastError: unknown = null

  for (const year of [currentYear, currentYear + 1]) {
    let files: GitHubFile[]

    try {
      const listing = await fetchJson<GitHubFile[] | { message?: string }>(`${BASE_URL}/${year}`)
      if (!Array.isArray(listing)) continue
      files = listing
    } catch (error) {
      lastError = error
      continue
    }

    const jsonFiles = files.filter(
      (file) => file.type === "file" && file.name.endsWith(".json") && file.name !== "data.json" && file.download_url
    )

    const settled = await Promise.allSettled(
      jsonFiles.map(async (file) => {
        const topic = file.name.replace(/\.json$/, "")
        const items = await fetchJson<ConfsTechItem[]>(file.download_url!)
        return items.map((item) => mapItem(item, topic)).filter((item): item is ConferenceSourceRow => !!item)
      })
    )

    for (const result of settled) {
      if (result.status === "fulfilled") rows.push(...result.value)
    }
  }

  if (rows.length === 0 && lastError) {
    throw lastError instanceof Error ? lastError : new Error(String(lastError))
  }

  return rows.filter((row) => (row.tanggal_selesai ?? row.tanggal_mulai) >= today)
}

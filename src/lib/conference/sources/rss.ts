import Parser from "rss-parser"
import type { ConferenceSourceRow } from "@/lib/conference/schema"
import { cleanText, hashExternalId, isIsoDate } from "@/lib/conference/normalize"

type RssItem = {
  title?: string
  link?: string
  guid?: string
  contentSnippet?: string
  content?: string
  "event:startdate"?: string
  "event:enddate"?: string
  "event:location"?: string
}

const parser = new Parser<Record<string, never>, RssItem>({
  customFields: {
    item: ["event:startdate", "event:enddate", "event:location"],
  },
})

function extractDate(item: RssItem) {
  const candidates = [
    item["event:startdate"],
    item.title,
    item.contentSnippet,
    item.content,
  ]

  for (const candidate of candidates) {
    const match = candidate?.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/)
    if (match) return match[0]
  }

  return null
}

function mapItem(item: RssItem, feedUrl: string): ConferenceSourceRow | null {
  const start = extractDate(item)
  const rawTitle = item.title?.trim()

  if (!start || !rawTitle) return null

  const end = item["event:enddate"] && isIsoDate(item["event:enddate"]) ? item["event:enddate"] : start
  const name = cleanText(rawTitle.replace(start, "").replace(/[\s|:–-]+$/g, "").trim())
  const link = item.link ?? item.guid ?? null
  let host = "rss"

  try {
    host = new URL(feedUrl).hostname
  } catch {
    host = "rss"
  }

  return {
    nama: name ?? rawTitle,
    lokasi: cleanText(item["event:location"]),
    tanggal_mulai: start,
    tanggal_selesai: end,
    subjek: null,
    regional: null,
    indeks: "RSS",
    deadline_daftar: null,
    link_detail: link,
    penyelenggara: null,
    deskripsi: cleanText(item.contentSnippet),
    biaya: null,
    sumber: host,
    source_url: link,
    external_id: hashExternalId("rss", feedUrl, item.guid ?? link ?? rawTitle, start),
    status: "pending",
  }
}

export async function fetchRssFeeds(): Promise<ConferenceSourceRow[]> {
  const feeds = (process.env.CONFERENCE_RSS_URLS ?? "")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean)

  const rows: ConferenceSourceRow[] = []

  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl)
      for (const item of feed.items ?? []) {
        const row = mapItem(item, feedUrl)
        if (row) rows.push(row)
      }
    } catch {
      continue
    }
  }

  return rows
}

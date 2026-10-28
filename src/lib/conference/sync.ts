import { createAdminClient } from "@/lib/supabase/admin"
import type { ConferenceSourceRow, ConferenceStatus } from "@/lib/conference/schema"
import { normalizeName } from "@/lib/conference/normalize"
import { fetchConfsTech } from "./sources/confsTech"
import { fetchRssFeeds } from "./sources/rss"

export type SyncSummary = {
  fetched: number
  inserted: number
  updated: number
  skipped: number
}

type ExistingRow = {
  id: number
  nama: string
  tanggal_mulai: string
  sumber: string
  external_id: string | null
  status: ConferenceStatus
}

export async function runConferenceSync(): Promise<SyncSummary> {
  const supabase = createAdminClient()
  const startedAt = new Date().toISOString()

  const { data: log, error: logError } = await supabase
    .from("sync_logs")
    .insert({ source: "all", status: "running", started_at: startedAt })
    .select("id")
    .single()

  if (logError || !log) {
    throw new Error(logError?.message ?? "Gagal membuat log sync.")
  }

  const logId = (log as { id: number }).id

  try {
    const results = await Promise.allSettled([fetchConfsTech(), fetchRssFeeds()])
    const candidates = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    const sourceErrors = results
      .filter((result): result is PromiseRejectedResult => result.status === "rejected")
      .map((result) => (result.reason instanceof Error ? result.reason.message : String(result.reason)))

    if (candidates.length === 0 && sourceErrors.length > 0) {
      throw new Error(sourceErrors.join("; "))
    }

    const { data: existingData, error: existingError } = await supabase
      .from("conference")
      .select("id,nama,tanggal_mulai,sumber,external_id,status")

    if (existingError) throw new Error(existingError.message)

    const existing = (existingData ?? []) as ExistingRow[]
    const byKey = new Map<string, ExistingRow>()
    const byNameDate = new Set<string>()

    for (const row of existing) {
      if (row.external_id) byKey.set(`${row.sumber}|${row.external_id}`, row)
      byNameDate.add(`${normalizeName(row.nama)}|${row.tanggal_mulai}`)
    }

    const seen = new Set<string>()
    const toInsert: ConferenceSourceRow[] = []
    const toUpdate: { id: number; row: ConferenceSourceRow }[] = []
    let skipped = 0

    for (const row of candidates) {
      const key = `${row.sumber}|${row.external_id}`

      if (seen.has(key)) {
        skipped += 1
        continue
      }
      seen.add(key)

      const match = byKey.get(key)

      if (match) {
        if (match.status === "pending") toUpdate.push({ id: match.id, row })
        else skipped += 1
        continue
      }

      const nameDate = `${normalizeName(row.nama)}|${row.tanggal_mulai}`

      if (byNameDate.has(nameDate)) {
        skipped += 1
        continue
      }

      byNameDate.add(nameDate)
      toInsert.push(row)
    }

    const syncedAt = new Date().toISOString()
    const chunkSize = 200
    let inserted = 0

    for (let index = 0; index < toInsert.length; index += chunkSize) {
      const chunk = toInsert
        .slice(index, index + chunkSize)
        .map((row) => ({ ...row, last_synced_at: syncedAt }))

      const { error } = await supabase.from("conference").insert(chunk)
      if (error) throw new Error(error.message)
      inserted += chunk.length
    }

    let updated = 0

    for (const item of toUpdate) {
      const { error } = await supabase
        .from("conference")
        .update({ ...item.row, last_synced_at: syncedAt })
        .eq("id", item.id)

      if (error) throw new Error(error.message)
      updated += 1
    }

    await supabase
      .from("sync_logs")
      .update({
        fetched: candidates.length,
        inserted,
        updated,
        skipped,
        status: "success",
        error: sourceErrors.length > 0 ? sourceErrors.join("; ").slice(0, 2000) : null,
        finished_at: new Date().toISOString(),
      })
      .eq("id", logId)

    return { fetched: candidates.length, inserted, updated, skipped }
  } catch (error) {
    await supabase
      .from("sync_logs")
      .update({
        status: "error",
        error: error instanceof Error ? error.message : String(error),
        finished_at: new Date().toISOString(),
      })
      .eq("id", logId)

    throw error
  }
}

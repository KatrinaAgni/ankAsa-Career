// src/app/study/conference/page.tsx
import { createClient } from "@supabase/supabase-js"
import { Row } from "./ConferenceList"
import ConferenceClient from "./ConferenceClient"

export const revalidate = 600 // Data diperbarui otomatis tiap 10 menit

export default async function ConferencePage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const { data, error } = await supabase
    .from("conference")
    .select("*")
    .order("tanggal_mulai", { ascending: true })

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" })
  const rows = (data ?? []) as Row[]

  return <ConferenceClient rows={rows} today={today} error={error?.message} />
}
// src/app/study/conference/page.tsx
// Menampilkan conference yang sudah dipublikasikan. Data dikelola lewat /study/conference/manage.

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import AdminShortcut from "./AdminShortcut"
import ConferenceList, { type Row } from "./ConferenceList"

export const dynamic = "force-dynamic"

export default async function ConferencePage() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { data, error } = await supabase
    .from("conference")
    .select("*")
    .eq("status", "published")
    .order("tanggal_mulai", { ascending: true })

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" })
  const rows = (data ?? []) as Row[]

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/study" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Study
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Jadwal Conference & Seminar</h1>
            <p className="text-gray-600">
              Tenggat dan biaya bisa berubah, jadi selalu cek situs resminya sebelum mendaftar.
            </p>
          </div>
          <AdminShortcut />
        </div>

        {error && (
          <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            Data belum bisa dimuat: {error.message}. Cek env Supabase dan policy baca tabel conference.
          </p>
        )}
        {!error && rows.length === 0 ? (
          <p className="text-gray-500">Belum ada data conference.</p>
        ) : (
          <ConferenceList rows={rows} today={today} />
        )}
      </main>
    </div>
  )
}

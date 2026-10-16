import { ArrowLeft, Sparkles, Search } from "lucide-react"
import Link from "next/link"

import { supabase } from "@/lib/supabase"
import type { Ebook } from "@/lib/types"
import { EbookCatalog } from "@/components/ebook-catalog"

export const dynamic = "force-dynamic"

async function getEbooks(): Promise<Ebook[]> {
  try {
    const { data, error } = await supabase
      .from("ebook")
      .select("*")
      .order("urutan", { ascending: true })
    if (error) {
      console.error("Gagal mengambil ebook:", error.message)
      return []
    }
    return (data ?? []) as Ebook[]
  } catch (e) {
    console.error("Gagal mengambil ebook:", e)
    return []
  }
}

export default async function CatalogPage() {
  const ebooks = await getEbooks()

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link
            href="/study"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Study
          </Link>
          <Link
            href="/study/catalog/request/lacak"
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Search className="w-4 h-4" /> Lacak Pesanan
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-2">
          Perpustakaan Materi & Template
        </h1>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Contoh karya buku & modul yang pernah kami buat. Butuh buku dengan
          materi khusus? Pesan buku custom sesuai kebutuhanmu.
        </p>

        <EbookCatalog ebooks={ebooks} />

        <div className="mt-12 bg-gray-900 text-white rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" /> Jasa Buku Custom
            </div>
            <h2 className="text-2xl font-extrabold">
              Butuh buku pelajaran / modul khusus?
            </h2>
            <p className="text-gray-300 mt-2 max-w-xl">
              Ceritakan kebutuhanmu — misal &ldquo;buku belajar menghitung untuk
              kelas 6 SD&rdquo;. Kami buatkan sesuai materi, jenjang, dan gaya
              yang kamu mau.
            </p>
          </div>
          <Link
            href="/study/catalog/request"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Sparkles className="w-5 h-5" /> Pesan Buku Custom
          </Link>
        </div>
      </main>
    </div>
  )
}

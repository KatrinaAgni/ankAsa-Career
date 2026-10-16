"use client"

import { useMemo, useState } from "react"
import { Library } from "lucide-react"

import type { Ebook } from "@/lib/types"
import { KATEGORI_LIST } from "@/lib/konstanta"
import { cn } from "@/lib/utils"
import { EbookCard } from "@/components/ebook-card"

export function EbookCatalog({ ebooks }: { ebooks: Ebook[] }) {
  const [aktif, setAktif] = useState<string>("Semua")

  const kategoriTersedia = useMemo(() => {
    const dipakai = new Set(ebooks.map((e) => e.kategori))
    return ["Semua", ...KATEGORI_LIST.filter((k) => dipakai.has(k))]
  }, [ebooks])

  const terfilter = useMemo(
    () => (aktif === "Semua" ? ebooks : ebooks.filter((e) => e.kategori === aktif)),
    [ebooks, aktif]
  )

  if (ebooks.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-500">
        <Library className="w-10 h-10 mx-auto mb-3 opacity-40" />
        <p className="font-semibold">Belum ada contoh buku yang ditampilkan.</p>
        <p className="text-sm mt-1">
          Data akan muncul setelah diisi ke tabel <code>ebook</code>.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {kategoriTersedia.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setAktif(k)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold border transition-colors",
              aktif === k
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {terfilter.map((ebook) => (
          <EbookCard key={ebook.id} ebook={ebook} />
        ))}
      </div>
    </div>
  )
}

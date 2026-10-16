"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Eye, Sparkles, Loader2 } from "lucide-react"

import type { Ebook } from "@/lib/types"
import { publicEbookFileUrl, publicEbookCoverUrl } from "@/lib/storage"
import { WARNA_KATEGORI, WARNA_COVER } from "@/lib/konstanta"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function EbookCard({ ebook }: { ebook: Ebook }) {
  const [open, setOpen] = useState(false)
  const fileUrl = publicEbookFileUrl(ebook.file_path)
  const coverUrl = publicEbookCoverUrl(ebook.cover_path)
  const badgeClass =
    ebook.badge_warna || WARNA_KATEGORI[ebook.kategori] || "bg-gray-100 text-gray-700"

  return (
    <>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        <div
          className={cn(
            "h-40 rounded-xl mb-4 flex flex-col justify-between p-4 text-white relative overflow-hidden",
            ebook.cover_warna || WARNA_COVER[ebook.kategori] || "bg-gray-900"
          )}
        >
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt={ebook.judul}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
                {ebook.penulis || "Ankasa Study"}
              </span>
              <span className="text-sm font-bold leading-snug line-clamp-3">
                {ebook.judul}
              </span>
              <BookOpen className="w-6 h-6 opacity-60" />
            </>
          )}
        </div>

        <span
          className={cn(
            "self-start text-[11px] font-bold px-2 py-0.5 rounded-full mb-2",
            badgeClass
          )}
        >
          {ebook.kategori}
          {ebook.jenjang && ebook.jenjang !== "Umum" ? ` · ${ebook.jenjang}` : ""}
        </span>

        <h3 className="font-bold text-sm line-clamp-2 mb-1">{ebook.judul}</h3>
        {ebook.penulis && (
          <p className="text-xs text-gray-500 mb-2">{ebook.penulis}</p>
        )}
        {ebook.deskripsi && (
          <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-grow">
            {ebook.deskripsi}
          </p>
        )}

        <div className="flex flex-col gap-2 mt-auto">
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={!fileUrl}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Eye className="w-4 h-4" /> {fileUrl ? "Baca" : "Belum tersedia"}
          </button>
          <Link
            href={`/study/catalog/request?jenis=${encodeURIComponent(ebook.kategori)}`}
            className="w-full flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 py-2 rounded-lg text-xs font-bold hover:bg-emerald-200 transition-colors"
          >
            <Sparkles className="w-4 h-4" /> Pesan Buku Serupa
          </Link>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-base">{ebook.judul}</DialogTitle>
          </DialogHeader>
          <div className="bg-gray-100">
            {fileUrl ? (
              <iframe
                src={fileUrl}
                title={ebook.judul}
                className="w-full h-[75vh]"
              />
            ) : (
              <div className="h-[40vh] flex items-center justify-center text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

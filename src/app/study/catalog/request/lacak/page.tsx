"use client"

import { useState } from "react"
import { ArrowLeft, Loader2, Search } from "lucide-react"
import Link from "next/link"

import type { BookRequest } from "@/lib/types"
import { LABEL_STATUS, WARNA_STATUS } from "@/lib/konstanta"
import { formatRupiah } from "@/lib/ebook-pricing"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LacakPesananPage() {
  const [kode, setKode] = useState("")
  const [wa, setWa] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasil, setHasil] = useState<BookRequest | null>(null)

  async function cari(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setHasil(null)
    try {
      const params = new URLSearchParams({ kode: kode.trim(), wa: wa.trim() })
      const res = await fetch(`/api/book-requests/lacak?${params.toString()}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Pesanan tidak ditemukan.")
      setHasil(json.data as BookRequest)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link
            href="/study/catalog"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Katalog
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-2 text-center">
          Lacak Pesanan
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Masukkan kode order dan 4 digit terakhir nomor WhatsApp kamu.
        </p>

        <form
          onSubmit={cari}
          className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold mb-2">Kode Order</label>
            <Input
              value={kode}
              onChange={(e) => setKode(e.target.value.toUpperCase())}
              placeholder="ANK-2601-XXXX"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              4 Digit Terakhir No. WhatsApp
            </label>
            <Input
              value={wa}
              onChange={(e) => setWa(e.target.value)}
              placeholder="cth: 3661"
              maxLength={4}
              required
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-700 font-bold py-3 rounded-xl h-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Mencari...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" /> Cari Pesanan
              </>
            )}
          </Button>
        </form>

        {hasil && (
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Kode Order
                </p>
                <p className="text-lg font-extrabold">{hasil.kode_order}</p>
              </div>
              <span
                className={cn(
                  "text-xs font-bold px-3 py-1 rounded-full",
                  WARNA_STATUS[hasil.status] || "bg-gray-100 text-gray-700"
                )}
              >
                {LABEL_STATUS[hasil.status] || hasil.status}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200" />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Nama</dt>
                <dd className="font-semibold">{hasil.nama_pemesan}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Jenis</dt>
                <dd className="font-semibold">
                  {hasil.jenis_buku}
                  {hasil.jenjang ? ` · ${hasil.jenjang}` : ""}
                </dd>
              </div>
              {hasil.judul_diinginkan && (
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 shrink-0">Judul/Tema</dt>
                  <dd className="font-semibold text-right">
                    {hasil.judul_diinginkan}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">Estimasi</dt>
                <dd className="font-semibold">
                  {formatRupiah(hasil.estimasi_harga)}
                </dd>
              </div>
            </dl>

            {hasil.catatan_admin && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                <span className="font-bold">Catatan: </span>
                {hasil.catatan_admin}
              </div>
            )}

            <div className="border-t border-dashed border-gray-200" />
            <p className="text-xs text-gray-500">
              {hasil.deskripsi_kebutuhan}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

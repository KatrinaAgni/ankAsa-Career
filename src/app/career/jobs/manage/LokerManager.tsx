"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react"

import { supabase } from "@/lib/supabase"
import {
  LOKER_JENIS,
  lokerToDb,
  mapLokerRow,
  type Loker,
  type LokerInput,
  type LokerJenis,
} from "@/lib/loker"
import LokerForm from "./LokerForm"

type JenisFilter = "semua" | LokerJenis

const selectCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#004aad]"

export default function LokerManager() {
  const [lokers, setLokers] = useState<Loker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const [q, setQ] = useState("")
  const [jenis, setJenis] = useState<JenisFilter>("semua")

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Loker | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    const { data, error: loadError } = await supabase
      .from("loker")
      .select("*")
      .order("id", { ascending: false })

    if (loadError) {
      setError(loadError.message)
      setLoading(false)
      return
    }

    setLokers((data ?? []).map((row: Record<string, unknown>, i: number) => mapLokerRow(row, i + 1)))
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 3500)
    return () => clearTimeout(timer)
  }, [notice])

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return lokers.filter((loker) => {
      if (jenis !== "semua" && loker.jenis !== jenis) return false
      if (!needle) return true
      return `${loker.posisi} ${loker.perusahaan} ${loker.lokasi} ${loker.kontak}`
        .toLowerCase()
        .includes(needle)
    })
  }, [lokers, q, jenis])

  const openCreate = () => {
    setEditing(null)
    setFormError(null)
    setFormOpen(true)
  }

  const openEdit = (loker: Loker) => {
    setEditing(loker)
    setFormError(null)
    setFormOpen(true)
  }

  const closeForm = () => {
    if (saving) return
    setFormOpen(false)
    setEditing(null)
    setFormError(null)
  }

  const handleSubmit = async (input: LokerInput) => {
    setSaving(true)
    setFormError(null)

    const payload = lokerToDb(input)
    const { error: saveError } = editing
      ? await supabase.from("loker").update(payload).eq("id", editing.id)
      : await supabase.from("loker").insert([payload])

    if (saveError) {
      setFormError(saveError.message)
      setSaving(false)
      return
    }

    setSaving(false)
    setFormOpen(false)
    setEditing(null)
    setNotice(editing ? "Lowongan berhasil diperbarui." : "Lowongan berhasil ditambahkan.")
    await load()
  }

  const handleDelete = async (loker: Loker) => {
    const yakin = window.confirm(`Hapus lowongan "${loker.posisi}"? Tindakan ini tidak bisa dibatalkan.`)
    if (!yakin) return

    const { error: deleteError } = await supabase.from("loker").delete().eq("id", loker.id)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    setNotice("Lowongan berhasil dihapus.")
    await load()
  }

  const reset = () => {
    setQ("")
    setJenis("semua")
  }

  const adaFilter = q !== "" || jenis !== "semua"

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          <Link
            href="/career/jobs"
            className="flex items-center gap-2 text-gray-600 hover:text-[#004aad] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Loker
          </Link>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#004aad] px-4 py-2 text-xs font-bold text-white hover:bg-[#00337a]"
          >
            <Plus className="w-4 h-4" /> Tambah Loker
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Kelola Lowongan Kerja</h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Tambah, edit, dan hapus data loker yang tampil di Portal Loker & MBKM.
          </p>
        </div>

        {notice && (
          <p className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
            {notice}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-bold text-rose-700">
            Data belum bisa dimuat: {error}
          </p>
        )}

        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Total Loker</span>
            <p className="mt-1 text-2xl font-extrabold text-gray-900">{lokers.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Hasil Filter</span>
            <p className="mt-1 text-2xl font-extrabold text-[#004aad]">{filtered.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Ditampilkan</span>
            <p className="mt-1 text-2xl font-extrabold text-emerald-600">{lokers.length}</p>
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari posisi, perusahaan, lokasi, atau kontak..."
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#004aad]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["semua", ...LOKER_JENIS] as JenisFilter[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setJenis(option)}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  jenis === option
                    ? "bg-[#004aad] text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option === "semua" ? "Semua" : option}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-gray-500">
            <span>
              {filtered.length} dari {lokers.length} lowongan
            </span>
            <div className="flex items-center gap-3">
              {adaFilter && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1 font-bold text-[#004aad] hover:underline"
                >
                  <X className="w-3.5 h-3.5" /> Reset filter
                </button>
              )}
              <button
                type="button"
                onClick={load}
                className="inline-flex items-center gap-1 font-bold text-gray-500 hover:text-[#004aad]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Muat ulang
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-gray-100 bg-white py-16 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-xs font-medium text-gray-400">
            Tidak ada lowongan yang sesuai. Tambah loker baru atau ubah filter.
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map((loker) => (
              <div
                key={loker.id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#004aad] to-[#5de0e6] text-sm font-extrabold text-white">
                    {loker.logo}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-extrabold text-gray-900">{loker.posisi}</h3>
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#004aad]">
                        {loker.jenis}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs font-bold text-[#004aad]">{loker.perusahaan}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {loker.lokasi || "-"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="h-3 w-3" /> {loker.gaji}
                      </span>
                      <span className="truncate">Jadwal: {loker.jadwal}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 md:justify-end">
                  <Link
                    href={`/career/jobs/${loker.id}`}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-[11px] font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Lihat
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEdit(loker)}
                    className="inline-flex items-center gap-1 rounded-xl bg-blue-50 px-3 py-2 text-[11px] font-bold text-[#004aad] hover:bg-blue-100"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(loker)}
                    className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-600 hover:bg-rose-100"
                  >
                    <Trash2 className="h-3 w-3" /> Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {formOpen && (
        <LokerForm
          initial={editing}
          saving={saving}
          error={formError}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  )
}

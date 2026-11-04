"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"

import {
  emptyLokerInput,
  LOKER_JENIS,
  lokerToInput,
  type Loker,
  type LokerInput,
} from "@/lib/loker"

type Props = {
  initial: Loker | null
  saving: boolean
  error: string | null
  onSubmit: (input: LokerInput) => void
  onClose: () => void
}

const inputCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-800 outline-none focus:ring-2 focus:ring-[#004aad]"

const labelCls = "mb-1.5 block text-[11px] font-extrabold uppercase tracking-wide text-gray-500"

export default function LokerForm({ initial, saving, error, onSubmit, onClose }: Props) {
  const [values, setValues] = useState<LokerInput>(
    initial ? lokerToInput(initial) : emptyLokerInput()
  )
  const [syaratText, setSyaratText] = useState(
    (initial ? lokerToInput(initial) : emptyLokerInput()).syarat.join("\n")
  )
  const [localError, setLocalError] = useState<string | null>(null)

  const set = <K extends keyof LokerInput>(key: K, value: LokerInput[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setLocalError(null)

    if (!values.posisi.trim()) {
      setLocalError("Posisi wajib diisi.")
      return
    }
    if (!values.perusahaan.trim()) {
      setLocalError("Perusahaan wajib diisi.")
      return
    }

    onSubmit({
      ...values,
      syarat: syaratText
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-gray-900/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="my-6 w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">
              {initial ? "Edit Lowongan" : "Tambah Lowongan"}
            </h2>
            <p className="text-[11px] font-medium text-gray-500">
              Lengkapi informasi resmi lowongan kerja atau MBKM.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="posisi">Posisi</label>
            <input
              id="posisi"
              value={values.posisi}
              onChange={(e) => set("posisi", e.target.value)}
              placeholder="Contoh: Data Analyst Intern"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="perusahaan">Perusahaan</label>
            <input
              id="perusahaan"
              value={values.perusahaan}
              onChange={(e) => set("perusahaan", e.target.value)}
              placeholder="Nama perusahaan / instansi"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="lokasi">Lokasi</label>
            <input
              id="lokasi"
              value={values.lokasi}
              onChange={(e) => set("lokasi", e.target.value)}
              placeholder="Kota / Remote / Hybrid"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="jenis">Jenis</label>
            <select
              id="jenis"
              value={values.jenis}
              onChange={(e) => set("jenis", e.target.value as LokerInput["jenis"])}
              className={inputCls}
            >
              {LOKER_JENIS.map((jenis) => (
                <option key={jenis} value={jenis}>{jenis}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls} htmlFor="gaji">Gaji</label>
            <input
              id="gaji"
              value={values.gaji}
              onChange={(e) => set("gaji", e.target.value)}
              placeholder="Contoh: Rp 2.500.000/bln"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="jadwal">Jadwal</label>
            <input
              id="jadwal"
              value={values.jadwal}
              onChange={(e) => set("jadwal", e.target.value)}
              placeholder="Contoh: Pendaftaran 1 - 30 Nov 2026"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="logo">Logo / Inisial</label>
            <input
              id="logo"
              value={values.logo}
              onChange={(e) => set("logo", e.target.value)}
              placeholder="Contoh: KM"
              maxLength={4}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="kontak">Kontak</label>
            <input
              id="kontak"
              value={values.kontak}
              onChange={(e) => set("kontak", e.target.value)}
              placeholder="Website / platform pendaftaran"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="recruitment@perusahaan.com"
              className={inputCls}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="link">Link Resmi / Pendaftaran</label>
            <input
              id="link"
              value={values.link}
              onChange={(e) => set("link", e.target.value)}
              placeholder="https://..."
              className={inputCls}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="syarat">Syarat & Kualifikasi (satu per baris)</label>
            <textarea
              id="syarat"
              rows={5}
              value={syaratText}
              onChange={(e) => setSyaratText(e.target.value)}
              placeholder={"Mahasiswa aktif.\nMenguasai SQL.\nBersedia WFO."}
              className={inputCls}
            />
          </div>

          {(localError || error) && (
            <p className="sm:col-span-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
              {localError || error}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#004aad] px-5 py-2 text-xs font-bold text-white hover:bg-[#00337a] disabled:opacity-60"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {initial ? "Simpan Perubahan" : "Tambah Loker"}
          </button>
        </div>
      </form>
    </div>
  )
}

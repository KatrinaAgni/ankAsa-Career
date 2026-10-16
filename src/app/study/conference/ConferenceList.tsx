"use client"

// src/app/study/conference/ConferenceList.tsx
// Daftar conference + filter (cari, status, lokasi, topik, tenggat). Datanya dikirim dari page.tsx.

import { useMemo, useState } from "react"
import { Calendar, CalendarPlus, ExternalLink, MapPin, Search, X } from "lucide-react"

export type Row = {
  id: number
  nama: string
  lokasi: string | null
  tanggal_mulai: string
  tanggal_selesai: string | null
  subjek: string | null
  regional: string | null
  indeks: string | null
  deadline_daftar: string | null
  link_detail: string | null
}

type Status = "semua" | "akan" | "berlangsung" | "selesai"

const fmt = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso + "T00:00:00Z")
  )
const range = (a: string, b: string) => (a === b ? fmt(a) : `${fmt(a)} – ${fmt(b)}`)
const daysBetween = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5)
const isIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)

const cleanLokasi = (l: string) => l.replace(/\s*\(.*?\)\s*/g, " ").trim()
const kota = (l: string | null) => {
  if (!l) return ""
  const parts = cleanLokasi(l).split(",").map((s) => s.trim()).filter(Boolean)
  return parts[parts.length - 1] ?? ""
}
const isHybrid = (l: string | null) => !!l && /hybrid/i.test(l)
const topik = (s: string | null) => (s ? s.split(",").map((x) => x.trim()).filter(Boolean) : [])
const endOf = (c: Row) => c.tanggal_selesai ?? c.tanggal_mulai

const statusOf = (c: Row, today: string): Exclude<Status, "semua"> =>
  today < c.tanggal_mulai ? "akan" : today <= endOf(c) ? "berlangsung" : "selesai"

const mapsUrl = (l: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanLokasi(l) + ", Indonesia")}`

const kalenderUrl = (c: Row) => {
  const d = new Date(endOf(c) + "T00:00:00Z")
  d.setUTCDate(d.getUTCDate() + 1) // tanggal akhir di Google Calendar bersifat eksklusif
  const s = c.tanggal_mulai.replace(/-/g, "")
  const e = d.toISOString().slice(0, 10).replace(/-/g, "")
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: c.nama,
    dates: `${s}/${e}`,
    location: c.lokasi ? cleanLokasi(c.lokasi) : "",
    details: c.link_detail ? `Info lengkap: ${c.link_detail}` : "",
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

function ConferenceCard({ c, today }: { c: Row; today: string }) {
  const st = statusOf(c, today)
  const badge =
    st === "akan"
      ? { t: `${daysBetween(today, c.tanggal_mulai)} hari lagi`, cls: "bg-emerald-50 text-emerald-700" }
      : st === "berlangsung"
        ? { t: "Sedang berlangsung", cls: "bg-amber-50 text-amber-700" }
        : { t: "Selesai", cls: "bg-gray-100 text-gray-500" }

  const dl = c.deadline_daftar
  const dlLewat = !!dl && isIso(dl) && dl < today
  const dlText = dl ? (isIso(dl) ? fmt(dl) : dl) : "Cek situs resmi"

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.cls}`}>{badge.t}</span>
          {c.regional && <span className="text-xs font-semibold text-gray-500">{c.regional}</span>}
          {isHybrid(c.lokasi) && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">Hybrid</span>
          )}
        </div>
        <h3 className="font-bold text-lg text-blue-800">{c.nama}</h3>
        <p className="text-sm text-gray-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{range(c.tanggal_mulai, endOf(c))}</span>
          {c.lokasi && (
            <a
              href={mapsUrl(c.lokasi)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-700 hover:underline"
              title="Lihat lokasi di Google Maps"
            >
              <MapPin className="w-3.5 h-3.5" /> {cleanLokasi(c.lokasi)}
            </a>
          )}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {topik(c.subjek).map((s) => (
            <span key={s} className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs">
              {s}
            </span>
          ))}
          {c.indeks && (
            <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {c.indeks}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-stretch md:items-end gap-2 shrink-0">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${
            dlLewat ? "bg-gray-100 text-gray-500" : "bg-blue-50 text-blue-700"
          }`}
        >
          <Calendar className="w-4 h-4" /> Deadline: {dlText}
          {dlLewat && <span className="font-medium">(lewat)</span>}
        </div>
        {c.link_detail && (
          <a
            href={c.link_detail}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-800 px-4 py-2 text-sm font-bold text-white hover:bg-blue-900"
          >
            Cari tahu lebih lanjut <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
        {st !== "selesai" && (
          <a
            href={kalenderUrl(c)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            <CalendarPlus className="w-4 h-4" /> Tambah ke kalender
          </a>
        )}
      </div>
    </div>
  )
}

const STATUS_OPTS: { v: Status; l: string }[] = [
  { v: "semua", l: "Semua" },
  { v: "akan", l: "Akan datang" },
  { v: "berlangsung", l: "Berlangsung" },
  { v: "selesai", l: "Selesai" },
]

const selectCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

export default function ConferenceList({ rows, today }: { rows: Row[]; today: string }) {
  const [q, setQ] = useState("")
  const [status, setStatus] = useState<Status>("semua")
  const [lok, setLok] = useState("")
  const [top, setTop] = useState("")
  const [buka, setBuka] = useState(false)

  const lokOpts = useMemo(
    () => Array.from(new Set(rows.map((r) => kota(r.lokasi)).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [rows]
  )
  const topOpts = useMemo(
    () => Array.from(new Set(rows.flatMap((r) => topik(r.subjek)))).sort((a, b) => a.localeCompare(b)),
    [rows]
  )

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return rows.filter((c) => {
      if (needle && !`${c.nama} ${c.lokasi ?? ""} ${c.subjek ?? ""} ${c.indeks ?? ""}`.toLowerCase().includes(needle)) return false
      if (status !== "semua" && statusOf(c, today) !== status) return false
      if (lok && kota(c.lokasi) !== lok) return false
      if (top && !topik(c.subjek).includes(top)) return false
      if (buka && !(c.deadline_daftar && isIso(c.deadline_daftar) && c.deadline_daftar >= today)) return false
      return true
    })
  }, [rows, q, status, lok, top, buka, today])

  const aktif = filtered.filter((c) => endOf(c) >= today)
  const lewat = filtered.filter((c) => endOf(c) < today).reverse()
  const adaFilter = q || status !== "semua" || lok || top || buka
  const reset = () => {
    setQ("")
    setStatus("semua")
    setLok("")
    setTop("")
    setBuka(false)
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama, lokasi, atau topik (mis. Bali, IEEE, AI)"
            aria-label="Cari conference"
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_OPTS.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setStatus(o.v)}
              aria-pressed={status === o.v}
              className={`rounded-full border px-3.5 py-1 text-sm font-semibold transition-colors ${
                status === o.v
                  ? "border-blue-800 bg-blue-800 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <select value={lok} onChange={(e) => setLok(e.target.value)} aria-label="Filter lokasi" className={selectCls}>
            <option value="">Semua lokasi</option>
            {lokOpts.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <select value={top} onChange={(e) => setTop(e.target.value)} aria-label="Filter topik" className={selectCls}>
            <option value="">Semua topik</option>
            {topOpts.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" checked={buka} onChange={(e) => setBuka(e.target.checked)} className="accent-blue-800" />
            Hanya yang tenggatnya masih buka
          </label>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            {filtered.length} dari {rows.length} conference
          </span>
          {adaFilter && (
            <button type="button" onClick={reset} className="flex items-center gap-1 font-semibold text-blue-800 hover:underline">
              <X className="w-4 h-4" /> Reset filter
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl bg-white border border-gray-100 p-6 text-center text-gray-500">
          Tidak ada conference yang cocok. Coba ubah atau reset filternya.
        </p>
      )}

      {aktif.length > 0 && (
        <div className="space-y-4">
          {aktif.map((c) => (
            <ConferenceCard key={c.id} c={c} today={today} />
          ))}
        </div>
      )}

      {lewat.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-12 mb-4 text-gray-500">Sudah selesai</h2>
          <div className="space-y-4 opacity-70">
            {lewat.map((c) => (
              <ConferenceCard key={c.id} c={c} today={today} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

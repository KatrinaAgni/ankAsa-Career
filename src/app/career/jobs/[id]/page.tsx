import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Wallet,
} from "lucide-react"

import { mapLokerRow } from "@/lib/loker"

export const revalidate = 300

function mapsUrl(lokasi: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lokasi + ", Indonesia")}`
}

function websiteLabel(link: string) {
  try {
    return new URL(link).hostname.replace(/^www\./, "")
  } catch {
    return link
  }
}

export default async function LokerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const lokerId = Number(id)

  if (!Number.isInteger(lokerId) || lokerId <= 0) notFound()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase
    .from("loker")
    .select("*")
    .eq("id", lokerId)
    .maybeSingle()

  if (error) {
    console.error("Gagal memuat detail loker:", error.message)
  }

  if (!data) notFound()

  const loker = mapLokerRow(data, lokerId)

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <Link
            href="/career/jobs"
            className="flex items-center gap-2 text-gray-600 hover:text-[#004aad] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Loker
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="bg-white/80 backdrop-blur-xl border border-white/80 shadow-sm rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#004aad] to-[#5de0e6] text-white font-black text-2xl flex items-center justify-center shadow-md">
                {loker.logo || loker.perusahaan.charAt(0) || "A"}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#004aad] border border-blue-100">
                    {loker.jenis}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Info Resmi
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                  {loker.posisi}
                </h1>
                <p className="text-sm font-bold text-[#004aad] mt-1">
                  {loker.perusahaan}
                </p>
              </div>
            </div>

            {loker.link && (
              <a
                href={loker.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#004aad] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#00337a] shadow-sm transition-all"
              >
                Situs Resmi <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-7">
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400">
                <MapPin className="w-3.5 h-3.5" /> Lokasi
              </span>
              {loker.lokasi ? (
                <a
                  href={mapsUrl(loker.lokasi)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-xs font-bold text-[#004aad] hover:underline"
                >
                  {loker.lokasi}
                </a>
              ) : (
                <span className="mt-1 block text-xs font-bold text-gray-700">-</span>
              )}
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400">
                <Briefcase className="w-3.5 h-3.5" /> Jenis
              </span>
              <span className="mt-1 block text-xs font-bold text-gray-800">{loker.jenis}</span>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400">
                <Wallet className="w-3.5 h-3.5" /> Gaji
              </span>
              <span className="mt-1 block text-xs font-bold text-emerald-600">{loker.gaji}</span>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5">
              <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400">
                <CalendarDays className="w-3.5 h-3.5" /> Jadwal
              </span>
              <span className="mt-1 block text-xs font-bold text-gray-800">{loker.jadwal}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-base font-extrabold text-gray-900">
                <CheckCircle2 className="w-4 h-4 text-[#004aad]" /> Syarat & Kualifikasi
              </h2>
              {loker.syarat.length > 0 ? (
                <ul className="space-y-2 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                  {loker.syarat.map((item) => (
                    <li key={item} className="flex gap-2 text-xs font-medium leading-relaxed text-gray-600">
                      <span className="mt-0.5 text-[#004aad]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-xs font-medium text-gray-500">
                  Tidak ada persyaratan khusus yang dicantumkan. Periksa situs resmi untuk informasi lengkap.
                </p>
              )}
            </section>

            <aside className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
              <h2 className="mb-3 text-sm font-extrabold text-[#004aad]">Informasi Pendaftaran</h2>
              <div className="space-y-3 text-xs font-medium text-gray-600">
                <div className="flex gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-[#004aad]" />
                  <span className="break-all">{loker.email || loker.kontak || "Lihat situs resmi"}</span>
                </div>
                <div className="flex gap-2">
                  <Globe className="w-4 h-4 shrink-0 text-[#004aad]" />
                  {loker.link ? (
                    <a
                      href={loker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all font-bold text-[#004aad] hover:underline"
                    >
                      {websiteLabel(loker.link)}
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>

              {loker.email && (
                <a
                  href={`mailto:${loker.email}`}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-[#004aad] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#00337a] transition-all"
                >
                  Lamar via Email <Mail className="w-3.5 h-3.5" />
                </a>
              )}

              {loker.link && (
                <a
                  href={loker.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border border-[#004aad]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#004aad] hover:bg-blue-50 transition-all"
                >
                  Buka Pendaftaran Resmi <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <p className="mt-4 text-[10px] font-medium leading-relaxed text-gray-500">
                Selalu periksa situs resmi sebelum mendaftar. Hati-hati terhadap penipuan yang meminta biaya.
              </p>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

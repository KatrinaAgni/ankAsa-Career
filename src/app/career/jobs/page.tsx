"use client"

import { ArrowLeft, Search, MapPin, Mail, CalendarDays, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { mapLokerRow, type Loker } from "@/lib/loker"
import AdminShortcut from "./AdminShortcut"

const daftarLoker: Loker[] = [
  {
    id: 1,
    posisi: "Program Magang Nasional Batch 3 Angkatan II 2026",
    perusahaan: "Kementerian Ketenagakerjaan (Kemnaker)",
    lokasi: "Seluruh Indonesia",
    jenis: "Magang",
    gaji: "Uang saku setara UMK/bln + JKK & JKM",
    email: "",
    kontak: "maganghub.kemnaker.go.id",
    jadwal: "Pendaftaran peserta 27 Okt – 1 Nov 2026",
    syarat: [
      "Warga Negara Indonesia dengan NIK valid.",
      "Lulusan D3/S1/Pendidikan Profesi, lulus maksimal 1 tahun.",
      "Usia maksimal 27 tahun saat mendaftar.",
      "Belum pernah mengikuti Program Pemagangan Nasional.",
    ],
    logo: "KM",
    link: "https://maganghub.kemnaker.go.id/",
  },
  {
    id: 2,
    posisi: "Internship Pertamina Group (400+ Posisi)",
    perusahaan: "PT Pertamina (Persero)",
    lokasi: "Jakarta & 21 Entitas Pertamina Group",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "recruitment@pertamina.com",
    jadwal: "Rekrutmen 1 – 5 Juli 2026",
    syarat: [
      "Fresh graduate D3/S1 dari berbagai disiplin ilmu.",
      "Buat akun di recruitment.pertamina.com.",
      "Lengkapi profil hingga 100%, pilih kategori Internship.",
      "Rekrutmen resmi tidak dipungut biaya.",
    ],
    logo: "PR",
    link: "https://recruitment.pertamina.com/",
  },
  {
    id: 3,
    posisi: "BRILiaN Future Leader Program (BFLP) Specialist 2026 Wave 4",
    perusahaan: "PT Bank Rakyat Indonesia (Persero) Tbk",
    lokasi: "Seluruh Indonesia",
    jenis: "Full-time",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "e-recruitment.bri.co.id",
    jadwal: "Gelombang 4 – Oktober 2026",
    syarat: [
      "S1/S2 dari universitas terakreditasi.",
      "Skor TOEFL ≥ 500 atau sertifikat kemampuan bahasa Inggris setara.",
      "Bersedia ditempatkan di unit BRI mana pun di seluruh Indonesia.",
      "5 posisi: Wholesale Banking, Risk Management, Micro Banking, Business Enabler, Audit.",
    ],
    logo: "BR",
    link: "https://e-recruitment.bri.co.id/",
  },
  {
    id: 4,
    posisi: "BRILiaN Banking Associate Program – Junior Associate Mantri",
    perusahaan: "PT Bank Rakyat Indonesia (Persero) Tbk",
    lokasi: "Semarang & Unit Kerja Region 10",
    jenis: "Full-time",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "e-recruitment.bri.co.id",
    jadwal: "Ditutup 31 Agustus 2026",
    syarat: [
      "Pendidikan minimal D3 semua jurusan dari universitas terakreditasi.",
      "Usia maksimal 24 tahun.",
      "Bersedia ditempatkan di seluruh Unit Kerja BRI Region 10.",
    ],
    logo: "BR",
    link: "https://e-recruitment.bri.co.id/",
  },
  {
    id: 5,
    posisi: "Internship PIC Draft Offering Letter & Kontrak Dokter",
    perusahaan: "PT Kimia Farma (Persero) Tbk",
    lokasi: "Jakarta Pusat",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "rekrutmen.kimiafarma.co.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Lulusan S1 jurusan Psikologi atau Manajemen.",
      "Magang 6 bulan, onsite.",
      "Siapkan KTP, transkrip nilai, dan CV.",
      "1 posisi tersedia.",
    ],
    logo: "KF",
    link: "https://rekrutmen.kimiafarma.co.id/",
  },
  {
    id: 6,
    posisi: "Internship Talent Management",
    perusahaan: "PT Kimia Farma (Persero) Tbk",
    lokasi: "Jakarta Pusat",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "rekrutmen.kimiafarma.co.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Magang 6 bulan, onsite di Jakarta Pusat.",
      "Pendaftaran melalui platform Magenta.",
      "1 posisi tersedia.",
    ],
    logo: "KF",
    link: "https://rekrutmen.kimiafarma.co.id/",
  },
  {
    id: 7,
    posisi: "Internship Administrasi Umum & Kearsipan (KSO TPK Koja)",
    perusahaan: "PT Pelabuhan Indonesia (Persero)",
    lokasi: "Jakarta Utara",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "magentaku.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Magang 3 bulan, onsite.",
      "5 posisi tersedia.",
      "Pendaftaran melalui platform Magenta.",
    ],
    logo: "PI",
    link: "https://www.magentaku.id/",
  },
  {
    id: 8,
    posisi: "Purchasing Commodity Import Intern",
    perusahaan: "PT Berdikari",
    lokasi: "Jakarta Selatan",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "magentaku.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Magang 6 bulan, onsite.",
      "1 posisi tersedia.",
      "Pendaftaran melalui platform Magenta.",
    ],
    logo: "BK",
    link: "https://www.magentaku.id/",
  },
  {
    id: 9,
    posisi: "Business Management Associates Internship",
    perusahaan: "PT Valbury Semarang",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Rp 500.000 – Rp 3.000.000/bln",
    email: "",
    kontak: "id.indeed.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Lulusan D1 atau sederajat, mahasiswa tingkat akhir semua jurusan.",
      "Usia minimal 21 tahun, maksimal 27 tahun.",
      "Memiliki kemampuan komunikasi yang baik.",
    ],
    logo: "VB",
    link: "https://id.indeed.com/",
  },
  {
    id: 10,
    posisi: "Commodity Data Analyst Internship",
    perusahaan: "PT Valbury Semarang",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Rp 500.000 – Rp 3.000.000/bln",
    email: "",
    kontak: "id.indeed.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Terbuka bagi mahasiswa tingkat akhir dan fresh graduate.",
      "Memahami teknik machine learning.",
      "Membangun model prediktif estimasi suplai dan permintaan komoditas (expert advisor).",
    ],
    logo: "VB",
    link: "https://id.indeed.com/",
  },
  {
    id: 11,
    posisi: "Graphic Designer Internship",
    perusahaan: "Sooca Design",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "studio@soocadesign.com",
    jadwal: "Magang 3 bulan",
    syarat: [
      "Sedang menempuh pendidikan D3/S1 terkait DKV.",
      "Bersedia menjalani magang di studio Semarang selama 3 bulan.",
      "Membawa surat izin resmi dari kampus.",
    ],
    logo: "SD",
    link: "https://www.soocadesign.com/",
  },
  {
    id: 12,
    posisi: "IT Support Internship",
    perusahaan: "PT Bintang Delapan",
    lokasi: "Jakarta Barat",
    jenis: "Magang",
    gaji: "Rp 3.000.000 – Rp 3.450.000/bln",
    email: "",
    kontak: "id.indeed.com",
    jadwal: "Internship 6 bulan",
    syarat: [
      "Lulusan S1 Teknik Informatika/Sistem Informasi atau semester akhir.",
      "Mampu troubleshooting PC, laptop, CCTV, dan printer.",
      "Terbiasa menggunakan Excel atau Google Sheets.",
    ],
    logo: "BD",
    link: "https://id.indeed.com/",
  },
  {
    id: 13,
    posisi: "Magang Software Engineer",
    perusahaan: "PT Imperial Teknologi Indonesia",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Tidak dicantumkan",
    email: "",
    kontak: "glints.com",
    jadwal: "Magang mulai 1 September 2026",
    syarat: [
      "Mahasiswa aktif.",
      "Menguasai PostgreSQL dan JavaScript.",
      "Penempatan di Semarang.",
    ],
    logo: "IT",
    link: "https://glints.com/id/",
  },
  {
    id: 14,
    posisi: "Intern Data Analyst",
    perusahaan: "PT Cemerlang Statistika Indonesia (STATSME)",
    lokasi: "Depok, Jawa Barat",
    jenis: "MBKM",
    gaji: "Rp 1.000.000 – Rp 2.000.000/bln",
    email: "",
    kontak: "glints.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Lulusan atau mahasiswa S1.",
      "Menguasai Microsoft Excel dan SQL.",
      "Magang onsite di Depok.",
    ],
    logo: "ST",
    link: "https://glints.com/id/",
  },
  {
    id: 15,
    posisi: "Data Analyst Intern",
    perusahaan: "Roove Tijara Internasional",
    lokasi: "Bandung (Hybrid)",
    jenis: "MBKM",
    gaji: "Rp 1.000.000 – Rp 1.500.000/bln",
    email: "",
    kontak: "glints.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Lulusan S1.",
      "Menguasai Microsoft Excel.",
      "Bekerja secara hybrid dari Bandung.",
    ],
    logo: "RT",
    link: "https://glints.com/id/",
  },
  {
    id: 16,
    posisi: "Magang Nasional Instansi Pemerintah (±1.200 Peserta)",
    perusahaan: "Kemendikdasmen",
    lokasi: "Jakarta",
    jenis: "Magang",
    gaji: "Uang saku bulanan dari program MagangHub",
    email: "",
    kontak: "maganghub.kemnaker.go.id",
    jadwal: "Batch 2 ditutup 8 September 2026",
    syarat: [
      "Fresh graduate perguruan tinggi.",
      "Kuota ±1.200 peserta.",
      "Penempatan di lingkungan pemerintahan.",
      "Pendaftaran melalui portal MagangHub.",
    ],
    logo: "KD",
    link: "https://maganghub.kemnaker.go.id/",
  },
]

export default function JobsPage() {
  const [lokerList, setLokerList] = useState<Loker[]>(daftarLoker)
  const [q, setQ] = useState("")

  const filtered = lokerList.filter((loker) => {
    const needle = q.trim().toLowerCase()
    if (!needle) return true
    return `${loker.posisi} ${loker.perusahaan} ${loker.lokasi} ${loker.jenis}`
      .toLowerCase()
      .includes(needle)
  })

  useEffect(() => {
    let aktif = true
    supabase
      .from("loker")
      .select("*")
      .order("id", { ascending: true })
      .then(({ data, error }) => {
        if (!aktif || error || !data || data.length === 0) return
        setLokerList(
          data.map((row: Record<string, unknown>, i: number) => mapLokerRow(row, i + 1))
        )
      })
    return () => {
      aktif = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/career" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Career
          </Link>
          <AdminShortcut />
        </div>
      </header>
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-1">Eksplorasi Lowongan & MBKM</h1>
        <p className="text-xs text-gray-500 font-medium mb-8">
          Klik salah satu lowongan untuk melihat informasi resmi dan cara melamar.
        </p>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-8">
           <div className="flex-1 flex items-center px-4"><Search className="w-5 h-5 text-gray-400 mr-2"/><input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari posisi magang atau full-time..." className="w-full outline-none bg-transparent"/></div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-100 p-10 text-center text-xs font-medium text-gray-400">
            Tidak ada lowongan yang sesuai. Coba kata kunci lain.
          </div>
        ) : (
        <div className="grid md:grid-cols-2 gap-4">
           {filtered.map((loker) => (
             <Link key={loker.id} href={`/career/jobs/${loker.id}`} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#004aad]/30 transition-all flex flex-col">
               <div className="flex items-start justify-between gap-3 mb-4">
                 <div className="flex items-center gap-3">
                   <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#004aad] to-[#5de0e6] text-white font-extrabold flex items-center justify-center text-sm">{loker.logo}</div>
                   <div>
                     <h3 className="font-bold text-lg leading-tight group-hover:text-[#004aad] transition-colors">{loker.posisi}</h3>
                     <p className="text-[#004aad] font-bold text-sm">{loker.perusahaan}</p>
                   </div>
                 </div>
                 <span className="shrink-0 text-[11px] font-bold px-2 py-1 rounded-full bg-blue-50 text-[#004aad]">{loker.jenis}</span>
               </div>
               <div className="flex gap-2 text-xs text-gray-500 mb-3"><MapPin className="w-4 h-4 shrink-0"/> {loker.lokasi}</div>
                <p className="text-sm mb-3"><span className="font-semibold text-gray-500">Gaji:</span> <span className="font-bold text-emerald-600">{loker.gaji}</span></p>
               <ul className="space-y-1 mb-4">
                 {(loker.syarat ?? []).slice(0, 3).map((syarat) => (
                   <li key={syarat} className="text-xs text-gray-500 flex gap-2"><span>•</span> {syarat}</li>
                 ))}
               </ul>
               <div className="mt-auto flex flex-col gap-1 text-xs text-gray-500 border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 shrink-0"/> <span><span className="font-semibold text-gray-600">Jadwal:</span> {loker.jadwal}</span></span>
                  <span className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0"/> <span><span className="font-semibold text-gray-600">Kontak:</span> {loker.kontak}</span></span>
                 <span className="mt-2 inline-flex items-center gap-1 text-[#004aad] font-bold">
                   Lihat info resmi <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                 </span>
               </div>
             </Link>
           ))}
        </div>
        )}
      </main>
    </div>
  )
}

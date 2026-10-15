import { ArrowLeft, Search, MapPin, Mail, CalendarDays } from "lucide-react"
import Link from "next/link"

type Loker = {
  id: number
  posisi: string
  perusahaan: string
  lokasi: string
  jenis: "MBKM" | "Magang" | "Full-time"
  gaji: string
  kontak: string
  jadwal: string
  syarat: string[]
  logo: string
}

const daftarLoker: Loker[] = [
  {
    id: 1,
    posisi: "Program Magang Nasional Batch 3 Angkatan II 2026",
    perusahaan: "Kementerian Ketenagakerjaan (Kemnaker)",
    lokasi: "Seluruh Indonesia",
    jenis: "Magang",
    gaji: "Uang saku setara UMK/bln + JKK & JKM",
    kontak: "maganghub.kemnaker.go.id",
    jadwal: "Pendaftaran peserta 27 Okt – 1 Nov 2026",
    syarat: [
      "Warga Negara Indonesia dengan NIK valid.",
      "Lulusan D3/S1/Pendidikan Profesi, lulus maksimal 1 tahun.",
      "Usia maksimal 27 tahun saat mendaftar.",
      "Belum pernah mengikuti Program Pemagangan Nasional.",
    ],
    logo: "KM",
  },
  {
    id: 2,
    posisi: "Internship Pertamina Group (400+ Posisi)",
    perusahaan: "PT Pertamina (Persero)",
    lokasi: "Jakarta & 21 Entitas Pertamina Group",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    kontak: "recruitment@pertamina.com",
    jadwal: "Rekrutmen 1 – 5 Juli 2026",
    syarat: [
      "Fresh graduate D3/S1 dari berbagai disiplin ilmu.",
      "Buat akun di recruitment.pertamina.com.",
      "Lengkapi profil hingga 100%, pilih kategori Internship.",
      "Rekrutmen resmi tidak dipungut biaya.",
    ],
    logo: "PR",
  },
  {
    id: 3,
    posisi: "BRILiaN Future Leader Program (BFLP) Specialist 2026 Wave 4",
    perusahaan: "PT Bank Rakyat Indonesia (Persero) Tbk",
    lokasi: "Seluruh Indonesia",
    jenis: "Full-time",
    gaji: "Tidak dicantumkan",
    kontak: "e-recruitment.bri.co.id",
    jadwal: "Gelombang 4 – Oktober 2026",
    syarat: [
      "S1/S2 dari universitas terakreditasi.",
      "Skor TOEFL ≥ 500 atau sertifikat kemampuan bahasa Inggris setara.",
      "Bersedia ditempatkan di unit BRI mana pun di seluruh Indonesia.",
      "5 posisi: Wholesale Banking, Risk Management, Micro Banking, Business Enabler, Audit.",
    ],
    logo: "BR",
  },
  {
    id: 4,
    posisi: "BRILiaN Banking Associate Program – Junior Associate Mantri",
    perusahaan: "PT Bank Rakyat Indonesia (Persero) Tbk",
    lokasi: "Semarang & Unit Kerja Region 10",
    jenis: "Full-time",
    gaji: "Tidak dicantumkan",
    kontak: "e-recruitment.bri.co.id",
    jadwal: "Ditutup 31 Agustus 2026",
    syarat: [
      "Pendidikan minimal D3 semua jurusan dari universitas terakreditasi.",
      "Usia maksimal 24 tahun.",
      "Bersedia ditempatkan di seluruh Unit Kerja BRI Region 10.",
    ],
    logo: "BR",
  },
  {
    id: 5,
    posisi: "Internship PIC Draft Offering Letter & Kontrak Dokter",
    perusahaan: "PT Kimia Farma (Persero) Tbk",
    lokasi: "Jakarta Pusat",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    kontak: "rekrutmen.kimiafarma.co.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Lulusan S1 jurusan Psikologi atau Manajemen.",
      "Magang 6 bulan, onsite.",
      "Siapkan KTP, transkrip nilai, dan CV.",
      "1 posisi tersedia.",
    ],
    logo: "KF",
  },
  {
    id: 6,
    posisi: "Internship Talent Management",
    perusahaan: "PT Kimia Farma (Persero) Tbk",
    lokasi: "Jakarta Pusat",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    kontak: "rekrutmen.kimiafarma.co.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Magang 6 bulan, onsite di Jakarta Pusat.",
      "Pendaftaran melalui platform Magenta.",
      "1 posisi tersedia.",
    ],
    logo: "KF",
  },
  {
    id: 7,
    posisi: "Internship Administrasi Umum & Kearsipan (KSO TPK Koja)",
    perusahaan: "PT Pelabuhan Indonesia (Persero)",
    lokasi: "Jakarta Utara",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    kontak: "magentaku.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Magang 3 bulan, onsite.",
      "5 posisi tersedia.",
      "Pendaftaran melalui platform Magenta.",
    ],
    logo: "PI",
  },
  {
    id: 8,
    posisi: "Purchasing Commodity Import Intern",
    perusahaan: "PT Berdikari",
    lokasi: "Jakarta Selatan",
    jenis: "Magang",
    gaji: "Tidak dicantumkan",
    kontak: "magentaku.id",
    jadwal: "Penutupan 15 Oktober 2026",
    syarat: [
      "Magang 6 bulan, onsite.",
      "1 posisi tersedia.",
      "Pendaftaran melalui platform Magenta.",
    ],
    logo: "BK",
  },
  {
    id: 9,
    posisi: "Business Management Associates Internship",
    perusahaan: "PT Valbury Semarang",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Rp 500.000 – Rp 3.000.000/bln",
    kontak: "id.indeed.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Lulusan D1 atau sederajat, mahasiswa tingkat akhir semua jurusan.",
      "Usia minimal 21 tahun, maksimal 27 tahun.",
      "Memiliki kemampuan komunikasi yang baik.",
      "Tertarik pada dunia bisnis, investasi, pasar modal, atau pemasaran.",
    ],
    logo: "VB",
  },
  {
    id: 10,
    posisi: "Commodity Data Analyst Internship",
    perusahaan: "PT Valbury Semarang",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Rp 500.000 – Rp 3.000.000/bln",
    kontak: "id.indeed.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Terbuka bagi mahasiswa tingkat akhir dan fresh graduate.",
      "Memahami teknik machine learning.",
      "Membangun model prediktif estimasi suplai dan permintaan komoditas (expert advisor).",
    ],
    logo: "VB",
  },
  {
    id: 11,
    posisi: "Graphic Designer Internship",
    perusahaan: "Sooca Design",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Tidak dicantumkan",
    kontak: "studio@soocadesign.com",
    jadwal: "Magang 3 bulan",
    syarat: [
      "Sedang menempuh pendidikan D3/S1 terkait DKV.",
      "Bersedia menjalani magang di studio Semarang selama 3 bulan.",
      "Membawa surat izin resmi dari kampus.",
    ],
    logo: "SD",
  },
  {
    id: 12,
    posisi: "IT Support Internship",
    perusahaan: "PT Bintang Delapan",
    lokasi: "Jakarta Barat",
    jenis: "Magang",
    gaji: "Rp 3.000.000 – Rp 3.450.000/bln",
    kontak: "id.indeed.com",
    jadwal: "Internship 6 bulan",
    syarat: [
      "Lulusan S1 Teknik Informatika/Sistem Informasi atau semester akhir.",
      "Mampu troubleshooting PC, laptop, CCTV, dan printer.",
      "Terbiasa menggunakan Excel atau Google Sheets.",
      "Bersedia internship 6 bulan di Joglo, Jakarta Barat.",
    ],
    logo: "BD",
  },
  {
    id: 13,
    posisi: "Magang Software Engineer",
    perusahaan: "PT Imperial Teknologi Indonesia",
    lokasi: "Semarang",
    jenis: "MBKM",
    gaji: "Tidak dicantumkan",
    kontak: "glints.com",
    jadwal: "Magang mulai 1 September 2026",
    syarat: [
      "Mahasiswa aktif.",
      "Menguasai PostgreSQL dan JavaScript.",
      "Penempatan di Semarang.",
    ],
    logo: "IT",
  },
  {
    id: 14,
    posisi: "Intern Data Analyst",
    perusahaan: "PT Cemerlang Statistika Indonesia (STATSME)",
    lokasi: "Depok, Jawa Barat",
    jenis: "MBKM",
    gaji: "Rp 1.000.000 – Rp 2.000.000/bln",
    kontak: "glints.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Lulusan atau mahasiswa S1.",
      "Menguasai Microsoft Excel dan SQL.",
      "Magang onsite di Depok.",
    ],
    logo: "ST",
  },
  {
    id: 15,
    posisi: "Data Analyst Intern",
    perusahaan: "Roove Tijara Internasional",
    lokasi: "Bandung (Hybrid)",
    jenis: "MBKM",
    gaji: "Rp 1.000.000 – Rp 1.500.000/bln",
    kontak: "glints.com",
    jadwal: "Tidak dicantumkan",
    syarat: [
      "Lulusan S1.",
      "Menguasai Microsoft Excel.",
      "Bekerja secara hybrid dari Bandung.",
    ],
    logo: "RT",
  },
  {
    id: 16,
    posisi: "Magang Nasional Instansi Pemerintah (±1.200 Peserta)",
    perusahaan: "Kemendikdasmen",
    lokasi: "Jakarta",
    jenis: "Magang",
    gaji: "Uang saku bulanan dari program MagangHub",
    kontak: "maganghub.kemnaker.go.id",
    jadwal: "Batch 2 ditutup 8 September 2026",
    syarat: [
      "Fresh graduate perguruan tinggi.",
      "Kuota ±1.200 peserta.",
      "Penempatan di lingkungan pemerintahan.",
      "Pendaftaran melalui portal MagangHub.",
    ],
    logo: "KD",
  },
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/career" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Career
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8">Eksplorasi Lowongan & MBKM</h1>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-8">
           <div className="flex-1 flex items-center px-4"><Search className="w-5 h-5 text-gray-400 mr-2"/><input type="text" placeholder="Cari posisi magang atau full-time..." className="w-full outline-none bg-transparent"/></div>
           <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Cari</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
           {daftarLoker.map((loker) => (
             <div key={loker.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-start justify-between gap-3 mb-4">
                 <div className="flex items-center gap-3">
                   <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-sm">{loker.logo}</div>
                   <div>
                     <h3 className="font-bold text-lg leading-tight">{loker.posisi}</h3>
                     <p className="text-blue-600 font-bold text-sm">{loker.perusahaan}</p>
                   </div>
                 </div>
                 <span className="shrink-0 text-[11px] font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-600">{loker.jenis}</span>
               </div>
               <div className="flex gap-2 text-xs text-gray-500 mb-3"><MapPin className="w-4 h-4 shrink-0"/> {loker.lokasi}</div>
               <p className="text-sm font-bold text-emerald-600 mb-3">{loker.gaji}</p>
               <ul className="space-y-1 mb-4">
                 {loker.syarat.slice(0, 3).map((syarat) => (
                   <li key={syarat} className="text-xs text-gray-500 flex gap-2"><span>•</span> {syarat}</li>
                 ))}
               </ul>
               <div className="flex flex-col gap-1 text-xs text-gray-500 border-t border-gray-100 pt-3">
                 <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 shrink-0"/> {loker.jadwal}</span>
                 <span className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0"/> {loker.kontak}</span>
               </div>
             </div>
           ))}
        </div>
      </main>
    </div>
  )
}

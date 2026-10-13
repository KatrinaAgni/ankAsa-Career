"use client"

import { useState } from "react"
import { 
  Briefcase, ArrowLeft, Search, FilePlus2, 
  Archive, FileText, LayoutTemplate, MessageSquareText 
} from "lucide-react"
import Link from "next/link"

export default function CareerPage() {
  // State untuk mengontrol menu mana yang sedang aktif di sidebar
  const [activeMenu, setActiveMenu] = useState("loker")

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      
      {/* Header Sederhana */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Layout Utama: Sidebar & Area Konten */}
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-7xl">
        
        {/* SIDEBAR (Kiri) */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="sticky top-24 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-3xl p-6">
            <div className="mb-6 px-2">
              <h2 className="text-xl font-extrabold text-gray-900">Ankasa Career</h2>
              <p className="text-xs text-gray-500 mt-1">Dasbor Karier Pribadi</p>
            </div>
            
            <nav className="space-y-2">
              <button onClick={() => setActiveMenu("loker")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "loker" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}>
                <Search className="w-5 h-5" /> Loker, Magang & MBKM
              </button>
              
              <button onClick={() => setActiveMenu("cv_ai")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "cv_ai" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}>
                <FilePlus2 className="w-5 h-5" /> Pembuat CV AI
              </button>
              
              <button onClick={() => setActiveMenu("portofolio")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "portofolio" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}>
                <LayoutTemplate className="w-5 h-5" /> Portofolio Digital
              </button>
              
              <div className="my-4 border-t border-gray-200"></div>

              <button onClick={() => setActiveMenu("arsip")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "arsip" ? "bg-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}>
                <Archive className="w-5 h-5" /> Brankas Arsip Digital
              </button>
              
              <button onClick={() => setActiveMenu("artikel")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "artikel" ? "bg-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-white hover:shadow-sm"}`}>
                <MessageSquareText className="w-5 h-5" /> Jasa Publikasi Artikel
              </button>
            </nav>
          </div>
        </aside>

        {/* AREA KONTEN (Kanan) - Dinamis berdasarkan menu yang diklik */}
        <main className="flex-1">
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] p-8 min-h-[70vh]">
            
            {/* 1. KONTEN LOKER */}
            {activeMenu === "loker" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-extrabold mb-2">Portal Lowongan & MBKM</h2>
                <p className="text-gray-500 mb-8">Temukan kesempatan karier gratis yang paling cocok dengan profilmu.</p>
                <div className="flex bg-white p-2 rounded-2xl border border-gray-200 mb-6 shadow-sm">
                  <div className="flex-1 flex items-center px-4"><Search className="w-5 h-5 text-gray-400 mr-2"/><input type="text" placeholder="Cari posisi magang..." className="w-full outline-none bg-transparent"/></div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">Cari</button>
                </div>
                {/* Template Card Loker */}
                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold mb-2 inline-block">Program MBKM (Gratis)</span>
                  <h3 className="font-bold text-xl">Junior Web Developer</h3>
                  <p className="text-sm text-gray-500 mb-4">PT Inovasi Teknologi Semarang • WFO</p>
                  <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold text-sm">Lamar Cepat dengan CV Ankasa</button>
                </div>
              </div>
            )}

            {/* 2. KONTEN CV AI */}
            {activeMenu === "cv_ai" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-extrabold mb-2">Pembangun CV & Analisis ATS</h2>
                <p className="text-gray-500 mb-8">Ketik pengalamanmu, dan AI kami akan merapikannya menjadi bahasa profesional.</p>
                {/* Kita bisa memanggil komponen <CvBuilder /> di sini nanti */}
                <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl text-center border-dashed">
                  <FilePlus2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-bold text-blue-800">Ruang Kerja AI Aktif</h3>
                  <p className="text-sm text-blue-600 mt-2">Di sini nanti komponen formulir CV AI-mu akan dimuat.</p>
                </div>
              </div>
            )}

            {/* 3. KONTEN BRANKAS ARSIP */}
            {activeMenu === "arsip" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-extrabold mb-2">Brankas Arsip Digital</h2>
                <p className="text-gray-500 mb-8">Simpan KTP, Ijazah, dan Sertifikat. AI akan membaca dokumen ini otomatis saat kamu membuat CV.</p>
                <div className="bg-gray-50 border-2 border-gray-200 border-dashed p-10 rounded-2xl text-center cursor-pointer hover:bg-gray-100">
                  <Archive className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-700">Tarik & Lepas File ke Sini</h3>
                  <p className="text-sm text-gray-500 mt-2">Unggah aman ke server Ankasa.</p>
                </div>
              </div>
            )}

            {/* 4. KONTEN JASA ARTIKEL/PENERBITAN */}
            {activeMenu === "artikel" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-extrabold mb-2">Jasa Pembuatan & Penerbitan Artikel</h2>
                <p className="text-gray-500 mb-8">Kirimkan rancangan atau ide penelitianmu, tim ahli kami siap membantu menyusun dan menerbitkannya.</p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Topik / Ide Judul</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none" placeholder="Masukkan ide tulisan..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Target Penerbitan</label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none">
                      <option>Artikel Berita (indonesia.id)</option>
                      <option>Jurnal SINTA (Review Eksekutif)</option>
                    </select>
                  </div>
                  <button className="w-full bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-green-700">
                    Kirim Pesanan (Konsultasi via WhatsApp)
                  </button>
                </form>
              </div>
            )}

            {/* 5. KONTEN PORTOFOLIO */}
            {activeMenu === "portofolio" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-extrabold mb-2">Portofolio Digital</h2>
                <p className="text-gray-500 mb-8">Pamerkan proyek dan karyamu di ruang pajang digital yang elegan.</p>
                <div className="text-center py-12 text-gray-400">
                  <LayoutTemplate className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Fitur Portofolio sedang dalam tahap pengembangan.</p>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
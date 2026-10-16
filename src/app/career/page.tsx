"use client"

import { useState, useEffect } from "react"
import { 
  Briefcase, ArrowLeft, Search, FilePlus2, 
  Archive, FileText, LayoutTemplate, MessageSquareText,
  MapPin, DollarSign, Filter, Link as LinkIcon, Send, Lock
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase" // Import koneksi Supabase

export default function CareerPage() {
  const [activeMenu, setActiveMenu] = useState("loker")
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  
  // State untuk menyimpan data dari database
  const [lokers, setLokers] = useState<any[]>([])
  
  // State untuk filter pencarian
  const [filterLokasi, setFilterLokasi] = useState("Semua")
  const [filterJenis, setFilterJenis] = useState("Semua")
  const [searchPosisi, setSearchPosisi] = useState("")

  // Mengambil data loker dari Supabase saat halaman dimuat
  useEffect(() => {
    const fetchLokers = async () => {
      const { data, error } = await supabase
        .from('loker')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setLokers(data);
      }
    };
    fetchLokers();
  }, []);

  // Logika Filter
  const filteredLokers = lokers.filter((loker) => {
    const matchLokasi = filterLokasi === "Semua" || loker.lokasi?.toLowerCase().includes(filterLokasi.toLowerCase());
    const matchJenis = filterJenis === "Semua" || loker.jenis?.toLowerCase().includes(filterJenis.toLowerCase());
    const matchPosisi = searchPosisi === "" || loker.posisi?.toLowerCase().includes(searchPosisi.toLowerCase());
    return matchLokasi && matchJenis && matchPosisi;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 max-w-7xl">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-3xl p-5">
            <div className="mb-6 px-2">
              <h2 className="text-xl font-extrabold text-gray-900">Ankasa Career</h2>
            </div>
            
            <nav className="space-y-2">
              <button onClick={() => {setActiveMenu("loker"); setSelectedJob(null);}} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "loker" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <Search className="w-5 h-5" /> Portal Loker
              </button>
              <button onClick={() => setActiveMenu("cv_ai")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "cv_ai" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <FilePlus2 className="w-5 h-5" /> CV Maker AI
              </button>
              <button onClick={() => setActiveMenu("portofolio")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "portofolio" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <LayoutTemplate className="w-5 h-5" /> Portofolio
              </button>
              <div className="my-2 border-t border-gray-200"></div>
              <button onClick={() => setActiveMenu("arsip")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "arsip" ? "bg-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <Archive className="w-5 h-5" /> Arsip Digital
              </button>
              <button onClick={() => setActiveMenu("publikasi")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "publikasi" ? "bg-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <MessageSquareText className="w-5 h-5" /> Publikasi
              </button>
            </nav>
          </div>
        </aside>

        {/* KONTEN */}
        <main className="flex-1 min-w-0">
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-[2rem] p-6 md:p-8 min-h-[75vh]">
            
            {/* 1. LOKER (TERHUBUNG SUPABASE) */}
            {activeMenu === "loker" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-4">Portal Lowongan & MBKM</h2>
                
                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-200 mb-6 flex flex-wrap gap-3 items-center">
                   <Filter className="w-5 h-5 text-gray-400" />
                   <select value={filterLokasi} onChange={(e) => setFilterLokasi(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none">
                     <option value="Semua">Lokasi (Semua)</option><option value="Semarang">Semarang</option><option value="Jakarta">Jakarta</option><option value="Remote">Remote</option>
                   </select>
                   <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)} className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none">
                     <option value="Semua">Jenis (Semua)</option><option value="Full-time">Full-time</option><option value="Magang">Magang</option><option value="MBKM">MBKM</option>
                   </select>
                   <input type="text" value={searchPosisi} onChange={(e) => setSearchPosisi(e.target.value)} placeholder="Posisi (Cth: Admin)" className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-2 outline-none flex-grow" />
                </div>

                {/* Tampilan Detail / List */}
                {selectedJob ? (
                  <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                    <button onClick={() => setSelectedJob(null)} className="text-sm font-bold text-blue-600 mb-4">&larr; Kembali ke daftar</button>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-xl">{selectedJob.logo || "A"}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedJob.posisi}</h3>
                        <p className="text-gray-500 font-medium">{selectedJob.perusahaan}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
                      <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-400 block text-xs">Lokasi</span>{selectedJob.lokasi}</div>
                      <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-400 block text-xs">Jenis</span>{selectedJob.jenis}</div>
                      <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-400 block text-xs">Gaji</span>{selectedJob.gaji}</div>
                      <div className="bg-gray-50 p-3 rounded-xl"><span className="text-gray-400 block text-xs">Email</span>{selectedJob.email}</div>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Syarat & Ketentuan</h4>
                      <div className="text-gray-600 text-sm whitespace-pre-wrap">{selectedJob.syarat}</div>
                    </div>
                    <a href={`mailto:${selectedJob.email}`} className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-xl w-full md:w-auto text-center">Lamar Sekarang</a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lokers.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">Memuat data loker dari database... (atau data masih kosong)</div>
                    ) : filteredLokers.length === 0 ? (
                      <div className="text-center py-10 text-gray-500">Tidak ada loker yang sesuai dengan filter.</div>
                    ) : (
                      filteredLokers.map((loker) => (
                        <div key={loker.id} onClick={() => setSelectedJob(loker)} className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center">
                          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold shrink-0">{loker.logo || "A"}</div>
                          <div className="flex-grow">
                            <h3 className="font-bold text-lg leading-tight">{loker.posisi}</h3>
                            <p className="text-sm text-gray-500">{loker.perusahaan} • {loker.lokasi}</p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">{loker.jenis}</span>
                              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded font-bold">{loker.gaji}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Menu Lainnya (CV AI, Portofolio, Arsip, Publikasi) sama seperti sebelumnya */}
            {activeMenu === "cv_ai" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold mb-1">Pembuat & Analisis CV AI</h2>
                    <p className="text-gray-500 text-sm">Gunakan AI untuk merapikan CV-mu agar lolos filter ATS.</p>
                  </div>
                  <div className="bg-rose-100 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                    Sisa Token: 1/1 (Trial)
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
                    <Lock className="w-10 h-10 text-gray-300 mb-3" />
                    <h3 className="font-bold text-gray-700">Gunakan 1 Token AI Anda?</h3>
                    <p className="text-sm text-gray-500 mb-4 max-w-sm">Anda sedang menggunakan akun gratis. Anda hanya memiliki 1 kali kesempatan.</p>
                    <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 shadow-sm">
                      Mulai Generate CV AI
                    </button>
                    <Link href="/harga" className="text-xs text-blue-600 mt-4 font-bold hover:underline">Upgrade ke Career Pro untuk Unlimited</Link>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "portofolio" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-2">Penyusunan Portofolio</h2>
                <p className="text-gray-500 text-sm mb-6">Kirim karya via Drive, tim Ankasa akan merapikannya menjadi portofolio digital.</p>
                <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Link Google Drive (Folder Karya)</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-blue-400">
                      <LinkIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <input type="text" placeholder="https://drive.google.com/..." className="bg-transparent w-full outline-none text-sm" />
                    </div>
                  </div>
                  <a href="https://wa.me/6282112345678?text=Halo%20Admin,%20saya%20ingin%20membuat%20portofolio." target="_blank" className="block text-center bg-gray-900 text-white font-bold py-3 px-6 rounded-xl w-full hover:bg-gray-800">Kirim ke WA Admin</a>
                </div>
              </div>
            )}

            {activeMenu === "arsip" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-2">Jasa Kelola Arsip Digital</h2>
                <p className="text-gray-500 text-sm mb-6">Kirimkan link Drive dokumen, kami rapikan dan kirim file ZIP-nya via WhatsApp.</p>
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-amber-900 mb-2">Link Google Drive</label>
                    <div className="flex items-center bg-white border border-amber-200 rounded-xl px-3 py-2 focus-within:border-amber-400">
                      <LinkIcon className="w-4 h-4 text-amber-500 mr-2" />
                      <input type="text" placeholder="Masukkan link folder Drive..." className="bg-transparent w-full outline-none text-sm" />
                    </div>
                  </div>
                  <a href="https://wa.me/6282112345678?text=Halo%20Admin,%20tolong%20buatkan%20ZIP%20untuk%20arsip%20saya." target="_blank" className="block text-center bg-amber-500 text-white font-bold py-3 px-6 rounded-xl w-full hover:bg-amber-600">
                    Minta File ZIP via WA
                  </a>
                </div>
              </div>
            )}

            {activeMenu === "publikasi" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-2">Jasa Pembuatan Artikel</h2>
                <div className="bg-white border border-gray-200 p-6 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Topik Utama</label>
                    <input type="text" placeholder="Cth: Teknologi Pertanian" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Ide Spesifik</label>
                    <textarea rows={3} placeholder="Jelaskan gagasan artikel..." className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none"></textarea>
                  </div>
                  <a href="https://wa.me/6282112345678" target="_blank" className="block text-center bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700">Konsultasi via WA</a>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
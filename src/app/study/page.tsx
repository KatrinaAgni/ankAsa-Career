"use client"

import { useState, useEffect } from "react"
import { 
  ArrowLeft, PenTool, Globe, BookOpen, 
  FileText, Sparkles, UploadCloud, Lock, PanelLeftClose, PanelLeftOpen
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase" // Pastikan Supabase terhubung

export default function StudyPage() {
  const [activeMenu, setActiveMenu] = useState("katalog")
  
  // State untuk Hide/Show Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // State untuk database
  const [ebooks, setEbooks] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: dataEbook } = await supabase.from('ebook').select('*').order('created_at', { ascending: false });
      if (dataEbook) setEbooks(dataEbook);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6 gap-4">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> <span className="hidden sm:inline">Beranda</span>
          </Link>
          <div className="w-px h-5 bg-gray-300 mx-2"></div>
          
          {/* Tombol Toggle Sidebar */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors font-bold text-sm"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            <span className="hidden sm:inline">{isSidebarOpen ? "Tutup Menu" : "Buka Menu"}</span>
          </button>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 max-w-7xl transition-all duration-300">
        
        {/* SIDEBAR (HIDEABLE) */}
        <aside className={`${isSidebarOpen ? 'w-full md:w-64 opacity-100' : 'w-0 overflow-hidden opacity-0 p-0 m-0 border-0'} shrink-0 transition-all duration-300 ease-in-out`}>
          <div className="sticky top-24 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-3xl p-5 w-full md:w-64">
            <div className="mb-6 px-2">
              <h2 className="text-xl font-extrabold text-gray-900">Ankasa Study</h2>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveMenu("katalog")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "katalog" ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <BookOpen className="w-5 h-5" /> Katalog E-book
              </button>
              <button onClick={() => setActiveMenu("rangkuman_ai")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "rangkuman_ai" ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <Sparkles className="w-5 h-5" /> Rangkuman AI
              </button>
              <button onClick={() => setActiveMenu("template")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "template" ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <FileText className="w-5 h-5" /> Download Template
              </button>
              <div className="my-2 border-t border-gray-200"></div>
              <button onClick={() => setActiveMenu("desain")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "desain" ? "bg-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <PenTool className="w-5 h-5" /> Jasa Akademik
              </button>
              <button onClick={() => setActiveMenu("conference")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "conference" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}>
                <Globe className="w-5 h-5" /> Info Conference
              </button>
            </nav>
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white/70 backdrop-blur-xl border border-white shadow-sm rounded-[2rem] p-6 md:p-8 min-h-[75vh]">
            
            {activeMenu === "katalog" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-6">Katalog E-Book Ankasa</h2>
                
                <div className="space-y-8">
                  {ebooks.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">Memuat katalog e-book dari database...</div>
                  ) : (
                    ebooks.map((ebook) => (
                      <div key={ebook.id} className="flex flex-col lg:flex-row gap-8 bg-white border border-gray-200 p-6 rounded-3xl shadow-sm">
                        <div className="flex-1">
                          <div className={`w-full h-48 ${ebook.cover_warna || 'bg-gray-900'} rounded-xl flex items-center justify-center text-white mb-4`}>
                             <BookOpen className="w-12 h-12 opacity-50" />
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 text-[10px] font-bold rounded uppercase">{ebook.kategori || "Pendidikan"}</span>
                          <h3 className="text-2xl font-bold mt-2">{ebook.judul}</h3>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{ebook.deskripsi}</p>
                          <div className="mt-6 flex items-center justify-between">
                             <div className="text-2xl font-black text-gray-900">Rp {ebook.harga?.toLocaleString('id-ID')}</div>
                             <a href="https://wa.me/6282112345678" target="_blank" className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700">Beli E-book</a>
                          </div>
                        </div>

                        {/* Area Preview Terkunci */}
                        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-4 flex flex-col relative overflow-hidden">
                          <div className="text-xs font-bold text-gray-400 mb-2 text-center uppercase tracking-wider">Preview Gratis (Hal 1)</div>
                          <div className="flex-grow bg-white border border-gray-200 shadow-sm p-4 text-xs text-gray-400 overflow-hidden relative">
                             <h4 className="font-bold text-gray-800 mb-2">BAB 1</h4>
                             <p className="mb-2 text-gray-600">Buku ini disusun sebagai panduan dasar. Banyak konsep yang akan kita kupas tuntas di bab-bab selanjutnya...</p>
                             <p className="blur-sm select-none">Ini adalah teks yang disamarkan. Anda harus membeli e-book ini untuk membaca kelanjutannya. Hak cipta dilindungi.</p>
                             
                             <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center flex-col">
                                <Lock className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="font-bold text-gray-600 text-xs bg-white px-3 py-1 rounded-full shadow-sm">Beli untuk baca penuh</span>
                             </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeMenu === "rangkuman_ai" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold mb-1">AI Perangkum Materi</h2>
                    <p className="text-gray-500 text-sm">Ubah modul tebal jadi poin ringkas.</p>
                  </div>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">Freemium</span>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 border-dashed p-10 rounded-2xl text-center">
                  <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-700">Unggah PDF Modul Kuliah</h3>
                  <p className="text-sm text-gray-500 mt-2 mb-4">Max 50 Halaman (Gratis). Unlimited khusus Study Plus.</p>
                  <button className="bg-rose-600 text-white font-bold py-2 px-6 rounded-xl shadow-sm">Ringkas Sekarang</button>
                </div>
              </div>
            )}

            {activeMenu === "template" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-6">Template Dokumen Akademik</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Template Dasar (Gratis)</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 p-4 rounded-xl flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700">Cover Makalah</span>
                        <button className="text-xs bg-gray-100 px-3 py-1 rounded-lg font-bold">Unduh</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-amber-700">Template Premium (Berbayar)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex justify-between items-center">
                        <span className="text-sm font-bold text-amber-900">Proposal PKM & RAB Otomatis</span>
                        <button className="text-xs bg-amber-500 text-white px-3 py-1 rounded-lg font-bold">Rp 15k</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMenu === "desain" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-2">Pemesanan Jasa Akademik</h2>
                <div className="bg-white border border-gray-200 p-6 rounded-2xl">
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Jenis Jasa</label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none">
                      <option>Desain Poster Seminar / Lomba</option>
                      <option>Desain Presentasi PPT (Custom)</option>
                      <option>Penyusunan Makalah Akademik</option>
                    </select>
                  </div>
                  <a href="https://wa.me/6282112345678" target="_blank" className="block text-center bg-amber-500 text-white font-bold py-3 rounded-xl">Kirim Form via WA</a>
                </div>
              </div>
            )}

            {activeMenu === "conference" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold mb-2">Info Conference</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Jadwal, tenggat, dan lokasi conference akademik dalam satu halaman.
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-900">Conference & Seminar</h3>
                    <p className="mt-1 text-sm text-blue-700/80">
                      Lihat daftar conference terbaru, filter berdasarkan status, lokasi, topik, dan tenggat.
                    </p>
                  </div>
                  <Link
                    href="/study/conference"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
                  >
                    <Globe className="h-4 w-4" /> Buka halaman conference
                  </Link>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  PenTool,
  Globe,
  BookOpen,
  FileText,
  Sparkles,
  UploadCloud,
  Calendar,
  Filter,
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Pastikan Supabase terhubung

export default function StudyPage() {
  const [activeMenu, setActiveMenu] = useState("katalog");

  // State untuk Hide/Show Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State untuk database
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);

  const [filterRegional, setFilterRegional] = useState("Semua");
  const [filterIndeks, setFilterIndeks] = useState("Semua");

  useEffect(() => {
    const fetchData = async () => {
      const { data: dataEbook } = await supabase
        .from("ebook")
        .select("*")
        .order("created_at", { ascending: false });
      if (dataEbook) setEbooks(dataEbook);

      const { data: dataConf } = await supabase
        .from("conference")
        .select("*")
        .order("created_at", { ascending: false });
      if (dataConf) setConferences(dataConf);
    };
    fetchData();
  }, []);

  const filteredConferences = conferences.filter((conf) => {
    const matchReg =
      filterRegional === "Semua" ||
      conf.regional?.toLowerCase().includes(filterRegional.toLowerCase());
    const matchInd =
      filterIndeks === "Semua" ||
      conf.indeks?.toLowerCase().includes(filterIndeks.toLowerCase());
    return matchReg && matchInd;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6 gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />{" "}
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <div className="w-px h-5 bg-gray-300 mx-2"></div>

          {/* Tombol Toggle Sidebar */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors font-bold text-sm"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isSidebarOpen ? "Tutup Menu" : "Buka Menu"}
            </span>
          </button>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 max-w-7xl transition-all duration-300">
        {/* SIDEBAR (HIDEABLE) */}
        <aside
          className={`${isSidebarOpen ? "w-full md:w-64 opacity-100" : "w-0 overflow-hidden opacity-0 p-0 m-0 border-0"} shrink-0 transition-all duration-300 ease-in-out`}
        >
          <div className="sticky top-24 bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-3xl p-5 w-full md:w-64">
            <div className="mb-6 px-2">
              <h2 className="text-xl font-extrabold text-gray-900">
                Ankasa Study
              </h2>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveMenu("katalog")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "katalog" ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
              >
                <BookOpen className="w-5 h-5" /> Katalog E-book
              </button>
              <button
                onClick={() => setActiveMenu("rangkuman_ai")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "rangkuman_ai" ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
              >
                <Sparkles className="w-5 h-5" /> Rangkuman AI
              </button>
              <button
                onClick={() => setActiveMenu("template")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "template" ? "bg-rose-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
              >
                <FileText className="w-5 h-5" /> Download Template
              </button>
              <div className="my-2 border-t border-gray-200"></div>
              <button
                onClick={() => setActiveMenu("desain")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "desain" ? "bg-amber-500 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
              >
                <PenTool className="w-5 h-5" /> Jasa Akademik
              </button>
              <button
                onClick={() => setActiveMenu("conference")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeMenu === "conference" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-white"}`}
              >
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
                <h2 className="text-2xl font-extrabold mb-6">
                  Katalog E-Book Ankasa
                </h2>

                <div className="space-y-8">
                  {ebooks.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      Memuat katalog e-book dari database...
                    </div>
                  ) : (
                    ebooks.map((ebook) => (
                      <div
                        key={ebook.id}
                        className="flex flex-col lg:flex-row gap-8 bg-white border border-gray-200 p-6 rounded-3xl shadow-sm"
                      >
                        <div className="flex-1">
                          <div
                            className={`w-full h-48 ${ebook.cover_warna || "bg-gray-900"} rounded-xl flex items-center justify-center text-white mb-4`}
                          >
                            <BookOpen className="w-12 h-12 opacity-50" />
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 text-[10px] font-bold rounded uppercase">
                            {ebook.kategori || "Pendidikan"}
                          </span>
                          <h3 className="text-2xl font-bold mt-2">
                            {ebook.judul}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            {ebook.deskripsi}
                          </p>
                          <div className="mt-6 flex items-center justify-between">
                            <div className="text-2xl font-black text-gray-900">
                              Rp {ebook.harga?.toLocaleString("id-ID")}
                            </div>
                            <a
                              href="https://wa.me/6282112345678"
                              target="_blank"
                              className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700"
                            >
                              Beli E-book
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Grid interaktif untuk jasa Study */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kartu Jasa Desain */}
              <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col">
                <PenTool className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Pesan Jasa Desain</h3>
                <p className="text-sm text-gray-500 mt-2 mb-6 flex-grow">
                  Formulir pemesanan untuk desain visual poster presentasi,
                  seminar, dan layout makalah profesional.
                </p>
                <Link
                  href="/study/design"
                  className="w-full py-3 bg-amber-100 text-amber-700 rounded-xl font-bold hover:bg-amber-200 transition-colors inline-block text-center"
                >
                  Form Pemesanan
                </Link>
              </div>

              {/* Kartu Info Conference */}
              <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col">
                <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Info Conference</h3>
                <p className="text-sm text-gray-500 mt-2 mb-6 flex-grow">
                  Daftar pengumuman Call for Papers terbaru dan pendaftaran
                  agenda seminar tingkat nasional hingga internasional.
                </p>
                <Link
                  href="/study/conference"
                  className="w-full py-3 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200 transition-colors inline-block text-center"
                >
                  Lihat Jadwal
                </Link>
              </div>

              {/* Kartu Perpustakaan Materi */}
              <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col">
                <BookOpen className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-bold text-xl">Perpustakaan Materi</h3>
                <p className="text-sm text-gray-500 mt-2 mb-6 flex-grow">
                  Contoh e-book & modul, plus jasa pembuatan buku custom sesuai
                  kebutuhanmu.
                </p>
                <Link
                  href="/study/catalog"
                  className="w-full py-3 bg-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-200 transition-colors inline-block text-center"
                >
                  Buka Katalog
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

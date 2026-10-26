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
  Lock,
  PanelLeftClose,
  PanelLeftOpen,
  Library,
  Search,
  Download,
  CheckCircle2,
  Zap,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ConferenceList from "./conference/ConferenceList";

export default function StudyPage() {
  const [activeMenu, setActiveMenu] = useState("katalog");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State Data Supabase
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

  useEffect(() => {
    const fetchStudyData = async () => {
      // Tarik Data E-Book
      const { data: ebookData } = await supabase
        .from("ebook")
        .select("*")
        .order("created_at", { ascending: false });
      if (ebookData) setEbooks(ebookData);

      // Tarik Data Conference (Punya Salma)
      const { data: confData } = await supabase
        .from("conference")
        .select("*")
        .order("tanggal_mulai", { ascending: true });
      if (confData) setConferences(confData);
    };

    fetchStudyData();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      
      {/* HEADER ATAS */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6 gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-[#004aad] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <div className="w-px h-5 bg-gray-200 mx-1"></div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center text-gray-500 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 hover:text-[#004aad] transition-colors"
            title={isSidebarOpen ? "Tutup Menu" : "Buka Menu"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 max-w-7xl transition-all duration-300">
        
        {/* SIDEBAR NAVIGASI DINAMIS */}
        <aside
          className={`${
            isSidebarOpen
              ? "w-full md:w-64 opacity-100"
              : "w-0 overflow-hidden opacity-0 p-0 m-0 border-0"
          } shrink-0 transition-all duration-300 ease-in-out`}
        >
          <div className="sticky top-20 bg-white/70 backdrop-blur-md border border-white/80 shadow-sm rounded-[2rem] p-5 w-full md:w-64">
            <div className="mb-6 px-2">
              <h2 className="text-xl font-extrabold text-[#004aad]">
                Ankasa Study
              </h2>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveMenu("katalog")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "katalog"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <BookOpen className="w-4 h-4" /> Katalog E-book
              </button>
              <Link
                href="/study/catalog"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
              >
                <Library className="w-4 h-4" /> Perpustakaan & Request
              </Link>

              <button
                onClick={() => setActiveMenu("conference")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "conference"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <Globe className="w-4 h-4" /> Info Conference
              </button>

              <button
                onClick={() => setActiveMenu("rangkuman_ai")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "rangkuman_ai"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <Sparkles className="w-4 h-4" /> Rangkuman AI
              </button>

              <button
                onClick={() => setActiveMenu("template")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "template"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <FileText className="w-4 h-4" /> Download Template
              </button>

              <div className="my-2 border-t border-gray-100"></div>

              <button
                onClick={() => setActiveMenu("desain")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "desain"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <PenTool className="w-4 h-4" /> Jasa Akademik
              </button>
            </nav>
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm rounded-[2rem] p-6 md:p-8 min-h-[75vh]">
            
            {/* 1. TAB KATALOG E-BOOK */}
            {activeMenu === "katalog" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">
                      Katalog E-Book Ankasa
                    </h2>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      Pilihan e-book dan modul pembelajaran resmi untuk menunjang studi.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Link
                      href="/study/catalog"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all"
                    >
                      <Library className="w-3.5 h-3.5" /> Perpustakaan & Request Buku
                    </Link>
                    <Link
                      href="/study/catalog/request/lacak"
                      className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-extrabold hover:border-[#004aad] hover:text-[#004aad] shadow-sm transition-all"
                    >
                      <Search className="w-3.5 h-3.5 text-[#004aad]" /> Lacak Pesanan Custom
                    </Link>
                  </div>
                </div>

                <div className="space-y-6">
                  {ebooks.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium text-xs">
                      Memuat katalog e-book dari database Supabase...
                    </div>
                  ) : (
                    ebooks.map((ebook) => (
                      <div
                        key={ebook.id}
                        className="flex flex-col lg:flex-row gap-6 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div
                              className={`w-full h-40 ${
                                ebook.cover_warna || "bg-gradient-to-br from-[#004aad] to-[#002b66]"
                              } rounded-2xl flex items-center justify-center text-white mb-4 shadow-inner`}
                            >
                              <BookOpen className="w-10 h-10 opacity-70" />
                            </div>
                            <span className="bg-blue-50 text-[#004aad] px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                              {ebook.kategori || "Pendidikan"}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mt-2">
                              {ebook.judul}
                            </h3>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">
                              {ebook.deskripsi}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                              <span className="text-[10px] text-gray-400 font-bold block uppercase">Harga E-Book</span>
                              <div className="text-xl font-black text-gray-900">
                                Rp {ebook.harga ? ebook.harga.toLocaleString("id-ID") : "0"}
                              </div>
                            </div>
                            <a
                              href={`https://wa.me/6285848953387?text=Halo%20Admin%20Ankasa,%20saya%20ingin%20membeli%20E-Book:%20${encodeURIComponent(ebook.judul)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#004aad] hover:bg-[#00337a] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-[#004aad]/20 transition-all inline-flex items-center gap-1.5"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" /> Beli E-Book
                            </a>
                          </div>
                        </div>

                        <div className="flex-1 bg-gray-50/80 rounded-2xl border border-gray-200/60 p-4 flex flex-col relative overflow-hidden min-h-[220px]">
                          <div className="text-[10px] font-extrabold text-gray-400 mb-2 text-center uppercase tracking-wider">
                            Preview Terbatas (Halaman 1)
                          </div>
                          <div className="flex-grow bg-white border border-gray-100 rounded-xl shadow-inner p-4 text-[11px] text-gray-400 overflow-hidden relative">
                            <h4 className="font-bold text-gray-800 mb-1">
                              BAB 1 — PENDAHULUAN & KONSEP
                            </h4>
                            <p className="mb-2 text-gray-600">
                              Modul ini dirancang khusus untuk mempermudah pemahaman konsep dasar akademik secara sistematis...
                            </p>
                            <p className="blur-[3px] select-none text-gray-300">
                              Ini adalah konten halaman yang disamarkan. Anda perlu membeli e-book resmi ini untuk mengakses seluruh isi bab dan materi lengkap tanpa batasan.
                            </p>

                            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center flex-col p-4 text-center">
                              <div className="p-3 bg-white text-[#004aad] rounded-full shadow-md mb-2">
                                <Lock className="w-5 h-5" />
                              </div>
                              <span className="font-extrabold text-gray-800 text-xs bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                Akses Penuh Terkunci
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* BANNER JASA BUKU CUSTOM */}
                <div className="mt-10 bg-gradient-to-r from-[#004aad] to-[#002b66] text-white rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#5de0e6] rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-[#5de0e6] text-[10px] font-extrabold uppercase tracking-wider mb-2 bg-white/10 px-3 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" /> Jasa Modul & Buku Custom
                    </div>
                    <h2 className="text-2xl font-extrabold">
                      Butuh Modul Belajar atau Buku Khusus?
                    </h2>
                    <p className="text-blue-100/80 mt-2 max-w-xl text-xs font-medium leading-relaxed">
                      Sampaikan kebutuhanmu — misalnya "Buku latihan soal matematika SD". Tim kami akan menyusunkan materi dan desain khusus sesuai permintaanmu.
                    </p>
                  </div>
                  <Link
                    href="/study/catalog/request"
                    className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 bg-[#5de0e6] text-[#004aad] hover:bg-[#4bcad0] font-black px-6 py-3.5 rounded-xl transition-all shadow-md text-xs"
                  >
                    <Sparkles className="w-4 h-4" /> Pesan Buku Custom
                  </Link>
                </div>
              </div>
            )}

            {/* 2. TAB INFO CONFERENCE */}
            {activeMenu === "conference" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                    Jadwal Conference & Seminar
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Tenggat dan biaya dapat berubah sewaktu-waktu. Selalu periksa situs resmi sebelum mendaftar.
                  </p>
                </div>

                {conferences.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 font-medium text-xs">
                    Memuat data conference dari database Supabase...
                  </div>
                ) : (
                  <ConferenceList rows={conferences} today={today} />
                )}
              </div>
            )}

            {/* 3. TAB RANGKUMAN AI */}
            {activeMenu === "rangkuman_ai" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                      AI Perangkum Modul & Materi
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      Konversi dokumen PDF tebal menjadi poin-poin ringkasan penting dalam hitungan detik.
                    </p>
                  </div>
                  <span className="bg-blue-50 text-[#004aad] px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase">
                    Freemium
                  </span>
                </div>

                <div className="bg-white border-2 border-dashed border-gray-200 p-10 rounded-3xl text-center hover:border-[#5de0e6] transition-colors cursor-pointer group">
                  <div className="p-4 bg-blue-50 text-[#004aad] w-fit rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-gray-800 text-sm">
                    Unggah Dokumen PDF Modul Kuliah
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-6 max-w-sm mx-auto">
                    Maksimal 50 halaman untuk akun gratis. Akses tanpa batas khusus pengguna Study Plus.
                  </p>
                  <button className="bg-[#004aad] text-white font-extrabold py-3 px-8 rounded-xl text-xs shadow-md shadow-[#004aad]/20 hover:bg-[#00337a] transition-all">
                    Ringkas Dokumen Sekarang
                  </button>
                </div>
              </div>
            )}

            {/* 4. TAB DOWNLOAD TEMPLATE */}
            {activeMenu === "template" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Template Dokumen Akademik
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Unduh struktur format siap pakai untuk laporan, cover makalah, hingga proposal PKM.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Template Gratis (Free Access)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white border border-gray-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                        <span className="text-xs font-bold text-gray-700">
                          Format Cover & Laporan Praktikum
                        </span>
                        <a 
                          href="https://docs.google.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-gray-100 text-gray-700 hover:bg-[#004aad] hover:text-white px-3 py-1.5 rounded-lg font-extrabold transition-colors inline-flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> Unduh
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-amber-800 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" /> Template Premium (Siap Pakai)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                        <div>
                          <span className="text-xs font-extrabold text-amber-900 block">
                            Proposal PKM & File RAB Otomatis
                          </span>
                          <span className="text-[10px] text-amber-700 font-medium">Format Lolos Reviewer Dikti</span>
                        </div>
                        <a 
                          href="https://wa.me/6285848953387?text=Halo%20Admin,%20saya%20ingin%20membeli%20Template%20Proposal%20PKM"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-extrabold shadow-sm transition-colors"
                        >
                          Rp 15k
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. TAB JASA AKADEMIK */}
            {activeMenu === "desain" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Pemesanan Jasa Akademik & Desain
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Bantuan pembuatan poster seminar, slide presentasi custom, hingga asistensi penulisan karya ilmiah.
                </p>

                <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm max-w-xl space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-800 mb-2">
                      Pilih Jenis Layanan Jasa
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#004aad]">
                      <option>Desain Poster Lomba / Presentation Banner</option>
                      <option>Desain Presentation Slides PPT (Custom Canva)</option>
                      <option>Asistensi Perapihan Layout Karya Tulis</option>
                    </select>
                  </div>

                  <a
                    href="https://wa.me/6285848953387?text=Halo%20Admin%20Ankasa,%20saya%20ingin%20konsultasi%20pemesanan%20jasa%20akademik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#004aad] text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md shadow-[#004aad]/20 hover:bg-[#00337a] transition-all"
                  >
                    Konsultasi Pesanan via WhatsApp
                  </a>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  ArrowLeft,
  Search,
  FilePlus2,
  Archive,
  FileText,
  LayoutTemplate,
  MessageSquareText,
  MapPin,
  DollarSign,
  Filter,
  Link as LinkIcon,
  Send,
  Lock,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2,
  Zap,
  Sparkles,
  ExternalLink,
  Globe,
  UploadCloud,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; // Pastikan Supabase sudah terhubung

export default function CareerPage() {
  const [activeMenu, setActiveMenu] = useState("loker");
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  // State untuk Hide/Show Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State untuk data dari database
  const [lokers, setLokers] = useState<any[]>([]);

  // State untuk filter pencarian
  const [filterLokasi, setFilterLokasi] = useState("Semua");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [searchPosisi, setSearchPosisi] = useState("");

  // --- STATE KHUSUS CV AI ---
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{score: number, status: string, feedback: string[]} | null>(null);

  // Fungsi untuk menangani upload file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
      setScanResult(null); // Reset hasil jika upload ulang
    }
  };

  // Fungsi simulasi pemindaian AI
  const handleScanCV = () => {
    if (!cvFile) return;
    setIsScanning(true);
    
    // Simulasi loading AI selama 3 detik
    setTimeout(() => {
      setIsScanning(false);
      // Hasil simulasi (nantinya bisa diganti dengan response dari Supabase Edge Functions / AI API)
      setScanResult({
        score: 78,
        status: "Perlu Perbaikan",
        feedback: [
          "Format dokumen sudah baik dan terbaca sistem (PDF).",
          "Gunakan lebih banyak 'Action Verbs' (misal: Memimpin, Mengembangkan) di pengalaman kerja.",
          "Beberapa kata kunci (keywords) dari industri teknologi kurang menonjol.",
          "Pastikan tidak ada grafik atau tabel kompleks yang sulit dibaca robot ATS."
        ]
      });
    }, 3000);
  };

  useEffect(() => {
    const fetchLokers = async () => {
      const { data, error } = await supabase
        .from("loker")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setLokers(data);
      }
    };
    fetchLokers();
  }, []);

  const filteredLokers = lokers.filter((loker) => {
    const matchLokasi =
      filterLokasi === "Semua" ||
      loker.lokasi?.toLowerCase().includes(filterLokasi.toLowerCase());
    const matchJenis =
      filterJenis === "Semua" ||
      loker.jenis?.toLowerCase().includes(filterJenis.toLowerCase());
    const matchPosisi =
      searchPosisi === "" ||
      loker.posisi?.toLowerCase().includes(searchPosisi.toLowerCase());
    return matchLokasi && matchJenis && matchPosisi;
  });

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

          {/* Tombol Toggle Sidebar */}
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
        
        {/* SIDEBAR NAVIGASI */}
        <aside
          className={`${
            isSidebarOpen
              ? "w-full md:w-64 opacity-100"
              : "w-0 overflow-hidden opacity-0 p-0 m-0 border-0"
          } shrink-0 transition-all duration-300 ease-in-out`}
        >
          <div className="sticky top-20 bg-white/70 backdrop-blur-md border border-white/80 shadow-sm rounded-[2rem] p-5 w-full md:w-64">
            <div className="mb-6 px-2 flex justify-between items-center">
              <h2 className="text-xl font-extrabold text-[#004aad]">
                Ankasa Career
              </h2>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => {
                  setActiveMenu("loker");
                  setSelectedJob(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "loker"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <Search className="w-4 h-4" /> Portal Loker
              </button>
              
              <button
                onClick={() => setActiveMenu("cv_ai")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "cv_ai"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <FilePlus2 className="w-4 h-4" /> CV AI Toolkit
              </button>

              <button
                onClick={() => setActiveMenu("portofolio")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "portofolio"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <LayoutTemplate className="w-4 h-4" /> Portofolio
              </button>

              <div className="my-2 border-t border-gray-100"></div>

              <button
                onClick={() => setActiveMenu("arsip")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "arsip"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <Archive className="w-4 h-4" /> Arsip Digital
              </button>

              <button
                onClick={() => setActiveMenu("publikasi")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "publikasi"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <MessageSquareText className="w-4 h-4" /> Publikasi Artikel
              </button>
            </nav>
          </div>
        </aside>

        {/* KONTEN UTAMA DASBOR */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm rounded-[2rem] p-6 md:p-8 min-h-[75vh]">
            
            {/* 1. KONTEN PORTAL LOKER */}
            {activeMenu === "loker" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Portal Lowongan & MBKM
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Cari peluang magang dan karir profesional dari mitra terpercaya.
                </p>

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 flex flex-wrap gap-3 items-center shadow-sm">
                  <Filter className="w-4 h-4 text-[#004aad]" />
                  <select
                    value={filterLokasi}
                    onChange={(e) => setFilterLokasi(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#004aad]"
                  >
                    <option value="Semua">Lokasi (Semua)</option>
                    <option value="Semarang">Semarang</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Remote">Remote</option>
                  </select>
                  
                  <select
                    value={filterJenis}
                    onChange={(e) => setFilterJenis(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#004aad]"
                  >
                    <option value="Semua">Jenis (Semua)</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Magang">Magang</option>
                    <option value="MBKM">MBKM</option>
                  </select>

                  <input
                    type="text"
                    value={searchPosisi}
                    onChange={(e) => setSearchPosisi(e.target.value)}
                    placeholder="Cari posisi (misal: Frontend Developer)..."
                    className="bg-gray-50 border border-gray-200 text-xs rounded-xl px-3 py-2 outline-none flex-grow focus:ring-2 focus:ring-[#004aad]"
                  />
                </div>

                {/* Tampilan Detail Loker Terpilih */}
                {selectedJob ? (
                  <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm">
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="text-xs font-extrabold text-[#004aad] hover:underline mb-6 inline-flex items-center gap-1"
                    >
                      &larr; Kembali ke daftar lowongan
                    </button>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#004aad] to-[#5de0e6] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">
                        {selectedJob.logo || (selectedJob.perusahaan ? selectedJob.perusahaan.charAt(0) : "A")}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedJob.posisi}
                        </h3>
                        <p className="text-sm font-semibold text-[#004aad] mt-0.5">
                          {selectedJob.perusahaan}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-xs font-medium">
                      <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Lokasi</span>
                        <span className="text-gray-800 font-bold">{selectedJob.lokasi}</span>
                      </div>
                      <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Jenis</span>
                        <span className="text-gray-800 font-bold">{selectedJob.jenis}</span>
                      </div>
                      <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Gaji</span>
                        <span className="text-gray-800 font-bold">{selectedJob.gaji || "Kompetitif"}</span>
                      </div>
                      <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Kontak</span>
                        <span className="text-gray-800 font-bold truncate block">{selectedJob.email}</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">Syarat & Ketentuan Kualifikasi</h4>
                      <div className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        {selectedJob.syarat || "Tidak ada persyaratan khusus yang dicantumkan."}
                      </div>
                    </div>

                    <a
                      href={`mailto:${selectedJob.email}`}
                      className="inline-block bg-[#004aad] hover:bg-[#00337a] text-white font-extrabold py-3.5 px-8 rounded-xl w-full md:w-auto text-center shadow-md shadow-[#004aad]/20 transition-all text-xs"
                    >
                      Lamar Lowongan Sekarang
                    </a>
                  </div>
                ) : (
                  /* Daftar Kartu Loker */
                  <div className="space-y-4">
                    {lokers.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 font-medium text-xs">
                        Memuat data lowongan kerja dari database Supabase...
                      </div>
                    ) : filteredLokers.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 font-medium text-xs">
                        Tidak ada lowongan kerja yang sesuai dengan filter pencarianmu.
                      </div>
                    ) : (
                      filteredLokers.map((loker) => (
                        <div
                          key={loker.id}
                          onClick={() => setSelectedJob(loker)}
                          className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center group"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-[#004aad] to-[#5de0e6] text-white rounded-xl flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                            {loker.logo || (loker.perusahaan ? loker.perusahaan.charAt(0) : "A")}
                          </div>
                          <div className="flex-grow min-w-0">
                            <h3 className="font-extrabold text-base text-gray-900 group-hover:text-[#004aad] transition-colors truncate">
                              {loker.posisi}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">
                              {loker.perusahaan} • {loker.lokasi}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="text-[10px] bg-blue-50 text-[#004aad] px-2.5 py-1 rounded-md font-bold">
                                {loker.jenis}
                              </span>
                              {loker.gaji && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold">
                                  {loker.gaji}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. KONTEN CV AI TOOLKIT (DISPLIT BERDAYA JELAS) */}
            {/* 2. KONTEN CV AI TOOLKIT */}
            {activeMenu === "cv_ai" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#004aad] text-[10px] font-extrabold uppercase tracking-wider rounded-lg mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#5de0e6]" /> AI Career Toolkit
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    Pusat Layanan CV & Resume AI
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    Gunakan kecerdasan buatan untuk membuat CV baru atau menguji kelayakan CV milikmu.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* KARTU 1: PEMBANGUN CV AI (BERBAYAR) */}
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#5de0e6]/20 to-transparent rounded-bl-full pointer-events-none"></div>
                    <div>
                      <div className="inline-flex px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider rounded-full mb-4 border border-amber-200/50">
                        ✨ Fitur Pro (Berbayar)
                      </div>
                      <h3 className="text-2xl font-bold text-[#004aad] mb-2">
                        Pembangun CV AI
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-6">
                        Buat CV profesional dari nol dengan panduan cerdas AI. Pilih dari puluhan template khusus yang dijamin lolos filter rekruter (ATS).
                      </p>
                      
                      <ul className="space-y-3 mb-8 text-xs font-medium text-gray-700">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Generasi otomatis riwayat kerja & ringkasan
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Akses penuh template standar industri
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Unduh PDF tanpa watermark
                        </li>
                      </ul>
                    </div>

                    <Link
                      href="/harga"
                      className="w-full text-center py-3.5 bg-gradient-to-r from-[#004aad] to-[#00337a] text-white font-extrabold rounded-xl text-xs shadow-md shadow-[#004aad]/20 hover:opacity-95 transition-opacity"
                    >
                      Upgrade ke Career Pro
                    </Link>
                  </div>

                  {/* KARTU 2: ATS CV SCANNER AI */}
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#004aad]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                    
                    {!scanResult ? (
                      // TAMPILAN SEBELUM/SEDANG SCAN
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#004aad] text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                              <Zap className="w-3.5 h-3.5 text-[#004aad]" /> Sistem Token
                            </div>
                            <span className="text-[10px] font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                              Sisa Token: 1/1 (Trial)
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Audit Kelayakan CV (ATS)
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed mb-6">
                            Unggah PDF CV milikmu. AI kami akan menguji struktur, tata bahasa, dan memberikan skor kecocokan mesin rekruter.
                          </p>

                          {/* Uploader Box */}
                          <label className={`border-2 border-dashed rounded-2xl p-6 text-center mb-6 flex flex-col items-center justify-center transition-colors cursor-pointer group ${cvFile ? 'border-[#5de0e6] bg-[#5de0e6]/10' : 'border-gray-200 bg-gray-50/50 hover:border-[#5de0e6]'}`}>
                            <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                            
                            {cvFile ? (
                              <>
                                <FileText className="w-8 h-8 text-[#004aad] mb-2" />
                                <h4 className="font-bold text-[#004aad] text-xs truncate max-w-[200px]">
                                  {cvFile.name}
                                </h4>
                                <p className="text-[10px] text-gray-500 mt-1">Siap untuk dianalisis</p>
                              </>
                            ) : (
                              <>
                                <UploadCloud className="w-8 h-8 text-gray-400 mb-2 group-hover:text-[#5de0e6] transition-colors" />
                                <h4 className="font-bold text-gray-800 text-xs">
                                  Klik untuk Unggah PDF CV
                                </h4>
                                <p className="text-[10px] text-gray-500 mt-1 max-w-xs">
                                  Max ukuran file 5MB.
                                </p>
                              </>
                            )}
                          </label>
                        </div>

                        <button 
                          onClick={handleScanCV}
                          disabled={!cvFile || isScanning}
                          className={`w-full py-3.5 font-black rounded-xl text-xs shadow-md transition-all flex justify-center items-center gap-2 ${
                            !cvFile ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-[#5de0e6] text-[#004aad] shadow-[#5de0e6]/30 hover:bg-[#4bcad0]'
                          }`}
                        >
                          {isScanning ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Menganalisis CV...</>
                          ) : (
                            "Mulai Analisis AI (Guna 1 Token)"
                          )}
                        </button>
                      </div>
                    ) : (
                      // TAMPILAN SETELAH HASIL SCAN KELUAR
                      <div className="flex flex-col h-full animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Hasil Audit AI</h3>
                          <button onClick={() => { setScanResult(null); setCvFile(null); }} className="text-[10px] text-gray-500 hover:text-[#004aad] font-bold underline">
                            Pindai Ulang
                          </button>
                        </div>

                        <div className="flex items-center gap-6 mb-6">
                          {/* Circular Score (Mockup) */}
                          <div className="relative w-20 h-20 shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              <path className="text-amber-500" strokeDasharray={`${scanResult.score}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-xl font-black text-gray-800">{scanResult.score}</span>
                            </div>
                          </div>
                          <div>
                            <span className="bg-amber-100 text-amber-700 px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                              {scanResult.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-2 font-medium">
                              CV kamu sudah lumayan, tapi masih bisa dioptimasi agar lolos mesin ATS perusahaan.
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex-grow">
                          <h4 className="text-[11px] font-extrabold text-gray-900 mb-3 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-[#004aad]" /> Catatan Perbaikan AI:
                          </h4>
                          <ul className="space-y-2 text-xs text-gray-600 font-medium">
                            {scanResult.feedback.map((msg, i) => (
                              <li key={i} className="flex gap-2 items-start">
                                <span className="text-[#004aad] mt-0.5">•</span>
                                <span>{msg}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* 3. KONTEN PORTOFOLIO */}
            {activeMenu === "portofolio" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Penyusunan Portofolio Digital
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Kirimkan karya milikmu via Google Drive, tim Ankasa akan mendesainnya menjadi portofolio web digital yang interaktif.
                </p>

                <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-800 mb-2">
                      Link Folder Google Drive (Karya / Sertifikat / Gambar)
                    </label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:ring-2 focus-within:ring-[#004aad]">
                      <LinkIcon className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder="https://drive.google.com/drive/folders/..."
                        className="bg-transparent w-full outline-none text-xs"
                      />
                    </div>
                  </div>

                  <a
                    href="https://wa.me/6285848953387?text=Halo%20Admin%20Ankasa,%20saya%20ingin%20mengirimkan%20link%20portofolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#004aad] text-white font-extrabold py-3.5 px-6 rounded-xl w-full text-xs shadow-md hover:bg-[#00337a] transition-all"
                  >
                    Kirim Link ke Admin WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* 4. KONTEN ARSIP DIGITAL */}
            {activeMenu === "arsip" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Jasa Kelola Arsip Digital
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Kirimkan tautan Google Drive, tim kami akan merapikan struktur file dan mengirimkan file terorganisir via WhatsApp.
                </p>

                <div className="bg-blue-50/40 border border-blue-100 p-6 md:p-8 rounded-2xl space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-extrabold text-[#004aad] mb-2">
                      Link Google Drive Folder Mentah
                    </label>
                    <div className="flex items-center bg-white border border-blue-200 rounded-xl px-3.5 py-2.5">
                      <LinkIcon className="w-4 h-4 text-[#004aad] mr-2 shrink-0" />
                      <input
                        type="text"
                        placeholder="Masukkan link folder Drive..."
                        className="bg-transparent w-full outline-none text-xs"
                      />
                    </div>
                  </div>

                  <a
                    href="https://wa.me/6285848953387?text=Halo%20Admin,%20saya%20butuh%20jasa%20kelola%20arsip%20digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#004aad] text-white font-extrabold py-3.5 px-6 rounded-xl w-full text-xs shadow-md hover:bg-[#00337a] transition-all"
                  >
                    Minta Perapihan File via WA
                  </a>
                </div>
              </div>
            )}

            {/* 5. KONTEN PUBLIKASI ARTIKEL */}
            {activeMenu === "publikasi" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Jasa Pembuatan & Publikasi Artikel
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Konsultasikan gagasan tulisan ilmiah atau artikel populer milikmu dengan tim penulis Ankasa.
                </p>

                <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl space-y-4 max-w-xl shadow-sm">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-800 mb-2">
                      Topik Utama Artikel
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Perkembangan IoT dalam Pertanian Smart Farming"
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#004aad]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-800 mb-2">
                      Gagasan Spesifik / Catatan Tambahan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Jelaskan secara singkat ide tulisan yang ingin kamu publikasikan..."
                      className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#004aad]"
                    ></textarea>
                  </div>

                  <a
                    href="https://wa.me/6285848953387?text=Halo%20Admin,%20saya%20ingin%20konsultasi%20pembuatan%20artikel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all"
                  >
                    Konsultasi Tulisan via WhatsApp
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
"use client";

import {
  FilePlus2,
  Instagram,
  Mail,
  Globe,
  GraduationCap,
  Briefcase,
  Sparkles,
  BookOpen,
  PenTool,
  Phone,
  Search,
  LayoutTemplate,
  User,
  LogIn,
  MessageCircle,
  Video,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Building2,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"career" | "study">("career");

  // State Data Supabase
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [recentStudy, setRecentStudy] = useState<any[]>([]);

  // State Index Slider & FAQ
  const [sliderIndex, setSliderIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Data Fallback jika Database Supabase belum terisi banyak
  const fallbackJobs = [
    {
      id: "f1",
      posisi: "Fullstack Developer (Next.js & Laravel)",
      perusahaan: "TechCorp Indonesia",
      lokasi: "Jakarta (Hybrid)",
      jenis: "MBKM Magang",
    },
    {
      id: "f2",
      posisi: "UI/UX & Frontend Designer",
      perusahaan: "Creative Innovation Studio",
      lokasi: "Semarang (Onsite)",
      jenis: "Full-time",
    },
    {
      id: "f3",
      posisi: "AI & Machine Learning Intern",
      perusahaan: "Dermify Health Tech",
      lokasi: "Remote",
      jenis: "Magang Riset",
    },
    {
      id: "f4",
      posisi: "Data Analyst Specialist",
      perusahaan: "Bank Syariah Mandiri",
      lokasi: "Jakarta Pusat",
      jenis: "BFLP / Graduate",
    },
  ];

  const fallbackStudy = [
    {
      id: "s1",
      tipe: "ebook",
      judul: "E-Book: Master Class Logika Pemrograman & Algoritma",
      penulis: "Tim Akademik Ankasa",
      info: "120 Halaman • PDF",
    },
    {
      id: "s2",
      tipe: "conference",
      nama: "International Conference on Green IoT & Smart City 2026",
      lokasi: "Yogyakarta & Online",
      info: "Prosiding Scopus",
    },
    {
      id: "s3",
      tipe: "ebook",
      judul: "Template Proposal PKM-KC Lolos PIMNAS (Lengkap)",
      penulis: "Divisi Riset Ankasa",
      info: "Dokumen Word Editable",
    },
    {
      id: "s4",
      tipe: "conference",
      nama: "National Student Innovation Competition (NSIC)",
      lokasi: "Politeknik Negeri Semarang",
      info: "Sertifikat Nasional",
    },
  ];

  useEffect(() => {
    // 1. Cek Login
    const cekLogin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setIsLoggedIn(true);
    };

    // 2. Tarik Data Loker
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("loker")
          .select("*")
          .order("id", { ascending: false })
          .limit(6);
        if (data && data.length > 0 && !error) {
          setRecentJobs(data);
        } else {
          setRecentJobs(fallbackJobs);
        }
      } catch (e) {
        setRecentJobs(fallbackJobs);
      }
    };

    // 3. Tarik Data Edukasi
    const fetchStudyMix = async () => {
      try {
        const { data: ebookData } = await supabase
          .from("ebook")
          .select("*")
          .order("id", { ascending: false })
          .limit(4);
        const { data: confData } = await supabase
          .from("conference")
          .select("*")
          .order("id", { ascending: false })
          .limit(4);

        const mixed: any[] = [];
        if (ebookData && ebookData.length > 0) {
          ebookData.forEach((e) => mixed.push({ ...e, tipe: "ebook" }));
        }
        if (confData && confData.length > 0) {
          confData.forEach((c) => mixed.push({ ...c, tipe: "conference" }));
        }

        if (mixed.length > 0) {
          setRecentStudy(mixed);
        } else {
          setRecentStudy(fallbackStudy);
        }
      } catch (e) {
        setRecentStudy(fallbackStudy);
      }
    };

    cekLogin();
    fetchJobs();
    fetchStudyMix();
  }, []);

  // Auto Slider Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Fungsi Ambil 2 Data Berdasarkan Slider Index
  const getActiveItems = (items: any[]) => {
    if (!items || items.length === 0) return [];
    const idx1 = sliderIndex % items.length;
    const idx2 = (sliderIndex + 1) % items.length;
    return [items[idx1], items[idx2]];
  };

  const jobsToDisplay = getActiveItems(
    recentJobs.length > 0 ? recentJobs : fallbackJobs,
  );
  const studyToDisplay = getActiveItems(
    recentStudy.length > 0 ? recentStudy : fallbackStudy,
  );

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col overflow-hidden font-sans scroll-smooth">
      {/* GLOWING AMBIENT LIGHTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-[#5de0e6] rounded-full mix-blend-multiply filter blur-[140px] opacity-20 pointer-events-none"></div>
      <div className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] bg-[#004aad] rounded-full mix-blend-multiply filter blur-[160px] opacity-[0.12] pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[15%] w-[60vw] h-[60vw] bg-[#5de0e6] rounded-full mix-blend-multiply filter blur-[150px] opacity-15 pointer-events-none"></div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 overflow-hidden group-hover:scale-105 transition-transform">
              <Image
                src="/icon.jpeg"
                alt="Logo Ankasa Hub"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#004aad]">
              ankasa<span className="text-[#5de0e6]">.hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-7 text-sm font-bold text-gray-600 items-center">
            <Link href="/" className="text-[#004aad] transition-colors">
              Home
            </Link>
            <Link
              href="/tentang"
              className="hover:text-[#004aad] transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href="/study"
              className="hover:text-[#004aad] transition-colors"
            >
              Ankasa Study
            </Link>
            <Link
              href="/career"
              className="hover:text-[#004aad] transition-colors"
            >
              Ankasa Career
            </Link>
            <Link
              href="/harga"
              className="hover:text-[#004aad] transition-colors"
            >
              Subscribe
            </Link>

            <div className="w-px h-5 bg-gray-200 mx-1"></div>

            {isLoggedIn ? (
              <Link
                href="/profil"
                className="flex items-center gap-2 bg-[#004aad] text-white px-5 py-2.5 rounded-full hover:bg-[#00337a] transition-all shadow-md shadow-[#004aad]/20 hover:scale-105"
              >
                <User className="w-4 h-4" /> Profil Saya
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-[#004aad] text-white px-5 py-2.5 rounded-full hover:bg-[#00337a] transition-all shadow-md shadow-[#004aad]/20 hover:scale-105"
              >
                <LogIn className="w-4 h-4" /> Masuk Akun
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow relative z-10">
        {/* HERO SECTION WITH DYNAMIC DASHBOARD PREVIEW */}
        <section
          className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4"
          id="home"
        >
          <div className="container mx-auto max-w-6xl text-center flex flex-col items-center">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5de0e6]/40 shadow-sm text-xs md:text-sm font-bold text-[#004aad] mb-8 animate-bounce">
              <Sparkles className="w-4 h-4 text-[#5de0e6]" />
              <span>Platform Edukasi & Karier No. 1</span>
            </div>

            {/* Grand Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.15] max-w-4xl">
              Aksi Nyata Kolektif <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004aad] via-[#00337a] to-[#5de0e6]">
                Meraih Asa
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Satu platform terpadu untuk mengakselerasi prestasi akademik,
              persiapan CV ATS-Friendly, hingga penempatan magang & kerja di
              perusahaan impian.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center justify-center mb-16">
              <a
                href="#ankasa-career"
                className="px-7 py-3.5 bg-[#004aad] text-white font-bold rounded-2xl shadow-xl shadow-[#004aad]/25 hover:bg-[#00337a] hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" /> Cari Lowongan Magang
              </a>
              <a
                href="#ankasa-study"
                className="px-7 py-3.5 bg-white text-gray-800 font-bold rounded-2xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-[#004aad]" /> Akses Modul
                Study
              </a>
            </div>

            {/* HIGH-TECH INTERACTIVE HERO PREVIEW CONTAINER */}
            <div className="w-full max-w-4xl relative">
              {/* Floating Badges */}
              <div className="absolute -top-6 -left-4 md:-left-8 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20 hidden sm:flex">
                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Skor ATS CV
                  </p>
                  <p className="text-sm font-extrabold text-gray-800">
                    98% Lolos Screening
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-20 hidden sm:flex">
                <div className="p-2.5 bg-[#004aad] text-white rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Update Realtime
                  </p>
                  <p className="text-sm font-extrabold text-gray-800">
                    12 Loker Baru Hari Ini
                  </p>
                </div>
              </div>

              {/* Mockup Frame */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl overflow-hidden text-left p-4 md:p-6 bg-gradient-to-br from-white via-white to-sky-50/30">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold text-gray-400 ml-2">
                      ankasa.hub / dashboard-preview
                    </span>
                  </div>
                  <span className="text-xs font-extrabold bg-[#5de0e6]/20 text-[#004aad] px-3 py-1 rounded-full">
                    Live Preview
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-50 text-[#004aad] rounded-lg">
                        <Search className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs text-gray-700">
                        Portal Loker Aktif
                      </h4>
                    </div>
                    <p className="text-2xl font-black text-gray-900">1,240+</p>
                    <p className="text-[10px] text-emerald-600 font-bold mt-1">
                      ↑ 15% minggu ini
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs text-gray-700">
                        Modul & E-Book
                      </h4>
                    </div>
                    <p className="text-2xl font-black text-gray-900">580+</p>
                    <p className="text-[10px] text-blue-600 font-bold mt-1">
                      Freemium Access
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Award className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs text-gray-700">
                        Konferensi & Lomba
                      </h4>
                    </div>
                    <p className="text-2xl font-black text-gray-900">95+</p>
                    <p className="text-[10px] text-amber-600 font-bold mt-1">
                      Terverifikasi Kampus
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STATS STRIP */}
        <section className="py-8 bg-white/60 border-y border-gray-100">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-[#004aad]">
                  5,000+
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  Mahasiswa Terbantu
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-[#004aad]">
                  1,200+
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  Mitra Lowongan Kerja
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-[#004aad]">
                  99%
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  Kepuasan Pengguna
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-[#004aad]">
                  50+
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase mt-1">
                  Kampus Mitra
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE SHOWCASE (DYNAMIC TABBED DATA FROM SUPABASE) */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#004aad] bg-blue-50 px-3 py-1 rounded-full">
                Live Database Showcase
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Eksplorasi Layanan Terbaru
              </h2>
              <p className="text-gray-600 text-sm md:text-base mt-2">
                Data terhubung langsung dengan sistem backend Ankasa Hub
              </p>

              {/* Tab Switcher */}
              <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl mt-6 border border-gray-200">
                <button
                  onClick={() => setActiveTab("career")}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "career" ? "bg-[#004aad] text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}
                >
                  <Briefcase className="w-4 h-4" /> Ankasa Career
                </button>
                <button
                  onClick={() => setActiveTab("study")}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "study" ? "bg-[#004aad] text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}
                >
                  <GraduationCap className="w-4 h-4" /> Ankasa Study
                </button>
              </div>
            </div>

            {/* Tab Content Cards */}
            <div className="max-w-3xl mx-auto">
              {activeTab === "career" ? (
                <div className="space-y-4">
                  {jobsToDisplay.map((job, idx) => (
                    <div
                      key={`${job.id}-${idx}`}
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#004aad] to-[#5de0e6] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
                          {job.perusahaan ? job.perusahaan.charAt(0) : "A"}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-base">
                            {job.posisi}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {job.perusahaan} • {job.lokasi}
                          </p>
                          <span className="inline-block mt-2 text-[10px] font-bold bg-blue-50 text-[#004aad] px-2.5 py-1 rounded-md">
                            {job.jenis || "Magang"}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/career"
                        className="self-end sm:self-center px-4 py-2 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-[#004aad] transition-colors shrink-0"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Link
                      href="/career"
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-[#004aad] hover:underline"
                    >
                      Lihat Semua Lowongan di Portal Career{" "}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {studyToDisplay.map((item, idx) => (
                    <div
                      key={`${item.id}-${idx}`}
                      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                          {item.tipe === "ebook" ? (
                            <BookOpen className="w-6 h-6" />
                          ) : (
                            <Video className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-base line-clamp-1">
                            {item.judul || item.nama}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">
                            {item.tipe === "ebook"
                              ? item.penulis
                                ? `Penulis: ${item.penulis}`
                                : "E-Book Modul"
                              : item.lokasi || "Info Konferensi Akademik"}
                          </p>
                          <span className="inline-block mt-2 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">
                            {item.tipe}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/study"
                        className="self-end sm:self-center px-4 py-2 bg-[#004aad] text-white font-bold text-xs rounded-xl hover:bg-[#00337a] transition-colors shrink-0"
                      >
                        Buka Katalog
                      </Link>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <Link
                      href="/study"
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-[#004aad] hover:underline"
                    >
                      Eksplorasi Katalog Akademik Ankasa Study{" "}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BENTO GRID: ANKASA CAREER SHOWCASE */}
        <section
          id="ankasa-career"
          className="py-20 px-4 bg-white/40 border-t border-gray-100 scroll-mt-16"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#004aad] text-xs font-bold uppercase">
                  <Briefcase className="w-4 h-4" /> Fitur Unggulan
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                  Ankasa Career Ekosistem
                </h2>
              </div>
              <p className="text-gray-600 text-sm md:text-base max-w-md font-medium">
                Persiapkan potensi terbaikmu menghadapi dunia industri modern
                dengan toolkit berbasis teknologi.
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bento 1: CV Maker AI */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#004aad] to-[#002b66] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                  <FilePlus2 className="w-64 h-64" />
                </div>
                <div>
                  <span className="bg-[#5de0e6] text-[#004aad] font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                    Powered by AI
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold mt-4">
                    Pembangun CV ATS-Friendly
                  </h3>
                  <p className="text-blue-100 text-sm font-medium mt-2 max-w-lg leading-relaxed">
                    Susun CV berstandar internasional yang lolos filter sistem
                    rekrutmen otomatis (ATS) hanya dalam hitungan menit.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 bg-[#5de0e6] text-[#004aad] font-extrabold px-5 py-2.5 rounded-xl text-sm shadow-md hover:opacity-90 transition-opacity"
                  >
                    Coba CV Maker AI Sekarang <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bento 2: Portal Loker */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-blue-50 text-[#004aad] w-fit rounded-2xl mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Portal Lowongan Kerja & MBKM
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    Ratusan informasi lowongan kerja terverifikasi, program
                    magang kampus merdeka, dan *entry-level job*.
                  </p>
                </div>
                <Link
                  href="/career"
                  className="mt-6 text-xs font-bold text-[#004aad] flex items-center gap-1 hover:underline"
                >
                  Cari Loker <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Bento 3: Digital Portfolio */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-purple-50 text-purple-600 w-fit rounded-2xl mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Etalase Portofolio Digital
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    Pamerkan karya proyek akademik dan pengalaman organisasi
                    dalam tampilan etalase web personal yang elegan.
                  </p>
                </div>
                <Link
                  href="/career"
                  className="mt-6 text-xs font-bold text-[#004aad] flex items-center gap-1 hover:underline"
                >
                  Buat Portofolio <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Bento 4: Panduan Interview */}
              <div className="md:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 w-fit rounded-2xl mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Garansi Keamanan & Kualitas Lowongan
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 max-w-md leading-relaxed">
                    Setiap postingan lowongan melalui proses kurasi ketat untuk
                    menghindari penipuan dan menjamin hak-hak mahasiswa.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <span className="p-3 bg-gray-50 rounded-2xl font-extrabold text-xs text-gray-700">
                    100% Verified
                  </span>
                  <span className="p-3 bg-gray-50 rounded-2xl font-extrabold text-xs text-gray-700">
                    No Spam
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID: ANKASA STUDY SHOWCASE */}
        <section id="ankasa-study" className="py-20 px-4 scroll-mt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
                  <GraduationCap className="w-4 h-4" /> Kebutuhan Akademik
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                  Ankasa Study Solution
                </h2>
              </div>
              <p className="text-gray-600 text-sm md:text-base max-w-md font-medium">
                Pusat amunisi belajar, referensi tugas akhir, dan konsultasi
                kebutuhan akademik harianmu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Study Bento 1 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-emerald-50 text-emerald-600 w-fit rounded-2xl mb-4">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    E-Book & Rangkuman Materi
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    Modul belajar ringkas untuk persiapan ujian, pemahaman
                    pemrograman, hingga penulisan karya ilmiah.
                  </p>
                </div>
                <Link
                  href="/study"
                  className="mt-6 text-xs font-bold text-[#004aad] flex items-center gap-1 hover:underline"
                >
                  Buka Modul <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Study Bento 2 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-amber-50 text-amber-600 w-fit rounded-2xl mb-4">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Jasa Desain Profesional
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    Layanan pembuatan poster presentasi, banner seminar,
                    ilustrasi makalah, hingga desain slides lomba.
                  </p>
                </div>
                <Link
                  href="/study"
                  className="mt-6 text-xs font-bold text-[#004aad] flex items-center gap-1 hover:underline"
                >
                  Pesan Desain <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Study Bento 3 */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-md flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-blue-50 text-[#004aad] w-fit rounded-2xl mb-4">
                    <LayoutTemplate className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Template Dokumen Proyek
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    Unduh template proposal PKM, format laporan praktikum, dan
                    struktur karya tulis siap pakai.
                  </p>
                </div>
                <Link
                  href="/study"
                  className="mt-6 text-xs font-bold text-[#004aad] flex items-center gap-1 hover:underline"
                >
                  Unduh Template <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-20 px-4 bg-white/60 border-t border-gray-100">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#004aad] bg-blue-50 px-3 py-1 rounded-full">
                FAQ
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                Sering Ditanyakan
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Apakah platform Ankasa Hub gratis untuk digunakan?",
                  a: "Ya! Mahasiswa dapat mendaftar dan menggunakan sebagian besar fitur dasar seperti pencarian loker, modul freemium, dan pembuatan profil secara gratis.",
                },
                {
                  q: "Bagaimana cara memesan Jasa Desain atau Template?",
                  a: "Kamu bisa masuk ke menu Ankasa Study, pilih katalog jasa yang diinginkan, dan langsung terhubung dengan admin kami melalui WhatsApp otomatis.",
                },
                {
                  q: "Apakah CV buatan Ankasa Hub benar-benar ATS-Friendly?",
                  a: "Tentu! Format susunan CV AI kami dirancang khusus mengikuti standar pustaka seleksi rekruter internasional agar mudah dibaca oleh sistem ATS perusahaan.",
                },
                {
                  q: "Bagaimana cara mendaftarkan diri sebagai pengguna?",
                  a: "Klik tombol 'Masuk / Daftar' di pojok kanan atas, isi nama, email, dan kata sandi. Akunmu akan langsung aktif secara instan!",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 font-bold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors text-sm md:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-5 pt-0 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION BANNER */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-r from-[#004aad] to-[#002b66] text-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5de0e6] rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight relative z-10">
                Siap Mengakselerasi Kampus & Kariermu?
              </h2>
              <p className="text-blue-100 text-sm md:text-lg mt-4 max-w-xl mx-auto relative z-10 font-medium">
                Bergabung bersama ribuan mahasiswa Indonesia lainnya di platform
                Ankasa Hub sekarang juga.
              </p>
              <div className="mt-8 relative z-10">
                {isLoggedIn ? (
                  <Link
                    href="/career"
                    className="inline-flex items-center gap-2 bg-[#5de0e6] text-[#004aad] font-black px-8 py-4 rounded-2xl text-base shadow-lg hover:scale-105 transition-transform"
                  >
                    Eksplorasi Portal Karier Sekarang{" "}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 bg-[#5de0e6] text-[#004aad] font-black px-8 py-4 rounded-2xl text-base shadow-lg hover:scale-105 transition-transform"
                  >
                    Daftar Akun Gratis Sekarang{" "}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#004aad] text-gray-100 relative z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5de0e6] to-transparent opacity-80"></div>
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight mb-4 text-white flex items-center justify-center md:justify-start gap-2">
                <div className="w-8 h-8 bg-white text-[#004aad] rounded-full flex items-center justify-center text-sm font-black">
                  A
                </div>
                ankasa.hub
              </h3>
              <p className="text-blue-100/70 font-medium leading-relaxed max-w-xs mx-auto md:mx-0 text-xs md:text-sm">
                Platform berbasis website yang mengintegrasikan kebutuhan
                akademik dan persiapan karier generasi muda.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-base font-bold mb-4 text-white uppercase tracking-wider">
                Tautan Navigasi
              </h4>
              <nav className="space-y-2.5 text-blue-100/80 font-medium text-xs md:text-sm">
                <Link
                  href="/career"
                  className="block hover:text-[#5de0e6] transition-colors"
                >
                  Ankasa Career
                </Link>
                <Link
                  href="/study"
                  className="block hover:text-[#5de0e6] transition-colors"
                >
                  Ankasa Study
                </Link>
                <Link
                  href="/harga"
                  className="block hover:text-[#5de0e6] transition-colors"
                >
                  Harga Paket
                </Link>
              </nav>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-base font-bold mb-4 text-white uppercase tracking-wider">
                Hubungi Kami
              </h4>
              <div className="space-y-3 text-blue-100/80 font-medium text-xs md:text-sm">
                <a
                  href="mailto:contact@ankasa.com"
                  className="flex items-center gap-3 hover:text-[#5de0e6] transition-colors justify-center md:justify-start"
                >
                  <Mail className="h-4 w-4" /> <span>contact@ankasa.com</span>
                </a>
                <a
                  href="https://instagram.com/ankasa.hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#5de0e6] transition-colors justify-center md:justify-start"
                >
                  <Instagram className="h-4 w-4" /> <span>@ankasa.hub</span>
                </a>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Phone className="h-4 w-4" /> <span>+62 858 4895 3387</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-blue-100/50 font-medium">
            <p>
              &copy; {new Date().getFullYear()} Ankasa Hub. Aksi Nyata Kolektif
              Meraih Asa.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WA BOT BUTTON */}
      <a
        href="https://wa.me/6285848953387?text=Halo%20Admin%20Ankasa%20Hub,%20saya%20ingin%20bertanya%20mengenai%20layanan%20platform%20ini."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#5de0e6] text-[#004aad] p-4 rounded-full shadow-[0_8px_30px_rgba(93,224,230,0.4)] hover:bg-[#4bcad0] hover:scale-110 transition-all z-50 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          Chat Bot WhatsApp (Auto-Reply)
        </span>
      </a>
    </div>
  );
}

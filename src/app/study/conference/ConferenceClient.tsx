"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, PanelLeftClose, PanelLeftOpen, 
  BookOpen, Video, PenTool, LayoutTemplate 
} from "lucide-react"
import ConferenceList, { Row } from "./ConferenceList"

export default function ConferenceClient({
  rows,
  today,
  error
}: {
  rows: Row[]
  today: string
  error?: string
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      
      {/* HEADER ATAS */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6 gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-[#004aad] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <div className="w-px h-5 bg-gray-200 mx-1"></div>

          {/* TOGGLE SIDEBAR */}
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

      {/* BODY KONTEN DENGAN SIDEBAR */}
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 max-w-7xl transition-all duration-300">
        
        {/* SIDEBAR ANKASA STUDY */}
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
              <Link
                href="/study"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-white/80 hover:text-[#004aad] transition-all"
              >
                <BookOpen className="w-4 h-4" /> E-Book & Modul
              </Link>
              
              {/* MENU AKTIFF CONFERENCE */}
              <Link
                href="/study/conference"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold bg-[#004aad] text-white shadow-md shadow-[#004aad]/20 transition-all"
              >
                <Video className="w-4 h-4" /> Info Conference
              </Link>

              <Link
                href="/study"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-white/80 hover:text-[#004aad] transition-all"
              >
                <PenTool className="w-4 h-4" /> Jasa Desain
              </Link>

              <Link
                href="/study"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-white/80 hover:text-[#004aad] transition-all"
              >
                <LayoutTemplate className="w-4 h-4" /> Template Proyek
              </Link>
            </nav>
          </div>
        </aside>

        {/* AREA UTAMA LIST CONFERENCE */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm rounded-[2rem] p-6 md:p-8 min-h-[75vh]">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900">Jadwal Conference & Seminar</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Tenggat dan biaya dapat berubah sewaktu-waktu. Selalu periksa situs resmi sebelum mendaftar.
              </p>
            </div>

            {error && (
              <p className="mb-6 rounded-2xl bg-rose-50 p-4 text-xs font-bold text-rose-700 border border-rose-100">
                Data belum bisa dimuat: {error}
              </p>
            )}

            {!error && rows.length === 0 ? (
              <p className="text-xs text-gray-500 py-8 text-center font-medium">Belum ada data conference.</p>
            ) : (
              <ConferenceList rows={rows} today={today} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HargaPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Investasi untuk Masa Depanmu</h1>
          <p className="text-gray-600 text-lg">Tingkatkan potensimu dengan fitur AI tanpa batas dan akses dokumen eksklusif.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Paket Career Pro */}
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Career Pro</h3>
            <div className="text-4xl font-black text-gray-900 mb-6">Rp 59.999<span className="text-sm text-gray-400 font-normal">/bulan</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-2 text-sm text-gray-600"><Check className="w-5 h-5 text-blue-600 shrink-0"/> Unlimited CV Maker (AI)</li>
              <li className="flex gap-2 text-sm text-gray-600"><Check className="w-5 h-5 text-blue-600 shrink-0"/> Analisis ATS Score Premium</li>
              <li className="flex gap-2 text-sm text-gray-600"><Check className="w-5 h-5 text-blue-600 shrink-0"/> Prioritas Jasa Arsip Digital</li>
            </ul>
            <a href="https://wa.me/6285848953387" target="_blank" className="w-full block text-center bg-blue-50 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-100">Pilih Career Pro</a>
          </div>

          {/* Paket Bundling (Unggulan) */}
          <div className="bg-gray-900 text-white border border-gray-800 rounded-[2rem] p-8 shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3.5 h-3.5"/> PALING HEMAT
            </div>
            <h3 className="text-xl font-bold text-amber-400 mb-2">Bundling Ultimate</h3>
            <div className="text-4xl font-black text-white mb-6">Rp 100.000<span className="text-sm text-gray-400 font-normal">/bulan</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-2 text-sm text-gray-300"><Check className="w-5 h-5 text-amber-400 shrink-0"/> Semua fitur Career Pro</li>
              <li className="flex gap-2 text-sm text-gray-300"><Check className="w-5 h-5 text-amber-400 shrink-0"/> Semua fitur Study Pro</li>
              <li className="flex gap-2 text-sm text-gray-300"><Check className="w-5 h-5 text-amber-400 shrink-0"/> Konsultasi Publikasi 1-on-1</li>
              <li className="flex gap-2 text-sm text-gray-300"><Check className="w-5 h-5 text-amber-400 shrink-0"/> Lencana Khusus di Profil</li>
            </ul>
            <a href="https://wa.me/6285848953387" target="_blank" className="w-full block text-center bg-amber-500 text-gray-900 font-bold py-3 rounded-xl hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]">Beli Paket Bundling</a>
          </div>

          {/* Paket Study Pro */}
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-rose-600 mb-2">Study Pro</h3>
            <div className="text-4xl font-black text-gray-900 mb-6">Rp 59.999<span className="text-sm text-gray-400 font-normal">/bulan</span></div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex gap-2 text-sm text-gray-600"><Check className="w-5 h-5 text-rose-600 shrink-0"/> Unlimited AI Rangkuman PDF</li>
              <li className="flex gap-2 text-sm text-gray-600"><Check className="w-5 h-5 text-rose-600 shrink-0"/> Akses Semua Template Dokumen</li>
              <li className="flex gap-2 text-sm text-gray-600"><Check className="w-5 h-5 text-rose-600 shrink-0"/> Diskon Jasa Desain 15%</li>
            </ul>
            <a href="https://wa.me/6285848953387" target="_blank" className="w-full block text-center bg-rose-50 text-rose-700 font-bold py-3 rounded-xl hover:bg-rose-100">Pilih Study Pro</a>
          </div>

        </div>
      </main>
    </div>
  )
}
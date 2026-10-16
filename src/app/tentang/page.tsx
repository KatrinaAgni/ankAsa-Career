"use client"

import { ArrowLeft, Sparkles, Target, Compass, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TentangKamiPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-12 flex-grow">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Mengenal Lebih Dekat
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Tentang Ankasa Hub</h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Aksi Nyata Kolektif Meraih Asa. Kami hadir sebagai ekosistem digital terpadu yangmenjembatani kebutuhan akademik mahasiswa sekaligus mempersiapkan transisi mulus mereka menuju dunia karier profesional.
          </p>
        </div>

        {/* Visi Misi & Filosofi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-8 rounded-[2rem] shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Visi & Misi</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              <strong className="text-gray-900 block mb-1">Visi:</strong> Menjadi platform karier dan studi nomor satu bagi mahasiswa Indonesia yang inklusif dan berbasis teknologi cerdas.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong className="text-gray-900 block mb-1">Misi:</strong> Menyediakan akses informasi lowongan dan akademik yang transparan, terjangkau, serta didukung otomasi AI untuk efisiensi maksimal.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-8 rounded-[2rem] shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Filosofi Logo & Orbit</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Huruf <strong className="text-gray-900">"A"</strong> merepresentasikan inisial utama Ankasa sekaligus simbol awal langkah akademisi. Garis lengkung melingkar menggambarkan <strong className="text-gray-900">Orbit Pertumbuhan</strong> mahasiswa.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bintang kecil melambangkan pencapaian dan puncak kesuksesan yang diraih melalui kolaborasi kolektif.
            </p>
          </div>
        </div>

        {/* Form Kerja Sama */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Formulir Kerja Sama & Kolaborasi</h3>
            <p className="text-gray-500 text-sm">Tertarik berkolaborasi dengan Ankasa Hub untuk instansi, kampus, atau perusahaan? Silakan isi form di bawah.</p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="font-bold text-lg text-green-900">Pesan Berhasil Terkirim!</h4>
              <p className="text-sm text-green-700">Tim kami akan segera menghubungi instansi/perusahaanmu via email atau WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Nama Lengkap / Perwakilan</label>
                  <input required type="text" placeholder="Cth: Budi Santoso" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Nama Instansi / Perusahaan</label>
                  <input required type="text" placeholder="Cth: PT Tech Solutions / BEM Kampus" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Email Resmi</label>
                  <input required type="email" placeholder="budi@instansi.com" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Nomor WhatsApp</label>
                  <input required type="text" placeholder="08123456789" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Bentuk Kerja Sama / Pesan</label>
                <textarea required rows={4} placeholder="Jelaskan maksud dan bentuk kolaborasi yang diinginkan..." className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Kirim Pengajuan Kerja Sama
              </button>
            </form>
          )}
        </div>

      </main>
    </div>
  )
}
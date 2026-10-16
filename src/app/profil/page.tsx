import { ArrowLeft, User, Mail, Shield, Award } from "lucide-react"
import Link from "next/link"

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-8 rounded-[2rem] shadow-sm mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center font-black text-3xl shadow-md">
            KA
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-2xl font-extrabold text-gray-900">Katrina Agni</h1>
            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1"><Mail className="w-4 h-4"/> katrina@mhs.polines.ac.id</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <Shield className="w-3.5 h-3.5"/> Akun Freemium (Trial 1 Token Aktif)
            </div>
          </div>
          <Link href="/harga" className="bg-amber-500 text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm shadow-sm hover:bg-amber-400 transition-colors">
            Upgrade Paket
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Riwayat Token AI CV</h3>
            <p className="text-sm text-gray-500 mb-4">Penggunaan AI Generator dan Analisis CV ATS.</p>
            <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 flex justify-between items-center">
              <span>Token Trial Tersedia</span>
              <span className="font-bold text-green-600">1 / 1 Token</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-2">Status Layanan Arsip & Portofolio</h3>
            <p className="text-sm text-gray-500 mb-4">Akses riwayat pengiriman file Google Drive.</p>
            <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 flex justify-between items-center">
              <span>Belum ada permintaan aktif</span>
              <Link href="/career" className="text-blue-600 font-bold hover:underline">Buat Request</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
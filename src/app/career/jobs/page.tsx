import { ArrowLeft, Search, MapPin } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/career" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Career
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8">Eksplorasi Lowongan & MBKM</h1>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-200 mb-8">
           <div className="flex-1 flex items-center px-4"><Search className="w-5 h-5 text-gray-400 mr-2"/><input type="text" placeholder="Cari posisi magang atau full-time..." className="w-full outline-none bg-transparent"/></div>
           <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">Cari</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
           {/* Template Card Loker */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
             <h3 className="font-bold text-lg">Web Developer Intern</h3>
             <p className="text-blue-600 font-bold text-sm mb-4">TechCorp Semarang</p>
             <div className="flex gap-2 text-xs text-gray-500"><MapPin className="w-4 h-4"/> WFO / Semarang • MBKM</div>
           </div>
        </div>
      </main>
    </div>
  )
}
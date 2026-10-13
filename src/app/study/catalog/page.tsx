import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/study" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Study
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8">Perpustakaan Materi & Template</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {/* Template Item Katalog */}
           <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
             <div className="h-32 bg-emerald-100 rounded-xl mb-4 flex items-center justify-center text-emerald-600 font-bold">PDF</div>
             <h3 className="font-bold text-sm mb-2 line-clamp-2">Template Proposal PKM Kewirausahaan</h3>
             <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold"><Download className="w-4 h-4"/> Unduh Gratis</button>
           </div>
        </div>
      </main>
    </div>
  )
}
import { ArrowLeft, UploadCloud, File } from "lucide-react"
import Link from "next/link"

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/career" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Career
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8">Brankas Arsip Digital</h1>
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200 p-8 text-center border-dashed mb-8 cursor-pointer hover:bg-gray-50">
          <UploadCloud className="w-10 h-10 text-blue-500 mx-auto mb-4" />
          <p className="font-bold">Unggah Dokumen Baru (PDF/JPG)</p>
        </div>
        <div className="space-y-4">
           {/* Template List Arsip */}
           <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="bg-blue-100 text-blue-600 p-3 rounded-lg"><File className="w-6 h-6"/></div>
             <div>
               <h3 className="font-bold">Ijazah_S1_Teknik.pdf</h3>
               <p className="text-xs text-gray-500">Diunggah 12 Okt 2026 • 2.4 MB</p>
             </div>
           </div>
        </div>
      </main>
    </div>
  )
}
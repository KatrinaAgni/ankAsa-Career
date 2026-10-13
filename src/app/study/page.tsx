import { GraduationCap, ArrowLeft, PenTool, Globe, BookOpen } from "lucide-react"
import Link from "next/link"

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-rose-100 rounded-full mix-blend-multiply filter blur-[120px] opacity-60 pointer-events-none"></div>

      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-12 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" /> Ankasa Study
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Katalog Edukasi & Layanan</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl">
            Semua kebutuhan akademikmu ada di sini. Mulai dari pemesanan jasa desain, pengunduhan template, hingga *update* Conference.
          </p>
        </div>

        {/* Grid interaktif untuk jasa Study */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
             <PenTool className="w-12 h-12 text-amber-500 mx-auto mb-4" />
             <h3 className="font-bold text-xl">Pesan Jasa Desain</h3>
             <p className="text-sm text-gray-500 mt-2 mb-6">Formulir pemesanan desain poster, presentasi, dan makalah.</p>
             <button className="w-full py-2 bg-amber-100 text-amber-700 rounded-xl font-bold hover:bg-amber-200">Form Pemesanan</button>
           </div>
           
           <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
             <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
             <h3 className="font-bold text-xl">Info Conference</h3>
             <p className="text-sm text-gray-500 mt-2 mb-6">Daftar Call for Papers dan pendaftaran seminar internasional.</p>
             <button className="w-full py-2 bg-blue-100 text-blue-700 rounded-xl font-bold hover:bg-blue-200">Lihat Jadwal</button>
           </div>

           <div className="bg-white/80 p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
             <BookOpen className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
             <h3 className="font-bold text-xl">Perpustakaan Materi</h3>
             <p className="text-sm text-gray-500 mt-2 mb-6">Beli atau unduh gratis materi dan template dokumen.</p>
             <button className="w-full py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-200">Buka Katalog</button>
           </div>
        </div>
      </main>
    </div>
  )
}
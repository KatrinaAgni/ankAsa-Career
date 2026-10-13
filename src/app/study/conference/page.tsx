import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

export default function ConferencePage() {
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
        <h1 className="text-3xl font-extrabold mb-8">Jadwal Conference & Seminar</h1>
        <div className="space-y-4">
           {/* Template Card Conference */}
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
             <div>
               <h3 className="font-bold text-lg text-blue-800">IEEE International Conference on Technology 2027</h3>
               <p className="text-sm text-gray-600 mt-1">Penyelenggara: UNDIP Semarang</p>
             </div>
             <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm">
               <Calendar className="w-4 h-4"/> Deadline: 30 Nov 2026
             </div>
           </div>
        </div>
      </main>
    </div>
  )
}
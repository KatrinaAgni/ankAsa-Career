import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DesignFormPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/study" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Study
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-8 text-center">Formulir Pemesanan Desain</h1>
        <form className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
           <div>
             <label className="block text-sm font-bold mb-2">Jenis Desain</label>
             <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none">
               <option>Poster Conference / Lomba</option>
               <option>Presentasi PowerPoint / Canva</option>
               <option>Layout Makalah / Jurnal</option>
             </select>
           </div>
           <div>
             <label className="block text-sm font-bold mb-2">Deskripsi Kebutuhan</label>
             <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none" placeholder="Jelaskan tema, warna, dan tenggat waktu..."></textarea>
           </div>
           <button className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl">Kirim Pesanan (Ke WhatsApp)</button>
        </form>
      </main>
    </div>
  )
}
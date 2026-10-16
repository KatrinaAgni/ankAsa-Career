import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col justify-center items-center p-4 relative">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900">
          <ArrowLeft className="w-5 h-5"/> Beranda
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-8 rounded-[2rem] shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2D2D2D] rounded-2xl text-white font-black text-2xl mb-3">A</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Masuk ke Ankasa Hub</h1>
          <p className="text-xs text-gray-500 mt-1">Satu akun untuk Career & Study</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Email Akademik / Pribadi</label>
            <input type="email" placeholder="nama@email.com" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Kata Sandi</label>
            <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" />
          </div>
          <button type="button" className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-md">
            Masuk Sekarang
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-gray-500">
          Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar gratis</Link>
        </div>
      </div>
    </div>
  )
}
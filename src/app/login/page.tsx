"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")
    
    // 1. Cek email dan password ke Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })
    
    if (authError) {
      setErrorMsg("Email atau Kata Sandi salah!")
      setLoading(false)
      return
    }

    // 2. Cek Role dari tabel profiles (opsional, jika tabel profiles sudah ada)
    if (authData.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single()

      // 3. Arahkan halaman sesuai role
      if (profile?.role === 'admin') {
        router.push("/admin")
      } else {
        router.push("/profil") // Halaman profil standar
      }
    }
    
    setLoading(false)
  }

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

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Email Akademik / Pribadi</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com" 
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Kata Sandi</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-blue-500" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-md disabled:bg-gray-400"
          >
            {loading ? "Memproses..." : "Masuk Sekarang"}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-gray-500">
          Belum punya akun? <Link href="/register" className="text-blue-600 font-bold hover:underline">Daftar gratis</Link>
        </div>
      </div>
    </div>
  )
}
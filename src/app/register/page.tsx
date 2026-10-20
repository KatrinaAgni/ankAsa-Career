"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg("")
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (error) {
      setMsg(error.message)
    } else {
      setMsg("Berhasil! Silakan cek email Anda untuk verifikasi (atau langsung login jika tidak butuh verifikasi).")
      setTimeout(() => router.push("/login"), 3000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900">
        <ArrowLeft className="w-5 h-5"/> Beranda
      </Link>

      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-8 rounded-[2rem] shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2D2D2D] rounded-2xl text-white font-black text-2xl mb-3">A</div>
          <h1 className="text-2xl font-extrabold text-gray-900">Daftar Akun Baru</h1>
        </div>

        {msg && <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl">{msg}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Email</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Kata Sandi</label>
            <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-gray-50 border p-3 rounded-xl text-sm" />
          </div>
          <button disabled={loading} type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl shadow-md">
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>
        <div className="text-center mt-6 text-xs text-gray-500">Sudah punya akun? <Link href="/login" className="text-blue-600 font-bold">Masuk di sini</Link></div>
      </div>
    </div>
  )
}
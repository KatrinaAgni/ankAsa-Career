"use client"
import { ArrowLeft, Mail, Shield, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Anda Belum Login</h2>
        <p className="text-gray-500 mb-6">Silakan login untuk melihat profil dan mengakses fitur AI.</p>
        <Link href="/login" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl">Ke Halaman Login</Link>
      </div>
    )
  }

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
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full flex items-center justify-center font-black text-3xl">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-2xl font-extrabold text-gray-900">Mahasiswa Ankasa</h1>
            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1"><Mail className="w-4 h-4"/> {user.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <Shield className="w-3.5 h-3.5"/> Akun Freemium (Trial 1 Token Aktif)
            </div>
          </div>
          <div className="flex flex-col gap-2">
             <Link href="/harga" className="bg-amber-500 text-gray-900 font-bold text-center px-6 py-2 rounded-xl text-sm shadow-sm hover:bg-amber-400">Upgrade Paket</Link>
             <button onClick={handleLogout} className="flex items-center justify-center gap-1 text-red-600 font-bold text-sm bg-red-50 px-6 py-2 rounded-xl hover:bg-red-100">
               <LogOut className="w-4 h-4" /> Keluar
             </button>
          </div>
        </div>
      </main>
    </div>
  )
}
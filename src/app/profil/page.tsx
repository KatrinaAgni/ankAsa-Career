"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { LogOut, ShieldCheck, Crown, LayoutDashboard } from "lucide-react";

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        router.push("/login");
      }
    };
    getUser();
  }, [router, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Memuat profil...</div>;

  // Logika pengecekan Admin (sesuaikan dengan email kamu)
  const isAdmin = user.email === "admin.katrina@gmail.com";
  const userName = user?.user_metadata?.full_name || "Mahasiswa Ankasa";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 mb-8">
        &larr; Kembali ke Beranda
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        
        {/* Identitas Pengguna */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {userInitial}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
              <span className="text-sm">✉</span> {user?.email}
            </p>
            
            {/* Perubahan Badge Berdasarkan Role */}
            {isAdmin ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                <ShieldCheck className="w-4 h-4" />
                Akun Administrator (Akses Penuh)
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                Akun Freemium (Trial 1 Token Aktif)
              </div>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {isAdmin ? (
            <Link 
              href="/admin" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium transition-colors w-full"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Admin
            </Link>
          ) : (
            <button className="inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-white px-6 py-2.5 rounded-xl font-medium transition-colors w-full">
              <Crown className="w-4 h-4" />
              Upgrade Paket
            </button>
          )}
          
          <button 
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-2.5 rounded-xl font-medium transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>

      </div>
    </div>
  );
}
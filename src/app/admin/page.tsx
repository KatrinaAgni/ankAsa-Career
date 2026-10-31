"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Loader2,
  LogOut,
  ShieldCheck,
  User,
} from "lucide-react";

import { getSessionProfile, type SessionProfile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [state, setState] = useState<SessionProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aktif = true;

    async function cek() {
      const hasil = await getSessionProfile();
      if (!aktif) return;

      if (!hasil.session) {
        router.replace("/login");
        return;
      }

      if (!hasil.isAdmin) {
        router.replace("/profil");
        return;
      }

      setState(hasil);
      setLoading(false);
    }

    cek();

    return () => {
      aktif = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading || !state) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-[#004aad] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Beranda
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-red-600 font-bold text-xs bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 p-8 rounded-[2rem] shadow-sm mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#004aad] to-[#002b66] text-white rounded-full flex items-center justify-center">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-2xl font-extrabold text-gray-900">
              Panel Admin Ankasa
            </h1>
            <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-1 mt-1">
              <User className="w-4 h-4" />
              {state.profile?.nama_lengkap || state.session?.user.email}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#004aad] text-xs font-bold border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Akun Admin
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/study"
            className="group bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-[#004aad]/30 transition-all"
          >
            <div className="p-3 bg-blue-50 text-[#004aad] w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="font-extrabold text-gray-900">Kelola Katalog E-Book</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Tambah, edit, hapus, dan baca e-book penuh langsung dari halaman
              Ankasa Study.
            </p>
          </Link>

          <Link
            href="/profil"
            className="group bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-[#004aad]/30 transition-all"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6" />
            </div>
            <h2 className="font-extrabold text-gray-900">Profil Admin</h2>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Lihat informasi akun dan kelola sesi login admin.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}

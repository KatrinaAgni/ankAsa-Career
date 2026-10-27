import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const header = request.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";

  if (!token) {
    return NextResponse.json(
      { profile: null, isAdmin: false },
      { status: 401 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const admin = getSupabaseAdmin();

  if (!url || !anonKey || !admin) {
    return NextResponse.json(
      { error: "Konfigurasi Supabase server belum lengkap." },
      { status: 503 }
    );
  }

  const authClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json(
      { profile: null, isAdmin: false },
      { status: 401 }
    );
  }

  const { data: existingProfile, error: profileError } = await admin
    .from("users")
    .select("id, nama_lengkap, email, tipe_akun")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Gagal mengambil profil pengguna:", profileError.message);
    return NextResponse.json(
      { error: "Gagal mengambil profil pengguna." },
      { status: 500 }
    );
  }

  let profile = existingProfile ?? null;

  // Akun yang belum punya baris profil (mis. daftar sebelum trigger ada)
  // dibuatkan otomatis di sini dengan role 'user'.
  if (!profile) {
    const namaLengkap =
      typeof user.user_metadata?.nama_lengkap === "string"
        ? user.user_metadata.nama_lengkap
        : null;

    const { data: created, error: createError } = await admin
      .from("users")
      .insert([
        {
          id: user.id,
          nama_lengkap: namaLengkap,
          email: user.email ?? null,
          tipe_akun: "user",
        },
      ])
      .select("id, nama_lengkap, email, tipe_akun")
      .single();

    if (createError) {
      const { data: retry } = await admin
        .from("users")
        .select("id, nama_lengkap, email, tipe_akun")
        .eq("id", user.id)
        .maybeSingle();

      profile = retry ?? null;

      if (!profile) {
        console.error("Gagal membuat profil pengguna:", createError.message);
        return NextResponse.json(
          { error: "Gagal menyiapkan profil pengguna." },
          { status: 500 }
        );
      }
    } else {
      profile = created;
    }
  }

  return NextResponse.json({
    profile,
    isAdmin: profile?.tipe_akun === "admin",
  });
}

import {
  createClient,
  type SupabaseClient,
  type User,
} from "@supabase/supabase-js";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

type AdminAuthResult =
  | { ok: true; admin: SupabaseClient; user: User }
  | { ok: false; status: number; error: string };

export async function requireAdmin(
  request: Request
): Promise<AdminAuthResult> {
  const header = request.headers.get("authorization") ?? "";
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : "";

  if (!token) {
    return { ok: false, status: 401, error: "Sesi login tidak ditemukan." };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const admin = getSupabaseAdmin();

  if (!url || !anonKey || !admin) {
    return {
      ok: false,
      status: 503,
      error: "Konfigurasi Supabase server belum lengkap.",
    };
  }

  const authClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const {
    data: { user },
    error,
  } = await authClient.auth.getUser(token);

  if (error || !user) {
    return { ok: false, status: 401, error: "Sesi login tidak valid." };
  }

  const { data: profile, error: profileError } = await admin
    .from("users")
    .select("tipe_akun")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Gagal memeriksa role admin:", profileError.message);
    return {
      ok: false,
      status: 500,
      error: "Gagal memeriksa hak akses.",
    };
  }

  if (profile?.tipe_akun !== "admin") {
    return { ok: false, status: 403, error: "Akses hanya untuk admin." };
  }

  return { ok: true, admin, user };
}

export function storagePath(value?: string | null): string | null {
  if (!value) return null;
  if (value.startsWith("http")) return null;
  return value;
}

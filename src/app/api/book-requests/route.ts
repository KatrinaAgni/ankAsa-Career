import { NextResponse } from "next/server";
import { z } from "zod";

import { supabase } from "@/lib/supabase";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { hitungEstimasiHarga } from "@/lib/ebook-pricing";

export const runtime = "nodejs";

const schema = z.object({
  nama_pemesan: z.string().min(2, "Nama minimal 2 karakter").max(120),
  kontak_wa: z
    .string()
    .min(8, "Nomor WhatsApp tidak valid")
    .max(20)
    .regex(/^[0-9+ -]+$/, "Nomor WhatsApp hanya boleh angka"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  jenis_buku: z.string().min(2).max(80),
  jenjang: z.string().max(40).optional().or(z.literal("")),
  judul_diinginkan: z.string().max(160).optional().or(z.literal("")),
  deskripsi_kebutuhan: z
    .string()
    .min(10, "Ceritakan kebutuhan minimal 10 karakter")
    .max(3000),
  jumlah_halaman: z.coerce.number().int().min(1).max(2000).optional(),
  butuh_ilustrasi: z.boolean().optional().default(false),
});

function buatKodeOrder(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const acak = Array.from({ length: 4 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(Math.floor(Math.random() * 32))
  ).join("");
  return `ANK-${yy}${mm}-${acak}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid." },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const estimasi = hitungEstimasiHarga({
    jumlahHalaman: data.jumlah_halaman,
    jenjang: data.jenjang,
    butuhIlustrasi: data.butuh_ilustrasi,
  });

  const baseRow = {
    nama_pemesan: data.nama_pemesan,
    kontak_wa: data.kontak_wa,
    email: data.email || null,
    jenis_buku: data.jenis_buku,
    jenjang: data.jenjang || null,
    judul_diinginkan: data.judul_diinginkan || null,
    deskripsi_kebutuhan: data.deskripsi_kebutuhan,
    jumlah_halaman: data.jumlah_halaman ?? null,
    butuh_ilustrasi: data.butuh_ilustrasi ?? false,
    estimasi_harga: estimasi,
    status: "menunggu_bayar",
  };

  // Utamakan service role (bypass RLS). Fallback ke anon (butuh policy insert).
  const client = getSupabaseAdmin() ?? supabase;

  let kodeOrder = buatKodeOrder();
  let lastError: string | null = null;

  for (let i = 0; i < 4; i++) {
    const { error } = await client
      .from("book_requests")
      .insert({ ...baseRow, kode_order: kodeOrder });

    if (!error) {
      return NextResponse.json(
        { kode_order: kodeOrder, estimasi_harga: estimasi },
        { status: 201 }
      );
    }

    lastError = error.message;
    // 23505 = unique_violation -> kode order bentrok, coba lagi
    if (error.code !== "23505") break;
    kodeOrder = buatKodeOrder();
  }

  console.error("Gagal menyimpan permintaan:", lastError);
  return NextResponse.json(
    { error: "Gagal menyimpan permintaan. Coba lagi." },
    { status: 500 }
  );
}

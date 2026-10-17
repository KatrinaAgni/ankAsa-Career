import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kode = (searchParams.get("kode") || "").trim().toUpperCase();
  const wa = (searchParams.get("wa") || "").replace(/\D/g, "");

  if (!kode || wa.length < 4) {
    return NextResponse.json(
      { error: "Kode order dan 4 digit terakhir nomor WA wajib diisi." },
      { status: 400 }
    );
  }

  const client = getSupabaseAdmin();
  if (!client) {
    return NextResponse.json(
      {
        error:
          "Lacak pesanan belum aktif (SUPABASE_SERVICE_ROLE_KEY belum diset).",
      },
      { status: 503 }
    );
  }

  const { data, error } = await client
    .from("book_requests")
    .select(
      "kode_order, nama_pemesan, kontak_wa, jenis_buku, jenjang, judul_diinginkan, deskripsi_kebutuhan, jumlah_halaman, estimasi_harga, status, catatan_admin, created_at"
    )
    .eq("kode_order", kode)
    .maybeSingle();

  if (error) {
    console.error("Gagal lacak pesanan:", error.message);
    return NextResponse.json({ error: "Gagal mengambil data." }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json(
      { error: "Pesanan dengan kode tersebut tidak ditemukan." },
      { status: 404 }
    );
  }

  const waTersimpan = (data.kontak_wa || "").replace(/\D/g, "");
  if (!waTersimpan.endsWith(wa)) {
    return NextResponse.json(
      { error: "Nomor WhatsApp tidak cocok dengan pesanan." },
      { status: 403 }
    );
  }

  // Jangan balikan nomor WA penuh ke klien.
  const { kontak_wa, ...aman } = data;
  void kontak_wa;

  return NextResponse.json({ data: aman });
}

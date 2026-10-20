import type { JenjangBuku, KategoriBuku } from "@/lib/types";

export const NOMOR_WA = "62895359993661";

export const NOMOR_WA_DISPLAY = "0895359993661";

export const QRIS_IMAGE = "/qris.jpeg";

export const KATEGORI_LIST: KategoriBuku[] = [
  "Fiksi",
  "Non-Fiksi",
  "Akademik/Pelajaran",
  "Teknologi",
  "Bisnis",
  "Anak & Remaja",
];

export const JENJANG_LIST: JenjangBuku[] = [
  "TK/PAUD",
  "SD",
  "SMP",
  "SMA",
  "Kuliah",
  "Umum",
];

export const WARNA_KATEGORI: Record<string, string> = {
  Fiksi: "bg-rose-100 text-rose-700",
  "Non-Fiksi": "bg-amber-100 text-amber-700",
  "Akademik/Pelajaran": "bg-emerald-100 text-emerald-700",
  Teknologi: "bg-blue-100 text-blue-700",
  Bisnis: "bg-purple-100 text-purple-700",
  "Anak & Remaja": "bg-cyan-100 text-cyan-700",
};

// Safelist warna cover (kelas ini juga disimpan ke kolom `cover_warna`).
// Didaftarkan di sini agar Tailwind ikut men-generate kelasnya.
export const WARNA_COVER: Record<string, string> = {
  Fiksi: "bg-rose-900",
  "Non-Fiksi": "bg-amber-900",
  "Akademik/Pelajaran": "bg-emerald-900",
  Teknologi: "bg-blue-900",
  Bisnis: "bg-purple-900",
  "Anak & Remaja": "bg-cyan-900",
};

export const LABEL_STATUS: Record<string, string> = {
  menunggu_bayar: "Menunggu Pembayaran",
  diproses: "Sedang Diproses",
  selesai: "Selesai",
  batal: "Dibatalkan",
};

export const WARNA_STATUS: Record<string, string> = {
  menunggu_bayar: "bg-amber-100 text-amber-700",
  diproses: "bg-blue-100 text-blue-700",
  selesai: "bg-emerald-100 text-emerald-700",
  batal: "bg-gray-200 text-gray-600",
};

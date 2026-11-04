import { z } from "zod";

export const ebookInputSchema = z.object({
  judul: z.string().trim().min(1, "Judul wajib diisi.").max(200),
  kategori: z.string().trim().min(1, "Kategori wajib diisi.").max(80),
  jenjang: z.string().trim().max(40).optional().nullable(),
  penulis: z.string().trim().max(120).optional().nullable(),
  deskripsi: z.string().trim().max(5000).optional().nullable(),
  harga: z.number().min(0).optional().nullable(),
  urutan: z.number().int().optional().nullable(),
  is_contoh: z.boolean().optional().default(true),
  cover_path: z.string().trim().max(500).optional().nullable(),
  file_path: z.string().trim().max(500).optional().nullable(),
  cover_warna: z.string().trim().max(100).optional().nullable(),
  badge_warna: z.string().trim().max(100).optional().nullable(),
});

export type EbookInput = z.infer<typeof ebookInputSchema>;

export function normalizeEbookInput(input: EbookInput) {
  const clean = (value?: string | null) => {
    if (value === undefined || value === null) return null;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  };

  return {
    judul: input.judul.trim(),
    kategori: input.kategori.trim(),
    jenjang: clean(input.jenjang),
    penulis: clean(input.penulis),
    deskripsi: clean(input.deskripsi),
    harga: input.harga ?? null,
    urutan: input.urutan ?? 0,
    is_contoh: input.is_contoh ?? true,
    cover_path: clean(input.cover_path),
    file_path: clean(input.file_path),
    cover_warna: clean(input.cover_warna),
    badge_warna: clean(input.badge_warna),
  };
}

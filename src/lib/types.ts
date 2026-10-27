export type KategoriBuku =
  | "Fiksi"
  | "Non-Fiksi"
  | "Akademik/Pelajaran"
  | "Teknologi"
  | "Bisnis"
  | "Anak & Remaja";

export type JenjangBuku =
  | "TK/PAUD"
  | "SD"
  | "SMP"
  | "SMA"
  | "Kuliah"
  | "Umum";

export type Ebook = {
  id: number;
  judul: string;
  kategori: string;
  deskripsi: string | null;
  harga: number | null;
  cover_warna: string | null;
  jenis: string | null;
  jenjang: string | null;
  penulis: string | null;
  badge_warna: string | null;
  cover_path: string | null;
  file_path: string | null;
  urutan: number | null;
  is_contoh: boolean | null;
  created_at?: string;
};

export type TipeAkun = "admin" | "user" | "freemium";

export type UserProfile = {
  id: string;
  nama_lengkap: string | null;
  email: string | null;
  tipe_akun: TipeAkun;
};

export type CvBuilderOutput = {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  summary: string;
  experience: {
    title: string;
    company: string;
    dates: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    dates: string;
  }[];
  skills: string[];
  certifications?: {
    name: string;
    organizer: string;
    dates: string;
  }[];
};

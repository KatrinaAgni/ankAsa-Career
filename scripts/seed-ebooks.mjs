// =====================================================================
// Seed data etalase e-book ke Supabase (Storage + tabel `ebook`)
//
// CARA PAKAI:
//   1. Pastikan `SUPABASE_SERVICE_ROLE_KEY` sudah ada di .env.local
//   2. Jalankan:  node scripts/seed-ebooks.mjs
//      (opsional) node scripts/seed-ebooks.mjs --dir "C:\\path\\ke\\folder"
//
// Script ini:
//   - Membaca PDF dari folder sumber (default: Downloads)
//   - Upload ke Storage bucket `ebook-file`
//   - Insert / update baris di tabel `ebook`
// =====================================================================

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "\n[GAGAL] NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local\n"
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const dirFlagIdx = args.indexOf("--dir");
const SOURCE_DIR =
  dirFlagIdx !== -1 && args[dirFlagIdx + 1]
    ? args[dirFlagIdx + 1]
    : join(homedir(), "Downloads");

if (!existsSync(SOURCE_DIR)) {
  console.error(`[GAGAL] Folder sumber tidak ditemukan: ${SOURCE_DIR}`);
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const WARNA = {
  Fiksi: { cover: "bg-rose-900", badge: "bg-rose-100 text-rose-700" },
  "Non-Fiksi": { cover: "bg-amber-900", badge: "bg-amber-100 text-amber-700" },
  "Akademik/Pelajaran": {
    cover: "bg-emerald-900",
    badge: "bg-emerald-100 text-emerald-700",
  },
  Teknologi: { cover: "bg-blue-900", badge: "bg-blue-100 text-blue-700" },
  Bisnis: { cover: "bg-purple-900", badge: "bg-purple-100 text-purple-700" },
  "Anak & Remaja": { cover: "bg-cyan-900", badge: "bg-cyan-100 text-cyan-700" },
};

/** Daftar buku etalase. `match` = potongan nama file di folder sumber. */
const EBOOKS = [
  // ---- Fiksi ----
  { match: "Turtles All the Way Down", judul: "Turtles All the Way Down", penulis: "John Green", kategori: "Fiksi", deskripsi: "Novel remaja tentang kecemasan, persahabatan, dan pencarian jati diri." },
  { match: "Sherlock Holmes; Empat", judul: "Sherlock Holmes: Empat Pemburu Harta", penulis: "Arthur Conan Doyle", kategori: "Fiksi", deskripsi: "Petualangan klasik detektif Sherlock Holmes dalam memecahkan kasus misterius." },
  { match: "THE HUNGER GAMES", judul: "The Hunger Games", penulis: "Suzanne Collins", kategori: "Fiksi", deskripsi: "Novel distopia tentang pertarungan bertahan hidup di arena Capitol." },
  { match: "PULANG (Tere Liye)", judul: "Pulang", penulis: "Tere Liye", kategori: "Fiksi", deskripsi: "Kisah perjalanan hidup, perjuangan, dan makna pulang ke kampung halaman." },
  { match: "Matahari (Tere Liye)", judul: "Matahari", penulis: "Tere Liye", kategori: "Fiksi", deskripsi: "Petualangan Soke Bahtera dan sahabat-sahabatnya mengejar mimpi." },
  { match: "Negeri di Ujung Tanduk", judul: "Negeri di Ujung Tanduk", penulis: "Tere Liye", kategori: "Fiksi", deskripsi: "Novel politik dan kemanusiaan tentang negeri yang berada di ujung tanduk." },
  { match: "Negeri Para Bedebah", judul: "Negeri Para Bedebah", penulis: "Tere Liye", kategori: "Fiksi", deskripsi: "Kisah intrik ekonomi dan kekuasaan dari sudut pandang seorang bankir." },
  { match: "The Love Hypothesis", judul: "The Love Hypothesis", penulis: "Ali Hazelwood", kategori: "Fiksi", deskripsi: "Romansa komedi tentang seorang mahasiswa doktoral dan kepura-puraan cinta." },

  // ---- Non-Fiksi ----
  { match: "Madilog", judul: "Madilog", penulis: "Tan Malaka", kategori: "Non-Fiksi", deskripsi: "Materialisme, Dialektika, dan Logika — karya filsafat klasik Indonesia." },
  { match: "speak English fluently", judul: "How to Speak English Fluently in One Week", penulis: "Umum", kategori: "Non-Fiksi", deskripsi: "Panduan praktis melatih kemampuan berbicara bahasa Inggris dengan cepat." },
  { match: "Puns , puzzles", judul: "Puns, Puzzles and Word Play", penulis: "Umum", kategori: "Non-Fiksi", deskripsi: "Kumpulan permainan kata, teka-teki, dan humor bahasa Inggris." },

  // ---- Teknologi ----
  { match: "IoT MQTTv4.pdf", judul: "Buku Ajar IoT & MQTT", penulis: "Polines", kategori: "Teknologi", deskripsi: "Buku ajar Internet of Things dengan protokol MQTT untuk praktikum." },
  { match: "INTERNET OF THINGS+COVER.pdf", judul: "Buku Ajar Internet of Things", penulis: "Polines", kategori: "Teknologi", deskripsi: "Dasar-dasar Internet of Things: konsep, arsitektur, dan penerapan." },
  { match: "java-8-multithreaded-programs", judul: "Java 8 Multithreaded Programs", penulis: "Umum", kategori: "Teknologi", deskripsi: "Panduan pemrograman multithreading di Java 8 beserta contoh program." },
  { match: "Panduan_Lab_Wazuh", judul: "Panduan Lab Wazuh SIEM", penulis: "Polines", kategori: "Teknologi", deskripsi: "Langkah praktikum keamanan menggunakan Wazuh SIEM untuk monitoring." },
  { match: "Setting VPN LAB", judul: "Setting VPN Lab Cyber Security", penulis: "Polines", kategori: "Teknologi", deskripsi: "Panduan konfigurasi VPN pada laboratorium keamanan siber." },
  { match: "Lab_Praktikum_CTF.pdf", judul: "Lab Praktikum CTF", penulis: "Polines", kategori: "Teknologi", deskripsi: "Modul praktikum Capture The Flag untuk latihan keamanan siber." },

  // ---- Akademik / Pelajaran ----
  { match: "6-Panduan-PKM-KC-published", judul: "Panduan PKM Kewirausahaan (KC)", penulis: "Kemendikbud", kategori: "Akademik/Pelajaran", deskripsi: "Panduan lengkap penyusunan proposal PKM bidang Kewirausahaan." },
  { match: "Cambridge - Target Score", judul: "Cambridge Target Score (TOEIC)", penulis: "Cambridge", kategori: "Akademik/Pelajaran", deskripsi: "Buku persiapan tes TOEIC: strategi, latihan, dan pembahasan." },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function findSourceFile(match) {
  const files = readdirSync(SOURCE_DIR);
  const hit = files.find(
    (f) => f.toLowerCase().includes(match.toLowerCase()) && f.toLowerCase().endsWith(".pdf")
  );
  return hit ? join(SOURCE_DIR, hit) : null;
}

async function ensureRowExists(judul) {
  const { data, error } = await supabase
    .from("ebook")
    .select("id")
    .eq("judul", judul)
    .maybeSingle();
  if (error) throw new Error(`Gagal cek judul "${judul}": ${error.message}`);
  return data ? data.id : null;
}

async function main() {
  console.log(`\nSumber file : ${SOURCE_DIR}`);
  console.log(`Supabase    : ${SUPABASE_URL}\n`);

  let sukses = 0;
  let lewat = 0;
  let gagal = 0;

  for (let i = 0; i < EBOOKS.length; i++) {
    const item = EBOOKS[i];
    const filePath = findSourceFile(item.match);

    if (!filePath) {
      console.warn(`  [LEWAT] File tidak ditemukan: "${item.match}"`);
      lewat++;
      continue;
    }

    const warna = WARNA[item.kategori] || WARNA["Non-Fiksi"];
    const namaObjek = `ebooks/${slugify(item.judul)}.pdf`;

    try {
      const buffer = readFileSync(filePath);
      const sizeMb = (statSync(filePath).size / 1024 / 1024).toFixed(2);

      const { error: upErr } = await supabase.storage
        .from("ebook-file")
        .upload(namaObjek, buffer, {
          contentType: "application/pdf",
          upsert: true,
        });
      if (upErr) throw upErr;

      const row = {
        judul: item.judul,
        kategori: item.kategori,
        jenis: item.kategori,
        jenjang: item.jenjang ?? "Umum",
        penulis: item.penulis,
        deskripsi: item.deskripsi,
        harga: null,
        cover_warna: warna.cover,
        badge_warna: warna.badge,
        cover_path: null,
        file_path: namaObjek,
        urutan: i + 1,
        is_contoh: true,
        updated_at: new Date().toISOString(),
      };

      const existingId = await ensureRowExists(item.judul);
      if (existingId) {
        const { error } = await supabase
          .from("ebook")
          .update(row)
          .eq("id", existingId);
        if (error) throw error;
        console.log(`  [UPDATE] ${item.judul} (${sizeMb} MB)`);
      } else {
        const { error } = await supabase.from("ebook").insert(row);
        if (error) throw error;
        console.log(`  [INSERT] ${item.judul} (${sizeMb} MB)`);
      }
      sukses++;
    } catch (err) {
      console.error(`  [GAGAL ] ${item.judul}: ${err.message || err}`);
      gagal++;
    }
  }

  console.log(
    `\nSelesai. Sukses: ${sukses} | Lewat: ${lewat} | Gagal: ${gagal}\n`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

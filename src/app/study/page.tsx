"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Globe,
  Loader2,
  Lock,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  PenTool,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  UploadCloud,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { getAccessToken, getSessionProfile } from "@/lib/auth";
import {
  JENJANG_LIST,
  KATEGORI_LIST,
  NOMOR_WA,
  NOMOR_WA_DISPLAY,
} from "@/lib/konstanta";
import { publicEbookCoverUrl } from "@/lib/storage";
import type { Ebook, JenjangBuku, KategoriBuku } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConferenceList from "./conference/ConferenceList";

type EbookFormState = {
  judul: string;
  kategori: string;
  jenjang: string;
  penulis: string;
  deskripsi: string;
  harga: string;
  urutan: string;
  is_contoh: boolean;
  cover_warna: string;
  badge_warna: string;
};

const EMPTY_FORM: EbookFormState = {
  judul: "",
  kategori: "",
  jenjang: "",
  penulis: "",
  deskripsi: "",
  harga: "",
  urutan: "0",
  is_contoh: true,
  cover_warna: "",
  badge_warna: "",
};

const EBOOK_FIELDS: string =
  "id,judul,kategori,jenjang,penulis,deskripsi,harga,urutan,is_contoh,cover_path,cover_warna,badge_warna,created_at";

function waLink(message: string) {
  return `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(message)}`;
}

export default function StudyPage() {
  const [activeMenu, setActiveMenu] = useState("katalog");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State Data Supabase
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // State form admin
  const [ebookModalOpen, setEbookModalOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [form, setForm] = useState<EbookFormState>(EMPTY_FORM);
  const [formKey, setFormKey] = useState(0);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // State hapus
  const [deleteTarget, setDeleteTarget] = useState<Ebook | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // State baca full
  const [readerOpen, setReaderOpen] = useState(false);
  const [readerTitle, setReaderTitle] = useState("");
  const [readerUrl, setReaderUrl] = useState("");
  const [readerLoading, setReaderLoading] = useState(false);
  const [readerError, setReaderError] = useState("");

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

  const fetchEbooks = async () => {
    const fields = isAdmin ? "*" : EBOOK_FIELDS;
    const { data } = await supabase
      .from("ebook")
      .select(fields)
      .order("created_at", { ascending: false });
    if (data) setEbooks(data as unknown as Ebook[]);
  };

  useEffect(() => {
    let aktif = true;

    async function init() {
      const profileRes = await getSessionProfile();
      if (!aktif) return;

      const fields = profileRes.isAdmin ? "*" : EBOOK_FIELDS;
      const [ebookRes, confRes] = await Promise.all([
        supabase
          .from("ebook")
          .select(fields)
          .order("created_at", { ascending: false }),
        supabase
          .from("conference")
          .select("*")
          .order("tanggal_mulai", { ascending: true }),
      ]);

      if (!aktif) return;

      if (ebookRes.data) setEbooks(ebookRes.data as unknown as Ebook[]);
      if (confRes.data) setConferences(confRes.data);
      setIsAdmin(profileRes.isAdmin);
    }

    init();

    return () => {
      aktif = false;
    };
  }, []);

  function openCreate() {
    setEditingEbook(null);
    setForm(EMPTY_FORM);
    setCoverFile(null);
    setPdfFile(null);
    setFormError("");
    setFormKey((k) => k + 1);
    setEbookModalOpen(true);
  }

  function openEdit(ebook: Ebook) {
    setEditingEbook(ebook);
    setForm({
      judul: ebook.judul ?? "",
      kategori: ebook.kategori ?? "",
      jenjang: ebook.jenjang ?? "",
      penulis: ebook.penulis ?? "",
      deskripsi: ebook.deskripsi ?? "",
      harga: ebook.harga != null ? String(ebook.harga) : "",
      urutan: ebook.urutan != null ? String(ebook.urutan) : "0",
      is_contoh: ebook.is_contoh ?? true,
      cover_warna: ebook.cover_warna ?? "",
      badge_warna: ebook.badge_warna ?? "",
    });
    setCoverFile(null);
    setPdfFile(null);
    setFormError("");
    setFormKey((k) => k + 1);
    setEbookModalOpen(true);
  }

  async function uploadToBucket(
    bucket: "ebook-cover" | "ebook-file",
    file: File
  ) {
    const token = await getAccessToken();
    if (!token) throw new Error("Sesi login berakhir. Silakan login ulang.");

    const formData = new FormData();
    formData.append("kind", bucket === "ebook-cover" ? "cover" : "file");
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.error || "Gagal mengunggah file.");
    }

    return json.path as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAdmin) return;

    setSaving(true);
    setFormError("");

    let uploadedCover: string | null = null;
    let uploadedFile: string | null = null;
    let apiSucceeded = false;

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sesi login berakhir. Silakan login ulang.");

      const harga = form.harga.trim() ? Number(form.harga) : null;
      if (harga !== null && (!Number.isFinite(harga) || harga < 0)) {
        throw new Error("Harga tidak valid.");
      }

      const urutan = form.urutan.trim() ? Number(form.urutan) : 0;
      if (!Number.isFinite(urutan)) {
        throw new Error("Urutan tidak valid.");
      }

      let coverPath = editingEbook?.cover_path ?? null;
      let filePath = editingEbook?.file_path ?? null;

      if (coverFile) {
        uploadedCover = await uploadToBucket("ebook-cover", coverFile);
        coverPath = uploadedCover;
      }

      if (pdfFile) {
        uploadedFile = await uploadToBucket("ebook-file", pdfFile);
        filePath = uploadedFile;
      }

      const payload = {
        judul: form.judul,
        kategori: form.kategori,
        jenjang: form.jenjang || null,
        penulis: form.penulis || null,
        deskripsi: form.deskripsi || null,
        harga,
        urutan,
        is_contoh: form.is_contoh,
        cover_path: coverPath,
        file_path: filePath,
        cover_warna: form.cover_warna || null,
        badge_warna: form.badge_warna || null,
      };

      const url = editingEbook
        ? `/api/admin/ebooks/${editingEbook.id}`
        : "/api/admin/ebooks";

      const res = await fetch(url, {
        method: editingEbook ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Gagal menyimpan e-book.");

      apiSucceeded = true;
      setEbookModalOpen(false);
      setEditingEbook(null);
      setCoverFile(null);
      setPdfFile(null);
      await fetchEbooks();
    } catch (err) {
      if (!apiSucceeded) {
        if (uploadedCover) {
          await supabase.storage.from("ebook-cover").remove([uploadedCover]);
        }
        if (uploadedFile) {
          await supabase.storage.from("ebook-file").remove([uploadedFile]);
        }
      }
      setFormError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget || !isAdmin) return;

    setDeleting(true);
    setDeleteError("");

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sesi login berakhir. Silakan login ulang.");

      const res = await fetch(`/api/admin/ebooks/${deleteTarget.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Gagal menghapus e-book.");

      setDeleteTarget(null);
      await fetchEbooks();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setDeleting(false);
    }
  }

  async function openReader(ebook: Ebook) {
    setReaderOpen(true);
    setReaderTitle(ebook.judul);
    setReaderUrl("");
    setReaderError("");
    setReaderLoading(true);

    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sesi login berakhir. Silakan login ulang.");

      const res = await fetch(`/api/ebooks/${ebook.id}/baca`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Gagal membuka file e-book.");

      setReaderUrl(json.url);
    } catch (err) {
      setReaderError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setReaderLoading(false);
    }
  }

  const waRequestGlobal = waLink(
    "Halo Admin Ankasa, saya ingin request buku. Mohon info selengkapnya."
  );

  // State form request buku
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    nama: "",
    noWa: "",
    judul: "",
    keterangan: "",
  });
  const [requestPrefill, setRequestPrefill] = useState<string>("");

  function openRequestForm(prefill?: string) {
    setRequestPrefill(prefill || "");
    setRequestForm({
      nama: "",
      noWa: "",
      judul: prefill || "",
      keterangan: prefill ? `Request buku serupa dengan: ${prefill}` : "",
    });
    setRequestModalOpen(true);
  }

  function submitRequestForm() {
    const nama = requestForm.nama.trim();
    const noWa = requestForm.noWa.trim();
    const judul = requestForm.judul.trim();
    const keterangan = requestForm.keterangan.trim();

    if (!nama || !judul) {
      alert("Nama dan Judul Buku yang diminta wajib diisi.");
      return;
    }

    let pesan = `Halo Admin Ankasa Hub, saya ingin request buku.\n\n`;
    pesan += `Nama: ${nama}\n`;
    if (noWa) pesan += `No. WA: ${noWa}\n`;
    pesan += `Judul Buku yang diminta: ${judul}\n`;
    if (keterangan) pesan += `Keterangan: ${keterangan}\n`;
    pesan += `\nMohon info ketersediaan & harga ya. Terima kasih.`;

    const link = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;
    window.open(link, "_blank");
    setRequestModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 flex flex-col font-sans">
      
      {/* HEADER ATAS */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-14 items-center px-4 md:px-6 gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-[#004aad] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Beranda</span>
          </Link>
          <div className="w-px h-5 bg-gray-200 mx-1"></div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center text-gray-500 bg-gray-100 p-2 rounded-xl hover:bg-gray-200 hover:text-[#004aad] transition-colors"
            title={isSidebarOpen ? "Tutup Menu" : "Buka Menu"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 max-w-7xl transition-all duration-300">
        
        {/* SIDEBAR NAVIGASI DINAMIS */}
        <aside
          className={`${
            isSidebarOpen
              ? "w-full md:w-64 opacity-100"
              : "w-0 overflow-hidden opacity-0 p-0 m-0 border-0"
          } shrink-0 transition-all duration-300 ease-in-out`}
        >
          <div className="sticky top-20 bg-white/70 backdrop-blur-md border border-white/80 shadow-sm rounded-[2rem] p-5 w-full md:w-64">
            <div className="mb-6 px-2">
              <h2 className="text-xl font-extrabold text-[#004aad]">
                Ankasa Study
              </h2>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveMenu("katalog")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "katalog"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <BookOpen className="w-4 h-4" /> Katalog E-book
              </button>

              <button
                onClick={() => setActiveMenu("conference")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "conference"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <Globe className="w-4 h-4" /> Info Conference
              </button>

              <button
                onClick={() => setActiveMenu("rangkuman_ai")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "rangkuman_ai"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <Sparkles className="w-4 h-4" /> Rangkuman AI
              </button>

              <button
                onClick={() => setActiveMenu("template")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "template"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <FileText className="w-4 h-4" /> Download Template
              </button>

              <div className="my-2 border-t border-gray-100"></div>

              <button
                onClick={() => setActiveMenu("desain")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeMenu === "desain"
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-gray-600 hover:bg-white/80 hover:text-[#004aad]"
                }`}
              >
                <PenTool className="w-4 h-4" /> Jasa Akademik
              </button>
            </nav>
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <main className="flex-1 min-w-0 transition-all duration-300">
          <div className="bg-white/70 backdrop-blur-xl border border-white/80 shadow-sm rounded-[2rem] p-6 md:p-8 min-h-[75vh]">
            
            {/* 1. TAB KATALOG E-BOOK */}
            {activeMenu === "katalog" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">
                      Katalog E-Book Ankasa
                    </h2>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      Pilihan e-book dan modul pembelajaran resmi untuk menunjang studi.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => openRequestForm()}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Request Buku
                    </button>
                    {isAdmin && (
                      <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 bg-[#004aad] hover:bg-[#00337a] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah E-book
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {ebooks.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium text-xs">
                      Memuat katalog e-book dari database Supabase...
                    </div>
                  ) : (
                    ebooks.map((ebook) => {
                      const coverUrl = publicEbookCoverUrl(ebook.cover_path);

                      return (
                        <div
                          key={ebook.id}
                          className="flex flex-col lg:flex-row gap-6 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex-1 flex flex-col justify-between">
                            {isAdmin && (
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <button
                                  onClick={() => openEdit(ebook)}
                                  className="inline-flex items-center gap-1.5 bg-blue-50 text-[#004aad] hover:bg-blue-100 px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-colors"
                                >
                                  <Pencil className="w-3 h-3" /> Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setDeleteTarget(ebook);
                                    setDeleteError("");
                                  }}
                                  className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" /> Hapus
                                </button>
                                {ebook.file_path ? (
                                  <span className="text-[10px] font-bold text-emerald-600">
                                    File tersedia
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold text-amber-600">
                                    File PDF belum diunggah
                                  </span>
                                )}
                              </div>
                            )}

                            <div>
                              <div
                                className={`w-full h-40 ${
                                  ebook.cover_warna ||
                                  "bg-gradient-to-br from-[#004aad] to-[#002b66]"
                                } rounded-2xl flex items-center justify-center text-white mb-4 shadow-inner relative overflow-hidden`}
                              >
                                {coverUrl && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={coverUrl}
                                    alt={ebook.judul}
                                    className="absolute inset-0 h-full w-full object-cover"
                                  />
                                )}
                                {coverUrl && (
                                  <div className="absolute inset-0 bg-black/25" />
                                )}
                                <BookOpen className="w-10 h-10 opacity-70 relative z-10" />
                              </div>
                              <span className="bg-blue-50 text-[#004aad] px-2.5 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                                {ebook.kategori || "Pendidikan"}
                              </span>
                              <h3 className="text-xl font-bold text-gray-900 mt-2">
                                {ebook.judul}
                              </h3>
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-3">
                                {ebook.deskripsi}
                              </p>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                              <div>
                                <span className="text-[10px] text-gray-400 font-bold block uppercase">
                                  Harga E-Book
                                </span>
                                <div className="text-xl font-black text-gray-900">
                                  Rp{" "}
                                  {ebook.harga
                                    ? ebook.harga.toLocaleString("id-ID")
                                    : "0"}
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2">
                                <a
                                  href={waLink(
                                    `Halo Admin Ankasa, saya ingin membeli E-Book: ${ebook.judul}`
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-[#004aad] hover:bg-[#00337a] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-[#004aad]/20 transition-all inline-flex items-center justify-center gap-1.5"
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" /> Beli E-Book
                                </a>
                                <button
                                  onClick={() => openRequestForm(ebook.judul)}
                                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all inline-flex items-center justify-center gap-1.5"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" /> Request
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 bg-gray-50/80 rounded-2xl border border-gray-200/60 p-4 flex flex-col relative overflow-hidden min-h-[220px]">
                            <div className="text-[10px] font-extrabold text-gray-400 mb-2 text-center uppercase tracking-wider">
                              {isAdmin
                                ? "Pratinjau Penuh (Admin)"
                                : "Preview Terbatas (Halaman 1)"}
                            </div>
                            <div className="flex-grow bg-white border border-gray-100 rounded-xl shadow-inner p-4 text-[11px] text-gray-400 overflow-hidden relative">
                              <h4 className="font-bold text-gray-800 mb-1">
                                BAB 1 — PENDAHULUAN & KONSEP
                              </h4>
                              <p className="mb-2 text-gray-600">
                                Modul ini dirancang khusus untuk mempermudah pemahaman konsep dasar akademik secara sistematis...
                              </p>
                              <p
                                className={
                                  isAdmin
                                    ? "text-gray-500"
                                    : "blur-[3px] select-none text-gray-300"
                                }
                              >
                                Ini adalah konten halaman yang disamarkan. Anda perlu membeli e-book resmi ini untuk mengakses seluruh isi bab dan materi lengkap tanpa batasan.
                              </p>

                              {!isAdmin && (
                                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center flex-col p-4 text-center">
                                  <div className="p-3 bg-white text-[#004aad] rounded-full shadow-md mb-2">
                                    <Lock className="w-5 h-5" />
                                  </div>
                                  <span className="font-extrabold text-gray-800 text-xs bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                    Akses Penuh Terkunci
                                  </span>
                                </div>
                              )}
                            </div>

                            {isAdmin && (
                              <button
                                type="button"
                                onClick={() => openReader(ebook)}
                                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#004aad] hover:bg-[#00337a] text-white py-2.5 rounded-xl text-xs font-extrabold shadow-md shadow-[#004aad]/20 transition-all"
                              >
                                <Eye className="w-4 h-4" />
                                Baca Full E-Book
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* BANNER REQUEST BUKU */}
                <div className="mt-10 bg-gradient-to-r from-[#004aad] to-[#002b66] text-white rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#5de0e6] rounded-full filter blur-[100px] opacity-20 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-[#5de0e6] text-[10px] font-extrabold uppercase tracking-wider mb-2 bg-white/10 px-3 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5" /> Request Buku
                    </div>
                    <h2 className="text-2xl font-extrabold">
                      Butuh Modul Belajar atau Buku Khusus?
                    </h2>
                    <p className="text-blue-100/80 mt-2 max-w-xl text-xs font-medium leading-relaxed">
                      Sampaikan kebutuhanmu — misalnya "Buku latihan soal matematika SD". Tim kami akan menyusunkan materi dan desain khusus sesuai permintaanmu.
                    </p>
                    <p className="text-[#5de0e6] mt-2 text-xs font-bold">
                      WhatsApp: {NOMOR_WA_DISPLAY}
                    </p>
                  </div>
                  <button
                    onClick={() => openRequestForm()}
                    className="relative z-10 shrink-0 inline-flex items-center justify-center gap-2 bg-[#5de0e6] text-[#004aad] hover:bg-[#4bcad0] font-black px-6 py-3.5 rounded-xl transition-all shadow-md text-xs"
                  >
                    <MessageCircle className="w-4 h-4" /> Request via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* 2. TAB INFO CONFERENCE */}
            {activeMenu === "conference" && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                    Jadwal Conference & Seminar
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">
                    Tenggat dan biaya dapat berubah sewaktu-waktu. Selalu periksa situs resmi sebelum mendaftar.
                  </p>
                </div>

                {conferences.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 font-medium text-xs">
                    Memuat data conference dari database Supabase...
                  </div>
                ) : (
                  <ConferenceList rows={conferences} today={today} />
                )}
              </div>
            )}

            {/* 3. TAB RANGKUMAN AI */}
            {activeMenu === "rangkuman_ai" && (
              <div className="animate-in fade-in duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                      AI Perangkum Modul & Materi
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      Konversi dokumen PDF tebal menjadi poin-poin ringkasan penting dalam hitungan detik.
                    </p>
                  </div>
                  <span className="bg-blue-50 text-[#004aad] px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase">
                    Freemium
                  </span>
                </div>

                <div className="bg-white border-2 border-dashed border-gray-200 p-10 rounded-3xl text-center hover:border-[#5de0e6] transition-colors cursor-pointer group">
                  <div className="p-4 bg-blue-50 text-[#004aad] w-fit rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-gray-800 text-sm">
                    Unggah Dokumen PDF Modul Kuliah
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 mb-6 max-w-sm mx-auto">
                    Maksimal 50 halaman untuk akun gratis. Akses tanpa batas khusus pengguna Study Plus.
                  </p>
                  <button className="bg-[#004aad] text-white font-extrabold py-3 px-8 rounded-xl text-xs shadow-md shadow-[#004aad]/20 hover:bg-[#00337a] transition-all">
                    Ringkas Dokumen Sekarang
                  </button>
                </div>
              </div>
            )}

            {/* 4. TAB DOWNLOAD TEMPLATE */}
            {activeMenu === "template" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Template Dokumen Akademik
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Unduh struktur format siap pakai untuk laporan, cover makalah, hingga proposal PKM.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Template Gratis (Free Access)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white border border-gray-100 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                        <span className="text-xs font-bold text-gray-700">
                          Format Cover & Laporan Praktikum
                        </span>
                        <a 
                          href="https://docs.google.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-gray-100 text-gray-700 hover:bg-[#004aad] hover:text-white px-3 py-1.5 rounded-lg font-extrabold transition-colors inline-flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> Unduh
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-amber-800 mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" /> Template Premium (Siap Pakai)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl flex justify-between items-center shadow-sm">
                        <div>
                          <span className="text-xs font-extrabold text-amber-900 block">
                            Proposal PKM & File RAB Otomatis
                          </span>
                          <span className="text-[10px] text-amber-700 font-medium">Format Lolos Reviewer Dikti</span>
                        </div>
                        <a 
                          href={waLink(
                            "Halo Admin, saya ingin membeli Template Proposal PKM"
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-extrabold shadow-sm transition-colors"
                        >
                          Rp 15k
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. TAB JASA AKADEMIK */}
            {activeMenu === "desain" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Pemesanan Jasa Akademik & Desain
                </h2>
                <p className="text-xs text-gray-500 mb-6 font-medium">
                  Bantuan pembuatan poster seminar, slide presentasi custom, hingga asistensi penulisan karya ilmiah.
                </p>

                <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm max-w-xl space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-gray-800 mb-2">
                      Pilih Jenis Layanan Jasa
                    </label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-[#004aad]">
                      <option>Desain Poster Lomba / Presentation Banner</option>
                      <option>Desain Presentation Slides PPT (Custom Canva)</option>
                      <option>Asistensi Perapihan Layout Karya Tulis</option>
                    </select>
                  </div>

                  <a
                    href={waLink(
                      "Halo Admin Ankasa, saya ingin konsultasi pemesanan jasa akademik"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#004aad] text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md shadow-[#004aad]/20 hover:bg-[#00337a] transition-all"
                  >
                    Konsultasi Pesanan via WhatsApp
                  </a>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* MODAL TAMBAH / EDIT E-BOOK */}
      <Dialog
        open={ebookModalOpen}
        onOpenChange={(open) => {
          setEbookModalOpen(open);
          if (!open) {
            setEditingEbook(null);
            setFormError("");
            setCoverFile(null);
            setPdfFile(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEbook ? "Edit E-book" : "Tambah E-book"}
            </DialogTitle>
          </DialogHeader>

          <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Judul
                </label>
                <input
                  type="text"
                  required
                  value={form.judul}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, judul: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                  placeholder="Judul e-book"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Kategori
                </label>
                <select
                  required
                  value={form.kategori}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, kategori: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                >
                  <option value="">Pilih kategori</option>
                  {form.kategori &&
                    !KATEGORI_LIST.includes(form.kategori as KategoriBuku) && (
                      <option value={form.kategori}>{form.kategori}</option>
                    )}
                  {KATEGORI_LIST.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Jenjang
                </label>
                <select
                  value={form.jenjang}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, jenjang: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                >
                  <option value="">Umum / tidak spesifik</option>
                  {form.jenjang &&
                    !JENJANG_LIST.includes(form.jenjang as JenjangBuku) && (
                      <option value={form.jenjang}>{form.jenjang}</option>
                    )}
                  {JENJANG_LIST.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Penulis
                </label>
                <input
                  type="text"
                  value={form.penulis}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, penulis: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                  placeholder="Nama penulis"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.harga}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, harga: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Urutan
                </label>
                <input
                  type="number"
                  value={form.urutan}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, urutan: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Cover Warna
                </label>
                <input
                  type="text"
                  value={form.cover_warna}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cover_warna: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                  placeholder="bg-blue-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Badge Warna
                </label>
                <input
                  type="text"
                  value={form.badge_warna}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, badge_warna: e.target.value }))
                  }
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                  placeholder="bg-blue-100 text-blue-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                Deskripsi
              </label>
              <textarea
                value={form.deskripsi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, deskripsi: e.target.value }))
                }
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                placeholder="Deskripsi singkat e-book"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
              <input
                type="checkbox"
                checked={form.is_contoh}
                onChange={(e) =>
                  setForm((f) => ({ ...f, is_contoh: e.target.checked }))
                }
                className="w-4 h-4 accent-[#004aad]"
              />
              Tampilkan sebagai contoh
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  Cover (opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs outline-none focus:border-[#004aad]"
                />
                {editingEbook?.cover_path && !coverFile && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    Cover lama tetap dipakai jika tidak diganti.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                  File PDF (untuk baca full)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
                  className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-xl text-xs outline-none focus:border-[#004aad]"
                />
                {editingEbook?.file_path && !pdfFile && (
                  <p className="text-[10px] text-gray-400 mt-1">
                    File PDF lama tetap dipakai jika tidak diganti.
                  </p>
                )}
              </div>
            </div>

            {formError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold">
                {formError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEbookModalOpen(false)}
                className="bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#004aad] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-[#004aad]/20 hover:bg-[#00337a] transition-all disabled:opacity-50"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL HAPUS E-BOOK */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteError("");
          }
        }}
      >
        <DialogContent className="max-w-md w-[95vw]">
          <DialogHeader>
            <DialogTitle>Hapus E-book?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            E-book{" "}
            <span className="font-bold text-gray-900">
              {deleteTarget?.judul}
            </span>{" "}
            akan dihapus permanen, termasuk file cover dan PDF-nya.
          </p>
          {deleteError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold">
              {deleteError}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 bg-red-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {deleting ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL BACA FULL E-BOOK (ADMIN) */}
      <Dialog
        open={readerOpen}
        onOpenChange={(open) => {
          setReaderOpen(open);
          if (!open) {
            setReaderUrl("");
            setReaderError("");
          }
        }}
      >
        <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-base">{readerTitle}</DialogTitle>
          </DialogHeader>
          <div className="bg-gray-100">
            {readerLoading ? (
              <div className="h-[60vh] flex items-center justify-center text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : readerError ? (
              <div className="h-[40vh] flex items-center justify-center text-red-500 text-sm px-6 text-center">
                {readerError}
              </div>
            ) : readerUrl ? (
              <iframe
                src={readerUrl}
                title={readerTitle}
                className="w-full h-[75vh]"
              />
            ) : (
              <div className="h-[40vh] flex items-center justify-center text-gray-400 text-sm">
                File belum tersedia.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL REQUEST BUKU */}
      <Dialog
        open={requestModalOpen}
        onOpenChange={(open) => {
          setRequestModalOpen(open);
        }}
      >
        <DialogContent className="max-w-md w-[95vw]">
          <DialogHeader>
            <DialogTitle>Form Request Buku</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={requestForm.nama}
                onChange={(e) =>
                  setRequestForm((f) => ({ ...f, nama: e.target.value }))
                }
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={requestForm.noWa}
                onChange={(e) =>
                  setRequestForm((f) => ({ ...f, noWa: e.target.value }))
                }
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                placeholder="Contoh: 08xxxxxxxxxx"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                Judul Buku yang Diminta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={requestForm.judul}
                onChange={(e) =>
                  setRequestForm((f) => ({ ...f, judul: e.target.value }))
                }
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                placeholder="Judul buku/modul yang dicari"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold text-gray-700 uppercase mb-1">
                Keterangan (Opsional)
              </label>
              <textarea
                value={requestForm.keterangan}
                onChange={(e) =>
                  setRequestForm((f) => ({ ...f, keterangan: e.target.value }))
                }
                rows={3}
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-[#004aad]"
                placeholder="Penulis, edisi, atau keterangan lainnya"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setRequestModalOpen(false)}
              className="bg-gray-100 text-gray-700 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={submitRequestForm}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Konfirmasi & Kirim ke WhatsApp
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

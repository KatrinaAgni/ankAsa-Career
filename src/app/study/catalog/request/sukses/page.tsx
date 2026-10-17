import { ArrowLeft, CheckCircle2, MessageCircle, QrCode } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { NOMOR_WA, QRIS_IMAGE } from "@/lib/konstanta"
import { formatRupiah } from "@/lib/ebook-pricing"

export default async function RequestSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const get = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? v[0] : v || ""
  }

  const kode = get("kode")
  const nama = get("nama")
  const jenis = get("jenis")
  const jenjang = get("jenjang")
  const halaman = get("halaman")
  const judul = get("judul")
  const estimasi = Number(get("estimasi")) || 0

  const pesan = [
    "Halo Ankasa Study! Saya ingin konfirmasi pesanan buku custom.",
    `Kode Order: ${kode}`,
    `Nama: ${nama}`,
    `Jenis: ${jenis}${jenjang ? ` (${jenjang})` : ""}`,
    `Judul/Tema: ${judul || "-"}`,
    `Jumlah halaman: ${halaman || "-"}`,
    `Estimasi: ${formatRupiah(estimasi)}`,
    "Saya sudah melakukan pembayaran via QRIS. Mohon dicek ya, terima kasih.",
  ].join("\n")

  const waUrl = `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link
            href="/study/catalog"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Katalog
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-xl px-4 py-12">
        <div className="text-center mb-8">
          <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
          <h1 className="text-2xl font-extrabold">Permintaan Terkirim!</h1>
          <p className="text-gray-500 mt-1">
            Selesaikan pembayaran lewat QRIS di bawah ini.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Kode Order
            </p>
            <p className="text-2xl font-extrabold tracking-wider text-gray-900">
              {kode || "-"}
            </p>
          </div>

          <div className="border-t border-dashed border-gray-200" />

          <div className="space-y-1 text-sm">
            {nama && (
              <div className="flex justify-between">
                <span className="text-gray-500">Nama</span>
                <span className="font-semibold">{nama}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Jenis</span>
              <span className="font-semibold">
                {jenis}
                {jenjang ? ` · ${jenjang}` : ""}
              </span>
            </div>
            {halaman && (
              <div className="flex justify-between">
                <span className="text-gray-500">Jumlah halaman</span>
                <span className="font-semibold">{halaman}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-100 mt-2">
              <span className="text-gray-500 font-bold">Total Bayar</span>
              <span className="font-extrabold text-emerald-700">
                {formatRupiah(estimasi)}
              </span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-200" />

          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-3">
              <QrCode className="w-4 h-4" /> Scan QRIS
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-3 inline-block shadow-sm">
              <Image
                src={QRIS_IMAGE}
                alt="QRIS Ankasa Study"
                width={280}
                height={280}
                className="rounded-xl"
                priority
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Scan dengan aplikasi e-wallet / m-banking, isi nominal{" "}
              <span className="font-bold">{formatRupiah(estimasi)}</span>, lalu
              cantumkan kode order <span className="font-bold">{kode}</span> pada
              keterangan.
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Konfirmasi via WhatsApp
          </a>

          <p className="text-center text-xs text-gray-400">
            Simpan kode order-mu. Cek status kapan saja di{" "}
            <Link
              href="/study/catalog/request/lacak"
              className="font-bold text-gray-600 underline"
            >
              Lacak Pesanan
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  )
}

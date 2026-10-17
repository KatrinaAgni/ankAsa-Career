import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { EbookRequestForm } from "@/components/ebook-request-form"

export default async function RequestBookPage({
  searchParams,
}: {
  searchParams: Promise<{ jenis?: string }>
}) {
  const params = await searchParams

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

      <main className="container mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-2 text-center">
          Pesan Buku Custom
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Isi detail kebutuhanmu. Setelah dikirim, kamu akan mendapat kode order
          dan cara pembayaran lewat QRIS.
        </p>
        <EbookRequestForm defaultJenis={params.jenis} />
      </main>
    </div>
  )
}

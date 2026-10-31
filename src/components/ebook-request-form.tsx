"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Send, Sparkles } from "lucide-react"

import { KATEGORI_LIST, JENJANG_LIST } from "@/lib/konstanta"
import { hitungEstimasiHarga, formatRupiah } from "@/lib/ebook-pricing"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const schema = z.object({
  nama_pemesan: z.string().min(2, "Nama minimal 2 karakter"),
  kontak_wa: z
    .string()
    .min(8, "Nomor WhatsApp tidak valid")
    .regex(/^[0-9+ -]+$/, "Nomor WhatsApp hanya boleh angka"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  jenis_buku: z.string().min(2, "Pilih jenis buku"),
  jenjang: z.string().optional().or(z.literal("")),
  judul_diinginkan: z.string().optional().or(z.literal("")),
  deskripsi_kebutuhan: z.string().min(10, "Ceritakan kebutuhan minimal 10 karakter"),
  jumlah_halaman: z.coerce.number().int().min(1).max(2000).optional(),
  butuh_ilustrasi: z.boolean().default(false),
})

type FormValues = z.infer<typeof schema>

export function EbookRequestForm({ defaultJenis }: { defaultJenis?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama_pemesan: "",
      kontak_wa: "",
      email: "",
      jenis_buku: KATEGORI_LIST.includes(defaultJenis as never)
        ? (defaultJenis as string)
        : "Akademik/Pelajaran",
      jenjang: "SD",
      judul_diinginkan: "",
      deskripsi_kebutuhan: "",
      jumlah_halaman: 40,
      butuh_ilustrasi: true,
    },
  })

  const jenjang = form.watch("jenjang")
  const halaman = form.watch("jumlah_halaman")
  const ilustrasi = form.watch("butuh_ilustrasi")

  const estimasi = useMemo(
    () =>
      hitungEstimasiHarga({
        jumlahHalaman: halaman,
        jenjang: jenjang,
        butuhIlustrasi: ilustrasi,
      }),
    [halaman, jenjang, ilustrasi]
  )

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/book-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json?.error || "Gagal mengirim permintaan.")
      }
      const params = new URLSearchParams({
        kode: json.kode_order,
        estimasi: String(json.estimasi_harga ?? estimasi),
        nama: values.nama_pemesan,
        jenis: values.jenis_buku,
        jenjang: values.jenjang || "",
        halaman: String(values.jumlah_halaman ?? ""),
        judul: values.judul_diinginkan || "",
        wa: values.kontak_wa,
      })
      router.push(`/study/catalog/request/sukses?${params.toString()}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-gray-100 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="nama_pemesan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pemesan</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kontak_wa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="08xxxxxxxxxx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (opsional)</FormLabel>
              <FormControl>
                <Input placeholder="nama@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="jenis_buku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Buku</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis buku" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {KATEGORI_LIST.map((k) => (
                      <SelectItem key={k} value={k}>
                        {k}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jenjang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenjang (opsional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenjang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {JENJANG_LIST.map((j) => (
                      <SelectItem key={j} value={j}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="judul_diinginkan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul / Tema yang Diinginkan (opsional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Contoh: Buku Belajar Menghitung Kelas 6 SD"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deskripsi_kebutuhan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Kebutuhan</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Jelaskan materi, jumlah bab, gaya bahasa, tingkat kesulitan, dll."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="jumlah_halaman"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perkiraan Jumlah Halaman</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={2000} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="butuh_ilustrasi"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 mt-6 md:mt-8">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    Perlu ilustrasi / gambar
                  </FormLabel>
                  <FormDescription>
                    Tambahkan ilustrasi pendukung di dalam buku.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-5 py-4">
          <span className="text-sm font-bold text-emerald-800">
            Estimasi harga
          </span>
          <span className="text-lg font-extrabold text-emerald-700">
            {formatRupiah(estimasi)}
          </span>
        </div>

        {error && (
          <p className="text-sm font-medium text-red-600">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl h-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Mengirim...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" /> Kirim Permintaan
            </>
          )}
        </Button>
        <p className="text-xs text-gray-400 text-center">
          <Sparkles className="w-3 h-3 inline -mt-0.5" /> Estimasi bersifat
          perkiraan; harga final dikonfirmasi lewat WhatsApp.
        </p>
      </form>
    </Form>
  )
}

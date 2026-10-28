"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CONFERENCE_STATUSES,
  conferenceFormSchema,
  type ConferenceFormValues,
} from "@/lib/conference/schema"

const STATUS_LABEL: Record<(typeof CONFERENCE_STATUSES)[number], string> = {
  published: "Published",
  pending: "Pending",
  archived: "Archived",
}

type Props = {
  open: boolean
  initialValues: ConferenceFormValues
  saving: boolean
  error: string | null
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ConferenceFormValues) => Promise<void> | void
}

export default function ConferenceForm({
  open,
  initialValues,
  saving,
  error,
  onOpenChange,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConferenceFormValues>({
    resolver: zodResolver(conferenceFormSchema),
    defaultValues: initialValues,
  })

  useEffect(() => {
    if (open) reset(initialValues)
  }, [open, initialValues, reset])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Data Conference</DialogTitle>
          <DialogDescription>
            Isi informasi conference. Data pending tidak akan tampil ke pengguna sebelum di-approve.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="nama">Nama Conference *</Label>
              <Input id="nama" {...register("nama")} placeholder="International Conference on ..." />
              {errors.nama && <p className="mt-1 text-xs text-red-600">{errors.nama.message}</p>}
            </div>

            <div>
              <Label htmlFor="penyelenggara">Penyelenggara</Label>
              <Input id="penyelenggara" {...register("penyelenggara")} placeholder="Universitas / organisasi" />
            </div>

            <div>
              <Label htmlFor="biaya">Biaya</Label>
              <Input id="biaya" {...register("biaya")} placeholder="Gratis / Rp ..." />
            </div>

            <div>
              <Label htmlFor="tanggal_mulai">Tanggal Mulai *</Label>
              <Input id="tanggal_mulai" type="date" {...register("tanggal_mulai")} />
              {errors.tanggal_mulai && (
                <p className="mt-1 text-xs text-red-600">{errors.tanggal_mulai.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tanggal_selesai">Tanggal Selesai</Label>
              <Input id="tanggal_selesai" type="date" {...register("tanggal_selesai")} />
              {errors.tanggal_selesai && (
                <p className="mt-1 text-xs text-red-600">{errors.tanggal_selesai.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="deadline_daftar">Deadline Daftar</Label>
              <Input id="deadline_daftar" {...register("deadline_daftar")} placeholder="YYYY-MM-DD" />
            </div>

            <div>
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input id="lokasi" {...register("lokasi")} placeholder="Kota, Negara / Online" />
            </div>

            <div>
              <Label htmlFor="regional">Regional</Label>
              <Input id="regional" {...register("regional")} placeholder="Indonesia / Asia / Online" />
            </div>

            <div>
              <Label htmlFor="indeks">Indeks</Label>
              <Input id="indeks" {...register("indeks")} placeholder="Scopus / SINTA / International" />
            </div>

            <div>
              <Label htmlFor="subjek">Subjek</Label>
              <Input id="subjek" {...register("subjek")} placeholder="AI, Information Systems" />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register("status")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {CONFERENCE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABEL[status]}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="link_detail">Link Detail</Label>
              <Input id="link_detail" {...register("link_detail")} placeholder="https://..." />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                {...register("deskripsi")}
                rows={4}
                placeholder="Deskripsi singkat conference..."
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-xs text-red-700">{error}</p>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Batal
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

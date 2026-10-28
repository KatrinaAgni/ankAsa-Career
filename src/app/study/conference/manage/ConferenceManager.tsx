"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import {
  emptyConferenceForm,
  formToDb,
  rowToForm,
  type ConferenceFormValues,
  type ConferenceRow,
  type ConferenceStatus,
} from "@/lib/conference/schema"
import { isDeadlinePassed } from "@/lib/conference/deadline"
import ConferenceForm from "./ConferenceForm"

type Tab = ConferenceStatus

type SyncLog = {
  id: number
  source: string
  fetched: number
  inserted: number
  updated: number
  skipped: number
  status: "running" | "success" | "error"
  error: string | null
  started_at: string
  finished_at: string | null
}

const TAB_LABEL: Record<Tab, string> = {
  pending: "Pending",
  published: "Published",
  archived: "Archived",
}

const STATUS_CLASS: Record<ConferenceStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  published: "bg-emerald-50 text-emerald-700",
  archived: "bg-gray-100 text-gray-600",
}

function formatDate(value: string | null) {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}

function formatDateTime(value: string | null) {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export default function ConferenceManager() {
  const router = useRouter()
  const [access, setAccess] = useState<"loading" | "allowed" | "denied">("loading")
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [rows, setRows] = useState<ConferenceRow[]>([])
  const [logs, setLogs] = useState<SyncLog[]>([])
  const [tab, setTab] = useState<Tab>("pending")
  const [search, setSearch] = useState("")
  const [pageError, setPageError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<ConferenceRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set())
  const [bulkBusy, setBulkBusy] = useState(false)
  const [bulkMessage, setBulkMessage] = useState<string | null>(null)
  const selectAllRef = useRef<HTMLInputElement>(null)

  const today = useMemo(
    () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }),
    []
  )

  const loadData = useCallback(async () => {
    const [rowsResult, logsResult] = await Promise.all([
      supabase.from("conference").select("*").order("created_at", { ascending: false }),
      supabase.from("sync_logs").select("*").order("started_at", { ascending: false }).limit(10),
    ])

    if (rowsResult.error) setPageError(rowsResult.error.message)
    else setPageError(null)

    const nextRows = (rowsResult.data ?? []) as ConferenceRow[]
    setRows(nextRows)

    const validIds = new Set(nextRows.map((row) => row.id))
    setSelectedIds((current) => {
      if (current.size === 0) return current
      const next = new Set([...current].filter((id) => validIds.has(id)))
      return next.size === current.size ? current : next
    })

    setLogs((logsResult.data ?? []) as SyncLog[])
  }, [])

  useEffect(() => {
    let active = true

    async function checkAdmin() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (!active) return

      if (userError || !user) {
        router.replace("/login")
        return
      }

      setUserEmail(user.email ?? null)

      const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin")

      if (!active) return

      if (adminError || isAdmin !== true) {
        setAccess("denied")
        return
      }

      setAccess("allowed")
      await loadData()
    }

    checkAdmin()

    return () => {
      active = false
    }
  }, [loadData, router])

  const counts = useMemo<Record<Tab, number>>(
    () => ({
      pending: rows.filter((row) => row.status === "pending").length,
      published: rows.filter((row) => row.status === "published").length,
      archived: rows.filter((row) => row.status === "archived").length,
    }),
    [rows]
  )

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase()

    const result = rows.filter((row) => {
      if (row.status !== tab) return false
      if (!needle) return true
      return `${row.nama} ${row.lokasi ?? ""} ${row.penyelenggara ?? ""}`
        .toLowerCase()
        .includes(needle)
    })

    return result.sort(
      (a, b) => Number(isDeadlinePassed(a, today)) - Number(isDeadlinePassed(b, today))
    )
  }, [rows, tab, search, today])

  const visibleIds = useMemo(() => filtered.map((row) => row.id), [filtered])
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id))
  const someVisibleSelected = visibleIds.some((id) => selectedIds.has(id))

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someVisibleSelected && !allVisibleSelected
    }
  }, [someVisibleSelected, allVisibleSelected])

  function toggleRow(id: number) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAllVisible(checked: boolean) {
    setSelectedIds((current) => {
      const next = new Set(current)
      for (const id of visibleIds) {
        if (checked) next.add(id)
        else next.delete(id)
      }
      return next
    })
  }

  function handleTabChange(next: Tab) {
    setTab(next)
    setSelectedIds(new Set())
    setBulkMessage(null)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setSelectedIds(new Set())
    setBulkMessage(null)
  }

  const initialValues = useMemo<ConferenceFormValues>(
    () => (editing ? rowToForm(editing) : emptyConferenceForm()),
    [editing]
  )

  function openCreate() {
    setEditing(null)
    setFormError(null)
    setFormOpen(true)
  }

  function openEdit(row: ConferenceRow) {
    setEditing(row)
    setFormError(null)
    setFormOpen(true)
  }

  function handleFormOpenChange(open: boolean) {
    setFormOpen(open)
    if (!open) {
      setEditing(null)
      setFormError(null)
    }
  }

  async function handleSave(values: ConferenceFormValues) {
    setSaving(true)
    setFormError(null)

    const payload = formToDb(values)
    const result = editing
      ? await supabase.from("conference").update(payload).eq("id", editing.id)
      : await supabase
          .from("conference")
          .insert({ ...payload, sumber: "manual", external_id: null, source_url: null })

    if (result.error) {
      setFormError(result.error.message)
      setSaving(false)
      return
    }

    setSaving(false)
    handleFormOpenChange(false)
    await loadData()
  }

  async function updateStatus(row: ConferenceRow, status: ConferenceStatus) {
    setPageError(null)
    const { error } = await supabase.from("conference").update({ status }).eq("id", row.id)
    if (error) {
      setPageError(error.message)
      return
    }
    await loadData()
  }

  async function deleteRow(row: ConferenceRow) {
    if (!window.confirm(`Hapus "${row.nama}"? Tindakan ini tidak bisa dibatalkan.`)) return

    setPageError(null)
    const { error } = await supabase.from("conference").delete().eq("id", row.id)
    if (error) {
      setPageError(error.message)
      return
    }
    await loadData()
  }

  async function bulkUpdateStatus(status: ConferenceStatus) {
    const ids = Array.from(selectedIds)
    if (ids.length === 0) return

    setBulkBusy(true)
    setBulkMessage(null)
    setPageError(null)

    const { error } = await supabase.from("conference").update({ status }).in("id", ids)

    if (error) {
      setPageError(error.message)
      setBulkBusy(false)
      return
    }

    setBulkMessage(`${ids.length} conference diubah ke ${TAB_LABEL[status]}.`)
    setSelectedIds(new Set())
    await loadData()
    setBulkBusy(false)
  }

  async function bulkDelete() {
    const ids = Array.from(selectedIds)
    if (ids.length === 0) return
    if (!window.confirm(`Hapus ${ids.length} conference terpilih? Tindakan ini tidak bisa dibatalkan.`)) return

    setBulkBusy(true)
    setBulkMessage(null)
    setPageError(null)

    const { error } = await supabase.from("conference").delete().in("id", ids)

    if (error) {
      setPageError(error.message)
      setBulkBusy(false)
      return
    }

    setBulkMessage(`${ids.length} conference dihapus.`)
    setSelectedIds(new Set())
    await loadData()
    setBulkBusy(false)
  }

  async function runSync() {
    setSyncing(true)
    setSyncMessage(null)
    setPageError(null)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace("/login")
        return
      }

      const response = await fetch("/api/conference/sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setSyncMessage(result.error ?? "Sync gagal dijalankan.")
        return
      }

      setSyncMessage(
        `Sync selesai: ${result.inserted ?? 0} baru, ${result.updated ?? 0} diperbarui, ${result.skipped ?? 0} dilewati.`
      )
      await loadData()
    } catch (error) {
      setSyncMessage(error instanceof Error ? error.message : "Sync gagal dijalankan.")
    } finally {
      setSyncing(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    router.replace("/login")
  }

  if (access === "loading") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Memeriksa akses admin...
        </div>
      </div>
    )
  }

  if (access === "denied") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-900">Akses ditolak</h1>
          <p className="mt-2 text-sm text-gray-500">
            Akun {userEmail ?? "ini"} belum terdaftar sebagai admin conference.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/study/conference"
              className="rounded-xl bg-blue-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
            >
              Kembali ke Conference
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-800 font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:px-6">
          <Link
            href="/study/conference"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Conference
          </Link>
          <span className="hidden text-sm text-gray-400 sm:inline">/ Kelola</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-gray-500 md:inline">{userEmail}</span>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold">Kelola Conference</h1>
            <p className="mt-1 text-sm text-gray-500">
              Tambah, edit, approve, atau arsipkan conference dari satu tempat.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={runSync}
              disabled={syncing}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Sync..." : "Sync sekarang"}
            </button>
            <button
              type="button"
              onClick={openCreate}
              className="flex items-center gap-2 rounded-xl bg-blue-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-900"
            >
              <Plus className="h-4 w-4" /> Tambah Conference
            </button>
          </div>
        </div>

        {syncMessage && (
          <p className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-800">{syncMessage}</p>
        )}
        {bulkMessage && (
          <p className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800">
            {bulkMessage}
          </p>
        )}
        {pageError && (
          <p className="mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">{pageError}</p>
        )}

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(["pending", "published", "archived"] as Tab[]).map((item) => (
            <div key={item} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{TAB_LABEL[item]}</p>
              <p className="mt-1 text-2xl font-black text-gray-900">{counts[item]}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["pending", "published", "archived"] as Tab[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleTabChange(item)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
                    tab === item
                      ? "bg-blue-800 text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {TAB_LABEL[item]} ({counts[item]})
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Cari nama, lokasi, penyelenggara..."
                className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {selectedIds.size > 0 && (
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-900">{selectedIds.size} conference dipilih</p>
                <p className="text-xs text-blue-700/80">Aksi akan diterapkan ke semua data terpilih.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleAllVisible(true)}
                  disabled={bulkBusy}
                  className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 disabled:opacity-50"
                >
                  Pilih semua di halaman ini
                </button>
                <button
                  type="button"
                  onClick={() => bulkUpdateStatus("published")}
                  disabled={bulkBusy}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Acc / Publish
                </button>
                <button
                  type="button"
                  onClick={() => bulkUpdateStatus("pending")}
                  disabled={bulkBusy}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Kembalikan ke Pending
                </button>
                <button
                  type="button"
                  onClick={() => bulkUpdateStatus("archived")}
                  disabled={bulkBusy}
                  className="flex items-center gap-1.5 rounded-lg bg-gray-700 px-3 py-2 text-xs font-bold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Archive className="h-3.5 w-3.5" /> Arsip
                </button>
                <button
                  type="button"
                  onClick={bulkDelete}
                  disabled={bulkBusy}
                  className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIds(new Set())
                    setBulkMessage(null)
                  }}
                  disabled={bulkBusy}
                  className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" /> Batal
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                  <th className="w-10 px-2 py-3">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={(event) => toggleAllVisible(event.target.checked)}
                      aria-label="Pilih semua conference yang terlihat"
                      className="h-4 w-4 accent-blue-800"
                    />
                  </th>
                  <th className="px-2 py-3">Conference</th>
                  <th className="px-2 py-3">Tanggal</th>
                  <th className="px-2 py-3">Lokasi</th>
                  <th className="px-2 py-3">Sumber</th>
                  <th className="px-2 py-3">Status</th>
                  <th className="px-2 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-2 py-10 text-center text-gray-500">
                      Tidak ada data pada tab ini.
                    </td>
                  </tr>
                ) : (
                  filtered.map((row) => {
                    const expired = isDeadlinePassed(row, today)

                    return (
                      <tr
                        key={row.id}
                        className={`border-b border-gray-50 last:border-0 ${
                          expired ? "bg-gray-50/80 opacity-60 grayscale" : ""
                        }`}
                      >
                        <td className="px-2 py-3 align-top">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(row.id)}
                            onChange={() => toggleRow(row.id)}
                            aria-label={`Pilih ${row.nama}`}
                            className="h-4 w-4 accent-blue-800"
                          />
                        </td>
                        <td className="max-w-xs px-2 py-3">
                          <p className="font-bold text-gray-900">{row.nama}</p>
                          <p className="text-xs text-gray-500">{row.penyelenggara ?? row.subjek ?? "-"}</p>
                        </td>
                        <td className="px-2 py-3 text-gray-600">
                          <p>
                            {formatDate(row.tanggal_mulai)}
                            {row.tanggal_selesai && row.tanggal_selesai !== row.tanggal_mulai
                              ? ` – ${formatDate(row.tanggal_selesai)}`
                              : ""}
                          </p>
                          {row.deadline_daftar && (
                            <p className={`mt-1 text-xs ${expired ? "text-gray-400" : "text-gray-500"}`}>
                              Tenggat: {formatDate(row.deadline_daftar)}
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-3 text-gray-600">{row.lokasi ?? "-"}</td>
                        <td className="px-2 py-3 text-xs text-gray-500">{row.sumber}</td>
                        <td className="px-2 py-3">
                          <div className="flex flex-wrap items-center gap-1">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_CLASS[row.status]}`}>
                              {TAB_LABEL[row.status]}
                            </span>
                            {expired && (
                              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold text-gray-600">
                                Tenggat lewat
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex justify-end gap-1">
                            {row.status !== "published" && (
                              <button
                                type="button"
                                onClick={() => updateStatus(row, "published")}
                                title="Publish"
                                className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                              </button>
                            )}
                            {row.status !== "archived" && (
                              <button
                                type="button"
                                onClick={() => updateStatus(row, "archived")}
                                title="Arsipkan"
                                className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                              >
                                <Archive className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => openEdit(row)}
                              title="Edit"
                              className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteRow(row)}
                              title="Hapus"
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-3 font-bold text-gray-900">Riwayat Sync</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                  <th className="px-2 py-2">Waktu</th>
                  <th className="px-2 py-2">Sumber</th>
                  <th className="px-2 py-2">Fetched</th>
                  <th className="px-2 py-2">Baru</th>
                  <th className="px-2 py-2">Update</th>
                  <th className="px-2 py-2">Skip</th>
                  <th className="px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-2 py-6 text-center text-gray-500">
                      Belum ada riwayat sync.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="border-b border-gray-50 last:border-0">
                      <td className="px-2 py-2 text-gray-600">{formatDateTime(log.started_at)}</td>
                      <td className="px-2 py-2 text-gray-600">{log.source}</td>
                      <td className="px-2 py-2">{log.fetched}</td>
                      <td className="px-2 py-2">{log.inserted}</td>
                      <td className="px-2 py-2">{log.updated}</td>
                      <td className="px-2 py-2">{log.skipped}</td>
                      <td className="px-2 py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            log.status === "success"
                              ? "bg-emerald-50 text-emerald-700"
                              : log.status === "error"
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {log.status}
                        </span>
                        {log.error && <p className="mt-1 max-w-xs text-xs text-red-600">{log.error}</p>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <ConferenceForm
        open={formOpen}
        initialValues={initialValues}
        saving={saving}
        error={formError}
        onOpenChange={handleFormOpenChange}
        onSubmit={handleSave}
      />
    </div>
  )
}

import { NextRequest, NextResponse } from "next/server"
import { runConferenceSync } from "@/lib/conference/sync"
import { createAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const token = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim()

    if (!token) {
      return NextResponse.json({ error: "Token admin tidak ditemukan." }, { status: 401 })
    }

    const admin = createAdminClient()
    const {
      data: { user },
      error: userError,
    } = await admin.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json({ error: "Sesi admin tidak valid." }, { status: 401 })
    }

    const { data: adminData, error: adminError } = await admin
      .from("users")
      .select("tipe_akun")
      .eq("id", user.id)
      .maybeSingle()

    const adminRow = adminData as { tipe_akun: string | null } | null

    if (adminError || !adminRow || !["admin", "superadmin"].includes(adminRow.tipe_akun ?? "")) {
      return NextResponse.json({ error: "Akun ini bukan admin." }, { status: 403 })
    }

    const summary = await runConferenceSync()
    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync gagal dijalankan." },
      { status: 500 }
    )
  }
}

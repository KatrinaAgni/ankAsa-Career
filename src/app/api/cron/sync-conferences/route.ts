import { NextRequest, NextResponse } from "next/server"
import { runConferenceSync } from "@/lib/conference/sync"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(request: NextRequest) {
  const secret = process.env.CRON_SECRET

  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET belum diatur." }, { status: 500 })
  }

  const token = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "").trim()

  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }

  try {
    const summary = await runConferenceSync()
    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync gagal dijalankan." },
      { status: 500 }
    )
  }
}

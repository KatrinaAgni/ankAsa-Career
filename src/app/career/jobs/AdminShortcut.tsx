"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Settings } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminShortcut() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let active = true

    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user || !active) return

      const { data, error } = await supabase.rpc("is_admin")

      if (active) setIsAdmin(!error && data === true)
    }

    checkAdmin()

    return () => {
      active = false
    }
  }, [])

  if (!isAdmin) return null

  return (
    <Link
      href="/career/jobs/manage"
      className="inline-flex items-center gap-1.5 rounded-xl bg-[#004aad] px-4 py-2 text-xs font-bold text-white hover:bg-[#00337a]"
    >
      <Settings className="w-4 h-4" /> Kelola Loker
    </Link>
  )
}

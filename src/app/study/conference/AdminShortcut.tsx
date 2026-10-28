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
      href="/study/conference/manage"
      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-800 px-4 py-2 text-sm font-bold text-white hover:bg-blue-900"
    >
      <Settings className="w-4 h-4" /> Kelola Conference
    </Link>
  )
}

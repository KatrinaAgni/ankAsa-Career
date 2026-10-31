"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { supabase } from "@/lib/supabase"
import LokerManager from "./LokerManager"

export default function LokerManagePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true

    async function checkAccess() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!active) return

      if (!user) {
        router.replace("/login")
        return
      }

      const { data, error } = await supabase.rpc("is_admin")

      if (!active) return

      if (error || data !== true) {
        router.replace("/career/jobs")
        return
      }

      setReady(true)
    }

    checkAccess()

    return () => {
      active = false
    }
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  return <LokerManager />
}

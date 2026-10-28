import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Kelola Conference | Ankasa Hub",
  robots: { index: false, follow: false },
}

export default function ConferenceManageLayout({ children }: { children: ReactNode }) {
  return children
}

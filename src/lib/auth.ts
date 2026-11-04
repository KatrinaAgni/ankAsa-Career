import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@/lib/types";

export type SessionProfile = {
  session: Session | null;
  profile: UserProfile | null;
  isAdmin: boolean;
};

export async function getSessionProfile(): Promise<SessionProfile> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { session: null, profile: null, isAdmin: false };
  }

  try {
    const response = await fetch("/api/me", {
      headers: { Authorization: `Bearer ${session.access_token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      return { session, profile: null, isAdmin: false };
    }

    const data = (await response.json()) as {
      profile: UserProfile | null;
      isAdmin?: boolean;
    };

    const profile = data.profile ?? null;

    return {
      session,
      profile,
      isAdmin: data.isAdmin ?? profile?.tipe_akun === "admin",
    };
  } catch (error) {
    console.error("Gagal mengambil profil pengguna:", error);
    return { session, profile: null, isAdmin: false };
  }
}

export async function getAccessToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

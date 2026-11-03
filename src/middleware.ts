// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // Ambil URL yang sedang diakses
  const path = request.nextUrl.pathname

  // Cek apakah halaman yang diakses mengandung kata "/admin/"
  const isAdminRoute = path.includes('/admin')

  if (isAdminRoute) {
    // Di sini kita cek token atau cookie sesi login dari Supabase
    // (Supabase secara otomatis menyimpan cookie auth dengan awalan 'sb-')
    const allCookies = request.cookies.getAll()
    const hasSession = allCookies.some((cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token'))

    // Jika mencoba akses /admin tapi belum login / tidak punya sesi, lempar ke halaman login
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Konfigurasi rute mana saja yang akan di-intercept oleh middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
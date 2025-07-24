import { NextRequest, NextResponse } from 'next/server'
import { buildCv } from '@/../ai/flows/cv-builder'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await buildCv(body)
  return NextResponse.json(result)
}

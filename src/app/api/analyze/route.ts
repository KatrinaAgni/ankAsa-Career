import { NextRequest, NextResponse } from 'next/server';
import { analyzeCV } from '@/../ai/flows/cv-analyzer'; // perhatikan relatifnya dari /app/api

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await analyzeCV(body);
  return NextResponse.json(result);
}

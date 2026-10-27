import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/api-auth";
import { ebookInputSchema, normalizeEbookInput } from "@/lib/ebook-input";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const parsed = ebookInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Data tidak valid." },
      { status: 400 }
    );
  }

  const row = normalizeEbookInput(parsed.data);
  const { data, error } = await auth.admin
    .from("ebook")
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error("Gagal menambah e-book:", error.message);
    return NextResponse.json(
      { error: "Gagal menyimpan e-book." },
      { status: 500 }
    );
  }

  return NextResponse.json({ data }, { status: 201 });
}

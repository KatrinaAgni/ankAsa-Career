import { NextResponse } from "next/server";

import { requireAdmin, storagePath } from "@/lib/api-auth";
import { ebookInputSchema, normalizeEbookInput } from "@/lib/ebook-input";

export const runtime = "nodejs";

async function resolveId(params: Promise<{ id: string }>) {
  const { id } = await params;
  const ebookId = Number(id);
  return Number.isInteger(ebookId) && ebookId > 0 ? ebookId : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const ebookId = await resolveId(params);
  if (!ebookId) {
    return NextResponse.json({ error: "ID e-book tidak valid." }, { status: 400 });
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

  const { data: existing, error: findError } = await auth.admin
    .from("ebook")
    .select("id, cover_path, file_path")
    .eq("id", ebookId)
    .maybeSingle();

  if (findError) {
    console.error("Gagal mengambil e-book:", findError.message);
    return NextResponse.json(
      { error: "Gagal mengambil data e-book." },
      { status: 500 }
    );
  }

  if (!existing) {
    return NextResponse.json(
      { error: "E-book tidak ditemukan." },
      { status: 404 }
    );
  }

  const row = normalizeEbookInput(parsed.data);

  // Jangan hapus path lama bila client tidak mengirim field tersebut.
  if (parsed.data.cover_path === undefined) row.cover_path = existing.cover_path;
  if (parsed.data.file_path === undefined) row.file_path = existing.file_path;

  const { data, error } = await auth.admin
    .from("ebook")
    .update(row)
    .eq("id", ebookId)
    .select()
    .single();

  if (error) {
    console.error("Gagal mengubah e-book:", error.message);
    return NextResponse.json(
      { error: "Gagal mengubah e-book." },
      { status: 500 }
    );
  }

  const oldCover = storagePath(existing.cover_path);
  if (oldCover && oldCover !== row.cover_path) {
    await auth.admin.storage.from("ebook-cover").remove([oldCover]);
  }

  const oldFile = storagePath(existing.file_path);
  if (oldFile && oldFile !== row.file_path) {
    await auth.admin.storage.from("ebook-file").remove([oldFile]);
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const ebookId = await resolveId(params);
  if (!ebookId) {
    return NextResponse.json({ error: "ID e-book tidak valid." }, { status: 400 });
  }

  const { data: existing, error: findError } = await auth.admin
    .from("ebook")
    .select("id, cover_path, file_path")
    .eq("id", ebookId)
    .maybeSingle();

  if (findError) {
    console.error("Gagal mengambil e-book:", findError.message);
    return NextResponse.json(
      { error: "Gagal mengambil data e-book." },
      { status: 500 }
    );
  }

  if (!existing) {
    return NextResponse.json(
      { error: "E-book tidak ditemukan." },
      { status: 404 }
    );
  }

  const oldCover = storagePath(existing.cover_path);
  if (oldCover) {
    await auth.admin.storage.from("ebook-cover").remove([oldCover]);
  }

  const oldFile = storagePath(existing.file_path);
  if (oldFile) {
    await auth.admin.storage.from("ebook-file").remove([oldFile]);
  }

  const { error } = await auth.admin.from("ebook").delete().eq("id", ebookId);
  if (error) {
    console.error("Gagal menghapus e-book:", error.message);
    return NextResponse.json(
      { error: "Gagal menghapus e-book." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

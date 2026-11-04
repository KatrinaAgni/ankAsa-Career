import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const { id } = await params;
  const ebookId = Number(id);
  if (!Number.isInteger(ebookId) || ebookId <= 0) {
    return NextResponse.json({ error: "ID e-book tidak valid." }, { status: 400 });
  }

  const { data: ebook, error } = await auth.admin
    .from("ebook")
    .select("file_path, judul")
    .eq("id", ebookId)
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil file e-book:", error.message);
    return NextResponse.json(
      { error: "Gagal mengambil file e-book." },
      { status: 500 }
    );
  }

  if (!ebook || !ebook.file_path) {
    return NextResponse.json(
      { error: "File e-book belum tersedia." },
      { status: 404 }
    );
  }

  if (ebook.file_path.startsWith("http")) {
    return NextResponse.json({ url: ebook.file_path });
  }

  const { data, error: signError } = await auth.admin.storage
    .from("ebook-file")
    .createSignedUrl(ebook.file_path, 60 * 60);

  if (signError || !data?.signedUrl) {
    console.error("Gagal membuat signed URL:", signError?.message);
    return NextResponse.json(
      { error: "Gagal membuka file e-book." },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}

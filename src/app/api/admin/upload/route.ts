import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

const MAX_COVER_BYTES = 5 * 1024 * 1024;
const MAX_FILE_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Form tidak valid." }, { status: 400 });
  }

  const kind = form.get("kind");
  const file = form.get("file");

  if (kind !== "cover" && kind !== "file") {
    return NextResponse.json(
      { error: "Jenis file tidak valid." },
      { status: 400 }
    );
  }

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "File tidak ditemukan." },
      { status: 400 }
    );
  }

  const isCover = kind === "cover";
  const maxBytes = isCover ? MAX_COVER_BYTES : MAX_FILE_BYTES;

  if (file.size > maxBytes) {
    return NextResponse.json(
      {
        error: isCover
          ? "Ukuran cover maksimal 5 MB."
          : "Ukuran PDF maksimal 50 MB.",
      },
      { status: 400 }
    );
  }

  if (isCover && !file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Cover harus berupa gambar." },
      { status: 400 }
    );
  }

  if (!isCover && file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "File e-book harus berupa PDF." },
      { status: 400 }
    );
  }

  const extension =
    file.name.split(".").pop()?.toLowerCase() || (isCover ? "jpg" : "pdf");
  const baseName =
    file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .slice(0, 60) || kind;
  const path = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}-${baseName}.${extension}`;
  const bucket = isCover ? "ebook-cover" : "ebook-file";

  const { error } = await auth.admin.storage
    .from(bucket)
    .upload(path, await file.arrayBuffer(), {
      contentType: file.type || undefined,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Gagal mengunggah file e-book:", error.message);
    return NextResponse.json(
      { error: "Gagal mengunggah file." },
      { status: 500 }
    );
  }

  return NextResponse.json({ path, bucket }, { status: 201 });
}

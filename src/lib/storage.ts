const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function publicEbookFileUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/ebook-file/${path}`;
}

export function publicEbookCoverUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${SUPABASE_URL}/storage/v1/object/public/ebook-cover/${path}`;
}

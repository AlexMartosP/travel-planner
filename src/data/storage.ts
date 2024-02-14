import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";

export function getFileUrl({
  bucket,
  filePath,
}: {
  bucket: string;
  filePath: string;
}) {
  const supabase = createSupabaseClient(cookies());

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}

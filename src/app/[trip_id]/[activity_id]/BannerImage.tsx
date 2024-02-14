import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import Image from "next/image";

export function BannerImage({ path, alt }: { path: string; alt: string }) {
  const supabase = createSupabaseClient(cookies());

  const { data } = supabase.storage.from("activities").getPublicUrl(path);

  return (
    <div className="w-full h-72">
      <Image
        className="w-full h-full object-cover rounded-md"
        src={data.publicUrl}
        width={600}
        height={400}
        alt={alt}
      />
    </div>
  );
}

import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import Image from "next/image";

export function ActivityImage({ path }: { path: string }) {
  const supabase = createSupabaseClient(cookies());

  const { data } = supabase.storage.from("activities").getPublicUrl(path);

  console.log(data.publicUrl);

  return (
    <div className="w-20 aspect-square rounded-md overflow-clip">
      <Image
        className="w-full h-full object-cover"
        src={data.publicUrl}
        width={400}
        height={400}
        alt="Test"
      />
    </div>
  );
}

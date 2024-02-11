import { Toolbar } from "@/components/Toolbar";
import { getSupabaseClient } from "@/db/client";
import { Database } from "@/db/types";
import { PostgrestResponse } from "@supabase/supabase-js";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const supabase = getSupabaseClient(cookies());

  console.log("Getting user");
  const { data, error } = await supabase.auth.getUser();
  const trips: PostgrestResponse<Database["public"]["Tables"]["Trips"]["Row"]> =
    await supabase
      .from("Trips")
      .select("*, Profiles!inner()")
      .eq("Profiles.id", data.user?.id);

  console.log(trips);

  return (
    <div className="grid place-items-center w-screen h-screen">
      <div>
        <h1>Welcome back, {data.user?.user_metadata.full_name}!</h1>
        <div className="mt-8">
          {trips.data?.map((trip) => (
            <Link
              href={`/${trip.id}`}
              key={trip.id}
              className="group flex justify-between items-center"
            >
              <div className="underline underline-offset-2 decoration-slate-300 group-hover:decoration-slate-500 transition">
                {trip.destination_name}
              </div>
              <div className="group-hover:translate-x-1 transition-transform">
                <ArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Toolbar />
    </div>
  );
}

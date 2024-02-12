import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { cache } from "react";

export const getTripWithActivities = cache(async (tripId: string) => {
  const supabase = createSupabaseClient(cookies());

  const trips = await supabase
    .from("Trips")
    .select("*, Activites(*)")
    .eq("id", tripId);

  return {
    data: trips.data?.[0],
    error: trips.error,
    status: trips.status,
  };
});

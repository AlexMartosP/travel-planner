import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { cache } from "react";

export const getTripWithActivities = cache(async (tripId: string) => {
  const supabase = createSupabaseClient(cookies());

  const trips = await supabase
    .from("trips")
    .select("*, activites(*)")
    .eq("id", tripId)
    .order("do_date", {
      referencedTable: "activites",
      ascending: true,
      nullsFirst: false,
    })
    .single();

  return {
    data: trips.data,
    error: trips.error,
    status: trips.status,
  };
});

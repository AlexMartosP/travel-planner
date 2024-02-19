import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";

export async function currentUserHasAccessToTrip(tripId: string) {
  const supabase = createSupabaseClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: tripProfileData } = await supabase
      .from("trips_profiles")
      .select("trip_id")
      .match({
        trip_id: tripId,
        profile_id: user?.id,
      })
      .single();

    if (tripProfileData) {
      return true;
    }

    return false;
  }

  return false;
}

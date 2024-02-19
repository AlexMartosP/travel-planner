import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";

export async function inviteeHasAccessToTrip(
  inviteeEmail: string,
  tripId: string
) {
  const supabase = createSupabaseClient(cookies());

  const { data: user } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", inviteeEmail)
    .single();

  if (!user) {
    return false;
  }

  const { data: tripProfile } = await supabase
    .from("trips_profiles")
    .select("profile_id")
    .eq("profile_id", user.id)
    .eq("trip_id", tripId)
    .single();

  if (!tripProfile) {
    return false;
  }

  return true;
}

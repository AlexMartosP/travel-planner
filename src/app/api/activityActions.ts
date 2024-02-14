"use server";

import { createSupabaseClient } from "@/db/client";
import { TResponse } from "@/types/response";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteActivity(
  activityId: string,
  tripId: number
): Promise<TResponse> {
  const supabase = createSupabaseClient(cookies());

  const { status } = await supabase
    .from("Activites")
    .delete()
    .eq("id", activityId);

  if (status === 204) {
    redirect(`/${tripId}`);

    return {
      status: "success",
    };
  }

  return {
    status: "error",
    error: {
      key: "MUTATION_ERROR",
      message: "Could not delete activity",
    },
  };
}

"use server";

import { createSupabaseClient } from "@/db/client";
import { TResponse } from "@/types/response";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const tripSchema = z.object({
  destination_name: z.string().min(1),
  description: z.string().optional(),
  start_date: z.string().min(1),
  end_date: z.string().nullable(),
});

export async function addTrip(
  currentState: any,
  formData: FormData
): Promise<TResponse> {
  const fields = tripSchema.safeParse({
    destination_name: formData.get("destination_name"),
    description: formData.get("description"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
  });

  if (!fields.success) {
    return {
      status: "error",
      error: {
        key: "VALIDATION_ERROR",
        fields: fields.error.flatten().fieldErrors,
      },
    };
  }

  const supabase = createSupabaseClient(cookies());

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();

    return {
      status: "error",
      error: {
        key: "SELECT_ERROR",
        message: "Could get user",
      },
    };
  }

  const { data: insertedTrip, error: insertError } = await supabase
    .from("trips")
    .insert(fields.data)
    .select()
    .single();

  if (insertError) {
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not add activity",
      },
    };
  }

  const { error: insertRelationError } = await supabase
    .from("trips_profiles")
    .insert({
      trip_id: insertedTrip.id,
      profile_id: user.id,
    });

  if (insertRelationError) {
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not add relationsship",
      },
    };
  }

  redirect(`/${insertedTrip.id}`);
}

export async function updateTrip(
  tripId: string,
  formData: FormData
): Promise<TResponse> {
  const fields = tripSchema.safeParse({
    destination_name: formData.get("destination_name"),
    description: formData.get("description"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || null,
  });

  if (!fields.success) {
    return {
      status: "error",
      error: {
        key: "VALIDATION_ERROR",
        fields: fields.error.flatten().fieldErrors,
      },
    };
  }

  const supabase = createSupabaseClient(cookies());

  const { error: insertError } = await supabase
    .from("trips")
    .update(fields.data)
    .eq("id", tripId);

  if (insertError) {
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not update trip",
      },
    };
  }

  revalidatePath(`/${tripId}`);

  return {
    status: "success",
  };
}

export async function deleteTrip(tripId: string): Promise<TResponse> {
  const supabase = createSupabaseClient(cookies());

  const { status } = await supabase.from("trips").delete().eq("id", tripId);

  if (status === 204) {
    redirect(`/`);

    return {
      status: "success",
    };
  }

  return {
    status: "error",
    error: {
      key: "MUTATION_ERROR",
      message: "Could not delete trip",
    },
  };
}

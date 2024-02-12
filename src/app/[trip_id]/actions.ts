"use server";

import { createSupabaseClient } from "@/db/client";
import { TResponse } from "@/types/response";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const activitySchema = z.object({
  title: z.string(),
  do_date: z.string().optional(),
  description: z.string(),
  address: z.string().optional(),
});

export async function addActivity(
  tripId: number,
  formData: FormData
): Promise<TResponse> {
  const fields = activitySchema.safeParse({
    title: formData.get("title"),
    do_date: formData.get("doDate"),
    description: formData.get("description"),
    address: formData.get("address"),
  });

  const image = formData.get("image") as File | null;

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

  const { data: insertedActivity, error: insertError } = await supabase
    .from("Activites")
    .insert({
      ...fields.data,
      do_date: fields.data.do_date || null,
      image_path: image?.name || null,
    })
    .select();

  if (insertError) {
    console.log(insertError);
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not add activity",
      },
    };
  }

  const { error: insertRelationError } = await supabase
    .from("trips_activites")
    .insert({
      activity: insertedActivity[0].id,
      trip: tripId,
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

  if (image) {
    console.log("Uploading image");
    const { error: storageError } = await supabase.storage
      .from("activities")
      .upload(image.name, image, {
        contentType: "image/*",
      });

    if (storageError) {
      return {
        status: "error",
        error: {
          key: "MUTATION_ERROR",
          message: "Could not add image",
        },
      };
    }
  }

  revalidatePath(`/${tripId}`);

  return {
    status: "success",
  };
}

"use server";

import { createSupabaseClient } from "@/db/client";
import { TablesInsert } from "@/db/types";
import { TResponse } from "@/types/response";
import { generateUniqueImagePath } from "@/utils/filePath";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const activitySchema = z.object<TablesInsert<"Activites">>({
  title: z.string(),
  do_date: z.string().optional(),
  description: z.string(),
  address: z.string().optional(),
});

const acceptedFiletypes = ["image/jpeg", "image/png"];

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
  const imageExists = image && image?.size > 0;

  if (!fields.success) {
    return {
      status: "error",
      error: {
        key: "VALIDATION_ERROR",
        fields: fields.error.flatten().fieldErrors,
      },
    };
  }

  if (imageExists && !acceptedFiletypes.includes(image.type)) {
    return {
      status: "error",
      error: {
        key: "VALIDATION_ERROR",
        fields: {
          image: "Image is of wrong type",
        },
      },
    };
  }

  const supabase = createSupabaseClient(cookies());

  const imagePath = imageExists ? generateUniqueImagePath(image.type) : null;

  const { data: insertedActivity, error: insertError } = await supabase
    .from("Activites")
    .insert({
      ...fields.data,
      do_date: fields.data.do_date || null,
      image_path: imagePath,
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

  if (imagePath && image) {
    const { error: storageError } = await supabase.storage
      .from("activities")
      .upload(imagePath, image, {
        contentType: "image/*",
      });

    if (storageError) {
      console.log(storageError);
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

export async function updateActivity(
  activityId: string,
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
  const imageExists = image && image?.size > 0;

  if (!fields.success) {
    return {
      status: "error",
      error: {
        key: "VALIDATION_ERROR",
        fields: fields.error.flatten().fieldErrors,
      },
    };
  }

  if (imageExists && !acceptedFiletypes.includes(image.type)) {
    return {
      status: "error",
      error: {
        key: "VALIDATION_ERROR",
        fields: {
          image: "Image is of wrong type",
        },
      },
    };
  }

  const supabase = createSupabaseClient(cookies());

  const imagePath = imageExists ? generateUniqueImagePath(image.type) : null;

  const { data: insertedActivity, error: insertError } = await supabase
    .from("Activites")
    .update({
      ...fields.data,
      do_date: fields.data.do_date || null,
      image_path: imagePath,
    })
    .eq("id", activityId);

  if (insertError) {
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not update activity",
      },
    };
  }

  if (imagePath && image) {
    const { error: storageError } = await supabase.storage
      .from("activities")
      .upload(imagePath, image, {
        contentType: "image/*",
        upsert: true,
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

  revalidatePath(`/${tripId}/${activityId}`);

  return {
    status: "success",
  };
}

"use server";

import { createSupabaseClient } from "@/db/client";
import { TResponse } from "@/types/response";
import { generateUniqueImagePath } from "@/utils/filePath";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const activitySchema = z.object({
  title: z.string(),
  do_date: z.string(),
  description: z.string(),
  address: z.string(),
});

const acceptedFiletypes = ["image/jpeg", "image/png"];

export async function addActivity(
  tripId: string,
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
    .from("activites")
    .insert({
      ...fields.data,
      do_date: fields.data.do_date || null,
      image_path: imagePath,
      trip_id: tripId,
    })
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

  if (imagePath && image) {
    const { error: storageError } = await supabase.storage
      .from("activities")
      .upload(imagePath, image, {
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

export async function updateActivity(
  activityId: string,
  tripId: string,
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

  const { data: activity } = await supabase
    .from("activites")
    .select("image_path")
    .eq("id", activityId)
    .single();

  const imagePath = imageExists ? generateUniqueImagePath(image.type) : null;

  console.log(fields);

  const { error: insertError } = await supabase
    .from("activites")
    .update({
      ...fields.data,
      do_date: fields.data.do_date || null,
      ...(imagePath && { image_path: imagePath }),
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

    if (activity?.image_path) {
      const { error: removeFileError } = await supabase.storage
        .from("activities")
        .remove([activity.image_path]);

      if (removeFileError) {
        // Silent error, should log
        // eslint-disable-next-line no-console
        console.log("Could not remove old image");
      }
    }
  }

  revalidatePath(`/${tripId}/${activityId}`);

  return {
    status: "success",
  };
}

export async function deleteActivity(
  activityId: string,
  tripId: string
): Promise<TResponse> {
  const supabase = createSupabaseClient(cookies());

  const { status } = await supabase
    .from("activites")
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

export async function updateDone(
  tripId: string,
  activityId: string,
  done: boolean
): Promise<TResponse> {
  const supabase = createSupabaseClient(cookies());

  const { status } = await supabase
    .from("activites")
    .update({ done })
    .eq("id", activityId);

  revalidatePath(`/${tripId}/${activityId}`);

  if (status !== 204) {
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not update done",
      },
    };
  }

  return {
    status: "success",
  };
}

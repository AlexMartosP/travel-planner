"use server";

import { TResponse } from "@/types/response";
import { z } from "zod";

const invitationSchema = z.object({
  email: z.string().min(1).email(),
});

export async function sendInvite(
  tripId: string,
  formData: FormData
): Promise<TResponse> {
  const fields = invitationSchema.safeParse({
    email: formData.get("email"),
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

  // Send email

  return {
    status: "success",
  };
}

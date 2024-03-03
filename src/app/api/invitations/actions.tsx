"use server";

import { TResponse } from "@/types/response";
import { z } from "zod";
import { postmarkClient } from "@/postmark/client";
import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { renderAsync } from "@react-email/render";
import InvitationEmail from "../../../../emails/InvitationEmail";
import { signOut } from "@/app/api/auth/actions";
import { inviteeHasAccessToTrip } from "@/app/api/invitations/access";
import { baseUrl } from "@/constants/href";

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

  const supabase = createSupabaseClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    await signOut();

    return {
      status: "error",
      error: {
        key: "SELECT_ERROR",
        message: "User is not defined",
      },
    };
  }

  const { data: trip, error: tripError } = await supabase
    .from("trips")
    .select("destination_name")
    .eq("id", tripId)
    .single();

  if (tripError) {
    return {
      status: "error",
      error: {
        key: "SELECT_ERROR",
        message: "Could not get trip",
      },
    };
  }

  const hasAccessToTrip = await inviteeHasAccessToTrip(
    fields.data.email,
    tripId
  );

  if (hasAccessToTrip) {
    return {
      status: "error",
      error: {
        key: "SELECT_ERROR",
        message: "User is already a traveler of the trip",
      },
    };
  }

  const { data: insertedInvitation, error: insertError } = await supabase
    .from("invitations")
    .insert({
      trip_id: tripId,
      invitee_email: fields.data.email,
    })
    .select("id")
    .single();

  if (insertError) {
    return {
      status: "error",
      error: {
        key: "MUTATION_ERROR",
        message: "Could not create invitation",
      },
    };
  }

  const invitationLink = `${baseUrl}/api/invitations?invitation_id=${insertedInvitation.id}`;

  const emailHtml = await renderAsync(
    <InvitationEmail
      destinationName={trip.destination_name}
      inviterEmail={user.email || ""}
      link={invitationLink}
    />
  );

  await postmarkClient.sendEmail({
    From: "services@alexmp.dev",
    To: fields.data.email, // fields.data.email when approved from postmark
    Subject: "Travel planner invitation",
    HtmlBody: emailHtml,
    MessageStream: "outbound",
  });

  return {
    status: "success",
  };
}

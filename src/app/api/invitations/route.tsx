import { createSupabaseClient } from "@/db/client";
import { differenceInHours } from "date-fns";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createSupabaseClient(cookies());

  const invitationId = request.nextUrl.searchParams.get("invitation_id");

  if (!invitationId) {
    // Redirect to start page
    return new NextResponse("No invitation_id");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (user) {
    const { data: invitation, error: invitationError } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", invitationId)
      .single();

    if (invitationError || !invitation) {
      return NextResponse.redirect(request.nextUrl.origin);
    }

    if (invitation.has_expired) {
      return new NextResponse("Invitation has expired");
    }

    // May move this to some scheduled fn lated
    if (differenceInHours(new Date(), invitation.created_at) >= 24) {
      const { error: updateError } = await supabase
        .from("invitations")
        .update({
          has_expired: true,
        })
        .eq("id", invitationId);

      if (updateError) {
        // Silent error and log
        console.log(updateError);
      }

      return new NextResponse("Invitation has expired after 24 hours");
    }

    if (invitation.invitee_email !== user.email) {
      return NextResponse.redirect(
        `${request.nextUrl.origin}/invitation/access-denied?invitationId=${invitation.id}&redirectTo=${request.url}`
      );
    }

    const { error: updateTripError, status: updateTripStatus } = await supabase
      .from("trips_profiles")
      .insert({
        trip_id: invitation.trip_id,
        profile_id: user.id,
      });

    if (updateTripError) {
      if (updateTripStatus === 409) {
        return NextResponse.redirect(
          `${request.nextUrl.origin}/${invitation.trip_id}`
        );
      }

      return new NextResponse("An error occured when updating trip");
    }

    const { error: deleteInvitationError } = await supabase
      .from("invitations")
      .delete()
      .eq("id", invitation.id);

    if (deleteInvitationError) {
      // Silent error with log
    }

    return NextResponse.redirect(
      `${request.nextUrl.origin}/${invitation.trip_id}`
    );
  }
}

import { SignoutButton } from "@/app/(root)/components/SignoutButton";
import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function InvitationAccessDenied({
  searchParams,
}: {
  searchParams: {
    invitationId: string;
    redirectTo: string;
  };
}) {
  if (!searchParams.invitationId) {
    return notFound();
  }

  const supabase = createSupabaseClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: invitation } = await supabase
    .from("invitations")
    .select("invitee_email")
    .eq("id", searchParams.invitationId)
    .single();

  if (!invitation) {
    return notFound();
  }

  if (user?.email === invitation.invitee_email) {
    return notFound();
  }

  return (
    <div className="pt-32">
      <h1>Invitation error</h1>
      <p>
        You do not have access to accepting this invitation, please login as the
        correct user to accept the invitation.
      </p>
      <div className="mt-4">
        {user?.email} | <SignoutButton redirectTo={searchParams.redirectTo} />
      </div>
    </div>
  );
}

"use client";

import { sendInvite } from "@/app/api/invitations/actions";
import { Alert } from "@/components/ui/Alert";
import { Dialog } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function InvitationDialog({
  tripId,
  open,
  onClose,
}: {
  tripId: string;
  open: boolean;
  onClose: () => void;
}) {
  const [sentInvite, setSentInvite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Dialog
      title="Invite traveler"
      open={open}
      buttonLabel="Invite"
      onClose={onClose}
      loading={isLoading}
      error={{
        title: error,
      }}
      formId="invite_form"
    >
      <form
        id="invite_form"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);

          const response = await sendInvite(
            tripId,
            new FormData(e.target as HTMLFormElement)
          );

          if (response.status === "error") {
            setError("Could not send invitation");
          } else {
            setSentInvite(true);
            setError("");
          }

          setIsLoading(false);
        }}
      >
        <Input label="Email*" type="email" name="email" required />
      </form>
      {sentInvite && (
        <Alert title="Invitation is sent" variant="success" className="mt-4">
          An email has been sent to the invitee
        </Alert>
      )}
    </Dialog>
  );
}

"use client";

import { sendInvite } from "@/app/api/invitations/actions";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function InvitationForm({ tripId }: { tripId: string }) {
  const [sentInvite, setSentInvite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <form
      id="invite_form"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await sendInvite(
          tripId,
          new FormData(e.target as HTMLFormElement)
        );

        console.log(response);

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
  );
}

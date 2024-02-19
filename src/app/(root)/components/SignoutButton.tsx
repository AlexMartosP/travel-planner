"use client";

import { signOut } from "@/app/api/auth/actions";
import { Button } from "@/components/ui/Button";

export function SignoutButton({ redirectTo }: { redirectTo?: string }) {
  return (
    <Button variant="text" onClick={() => signOut(redirectTo)}>
      Signout
    </Button>
  );
}

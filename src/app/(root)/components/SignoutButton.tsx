"use client";

import { signOut } from "@/app/api/auth/actions";
import { Button } from "@/components/ui/Button";

export function SignoutButton() {
  return (
    <Button variant="text" onClick={() => signOut()}>
      Signout
    </Button>
  );
}

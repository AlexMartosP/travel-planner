"use client";

import { signOut } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";

export function SignoutButton() {
  return (
    <Button variant="text" onClick={() => signOut()}>
      Signout
    </Button>
  );
}

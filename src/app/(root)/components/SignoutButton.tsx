"use client";

import { signOut } from "@/app/api/auth/actions";
import { Button } from "@/components/ui/Button";
import { baseUrl } from "@/constants/href";

export function SignoutButton({ redirectTo }: { redirectTo?: string }) {
  console.log(baseUrl);
  return (
    <Button variant="text" onClick={() => signOut(redirectTo)}>
      Signout
    </Button>
  );
}

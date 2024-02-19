"use client";

import { loginWithGoogle } from "@/app/api/auth/actions";
import { Button } from "@/components/ui/Button";

export function LoginWithGoogle({ redirectTo }: { redirectTo?: string }) {
  return (
    <Button
      onClick={() => {
        loginWithGoogle(redirectTo);
      }}
    >
      Login with google
    </Button>
  );
}

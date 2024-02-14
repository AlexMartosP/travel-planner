"use client";

import { loginWithGoogle } from "@/app/api/auth/actions";
import { Button } from "@/components/ui/Button";

export function LoginWithGoogle() {
  return (
    <Button
      onClick={() => {
        loginWithGoogle();
      }}
    >
      Login with google
    </Button>
  );
}

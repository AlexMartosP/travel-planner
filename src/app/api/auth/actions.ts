"use server";

import { createSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithGoogle(redirectTo?: string) {
  const supabase = createSupabaseClient(cookies());

  const redirectUrl = new URL("http://localhost:3000/api/auth/token");

  if (redirectTo) {
    redirectUrl.searchParams.append("redirectTo", redirectTo);
  }

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl.toString(),
      scopes: "email profile",
    },
  });

  return redirect(data.url!);
}

export async function signOut(redirectTo?: string) {
  const supabase = createSupabaseClient(cookies());

  const { error } = await supabase.auth.signOut();

  if (!error) {
    const loginUrl = new URL(`${process.env.BASE_URL}/login`);

    if (redirectTo) {
      loginUrl.searchParams.append("redirectTo", redirectTo);
    }

    return redirect(loginUrl.toString());
  }
}

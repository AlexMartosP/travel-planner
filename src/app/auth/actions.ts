"use server";

import { getSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginWithGoogle() {
  const supabase = getSupabaseClient(cookies());

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/token",
      scopes: "email profile",
    },
  });

  return redirect(data.url!);
}

export async function signOut() {
  const supabase = getSupabaseClient(cookies());

  const { error } = await supabase.auth.signOut();

  if (!error) {
    return redirect("/login");
  }
}

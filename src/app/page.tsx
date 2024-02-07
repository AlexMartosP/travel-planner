import { Button } from "@/components/Button";
import { getSupabaseClient } from "@/db/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  async function handleLogin() {
    "use server";
    const supabase = getSupabaseClient(cookies());

    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3001/auth/token",
        scopes: "email profile",
      },
    });

    return redirect(data.url!);
  }

  async function signOut() {
    "use server";
    const supabase = getSupabaseClient(cookies());

    const { error } = await supabase.auth.signOut();

    if (!error) {
      // Redirect here
    }
  }

  const supabase = getSupabaseClient(cookies());
  const { data, error } = await supabase.auth.getUser();

  return (
    <div>
      <Button onClick={handleLogin}>Sign in with google</Button>
      <Button onClick={signOut}>Sign out</Button>
      <div>
        User:
        <div>{data.user?.email}</div>
        <div>{data.user?.user_metadata.avatar_url}</div>
      </div>
    </div>
  );
}

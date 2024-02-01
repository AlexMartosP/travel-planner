import { Button } from "@/components/Button";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  async function handleLogin() {
    "use server";
    const supabase = createServerActionClient({ cookies });

    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3001/auth/token",
      },
    });

    return redirect(data.url!);
  }

  return (
    <div>
      <Button onClick={handleLogin}>Sign in with google</Button>
    </div>
  );
}

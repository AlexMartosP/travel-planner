import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/db/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const redirectTo = searchParams.get("redirectTo");

  if (code) {
    const cookieStore = cookies();
    const supabase = createSupabaseClient(cookieStore);

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("In auth route");
    console.log(error);

    if (!error) {
      if (redirectTo) {
        return NextResponse.redirect(redirectTo);
      }

      return NextResponse.redirect(origin);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`);
}

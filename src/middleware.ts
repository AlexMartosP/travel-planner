import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    await supabase.auth.signOut();
  }

  if (request.nextUrl.pathname === "/login") {
    if (data.user) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return response;
    }
  }

  if (request.nextUrl.pathname.includes("/api/invitations") && !data.user) {
    return NextResponse.redirect(
      new URL(`/login?redirectTo=${request.url}`, request.url)
    );
  }

  if (!data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};

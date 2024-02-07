import { createServerClient } from "@supabase/ssr";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getSupabaseClient = (
  cookieStore: ReturnType<typeof cookies> | RequestCookies
) => {
  return createServerClient(process.env.DB_API_URL!, process.env.DB_KEY!, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options) {
        cookieStore.delete({ name, value: "", ...options });
      },
    },
  });
};

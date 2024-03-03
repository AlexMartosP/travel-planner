import { ZodError, z } from "zod";

export const zodEnv = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  POSTMARK_SERVER_API_TOKEN: z.string(),
  VERCEL_URL: z.string(),
  VERCEL_ENV: z.string(),
});

try {
  zodEnv.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    const { fieldErrors } = error.flatten();

    const errorMessage = Object.entries(fieldErrors)
      .map(([field, errors]) =>
        errors ? `${field}: ${errors.join(", ")}` : field
      )
      .join("\n  ");

    throw new Error(`Missing environment variables:\n  ${errorMessage}`);
  }

  process.exit(1);
}

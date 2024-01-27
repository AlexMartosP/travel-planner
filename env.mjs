import { ZodError, z } from "zod";

export const zodEnv = z.object({
  DB_URL: z.string(),
  DB_KEY: z.string(),
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

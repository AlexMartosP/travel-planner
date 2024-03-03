const isProdEnv = process.env.VERCEL_ENV! === "production";

export const baseUrl = `${isProdEnv ? "https" : "http"}://${
  process.env.VERCEL_URL
}`;

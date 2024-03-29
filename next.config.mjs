import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
        port: "54321",
      },
      {
        protocol: "https",
        hostname: "lcgofqpssavoilbljirq.supabase.co",
      },
    ],
  },
};

export default nextConfig;

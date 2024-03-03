export const getBaseURL = () => {
  let url = process?.env?.SITE_URL ?? process.env.VERCEL_URL!;

  url = url.includes("http") ? url : `https://${url}`;
  return url;
};

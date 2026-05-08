import type { NextConfig } from "next";

const strapiHost = process.env.STRAPI_URL
  ? new URL(process.env.STRAPI_URL).hostname
  : undefined;
const strapiMediaHost = strapiHost?.endsWith(".strapiapp.com")
  ? strapiHost.replace(".strapiapp.com", ".media.strapiapp.com")
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(strapiHost
        ? [
            {
              protocol: "https" as const,
              hostname: strapiHost,
            },
          ]
        : []),
      ...(strapiMediaHost
        ? [
            {
              protocol: "https" as const,
              hostname: strapiMediaHost,
            },
          ]
        : []),
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects.html",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

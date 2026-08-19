import type { NextConfig } from "next";
import redirectsMap from "./redirects.json";

const nextConfig: NextConfig = {
  // All internal links, canonical tags, and the sitemap use trailing
  // slashes (e.g. "/shop/") — keep Next's routing consistent with that
  // instead of 308-redirecting every URL to the slash-less form.
  trailingSlash: true,
  images: {
    qualities: [75, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-d5e0762786b94c2d9a1c0791eae25206.r2.dev",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return redirectsMap as {
      source: string;
      destination: string;
      permanent: boolean;
    }[];
  },
};

export default nextConfig;

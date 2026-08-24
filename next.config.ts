import type { NextConfig } from "next";
import redirectsMap from "./redirects.json";

const nextConfig: NextConfig = {
  // Both icon libraries are imported piecemeal already (named imports /
  // subpath imports, never a full barrel import), but this makes Next
  // rewrite those imports to per-icon modules at build time so each page's
  // client bundle only ships the icons it actually renders, instead of
  // relying on the bundler's tree-shaking alone.
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
  // NOTE: trailingSlash: true was tried here to match the site's
  // trailing-slash internal links/canonical/sitemap, but it also forces a
  // trailing slash onto Next's internal /_next/image optimizer route,
  // which breaks it (500 on every optimized image, local or remote).
  // Reverted — page-level trailing-slash 308s are a minor SEO/UX cost,
  // site-wide broken images are not an acceptable tradeoff.
  images: {
    qualities: [75, 90, 95],
    // Optimized image variants are immutable once generated (content-hashed
    // by url+width+quality) — cache them for a year so repeat visits and
    // subsequent deploys never pay the optimization cost again.
    minimumCacheTTL: 31536000,
    // Kept for any future images added directly from R2 — all 62 existing
    // product/category photos now ship as local, pre-optimized files under
    // /public/images/plants/ instead (see scripts/localize-remote-images.js),
    // which removes the external fetch from the request path entirely.
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

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

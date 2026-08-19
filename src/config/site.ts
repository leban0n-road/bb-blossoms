/**
 * Centralized brand / NAP / service-area configuration.
 * Change values here to rebrand or re-target the entire site — no other
 * file should hardcode business name, phone, address, or city names.
 */

export const siteConfig = {
  brandName: "BB Blossoms",
  legalName: "BB Blossoms",
  domain: "www.bbblossoms.com",
  url: "https://www.bbblossoms.com",
  tagline: "Premium Plants, Trees & Shrubs — Grown for Georgia Yards",
  description:
    "BB Blossoms is a local nursery selling healthy plants, trees, and shrubs with delivery and professional installation across the Atlanta metro area.",

  // NAP — keep identical across every page, footer, and schema block.
  phone: "(770) 555-0142",
  phoneHref: "tel:+17705550142",
  email: "hello@bbblossoms.com",
  address: {
    street: "4820 Nursery Row",
    city: "Lawrenceville",
    state: "GA",
    stateName: "Georgia",
    zip: "30046",
    country: "US",
  },
  geo: {
    latitude: 33.9562,
    longitude: -83.9880,
  },

  // Primary city used as the default in copy, USDA zone, and templates.
  // Swap this to re-target the whole site to a different metro.
  primaryCity: "Lawrenceville",
  primaryState: "GA",
  primaryStateName: "Georgia",
  usdaZone: "8a",

  hours: [
    { day: "Monday", open: "8:00", close: "18:00" },
    { day: "Tuesday", open: "8:00", close: "18:00" },
    { day: "Wednesday", open: "8:00", close: "18:00" },
    { day: "Thursday", open: "8:00", close: "18:00" },
    { day: "Friday", open: "8:00", close: "18:00" },
    { day: "Saturday", open: "8:00", close: "17:00" },
    { day: "Sunday", open: "10:00", close: "16:00" },
  ],

  priceRange: "$$",

  social: {
    facebook: "https://www.facebook.com/bbblossoms",
    instagram: "https://www.instagram.com/bbblossoms",
    pinterest: "https://www.pinterest.com/bbblossoms",
    youtube: "https://www.youtube.com/@bbblossoms",
  },

  founded: 2011,
  yearsInBusiness: new Date().getFullYear() - 2011,

  guarantee:
    "1-Year Plant Guarantee: if a tree or shrub planted by our installation crew doesn't establish within 12 months, we replace it at no charge (placeholder terms — replace with final legal copy).",

  footerLegalCopy:
    "BB Blossoms is a local nursery dedicated to helping homeowners, gardeners, and landscaping professionals find quality plants, trees, shrubs, flowers, and seasonal favorites for their outdoor spaces. Plant availability, sizes, varieties, and pricing may vary by season and inventory.",

  copyrightLine: "© 2026 BB Blossoms. All rights reserved.",

  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    googleSiteVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

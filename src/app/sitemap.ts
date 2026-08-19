import type { MetadataRoute } from "next";
import {
  getAllPlants,
  getCategories,
  getGuides,
  getLocations,
  getNeeds,
} from "@/lib/content";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/shop-by-need/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/locations/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services/delivery/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/services/installation/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/services/landscape-design/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/guides/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/reviews/`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/quote/`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/shop/${c.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const plantRoutes: MetadataRoute.Sitemap = getAllPlants().map((p) => ({
    url: `${base}/shop/${p.category}/${p.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const needRoutes: MetadataRoute.Sitemap = getNeeds().map((n) => ({
    url: `${base}/shop-by-need/${n.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const locationRoutes: MetadataRoute.Sitemap = getLocations().map((l) => ({
    url: `${base}/locations/${l.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guideRoutes: MetadataRoute.Sitemap = getGuides().map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: new Date(g.updatedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...plantRoutes,
    ...needRoutes,
    ...locationRoutes,
    ...guideRoutes,
  ];
}

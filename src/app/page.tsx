import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WallpaperBackdrop from "@/components/home/WallpaperBackdrop";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import NeedLinks from "@/components/home/NeedLinks";
import WhyUs from "@/components/home/WhyUs";
import LocationsStrip from "@/components/home/LocationsStrip";
import {
  getCategories,
  getFlagshipPlants,
  getLocations,
  getNeeds,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.brandName} | Plant Nursery in ${siteConfig.primaryCity}, ${siteConfig.primaryState}`,
  description: siteConfig.description,
  path: "/",
});

export default function Home() {
  const categories = getCategories();
  const needs = getNeeds();
  const locations = getLocations();
  const flagshipPlants = getFlagshipPlants();

  return (
    <>
      <Hero />
      <div className="relative">
        <WallpaperBackdrop />
        <CategoryGrid categories={categories} />
        <BestSellers plants={flagshipPlants} />
        <NeedLinks needs={needs} />
        <WhyUs />
        <LocationsStrip locations={locations} />
      </div>
    </>
  );
}

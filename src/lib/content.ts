import categoriesData from "@/content/categories.json";
import needsData from "@/content/needs.json";
import locationsData from "@/content/locations.json";
import plantsData from "@/content/plants.json";
import guidesData from "@/content/guides.json";
import reviewsData from "@/content/reviews.json";
import siteFaqsData from "@/content/site-faqs.json";
import type {
  Category,
  CategorySlug,
  Faq,
  GuideArticle,
  LocationPage,
  NeedCollection,
  NeedSlug,
  Plant,
  Review,
} from "@/lib/types";

const categories = categoriesData as Category[];
const needs = needsData as NeedCollection[];
const locations = locationsData as LocationPage[];
const plants = plantsData as Plant[];
const guides = guidesData as GuideArticle[];
// TODO: replace with real, verified customer reviews before launch.
const reviews = reviewsData as Review[];
const siteFaqs = siteFaqsData as Faq[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllPlants(): Plant[] {
  return plants;
}

export function getPlantBySlug(slug: string): Plant | undefined {
  return plants.find((p) => p.slug === slug);
}

export function getPlantsByCategory(category: CategorySlug): Plant[] {
  return plants.filter(
    (p) => p.category === category || p.featuredIn?.includes(category)
  );
}

export function getFlagshipPlants(): Plant[] {
  return plants.filter((p) => p.flagship);
}

export function getRelatedPlants(plant: Plant, count = 4): Plant[] {
  if (plant.companionSlugs?.length) {
    const companions = plant.companionSlugs
      .map((s) => getPlantBySlug(s))
      .filter((p): p is Plant => Boolean(p));
    if (companions.length >= count) return companions.slice(0, count);
  }
  return plants
    .filter((p) => p.slug !== plant.slug && p.category === plant.category)
    .slice(0, count);
}

export function getNeeds(): NeedCollection[] {
  return needs;
}

export function getNeedBySlug(slug: string): NeedCollection | undefined {
  return needs.find((n) => n.slug === slug);
}

export function getPlantsForNeed(need: NeedCollection): Plant[] {
  return need.plantSlugs
    .map((s) => getPlantBySlug(s))
    .filter((p): p is Plant => Boolean(p));
}

export function getNeedsForPlant(plantSlug: string): NeedCollection[] {
  return needs.filter((n) => n.plantSlugs.includes(plantSlug));
}

export function getLocations(): LocationPage[] {
  return locations;
}

export function getLocationBySlug(slug: string): LocationPage | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getGuides(): GuideArticle[] {
  return [...guides].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesForCategory(category: CategorySlug): GuideArticle[] {
  return guides.filter((g) => g.relatedCategorySlug === category);
}

export function getGuidesForNeed(need: NeedSlug): GuideArticle[] {
  return guides.filter((g) => g.relatedNeedSlug === need);
}

export function getReviews(): Review[] {
  return reviews;
}

export function getSiteFaqs(): Faq[] {
  return siteFaqs;
}

export function getAverageRating(): number {
  if (!reviews.length) return 5;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

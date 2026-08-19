export type CategorySlug =
  | "privacy-screening"
  | "flowering-shrubs"
  | "trees"
  | "georgia-favorites"
  | "fruit-plants"
  | "houseplants"
  | "ornamental-grasses"
  | "perennials"
  | "annuals-seasonal";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  icon: string;
  heroImage: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  faqs: Faq[];
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Plant {
  name: string;
  slug: string;
  category: CategorySlug;
  price: number;
  salePrice?: number;
  potSize: string;
  potSizeOptions?: { label: string; price: number }[];
  matureHeight: string;
  matureWidth: string;
  sun: string;
  water: string;
  bloomSeason: string;
  growthRate: string;
  usdaZone: string;
  deerResistant: boolean;
  petSafe: boolean;
  native: boolean;
  flagship?: boolean;
  /** Other category pages this product should ALSO be listed on (e.g. a
   * Flowering Shrub that's also a Georgia Favorite) without owning a
   * second, duplicate product page/URL there. */
  featuredIn?: CategorySlug[];
  image: string;
  images?: string[];
  description: string;
  plantingTips: string;
  fastFacts: string[];
  faqs: Faq[];
  companionSlugs?: string[];
  installationUpsell?: boolean;
}

export type NeedSlug =
  | "fast-growing-privacy-plants"
  | "plants-for-a-fence-line"
  | "deer-resistant-plants"
  | "full-sun-plants"
  | "shade-plants"
  | "native-georgia-plants"
  | "low-maintenance-plants"
  | "pollinator-plants"
  | "plants-for-clay-soil"
  | "drought-tolerant-plants"
  | "small-yard-trees"
  | "plants-for-hoa-landscapes"
  | "evergreen-privacy-plants";

export interface NeedCollection {
  slug: NeedSlug;
  name: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  canonicalCategory?: CategorySlug;
  plantSlugs: string[];
  faqs: Faq[];
}

export interface LocationPage {
  slug: string;
  city: string;
  county: string;
  state: string;
  stateAbbr: string;
  zone: string;
  intro: string;
  landmarkNote: string;
  soilNote: string;
  deliveryRadiusMiles: number;
  deliveryNote: string;
  popularPlantSlugs: string[];
  latitude: number;
  longitude: number;
  metaTitle: string;
  metaDescription: string;
  faqs: Faq[];
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishDate: string;
  updatedDate: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  relatedCategorySlug?: CategorySlug;
  relatedNeedSlug?: NeedSlug;
  bodyHtml: string;
  faqs: Faq[];
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  location?: string;
  verified?: boolean;
}

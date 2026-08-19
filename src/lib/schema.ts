import { siteConfig } from "@/config/site";
import { getAverageRating, getLocations, getReviews } from "@/lib/content";
import type { Faq, GuideArticle, Plant } from "@/lib/types";

function openingHoursSpecification() {
  return siteConfig.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.open,
    closes: h.close,
  }));
}

export function organizationSchema() {
  const locations = getLocations();
  return {
    "@context": "https://schema.org",
    "@type": "GardenCenter",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    image: `${siteConfig.url}/images/placeholder-storefront.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: locations.map((l) => ({
      "@type": "City",
      name: `${l.city}, ${l.stateAbbr}`,
    })),
    sameAs: Object.values(siteConfig.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: getAverageRating(),
      reviewCount: getReviews().length,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.brandName,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/shop/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function productSchema(plant: Plant) {
  const reviews = getReviews().slice(0, 3);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plant.name,
    description: plant.description,
    image: [
      `${siteConfig.url}${plant.image}`,
      ...(plant.images ?? []).map((i) => `${siteConfig.url}${i}`),
    ],
    sku: plant.slug,
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/shop/${plant.category}/${plant.slug}/`,
      priceCurrency: "USD",
      price: plant.salePrice ?? plant.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: siteConfig.brandName,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: getAverageRating(),
      reviewCount: getReviews().length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.body,
    })),
  };
}

export function articleSchema(guide: GuideArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishDate,
    dateModified: guide.updatedDate,
    author: {
      "@type": "Organization",
      name: siteConfig.brandName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/placeholder-logo.png`,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/guides/${guide.slug}/`,
  };
}

export function localBusinessForLocationSchema(
  city: string,
  stateAbbr: string,
  areaLat: number,
  areaLng: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "GardenCenter",
    name: `${siteConfig.brandName} — Serving ${city}, ${stateAbbr}`,
    telephone: siteConfig.phone,
    priceRange: siteConfig.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: `${city}, ${stateAbbr}`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: areaLat,
        longitude: areaLng,
      },
    },
    openingHoursSpecification: openingHoursSpecification(),
  };
}

export function toJsonLd(data: unknown) {
  return { __html: JSON.stringify(data) };
}

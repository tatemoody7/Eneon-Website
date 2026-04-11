/**
 * Schema.org JSON-LD builders. Centralized so page files stay lean and
 * schema shapes are consistent across the site.
 */

import { company } from "@/content/company";

const BASE_URL = "https://www.eneon-es.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}#organization`,
    name: company.name,
    legalName: company.legalName,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description: company.description,
    slogan: company.tagline,
    email: company.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.headquarters.city,
      addressRegion: company.headquarters.region,
      addressCountry: company.headquarters.country,
    },
    sameAs: [company.social.linkedin, company.social.youtube].filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    url: BASE_URL,
    name: company.name,
    description: company.description,
    publisher: { "@id": `${BASE_URL}#organization` },
    inLanguage: "en-CA",
  };
}

export function productSchema(args: {
  name: string;
  description: string;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    ...(args.image ? { image: args.image } : {}),
    ...(args.category ? { category: args.category } : {}),
    brand: {
      "@type": "Brand",
      name: company.name,
    },
    manufacturer: { "@id": `${BASE_URL}#organization` },
  };
}

export function breadcrumbSchema(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };
}

export function articleSchema(args: {
  headline: string;
  description: string;
  datePublished: string;
  slug: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    datePublished: args.datePublished,
    url: `${BASE_URL}/insights/${args.slug}`,
    author: { "@id": `${BASE_URL}#organization` },
    publisher: { "@id": `${BASE_URL}#organization` },
    ...(args.category ? { articleSection: args.category } : {}),
  };
}

/**
 * Schema.org JSON-LD Generator
 * 
 * Genera structured data per Google, Bing e altri motori di ricerca.
 * Supporta: Organization, Article, Product, FAQPage, HowTo, BreadcrumbList
 * 
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { useEffect } from 'react';

// ============================================
// TYPES
// ============================================

export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[]; // Social profiles
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    email?: string;
    url?: string;
  };
}

export interface ArticleSchema {
  '@type': 'Article' | 'TechArticle' | 'NewsArticle';
  headline: string;
  description: string;
  image?: string | string[];
  author?: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  publisher?: OrganizationSchema;
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: string;
}

export interface ProductSchema {
  '@type': 'Product';
  name: string;
  description: string;
  image?: string | string[];
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers?: {
    '@type': 'Offer';
    price?: string;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
  };
}

export interface FAQSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface HowToSchema {
  '@type': 'HowTo';
  name: string;
  description: string;
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    url?: string;
    image?: string;
  }>;
  totalTime?: string; // ISO 8601 duration
}

export interface BreadcrumbSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface SoftwareApplicationSchema {
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
  };
}

export interface WebPageSchema {
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  isPartOf?: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
  breadcrumb?: BreadcrumbSchema;
  mainEntity?: ArticleSchema | ProductSchema | FAQSchema;
}

type SchemaType =
  | OrganizationSchema
  | ArticleSchema
  | ProductSchema
  | FAQSchema
  | HowToSchema
  | BreadcrumbSchema
  | SoftwareApplicationSchema
  | WebPageSchema;

// ============================================
// COMPONENT
// ============================================

interface JsonLdProps {
  schema: SchemaType | SchemaType[];
}

/**
 * Injects JSON-LD structured data into document head
 */
export function JsonLd({ schema }: JsonLdProps) {
  useEffect(() => {
    const scriptId = 'schema-org-jsonld';

    // Remove existing script if any
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script element
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';

    const jsonLd = Array.isArray(schema)
      ? schema.map(s => ({ '@context': 'https://schema.org', ...s }))
      : { '@context': 'https://schema.org', ...schema };

    script.textContent = JSON.stringify(jsonLd, null, 0);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [schema]);

  return null;
}

// ============================================
// BUILDER FUNCTIONS
// ============================================

const BASE_URL = 'https://florenceegi.com';
const ORG_NAME = 'FlorenceEGI';
const ORG_LOGO = `${BASE_URL}/images/logo.png`;

/**
 * Creates FlorenceEGI organization schema (reusable)
 */
export function createOrganizationSchema(): OrganizationSchema {
  return {
    '@type': 'Organization',
    name: ORG_NAME,
    url: BASE_URL,
    logo: ORG_LOGO,
    description: 'Piattaforma per la certificazione digitale di opere d\'arte con blockchain e impatto ambientale positivo',
    sameAs: [
      'https://twitter.com/florenceegi',
      'https://linkedin.com/company/florenceegi',
      'https://github.com/florenceegi',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@florenceegi.com',
      url: `${BASE_URL}/contact`,
    },
  };
}

/**
 * Creates article schema for documentation pages
 */
export function createArticleSchema(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  type?: 'Article' | 'TechArticle';
}): ArticleSchema {
  return {
    '@type': params.type || 'TechArticle',
    headline: params.title,
    description: params.description,
    image: params.image || ORG_LOGO,
    author: createOrganizationSchema(),
    publisher: createOrganizationSchema(),
    datePublished: params.datePublished || new Date().toISOString(),
    dateModified: params.dateModified || new Date().toISOString(),
    mainEntityOfPage: `${BASE_URL}${params.slug}`,
  };
}

/**
 * Creates FAQ schema for FAQ sections
 */
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Creates HowTo schema for step-by-step guides
 */
export function createHowToSchema(params: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;
}): HowToSchema {
  return {
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    totalTime: params.totalTime,
    step: params.steps.map((step, index) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      url: `${BASE_URL}#step-${index + 1}`,
      image: step.image,
    })),
  };
}

/**
 * Creates breadcrumb schema for navigation
 */
export function createBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): BreadcrumbSchema {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${BASE_URL}${item.url}` : undefined,
    })),
  };
}

/**
 * Creates SoftwareApplication schema for the platform
 */
export function createSoftwareSchema(): SoftwareApplicationSchema {
  return {
    '@type': 'SoftwareApplication',
    name: ORG_NAME,
    description: 'Piattaforma SaaS per la certificazione digitale di opere d\'arte con blockchain Algorand e contributo ambientale automatico',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
  };
}

/**
 * Creates WebPage schema with all nested data
 */
export function createWebPageSchema(params: {
  name: string;
  description: string;
  slug: string;
  breadcrumbs?: Array<{ name: string; url?: string }>;
  mainEntity?: ArticleSchema | ProductSchema | FAQSchema;
}): WebPageSchema {
  return {
    '@type': 'WebPage',
    name: params.name,
    description: params.description,
    url: `${BASE_URL}${params.slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: ORG_NAME,
      url: BASE_URL,
    },
    breadcrumb: params.breadcrumbs
      ? createBreadcrumbSchema(params.breadcrumbs)
      : undefined,
    mainEntity: params.mainEntity,
  };
}

export default JsonLd;

/**
 * Open Graph & Twitter Card Meta Tags
 * 
 * Gestisce meta tags per social sharing ottimale su:
 * - Facebook, LinkedIn (Open Graph)
 * - Twitter/X (Twitter Cards)
 * - WhatsApp, Telegram, Discord
 * 
 * @see https://ogp.me/
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards
 */

import { useEffect } from 'react';

// ============================================
// TYPES
// ============================================

export interface OpenGraphMeta {
  // Required OG tags
  title: string;
  description: string;
  url: string;
  
  // Recommended
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  
  // Optional
  type?: 'website' | 'article' | 'product' | 'profile';
  siteName?: string;
  locale?: string;
  
  // Article specific
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

export interface TwitterMeta {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;    // @username of website
  creator?: string; // @username of content creator
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export interface SeoMeta extends OpenGraphMeta {
  // Basic SEO
  canonical?: string;
  robots?: string;
  keywords?: string[];
  
  // Twitter overrides (if different from OG)
  twitter?: Partial<TwitterMeta>;
  
  // Additional
  author?: string;
  themeColor?: string;
}

// ============================================
// CONSTANTS
// ============================================

const BASE_URL = 'https://florenceegi.com';
const SITE_NAME = 'FlorenceEGI';
const DEFAULT_IMAGE = `${BASE_URL}/images/og-default.jpg`;
const DEFAULT_LOCALE = 'it_IT';
const TWITTER_SITE = '@florenceegi';

// ============================================
// HELPER FUNCTIONS
// ============================================

function setMetaTag(property: string, content: string, isName = false): void {
  if (!content) return;
  
  const attributeName = isName ? 'name' : 'property';
  let element = document.querySelector(`meta[${attributeName}="${property}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attributeName, property);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

function setLinkTag(rel: string, href: string): void {
  if (!href) return;
  
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (element) {
    element.setAttribute('href', href);
  } else {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('href', href);
    document.head.appendChild(element);
  }
}

// ============================================
// COMPONENT
// ============================================

interface SeoHeadProps {
  meta: SeoMeta;
}

/**
 * Sets all SEO meta tags in document head
 * 
 * Usage:
 * ```tsx
 * <SeoHead meta={{
 *   title: 'Cos\'è un EGI?',
 *   description: 'Scopri il certificato digitale che unisce arte e ambiente',
 *   url: '/info/egi',
 *   image: '/images/egi-hero.jpg',
 *   type: 'article',
 * }} />
 * ```
 */
export function SeoHead({ meta }: SeoHeadProps) {
  useEffect(() => {
    // ===== Basic SEO =====
    document.title = meta.title ? `${meta.title} | ${SITE_NAME}` : SITE_NAME;
    
    setMetaTag('description', meta.description, true);
    setMetaTag('author', meta.author || SITE_NAME, true);
    setMetaTag('robots', meta.robots || 'index, follow', true);
    
    if (meta.keywords?.length) {
      setMetaTag('keywords', meta.keywords.join(', '), true);
    }
    
    // Theme color for mobile browsers
    setMetaTag('theme-color', meta.themeColor || '#8B4513', true);
    
    // Canonical URL
    setLinkTag('canonical', meta.canonical || `${BASE_URL}${meta.url}`);
    
    // ===== Open Graph =====
    setMetaTag('og:title', meta.title);
    setMetaTag('og:description', meta.description);
    setMetaTag('og:url', `${BASE_URL}${meta.url}`);
    setMetaTag('og:type', meta.type || 'website');
    setMetaTag('og:site_name', meta.siteName || SITE_NAME);
    setMetaTag('og:locale', meta.locale || DEFAULT_LOCALE);
    
    // OG Image
    const ogImage = meta.image || DEFAULT_IMAGE;
    setMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);
    setMetaTag('og:image:alt', meta.imageAlt || meta.title);
    if (meta.imageWidth) setMetaTag('og:image:width', meta.imageWidth);
    if (meta.imageHeight) setMetaTag('og:image:height', meta.imageHeight);
    
    // Article specific OG tags
    if (meta.type === 'article') {
      if (meta.articlePublishedTime) {
        setMetaTag('article:published_time', meta.articlePublishedTime);
      }
      if (meta.articleModifiedTime) {
        setMetaTag('article:modified_time', meta.articleModifiedTime);
      }
      if (meta.articleAuthor) {
        setMetaTag('article:author', meta.articleAuthor);
      }
      if (meta.articleSection) {
        setMetaTag('article:section', meta.articleSection);
      }
      if (meta.articleTags?.length) {
        meta.articleTags.forEach(tag => {
          setMetaTag('article:tag', tag);
        });
      }
    }
    
    // ===== Twitter Cards =====
    const twitter = meta.twitter || {};
    setMetaTag('twitter:card', twitter.card || 'summary_large_image', true);
    setMetaTag('twitter:site', twitter.site || TWITTER_SITE, true);
    if (twitter.creator) {
      setMetaTag('twitter:creator', twitter.creator, true);
    }
    setMetaTag('twitter:title', twitter.title || meta.title, true);
    setMetaTag('twitter:description', twitter.description || meta.description, true);
    
    const twitterImage = twitter.image || meta.image || DEFAULT_IMAGE;
    setMetaTag('twitter:image', twitterImage.startsWith('http') ? twitterImage : `${BASE_URL}${twitterImage}`, true);
    setMetaTag('twitter:image:alt', twitter.imageAlt || meta.imageAlt || meta.title, true);
    
  }, [meta]);
  
  return null;
}

// ============================================
// PRESETS
// ============================================

/**
 * Creates SEO meta for EGI info page
 */
export function createEgiSeoMeta(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}): SeoMeta {
  return {
    title: params.title,
    description: params.description,
    url: `/info${params.slug}`,
    type: 'article',
    image: params.image || '/images/egi-certificate.jpg',
    articleSection: 'EGI Documentation',
    articleTags: ['EGI', 'NFT', 'Blockchain', 'Arte Digitale', 'Certificato Autenticità'],
    keywords: [
      'EGI', 'Environment Goods Invent', 'certificato digitale', 'NFT arte',
      'blockchain Algorand', 'arte sostenibile', 'FlorenceEGI',
    ],
  };
}

/**
 * Creates SEO meta for EPP info page
 */
export function createEppSeoMeta(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}): SeoMeta {
  return {
    title: params.title,
    description: params.description,
    url: `/info${params.slug}`,
    type: 'article',
    image: params.image || '/images/epp-environment.jpg',
    articleSection: 'Environmental Programs',
    articleTags: ['EPP', 'Ambiente', 'Sostenibilità', 'Riforestazione', 'Plastica', 'Api'],
    keywords: [
      'EPP', 'Environmental Protection Projects', 'progetti ambientali',
      'riforestazione', 'riciclo plastica', 'protezione api', 'arte sostenibile',
    ],
  };
}

/**
 * Creates SEO meta for Florence platform page
 */
export function createFlorenceSeoMeta(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}): SeoMeta {
  return {
    title: params.title,
    description: params.description,
    url: `/info${params.slug}`,
    type: 'article',
    image: params.image || '/images/florence-platform.jpg',
    articleSection: 'Platform',
    articleTags: ['FlorenceEGI', 'SaaS', 'Marketplace', 'Arte', 'Blockchain'],
    keywords: [
      'FlorenceEGI', 'piattaforma arte', 'marketplace NFT', 'SaaS arte',
      'gestione collezioni', 'vendita arte online', 'blockchain arte',
    ],
  };
}

export default SeoHead;

/**
 * SEO Component - Schema.org JSON-LD, Open Graph, Twitter Cards
 * 
 * Gestisce tutti i meta tag SEO per le pagine FlorenceEGI
 * Compatibile con React 19 (usa useEffect per manipolare head)
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE_BASE_URL, BRAND_BASE_URL } from '../../config/site';

export interface SEOProps {
  // Basic Meta
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  lang?: string;
  
  // Open Graph
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  ogImageAlt?: string;
  ogSiteName?: string;
  
  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
  
  // Schema.org
  schemaType?: 'WebPage' | 'Organization' | 'Product' | 'Article' | 'FAQPage';
  schemaData?: Record<string, unknown>;
  
  // Additional
  noIndex?: boolean;
  noFollow?: boolean;
}

const DEFAULT_SEO: SEOProps = {
  title: 'FlorenceEGI - Il Primo Asset Market Maker Sostenibile',
  description: 'Trasforma qualsiasi asset in un EGI tokenizzato su blockchain Algorand. 20% automatico a progetti ambientali. Zero gas fee, royalty perpetue.',
  keywords: ['EGI', 'blockchain', 'Algorand', 'NFT', 'sostenibilità', 'EPP', 'asset digitali', 'tokenizzazione', 'arte digitale', 'FlorenceEGI'],
  ogType: 'website',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'FlorenceEGI - Asset Market Maker Sostenibile',
  ogSiteName: 'FlorenceEGI',
  twitterCard: 'summary_large_image',
  twitterSite: '@FlorenceEGI',
  schemaType: 'WebPage',
  lang: 'it'
};

/**
 * Genera il JSON-LD Schema.org
 */
function generateSchema(type: string, props: SEOProps): object {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        name: 'FlorenceEGI',
        url: BRAND_BASE_URL,
        logo: `${BRAND_BASE_URL}/logo.png`,
        description: props.description || DEFAULT_SEO.description,
        foundingDate: '2024',
        founders: [{ '@type': 'Person', name: 'Fabio Mele' }],
        sameAs: [
          'https://twitter.com/FlorenceEGI',
          'https://linkedin.com/company/florenceegi',
          'https://github.com/FlorenceEGI'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'info@florenceegi.com',
          availableLanguage: ['Italian', 'English']
        },
        areaServed: 'Worldwide',
        slogan: 'Se Esiste, EGIZZALO. Se lo EGIZZI, Vale.'
      };

    case 'WebPage':
      return {
        ...baseSchema,
        name: props.title || DEFAULT_SEO.title,
        description: props.description || DEFAULT_SEO.description,
        url: props.canonical || SITE_BASE_URL,
        inLanguage: props.lang || 'it',
        isPartOf: {
          '@type': 'WebSite',
          name: 'FlorenceEGI',
          url: SITE_BASE_URL
        },
        publisher: {
          '@type': 'Organization',
          name: 'FlorenceEGI',
          url: BRAND_BASE_URL
        }
      };

    case 'Product':
      return {
        ...baseSchema,
        name: props.title || 'EGI - Environment Goods Invent',
        description: props.description || DEFAULT_SEO.description,
        brand: {
          '@type': 'Brand',
          name: 'FlorenceEGI'
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'FlorenceEGI'
          }
        },
        ...(props.schemaData || {})
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: props.schemaData?.faqItems || []
      };

    case 'Article':
      return {
        ...baseSchema,
        headline: props.title,
        description: props.description,
        image: props.ogImage ? `${SITE_BASE_URL}${props.ogImage}` : undefined,
        author: {
          '@type': 'Organization',
          name: 'FlorenceEGI'
        },
        publisher: {
          '@type': 'Organization',
          name: 'FlorenceEGI',
          logo: {
            '@type': 'ImageObject',
            url: `${BRAND_BASE_URL}/logo.png`
          }
        },
        ...(props.schemaData || {})
      };

    default:
      return baseSchema;
  }
}

/**
 * Crea o aggiorna un meta tag
 */
function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let meta = document.querySelector(`meta[${attr}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
}

/**
 * Crea o aggiorna un link tag
 */
function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang 
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let link = document.querySelector(selector) as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  
  link.href = href;
}

/**
 * SEO Component
 */
export const SEO: React.FC<SEOProps> = (props) => {
  const { i18n } = useTranslation();
  
  const mergedProps = { ...DEFAULT_SEO, ...props };
  const {
    title,
    description,
    keywords,
    canonical,
    ogType,
    ogImage,
    ogImageAlt,
    ogSiteName,
    twitterCard,
    twitterSite,
    twitterCreator,
    schemaType,
    noIndex,
    noFollow,
  } = mergedProps;

  const lang = mergedProps.lang || i18n.language || 'it';
  const fullCanonical = canonical?.startsWith('http') ? canonical : `${SITE_BASE_URL}${canonical || ''}`;
  const fullImage = ogImage?.startsWith('http') ? ogImage : `${SITE_BASE_URL}${ogImage}`;

  useEffect(() => {
    // Title
    document.title = title || DEFAULT_SEO.title!;
    
    // HTML lang
    document.documentElement.lang = lang;

    // Basic Meta
    setMeta('description', description || DEFAULT_SEO.description!);
    if (keywords?.length) {
      setMeta('keywords', keywords.join(', '));
    }
    
    // Robots
    const robotsContent = [
      noIndex ? 'noindex' : 'index',
      noFollow ? 'nofollow' : 'follow'
    ].join(', ');
    setMeta('robots', robotsContent);

    // Open Graph
    setMeta('og:type', ogType!, true);
    setMeta('og:title', title!, true);
    setMeta('og:description', description!, true);
    setMeta('og:url', fullCanonical, true);
    setMeta('og:site_name', ogSiteName!, true);
    setMeta('og:locale', lang === 'it' ? 'it_IT' : 'en_US', true);
    if (fullImage) {
      setMeta('og:image', fullImage, true);
      setMeta('og:image:alt', ogImageAlt || title!, true);
      setMeta('og:image:width', '1200', true);
      setMeta('og:image:height', '630', true);
    }

    // Twitter Card
    setMeta('twitter:card', twitterCard!);
    setMeta('twitter:title', title!);
    setMeta('twitter:description', description!);
    if (twitterSite) setMeta('twitter:site', twitterSite);
    if (twitterCreator) setMeta('twitter:creator', twitterCreator);
    if (fullImage) setMeta('twitter:image', fullImage);

    // Canonical & Alternate Languages
    setLink('canonical', fullCanonical);
    setLink('alternate', `${SITE_BASE_URL}/it${canonical || ''}`, 'it');
    setLink('alternate', `${SITE_BASE_URL}/en${canonical || ''}`, 'en');
    setLink('alternate', fullCanonical, 'x-default');

    // Schema.org JSON-LD
    let script = document.querySelector('script[data-seo-schema]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'true');
      document.head.appendChild(script);
    }
    
    // Generate multiple schemas (Organization + Page specific)
    const schemas = [
      generateSchema('Organization', mergedProps),
      generateSchema(schemaType || 'WebPage', mergedProps)
    ];
    script.textContent = JSON.stringify(schemas);

    // Cleanup function
    return () => {
      // Optional: cleanup on unmount if needed
    };
  }, [title, description, keywords, canonical, ogType, ogImage, ogImageAlt, ogSiteName, 
      twitterCard, twitterSite, twitterCreator, schemaType, noIndex, noFollow, lang, 
      fullCanonical, fullImage, mergedProps]);

  return null; // This component doesn't render anything
};

/**
 * Pre-configured SEO for specific page types
 */
export const FlorenceHomeSEO: React.FC = () => (
  <SEO
    title="FlorenceEGI - Il Primo Asset Market Maker Sostenibile"
    description="Trasforma qualsiasi asset in un EGI tokenizzato su blockchain Algorand. 20% automatico a progetti ambientali EPP. Zero gas fee per i creator, royalty 4.5% perpetue."
    keywords={['EGI', 'NFT sostenibile', 'blockchain Algorand', 'asset digitali', 'tokenizzazione', 'EPP', 'progetti ambientali', 'arte digitale', 'royalty perpetue', 'FlorenceEGI']}
    schemaType="Organization"
  />
);

export const FlorenceInfoSEO: React.FC<{ section?: string }> = ({ section }) => {
  const sectionMeta: Record<string, { title: string; description: string }> = {
    intro: {
      title: 'FlorenceEGI - Non Siamo un Marketplace NFT',
      description: 'Scopri perché FlorenceEGI è diverso: Asset Market Maker, fee dinamiche dal 10% al 5%, royalty 4.5% garantite, 20% a progetti ambientali.'
    },
    'how-it-works': {
      title: 'Come Funziona FlorenceEGI - Da File a EGI in 3 Step',
      description: 'Crea Collection, Egizza i tuoi asset, vendi con royalty perpetue. Tutto in meno di 5 secondi, zero gas fee, 20% automatico a EPP.'
    },
    impact: {
      title: 'Impatto Ambientale FlorenceEGI - 20% a Progetti EPP',
      description: 'Ogni vendita su FlorenceEGI genera impatto ambientale reale. 20% automatico a progetti EPP verificati: riforestazione, pulizia oceani, biodiversità.'
    },
    problems: {
      title: 'I 12 Problemi che FlorenceEGI Risolve',
      description: 'Fee eccessive, royalty aggirabili, complessità tecnica, zero impatto ambientale. FlorenceEGI risolve tutti i problemi dei marketplace NFT tradizionali.'
    },
    motto: {
      title: 'Se Esiste, EGIZZALO - Il Motto di FlorenceEGI',
      description: 'EGIZZARE significa trasformare qualsiasi asset in un EGI certificato su blockchain. Qualsiasi cosa esista può acquisire valore verificabile.'
    }
  };

  const meta = section ? sectionMeta[section] : sectionMeta.intro;
  
  return (
    <SEO
      title={meta?.title || 'FlorenceEGI Info'}
      description={meta?.description || 'Scopri FlorenceEGI, il primo Asset Market Maker sostenibile.'}
      canonical={section ? `/info/florence/${section}` : '/info/florence'}
      schemaType="WebPage"
    />
  );
};

export default SEO;

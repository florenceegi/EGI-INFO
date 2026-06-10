/**
 * @package  config
 * @author   Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version  1.0.0 (EGI-INFO)
 * @date     2026-06-10
 * @purpose  Single source of truth per gli URL base del sito (M-FUC-022 B2).
 *           Distingue l'identità della PAGINA (canonical/og:url/JSON-LD WebPage,
 *           dominio di deploy info.florenceegi.com) dall'ENTITÀ brand
 *           (Organization/publisher, dominio madre florenceegi.com).
 *           Mai hardcodare questi domini altrove nei meta SEO.
 */

/**
 * Dominio su cui il sito è effettivamente servito.
 * Da usare per: canonical, og:url, hreflang alternate, og:image relativi,
 * JSON-LD WebPage/Article/Breadcrumb/HowTo url (identità della pagina).
 */
export const SITE_BASE_URL = 'https://info.florenceegi.com';

/**
 * Dominio del brand FlorenceEGI (entità madre dell'ecosistema).
 * Da usare SOLO per: JSON-LD Organization/publisher (l'organizzazione
 * resta florenceegi.com anche quando la pagina vive su info.).
 */
export const BRAND_BASE_URL = 'https://florenceegi.com';

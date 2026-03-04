/**
 * Pagina Indice Mattoncini FlorenceEGI
 * 
 * Rotta: /info/florence/index
 * 
 * Dashboard professionale per navigare tutti i 43 mattoncini.
 * Utile per:
 * - Test e sviluppo
 * - Navigazione rapida
 * - Monitoraggio progresso
 */

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getUsedInPages, type MattonciniSlug } from '@/config/assemblies';
import { PAGES } from '@/config/pages';
import { Link } from 'react-router-dom';

// ============================================================================
// TYPES
// ============================================================================

type MattoninoStatus = 'ready' | 'pending' | 'partial';

interface Mattoncino {
  id: number;
  name: string;
  /** slug kebab-case per routing interno */
  slug: string;
  /** Slug PascalCase corrispondente in assemblies.ts — usato per derivare usedIn */
  assemblySlug: MattonciniSlug;
  category: string;
  status: MattoninoStatus;
  jsonKey: string;
}

// ============================================================================
// DATA - Lista completa 43 mattoncini
// ============================================================================

const MATTONCINI: Mattoncino[] = [
  // HERO & INTRO (1-4)
  { id: 1, name: 'Il Motto', slug: 'motto', assemblySlug: 'Motto', category: 'Hero & Intro', status: 'ready', jsonKey: 'hero.motto' },
  { id: 2, name: "Cos'è FlorenceEGI", slug: 'what-we-do', assemblySlug: 'WhatWeDo', category: 'Hero & Intro', status: 'ready', jsonKey: 'hero.whatWeDo' },
  { id: 3, name: 'Impatto Ambientale', slug: 'impact', assemblySlug: 'Impact', category: 'Hero & Intro', status: 'ready', jsonKey: 'hero.howSimple' },
  { id: 4, name: 'Non Siamo un Marketplace', slug: 'intro', assemblySlug: 'Intro', category: 'Hero & Intro', status: 'ready', jsonKey: 'intro' },

  // PROBLEMI (5-16)
  { id: 5, name: 'Problema 1: Commissioni', slug: 'problem-1', assemblySlug: 'Problem1', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[0]' },
  { id: 6, name: 'Problema 2: Autenticità', slug: 'problem-2', assemblySlug: 'Problem2', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[1]' },
  { id: 7, name: 'Problema 3: Wallet', slug: 'problem-3', assemblySlug: 'Problem3', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[2]' },
  { id: 8, name: 'Problema 4: Speculazione', slug: 'problem-4', assemblySlug: 'Problem4', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[3]' },
  { id: 9, name: 'Problema 5: Furto', slug: 'problem-5', assemblySlug: 'Problem5', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[4]' },
  { id: 10, name: 'Problema 6: Royalty', slug: 'problem-6', assemblySlug: 'Problem6', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[5]' },
  { id: 11, name: 'Problema 7: GDPR', slug: 'problem-7', assemblySlug: 'Problem7', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[6]' },
  { id: 12, name: 'Problema 8: MiCA', slug: 'problem-8', assemblySlug: 'Problem8', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[7]' },
  { id: 13, name: 'Problema 9: Pagamenti', slug: 'problem-9', assemblySlug: 'Problem9', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[8]' },
  { id: 14, name: 'Problema 10: Pricing', slug: 'problem-10', assemblySlug: 'Problem10', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[9]' },
  { id: 15, name: 'Problema 11: Visibilità', slug: 'problem-11', assemblySlug: 'Problem11', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[10]' },
  { id: 16, name: 'Problema 12: Fiscale', slug: 'problem-12', assemblySlug: 'Problem12', category: 'I 12 Problemi', status: 'ready', jsonKey: 'problems.items[11]' },

  // ESEMPI (17-23)
  { id: 17, name: 'Esempi: Arte', slug: 'examples-art', assemblySlug: 'ExamplesArt', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[0]' },
  { id: 18, name: 'Esempi: Musica', slug: 'examples-music', assemblySlug: 'ExamplesMusic', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[1]' },
  { id: 19, name: 'Esempi: Libri', slug: 'examples-books', assemblySlug: 'ExamplesBooks', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[2]' },
  { id: 20, name: 'Esempi: Ambiente', slug: 'examples-eco', assemblySlug: 'ExamplesEco', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[3]' },
  { id: 21, name: 'Esempi: Sport', slug: 'examples-sport', assemblySlug: 'ExamplesSport', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[4]' },
  { id: 22, name: 'Esempi: Moda', slug: 'examples-fashion', assemblySlug: 'ExamplesFashion', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[5]' },
  { id: 23, name: 'Esempi: Heritage', slug: 'examples-heritage', assemblySlug: 'ExamplesHeritage', category: 'Esempi per Settore', status: 'ready', jsonKey: 'examples.tabs[6]' },

  // HOW IT WORKS CLASSIC (24-26)
  { id: 24, name: 'Come Funziona: Step 1', slug: 'how-1', assemblySlug: 'HowItWorks1', category: 'Come Funziona', status: 'ready', jsonKey: 'howItWorks.steps[0]' },
  { id: 25, name: 'Come Funziona: Step 2', slug: 'how-2', assemblySlug: 'HowItWorks2', category: 'Come Funziona', status: 'ready', jsonKey: 'howItWorks.steps[1]' },
  { id: 26, name: 'Come Funziona: Step 3', slug: 'how-3', assemblySlug: 'HowItWorks3', category: 'Come Funziona', status: 'ready', jsonKey: 'howItWorks.steps[2]' },

  // AMMK (27-29)
  { id: 27, name: 'AMMk: Chi lo Usa', slug: 'ammk-users', assemblySlug: 'AMMkUsers', category: 'AMMk Platform', status: 'ready', jsonKey: 'ammk.users' },
  { id: 28, name: 'AMMk: 5 Engine', slug: 'ammk-engines', assemblySlug: 'AMMkEngines', category: 'AMMk Platform', status: 'ready', jsonKey: 'ammk.engines' },
  { id: 29, name: 'AMMk: Personalizzazione', slug: 'ammk-custom', assemblySlug: 'AMMkCustom', category: 'AMMk Platform', status: 'ready', jsonKey: 'ammk.customization' },

  // TECHNOLOGY (30-32)
  { id: 30, name: 'Tech: Cosa Vedi Tu', slug: 'tech-user', assemblySlug: 'TechUser', category: 'Technology', status: 'ready', jsonKey: 'technology.userFeatures' },
  { id: 31, name: 'Tech: Cosa Fa il Sistema', slug: 'tech-system', assemblySlug: 'TechSystem', category: 'Technology', status: 'ready', jsonKey: 'technology.systemFeatures' },
  { id: 32, name: 'Tech: Performance', slug: 'tech-performance', assemblySlug: 'TechPerformance', category: 'Technology', status: 'ready', jsonKey: 'technology.performance' },

  // CORE INFO (33-37)
  { id: 33, name: '4 Livelli Pagamento', slug: 'payments', assemblySlug: 'Payments', category: 'Core Info', status: 'ready', jsonKey: 'payments.levels' },
  { id: 34, name: 'Compliance 4 Pilastri', slug: 'compliance', assemblySlug: 'Compliance', category: 'Core Info', status: 'ready', jsonKey: 'compliance.items' },
  { id: 35, name: '4 Ruoli Ecosystem', slug: 'ecosystem', assemblySlug: 'Ecosystem', category: 'Core Info', status: 'ready', jsonKey: 'ecosystem.roles' },
  { id: 36, name: 'NATAN AI', slug: 'natan', assemblySlug: 'NATAN', category: 'Core Info', status: 'ready', jsonKey: 'natan' },
  { id: 37, name: 'Governance Duale', slug: 'governance', assemblySlug: 'Governance', category: 'Core Info', status: 'ready', jsonKey: 'governance' },

  // PRICING (38-39)
  { id: 38, name: 'Fee: Mercato Primario', slug: 'pricing-primary', assemblySlug: 'PricingPrimary', category: 'Pricing', status: 'ready', jsonKey: 'pricing.distribution' },
  { id: 39, name: 'Fee: Mercato Secondario', slug: 'pricing-secondary', assemblySlug: 'PricingSecondary', category: 'Pricing', status: 'ready', jsonKey: 'pricing.secondary' },

  // CLOSING (40-43)
  { id: 40, name: 'Case Studies', slug: 'cases', assemblySlug: 'Cases', category: 'Closing', status: 'ready', jsonKey: 'cases.items' },
  { id: 41, name: 'Roadmap', slug: 'roadmap', assemblySlug: 'Roadmap', category: 'Closing', status: 'ready', jsonKey: 'roadmap.items' },
  { id: 42, name: 'FAQ', slug: 'faq', assemblySlug: 'FAQ', category: 'Closing', status: 'ready', jsonKey: 'faq.items' },
  { id: 43, name: 'CTA Finale', slug: 'cta-final', assemblySlug: 'CTAFinal', category: 'Closing', status: 'ready', jsonKey: 'ctaFinal' },

  // PAGAMENTI DETTAGLIO (44-50)
  { id: 44, name: 'Filosofia Inclusione', slug: 'payment-philosophy', assemblySlug: 'PaymentPhilosophy', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'paymentPhilosophy' },
  { id: 45, name: 'Ruolo Piattaforma', slug: 'payment-platform', assemblySlug: 'PaymentPlatformRole', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'paymentPlatformRole' },
  { id: 46, name: 'Livello 1: Zero Crypto', slug: 'payment-level-1', assemblySlug: 'PaymentLevel1', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'paymentLevel1' },
  { id: 47, name: 'Livello 2: Ho un Wallet', slug: 'payment-level-2', assemblySlug: 'PaymentLevel2', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'paymentLevel2' },
  { id: 48, name: 'Livello 3: Accetto Crypto', slug: 'payment-level-3', assemblySlug: 'PaymentLevel3', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'paymentLevel3' },
  { id: 49, name: 'Livello 4: EGILI Token', slug: 'payment-level-4', assemblySlug: 'PaymentLevel4', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'paymentLevel4' },
  { id: 50, name: 'Riscatto Wallet', slug: 'wallet-redemption', assemblySlug: 'WalletRedemption', category: 'Pagamenti Dettaglio', status: 'ready', jsonKey: 'walletRedemption' },

  // HOW PROTOCOL (51-57)
  { id: 51, name: 'How: Hero', slug: 'how-hero', assemblySlug: 'HowHero', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.hero' },
  { id: 52, name: 'How: Il Protocollo', slug: 'how-protocol', assemblySlug: 'HowProtocol', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.protocol' },
  { id: 53, name: 'ManipulatorCard ⭐', slug: 'how-manipulator', assemblySlug: 'ManipulatorCard', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.art|natan|pt' },
  { id: 54, name: 'How: Manipolatori', slug: 'how-manipulators', assemblySlug: 'HowManipulators', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.manipulators' },
  { id: 55, name: 'How: Filo Rosso', slug: 'how-thread', assemblySlug: 'HowThread', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.thread' },
  { id: 56, name: 'How: Futuri', slug: 'how-future', assemblySlug: 'HowFuture', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.future' },
  { id: 57, name: 'How: CTA', slug: 'how-cta', assemblySlug: 'HowCTA', category: 'Protocollo EGI', status: 'ready', jsonKey: 'how.cta' },
];

// ============================================================================
// CATEGORIES
// ============================================================================

const CATEGORIES = [
  'Tutti',
  'Hero & Intro',
  'I 12 Problemi',
  'Esempi per Settore',
  'Come Funziona',
  'AMMk Platform',
  'Technology',
  'Core Info',
  'Pagamenti Dettaglio',
  'Pricing',
  'Closing',
  'Protocollo EGI',
];

/** Colori e label derivati dinamicamente da pages.ts — zero hardcoding */
const TAG_COLORS: Record<string, { bg: string; text: string }> = Object.fromEntries(
  PAGES.map((p) => [
    p.id,
    {
      bg: p.badgeColor + '33', // 20% opacity hex
      text: p.badgeColor,
    },
  ])
);

const TAG_LABELS: Record<string, string> = Object.fromEntries(
  PAGES.map((p) => [p.id, '#' + p.id.replace('-', '')])
);

// ============================================================================
// COMPONENT
// ============================================================================

const MattonciniIndexPage: React.FC = () => {
  const { t } = useTranslation('florence');
  const [activeCategory, setActiveCategory] = useState('Tutti');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats
  const stats = useMemo(() => {
    const ready = MATTONCINI.filter(m => m.status === 'ready').length;
    const partial = MATTONCINI.filter(m => m.status === 'partial').length;
    const pending = MATTONCINI.filter(m => m.status === 'pending').length;
    return { ready, partial, pending, total: MATTONCINI.length };
  }, []);

  // Filtered mattoncini
  const filteredMattoncini = useMemo(() => {
    return MATTONCINI.filter(m => {
      const matchCategory = activeCategory === 'Tutti' || m.category === activeCategory;
      const matchSearch = searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.slug.includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Group by category for display
  const groupedMattoncini = useMemo(() => {
    const groups: Record<string, Mattoncino[]> = {};
    filteredMattoncini.forEach(m => {
      if (!groups[m.category]) groups[m.category] = [];
      groups[m.category].push(m);
    });
    return groups;
  }, [filteredMattoncini]);

  return (
    <div className="mattoncini-index">
      {/* Header */}
      <header className="mattoncini-index__header">
        <div className="mattoncini-index__header-content">
          <h1>📦 Mattoncini FlorenceEGI</h1>
          <p className="mattoncini-index__subtitle">
            Dashboard navigazione • {stats.total} componenti totali
          </p>
        </div>

        {/* Progress Stats */}
        <div className="mattoncini-index__stats">
          <div className="mattoncini-index__stat mattoncini-index__stat--ready">
            <span className="mattoncini-index__stat-value">{stats.ready}</span>
            <span className="mattoncini-index__stat-label">Pronti</span>
          </div>
          <div className="mattoncini-index__stat mattoncini-index__stat--partial">
            <span className="mattoncini-index__stat-value">{stats.partial}</span>
            <span className="mattoncini-index__stat-label">Parziali</span>
          </div>
          <div className="mattoncini-index__stat mattoncini-index__stat--pending">
            <span className="mattoncini-index__stat-value">{stats.pending}</span>
            <span className="mattoncini-index__stat-label">Da fare</span>
          </div>
          <div className="mattoncini-index__stat mattoncini-index__stat--progress">
            <span className="mattoncini-index__stat-value">
              {Math.round((stats.ready / stats.total) * 100)}%
            </span>
            <span className="mattoncini-index__stat-label">Completo</span>
          </div>
        </div>
      </header>

      <div className="mattoncini-index__layout">
        {/* Sidebar */}
        <aside className="mattoncini-index__sidebar">
          {/* Home Link */}
          <div className="mattoncini-index__home">
            <Link to="/" className="mattoncini-index__home-link">
              🏠 Home
            </Link>
          </div>

          {/* Search */}
          <div className="mattoncini-index__search">
            <input
              type="text"
              placeholder="🔍 Cerca mattoncino..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mattoncini-index__search-input"
            />
          </div>

          {/* Category Filter */}
          <nav className="mattoncini-index__categories">
            <h3>Categorie</h3>
            <ul>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    className={`mattoncini-index__category-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                    <span className="mattoncini-index__category-count">
                      {cat === 'Tutti'
                        ? MATTONCINI.length
                        : MATTONCINI.filter(m => m.category === cat).length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Stats by Status */}
          <div className="mattoncini-index__legend">
            <h3>Legenda</h3>
            <div className="mattoncini-index__legend-item">
              <span className="mattoncini-index__status-dot mattoncini-index__status-dot--ready"></span>
              <span>Pronto (route attiva)</span>
            </div>
            <div className="mattoncini-index__legend-item">
              <span className="mattoncini-index__status-dot mattoncini-index__status-dot--partial"></span>
              <span>Parziale (file esiste)</span>
            </div>
            <div className="mattoncini-index__legend-item">
              <span className="mattoncini-index__status-dot mattoncini-index__status-dot--pending"></span>
              <span>Da creare</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="mattoncini-index__main">
          {Object.entries(groupedMattoncini).map(([category, items]) => (
            <section key={category} className="mattoncini-index__section">
              <h2 className="mattoncini-index__section-title">{category}</h2>
              <div className="mattoncini-index__grid">
                {items.map(m => (
                  <MattoninoCard key={m.id} mattoncino={m} />
                ))}
              </div>
            </section>
          ))}

          {filteredMattoncini.length === 0 && (
            <div className="mattoncini-index__empty">
              <p>Nessun mattoncino trovato per "{searchQuery}"</p>
            </div>
          )}
        </main>
      </div>

      {/* Styles */}
      <style>{`
        .mattoncini-index {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
          color: #e0e0e0;
        }

        /* Header */
        .mattoncini-index__header {
          background: rgba(212, 175, 55, 0.1);
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .mattoncini-index__header h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #d4af37;
          margin: 0;
        }

        .mattoncini-index__subtitle {
          color: #888;
          margin: 0.25rem 0 0 0;
          font-size: 0.9rem;
        }

        .mattoncini-index__stats {
          display: flex;
          gap: 1rem;
        }

        .mattoncini-index__stat {
          text-align: center;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mattoncini-index__stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .mattoncini-index__stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0.7;
        }

        .mattoncini-index__stat--ready .mattoncini-index__stat-value { color: #4ade80; }
        .mattoncini-index__stat--partial .mattoncini-index__stat-value { color: #facc15; }
        .mattoncini-index__stat--pending .mattoncini-index__stat-value { color: #f87171; }
        .mattoncini-index__stat--progress .mattoncini-index__stat-value { color: #60a5fa; }

        /* Layout */
        .mattoncini-index__layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: calc(100vh - 140px);
        }

        /* Sidebar */
        .mattoncini-index__sidebar {
          background: rgba(0, 0, 0, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          position: sticky;
          top: 0;
          height: calc(100vh - 140px);
          overflow-y: auto;
        }

        .mattoncini-index__search {
          margin-bottom: 1.5rem;
        }

        .mattoncini-index__home {
          margin-bottom: 1.5rem;
        }

        .mattoncini-index__home-link {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          color: #d4af37;
          text-decoration: none;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s;
        }

        .mattoncini-index__home-link:hover {
          background: rgba(212, 175, 55, 0.25);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .mattoncini-index__search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 0.9rem;
        }

        .mattoncini-index__search-input:focus {
          outline: none;
          border-color: #d4af37;
        }

        .mattoncini-index__categories h3,
        .mattoncini-index__legend h3 {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
          margin: 0 0 0.75rem 0;
        }

        .mattoncini-index__categories ul {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }

        .mattoncini-index__category-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.75rem;
          border: none;
          background: transparent;
          color: #ccc;
          font-size: 0.9rem;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          text-align: left;
        }

        .mattoncini-index__category-btn:hover {
          background: rgba(212, 175, 55, 0.1);
          color: #fff;
        }

        .mattoncini-index__category-btn.active {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          font-weight: 600;
        }

        .mattoncini-index__category-count {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
          font-size: 0.75rem;
        }

        .mattoncini-index__legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #aaa;
        }

        .mattoncini-index__status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .mattoncini-index__status-dot--ready { background: #4ade80; }
        .mattoncini-index__status-dot--partial { background: #facc15; }
        .mattoncini-index__status-dot--pending { background: #f87171; }

        /* Main */
        .mattoncini-index__main {
          padding: 2rem;
          overflow-y: auto;
        }

        .mattoncini-index__section {
          margin-bottom: 2.5rem;
        }

        .mattoncini-index__section-title {
          font-size: 1.1rem;
          color: #d4af37;
          margin: 0 0 1rem 0;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
        }

        .mattoncini-index__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }

        .mattoncini-index__empty {
          text-align: center;
          padding: 3rem;
          color: #666;
        }

        /* Card */
        .mattoncino-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 1rem;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }

        .mattoncino-card:hover {
          border-color: rgba(212, 175, 55, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .mattoncino-card--ready {
          border-left: 3px solid #4ade80;
        }

        .mattoncino-card--partial {
          border-left: 3px solid #facc15;
        }

        .mattoncino-card--pending {
          border-left: 3px solid #f87171;
          opacity: 0.6;
        }

        .mattoncino-card__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .mattoncino-card__id {
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .mattoncino-card__status {
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .mattoncino-card__status--ready {
          background: rgba(74, 222, 128, 0.2);
          color: #4ade80;
        }

        .mattoncino-card__status--partial {
          background: rgba(250, 204, 21, 0.2);
          color: #facc15;
        }

        .mattoncino-card__status--pending {
          background: rgba(248, 113, 113, 0.2);
          color: #f87171;
        }

        .mattoncino-card__name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }

        .mattoncino-card__meta {
          font-size: 0.75rem;
          color: #666;
          font-family: monospace;
          margin-bottom: 0.5rem;
        }

        .mattoncino-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 0.75rem;
        }

        .mattoncino-card__tag {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          letter-spacing: 0.02em;
        }

        .mattoncino-card__link {
          display: inline-block;
          margin-top: 0.75rem;
          padding: 0.4rem 0.75rem;
          background: rgba(212, 175, 55, 0.2);
          color: #d4af37;
          text-decoration: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .mattoncino-card__link:hover {
          background: rgba(212, 175, 55, 0.4);
        }

        .mattoncino-card__link--disabled {
          background: rgba(100, 100, 100, 0.2);
          color: #666;
          cursor: not-allowed;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .mattoncini-index__layout {
            grid-template-columns: 1fr;
          }

          .mattoncini-index__sidebar {
            position: relative;
            height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .mattoncini-index__header {
            flex-direction: column;
            align-items: flex-start;
          }

          .mattoncini-index__stats {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// MATTONCINO CARD COMPONENT
// ============================================================================

interface MattoninoCardProps {
  mattoncino: Mattoncino;
}

const MattoninoCard: React.FC<MattoninoCardProps> = ({ mattoncino }) => {
  const { id, name, slug, status, jsonKey, assemblySlug } = mattoncino;
  const usedIn = getUsedInPages(assemblySlug);
  const isClickable = status === 'ready' || status === 'partial';
  const route = `/info/florence/${slug}`;

  const statusLabel = {
    ready: '✓ Pronto',
    partial: '◐ Parziale',
    pending: '○ Da fare',
  }[status];

  return (
    <div className={`mattoncino-card mattoncino-card--${status}`}>
      <div className="mattoncino-card__header">
        <span className="mattoncino-card__id">#{id}</span>
        <span className={`mattoncino-card__status mattoncino-card__status--${status}`}>
          {statusLabel}
        </span>
      </div>

      <h4 className="mattoncino-card__name">{name}</h4>
      <div className="mattoncino-card__meta">{jsonKey}</div>

      {/* Tag pagine */}
      <div className="mattoncino-card__tags">
        {usedIn.map(page => {
          const color = TAG_COLORS[page] ?? { bg: 'rgba(255,255,255,0.1)', text: '#aaa' };
          return (
            <span
              key={page}
              className="mattoncino-card__tag"
              style={{ background: color.bg, color: color.text }}
            >
              {TAG_LABELS[page] ?? `#${page}`}
            </span>
          );
        })}
      </div>

      {isClickable ? (
        <Link to={route} className="mattoncino-card__link">
          Apri →
        </Link>
      ) : (
        <span className="mattoncino-card__link mattoncino-card__link--disabled">
          Non disponibile
        </span>
      )}
    </div>
  );
};

export default MattonciniIndexPage;

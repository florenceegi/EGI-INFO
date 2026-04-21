import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlossaryProvider } from '../context/GlossaryContext';
import { BackToTextButton } from '../components/common';
import { SkipToMain } from '../utils/seo/Aria';

/**
 * InfoPageLayout - Layout per sezione Approfondimenti
 * 
 * UX Design:
 * - Header fisso minimal con logo e back home
 * - Sidebar collapsible (hamburger su mobile)
 * - Content area con max-width per leggibilità ottimale
 * - Golden ratio proportions
 * 
 * In 3 secondi:
 * 1) Dove guardare → Contenuto centrale
 * 2) Cosa può fare → Menu laterale per navigare, link per tornare home
 * 3) Cosa è importante → Il contenuto della pagina corrente
 */

const InfoPageLayout: React.FC = () => {
  const { t } = useTranslation('info');
  const { t: tA11y } = useTranslation('a11y');
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    { path: '/', label: t('nav.home'), icon: '🏠', exact: true },
    { path: '/info/egi', label: t('nav.egi'), icon: '📜' },
    { path: '/info/epp', label: t('nav.epp'), icon: '🌱' },
    { path: '/info/platform', label: t('nav.platform'), icon: '🏛️' },
    { path: '/info/co-create', label: t('nav.coCreate'), icon: '🤝' },
    { path: '/info/disclaimer', label: t('nav.disclaimer'), icon: '⚠️' },
    { path: '/info/why-cannot-buy', label: t('nav.whyCannotBuy'), icon: '❓' },
    { path: '/info/source-truth', label: t('nav.sourceTruth'), icon: '📖' },
  ];

  const audienceItems = [
    { path: '/archetypes/artist', label: t('nav.artist'), icon: '🎨' },
    { path: '/archetypes/entrepreneur', label: t('nav.entrepreneur'), icon: '💼' },
    { path: '/archetypes/collector', label: t('nav.collector'), icon: '🖼️' },
    { path: '/archetypes/public-admin', label: t('nav.publicAdmin'), icon: '🏛️' },
  ];

  return (
    <GlossaryProvider>
      <SkipToMain targetId="main-content" label={tA11y('skip_to_content')} />
      <div className="info-layout">
        {/* Header - minimal, sempre visibile */}
        <header className="info-header">
          <div className="info-header__inner">
            {/* Menu toggle (mobile) */}
            <button
              className="info-header__menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={sidebarOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {sidebarOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="info-header__logo">
              <span className="info-header__logo-f">Florence</span>
              <span className="info-header__logo-e">EGI</span>
            </Link>

            {/* Back to home */}
            <Link to="/" className="info-header__home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </Link>
          </div>
        </header>

        {/* Main container */}
        <div className="info-container">
          {/* Sidebar */}
          <aside className={`info-sidebar ${sidebarOpen ? 'info-sidebar--open' : ''}`}>
            <nav className="info-nav">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `info-nav__item ${isActive ? 'info-nav__item--active' : ''}`
                  }
                >
                  <span className="info-nav__icon">{item.icon}</span>
                  <span className="info-nav__label">{item.label}</span>
                </NavLink>
              ))}

              {/* Separatore sezione audience */}
              <div className="info-nav__separator">
                <span className="info-nav__separator-label">Per chi è?</span>
              </div>

              {audienceItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `info-nav__item ${isActive ? 'info-nav__item--active' : ''}`
                  }
                >
                  <span className="info-nav__icon">{item.icon}</span>
                  <span className="info-nav__label">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Overlay mobile */}
          {sidebarOpen && (
            <div
              className="info-overlay"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Content */}
          <main id="main-content" role="main" tabIndex={-1} className="info-content">
            <Outlet />
          </main>
        </div>

        {/* Back to text button (glossary) */}
        <BackToTextButton />

        <style>{`
          .info-layout {
            min-height: 100vh;
            background: #0a0a0f;
            color: #ffffff;
          }

          /* Header */
          .info-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: rgba(10, 10, 15, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .info-header__inner {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .info-header__menu-btn {
            display: none;
            background: none;
            border: none;
            color: #a0a0a8;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.2s;
          }

          .info-header__menu-btn:hover {
            color: #d4af37;
            background: rgba(212, 175, 55, 0.1);
          }

          .info-header__logo {
            display: flex;
            align-items: baseline;
            gap: 4px;
            text-decoration: none;
          }

          .info-header__logo-f {
            font-size: 1rem;
            font-weight: 600;
            color: #ffffff;
          }

          .info-header__logo-e {
            font-size: 1.3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #d4af37, #f4e4bc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .info-header__home {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #808090;
            text-decoration: none;
            font-size: 0.9rem;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.2s;
          }

          .info-header__home:hover {
            color: #d4af37;
            background: rgba(212, 175, 55, 0.08);
          }

          /* Container */
          .info-container {
            display: flex;
            padding-top: 56px;
            min-height: 100vh;
          }

          /* Sidebar */
          .info-sidebar {
            position: fixed;
            top: 56px;
            left: 0;
            width: 240px;
            height: calc(100vh - 56px);
            background: rgba(12, 12, 18, 0.98);
            border-right: 1px solid rgba(255, 255, 255, 0.06);
            overflow-y: auto;
            z-index: 50;
          }

          .info-nav {
            padding: 16px 12px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .info-nav__item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            text-decoration: none;
            color: #a0a0a8;
            font-size: 0.9rem;
            transition: all 0.2s;
          }

          .info-nav__item:hover {
            background: rgba(255, 255, 255, 0.04);
            color: #ffffff;
          }

          .info-nav__item--active {
            background: rgba(212, 175, 55, 0.12);
            color: #d4af37;
            font-weight: 600;
          }

          .info-nav__icon {
            font-size: 1.1rem;
          }

          .info-nav__label {
            flex: 1;
          }

          .info-nav__separator {
            margin: 12px 16px 8px;
            padding-top: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.07);
          }

          .info-nav__separator-label {
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.3);
          }

          /* Content */
          .info-content {
            flex: 1;
            margin-left: 240px;
            padding: 40px 48px 80px;
            display: flex;
            justify-content: center;
          }

          .info-content > * {
            width: 100%;
            max-width: 800px;
          }

          /* Overlay mobile */
          .info-overlay {
            display: none;
          }

          /* Mobile */
          @media (max-width: 900px) {
            .info-header__menu-btn {
              display: block;
            }

            .info-header__home span {
              display: none;
            }

            .info-sidebar {
              transform: translateX(-100%);
              transition: transform 0.3s ease;
            }

            .info-sidebar--open {
              transform: translateX(0);
            }

            .info-overlay {
              display: block;
              position: fixed;
              inset: 0;
              top: 56px;
              background: rgba(0, 0, 0, 0.6);
              z-index: 40;
            }

            .info-content {
              margin-left: 0;
              padding: 32px 20px 60px;
            }
          }
        `}</style>
      </div>
    </GlossaryProvider>
  );
};

export default InfoPageLayout;

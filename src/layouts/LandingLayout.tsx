import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlossaryProvider } from '../context/GlossaryContext';
import { BackToTextButton } from '../components/common';
import LsoEcosystem from '../components/LsoEcosystem';

/**
 * @package EGI-INFO — LandingLayout
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — EGI-INFO)
 * @date 2026-03-31
 * @purpose Layout principale per Home e pagine audience — v1.1.0: LsoEcosystem sub-footer.
 */

interface LandingLayoutProps {
  variant?: 'default' | 'audience';
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ variant = 'default' }) => {
  return (
    <GlossaryProvider>
      <div
        className={`
          min-h-screen
          bg-dark
          text-white
          font-sans
          ${variant === 'audience' ? 'audience-layout' : 'landing-layout'}
        `}
      >
        {/* Header minimo - il WheelMenu è il focus principale */}
        <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo - sempre visibile */}
              <a
                href="/"
                className="pointer-events-auto flex items-center gap-2 group"
              >
                <span className="text-2xl font-serif font-bold text-gold group-hover:text-gold-light transition-colors">
                  Florence<span className="text-white">EGI</span>
                </span>
              </a>

              {/* Language Switcher */}
              <div className="pointer-events-auto">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative">
          <Outlet />
        </main>

        {/* LSO Ecosystem sub-footer */}
        <LsoEcosystem />

        {/* Footer */}
        <footer className="bg-dark-lighter border-t border-white/5">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} FlorenceEGI. Tutti i diritti riservati.
              </p>
              <nav className="flex gap-6 text-sm">
                <a href="/privacy" className="text-white/50 hover:text-gold transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-white/50 hover:text-gold transition-colors">
                  Termini di Servizio
                </a>
              </nav>
            </div>
          </div>
        </footer>

        {/* Back to Text Button - Global */}
        <BackToTextButton />
      </div>
    </GlossaryProvider>
  );
};

/**
 * LanguageSwitcher - Componente per cambio lingua
 */
const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const [currentLang, setCurrentLang] = React.useState('it');

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    setIsOpen(false);
    // i18n.changeLanguage(code) sarà implementato quando i18n è collegato
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3 py-2
          bg-dark-lighter/50 backdrop-blur-sm
          border border-white/10 rounded-lg
          hover:border-gold/30 hover:bg-dark-lighter
          transition-all duration-200
        "
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">
          {languages.find((l) => l.code === currentLang)?.flag}
        </span>
        <span className="text-white/80 text-sm hidden sm:inline">
          {languages.find((l) => l.code === currentLang)?.name}
        </span>
        <svg
          className={`w-4 h-4 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="
            absolute top-full right-0 mt-2
            bg-dark-lighter backdrop-blur-sm
            border border-white/10 rounded-lg
            shadow-xl shadow-black/50
            overflow-hidden
            min-w-[150px]
          "
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full flex items-center gap-3 px-4 py-3
                text-left
                hover:bg-gold/10
                transition-colors duration-150
                ${currentLang === lang.code ? 'bg-gold/5 text-gold' : 'text-white/80'}
              `}
              role="option"
              aria-selected={currentLang === lang.code}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingLayout;

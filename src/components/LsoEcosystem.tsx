/**
 * @package EGI-INFO — LsoEcosystem
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-INFO)
 * @date 2026-03-31
 * @purpose Sub-footer LSO — presenta l'ecosistema FlorenceEGI e invita
 *          a esplorare gli altri organi del Living Software Organism.
 *          Testo solo italiano (EGI-INFO non ha i18n completo).
 */

import React from 'react';

const LSO_SITES = [
  { key: 'hub',        url: 'https://florenceegi.com',                name: 'FlorenceEGI',    desc: "Vetrina pubblica dell'ecosistema",           isCurrent: false },
  { key: 'egi',        url: 'https://art.florenceegi.com',            name: 'EGI',             desc: 'Creator economy su blockchain Algorand',    isCurrent: false },
  { key: 'natan',      url: 'https://natan-loc.florenceegi.com',      name: 'NATAN_LOC',       desc: 'AI cognitiva per Comuni italiani',           isCurrent: false },
  { key: 'credential', url: 'https://egi-credential.florenceegi.com', name: 'EGI Credential',  desc: 'Wallet competenze certificate su blockchain', isCurrent: false },
  { key: 'sigillo',    url: 'https://egi-sigillo.florenceegi.com',    name: 'Sigillo',         desc: 'Certificazione blockchain di documenti',    isCurrent: false },
  { key: 'info',       url: 'https://info.florenceegi.com',           name: 'EGI Info',        desc: 'Documentazione e glossario FlorenceEGI',    isCurrent: true  },
] as const;

const LsoEcosystem: React.FC = () => {
  return (
    <section
      className="bg-dark-lighter border-t border-white/5 py-10 px-6"
      aria-label="Living Software Organism — ecosistema FlorenceEGI"
    >
      <div className="container mx-auto">
        <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
          Living Software Organism
        </p>
        <p className="text-white/50 text-sm mb-6">
          FlorenceEGI è un organismo software vivente. Ogni organo lavora in sinergia con gli altri.
        </p>

        <nav aria-label="Organi dell'ecosistema FlorenceEGI">
          <ul className="flex flex-col gap-3">
            {LSO_SITES.map((site) => (
              <li key={site.key} className="flex items-start gap-2">
                {site.isCurrent ? (
                  <>
                    <span className="mt-0.5 text-purple-400 text-xs select-none" aria-hidden="true">
                      ●
                    </span>
                    <span className="text-sm">
                      <span className="text-white/70 font-medium">{site.name}</span>
                      <span className="text-white/30 mx-1">—</span>
                      <span className="text-white/40">{site.desc}</span>
                      <span className="ml-2 text-xs text-purple-400/70 italic">(questo sito)</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mt-0.5 text-white/20 text-xs select-none" aria-hidden="true">
                      ●
                    </span>
                    <span className="text-sm">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 font-medium hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded"
                      >
                        {site.name}
                      </a>
                      <span className="text-white/30 mx-1">—</span>
                      <span className="text-white/40">{site.desc}</span>
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default LsoEcosystem;

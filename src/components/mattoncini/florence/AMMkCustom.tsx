/**
 * Mattoncino #29: AMMk Customization - Personalizzazione
 * 
 * Opzioni di personalizzazione AMMk.
 * Chiave JSON: ammk.customization
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const AMMkCustom: React.FC = () => {
  const { t } = useTranslation('florence');

  const customData = t('ammk.customization', { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;



  const ICONS = ['🎨', '💵', '🔒', '⚡'];

  return (
    <section className="ammk-custom">
      <div className="ammk-custom__container">

        {/* ── BANNER ROADMAP ─────────────────────────────────────────── */}
        <div className="ammk-custom__roadmap-banner">
          <span className="ammk-custom__roadmap-badge">
            {t('ammk.customRoadmapBadge')}
          </span>
          <h2 className="ammk-custom__roadmap-title">
            {t('ammk.customRoadmapTitle')}
          </h2>
          <p className="ammk-custom__roadmap-notice">
            {t('ammk.customRoadmapNotice')}
          </p>
        </div>

        <header className="ammk-custom__header">
          <h3 className="ammk-custom__title" style={{ opacity: 0.5 }}>
            {t('ammk.customizationSubtitle')}
          </h3>
        </header>

        {/* Card future — opache per indicare "non ancora disponibile" */}
        <div className="ammk-custom__grid" style={{ opacity: 0.45, pointerEvents: 'none' }}>
          {customData.map((item, index) => (
            <div key={index} className="ammk-custom__card">
              <div className="ammk-custom__card-header">
                <span className="ammk-custom__card-icon">{ICONS[index]}</span>
                <h4 className="ammk-custom__card-title">{item.title}</h4>
              </div>
              <p className="ammk-custom__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="ammk-custom__cta">
          <p>{t('ammk.customRoadmapCta')}</p>
        </div>
      </div>

      <style>{`
        .ammk-custom {
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
          padding: 4rem 1.5rem;
          color: #e0e0e0;
        }
        .ammk-custom__container { max-width: 800px; margin: 0 auto; }
        .ammk-custom__roadmap-banner {
          text-align: center;
          background: rgba(251,191,36,0.08);
          border: 2px solid rgba(251,191,36,0.4);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          margin-bottom: 2.5rem;
        }
        .ammk-custom__roadmap-badge {
          display: inline-block;
          background: rgba(251,191,36,0.15);
          color: #fbbf24;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .ammk-custom__roadmap-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #fbbf24;
          margin: 0 0 0.75rem 0;
        }
        .ammk-custom__roadmap-notice {
          color: rgba(255,255,255,0.65);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          max-width: 580px;
          margin: 0 auto;
        }
        .ammk-custom__header { text-align: center; margin-bottom: 2rem; }

        .ammk-custom__badge {
          display: inline-block;
          background: rgba(212, 175, 55, 0.15);
          color: #d4af37;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .ammk-custom__title {
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }
        .ammk-custom__subtitle { color: #888; font-size: 1.1rem; margin: 0; }
        .ammk-custom__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        .ammk-custom__card {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .ammk-custom__card:hover {
          border-color: rgba(212, 175, 55, 0.5);
          transform: translateY(-4px);
        }
        .ammk-custom__card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .ammk-custom__card-icon { font-size: 1.5rem; }
        .ammk-custom__card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #d4af37;
          margin: 0;
        }
        .ammk-custom__card-desc {
          font-size: 0.85rem;
          color: #888;
          margin: 0;
          line-height: 1.4;
        }
        .ammk-custom__cta {
          text-align: center;
          padding: 2rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 16px;
        }
        .ammk-custom__cta h3 {
          font-size: 1.25rem;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }
        .ammk-custom__cta p {
          color: #888;
          margin: 0 0 1.5rem 0;
        }
        .ammk-custom__btn {
          background: linear-gradient(135deg, #d4af37 0%, #b8942e 100%);
          color: #000;
          border: none;
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ammk-custom__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
        }
      `}</style>
    </section>
  );
};

export default AMMkCustom;

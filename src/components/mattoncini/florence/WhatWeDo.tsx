/**
 * Mattoncino: Chi è FlorenceEGI — What We Do
 *
 * Fonti ufficiali:
 *   - 01_Fondamenti_e_Visione.md
 *   - EGI-HUB-HOME-REACT / mobile/data/homepage.ts (AboutSection)
 *
 * Chiave JSON: florence.whatWeDo
 * Rotta test: /info/florence/what-we-do
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const GOLD = '#d4af37';
const GREEN = '#4ade80';
const PURPLE = '#a855f7';

interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

interface Highlight {
  value: string;
  label: string;
}

const WhatWeDo: React.FC = () => {
  const { t } = useTranslation('florence');

  const pillars = t('whatWeDo.pillars', { returnObjects: true }) as Pillar[];
  const highlights = t('whatWeDo.highlights', { returnObjects: true }) as Highlight[];

  return (
    <section
      style={{
        minHeight: '100vh',
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #0a0a0a 0%, rgba(168,85,247,0.05) 50%, #0a0a0a 100%)'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: 'rgba(168,85,247,0.12)',
            border: '1px solid rgba(168,85,247,0.35)',
            borderRadius: '50px',
            color: PURPLE,
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginBottom: '28px'
          }}>
            {t('whatWeDo.badge')}
          </span>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '28px',
            lineHeight: 1.25,
            maxWidth: '780px',
            margin: '0 auto 28px'
          }}>
            {t('whatWeDo.title')}
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            maxWidth: '720px',
            margin: '0 auto 20px'
          }}>
            {t('whatWeDo.intro')}
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            maxWidth: '700px',
            margin: '0 auto 16px'
          }}>
            {t('whatWeDo.body1')}
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {t('whatWeDo.body2')}
          </p>
        </div>

        {/* I tre pilastri */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {pillars.map((pillar, i) => (
            <div key={i} style={{
              background: 'rgba(30,30,40,0.6)',
              border: `1px solid ${[PURPLE, GOLD, GREEN][i]}40`,
              borderRadius: '20px',
              padding: '32px 28px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{pillar.icon}</div>
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: [PURPLE, GOLD, GREEN][i],
                marginBottom: '12px'
              }}>
                {pillar.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.65
              }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlights numerici */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {highlights.map((h, i) => (
            <div key={i} style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '16px',
              padding: '24px 16px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: GOLD,
                lineHeight: 1,
                marginBottom: '8px'
              }}>
                {h.value}
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.55)',
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const
              }}>
                {h.label}
              </div>
            </div>
          ))}
        </div>

        {/* Nota finale */}
        <div style={{
          textAlign: 'center',
          padding: '20px',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em'
          }}>
            {t('whatWeDo.note')}
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;

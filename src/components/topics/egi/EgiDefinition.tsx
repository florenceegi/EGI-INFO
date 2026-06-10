/**
 * EgiDefinition Component
 * 
 * Sezione definitoria "Cos'è un EGI" con:
 * - Semantic HTML (article, section)
 * - Schema.org DefinedTerm
 * - ARIA landmarks
 * - Glossary term highlighting
 * 
 * @component
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, VisuallyHidden } from '../../utils/seo';
import { GlossaryTerm } from '../../common/GlossaryTerm';

// ============================================
// TYPES
// ============================================

export interface EgiDefinitionProps {
  className?: string;
  id?: string;
}

// ============================================
// COMPONENT
// ============================================

export function EgiDefinition({ 
  className = '',
  id = 'egi-definition',
}: EgiDefinitionProps) {
  const { t } = useTranslation('egi');
  
  return (
    <Landmark
      role="region"
      aria-labelledby={`${id}-heading`}
      as="section"
      id={id}
      className={`egi-definition ${className}`}
    >
      {/* Section heading - H2 for document outline */}
      <h2 
        id={`${id}-heading`}
        className="egi-definition__heading"
      >
        {t('definition.title')}
      </h2>
      
      {/* Lead paragraph */}
      <p className="egi-definition__lead">
        {t('definition.lead')}
      </p>
      
      {/* Main definition - using definition list for semantics */}
      <dl className="egi-definition__list">
        {/* EGI acronym breakdown */}
        <div className="egi-definition__term-group">
          <dt className="egi-definition__term">
            <abbr title="Environment Goods Invent">
              <GlossaryTerm termKey="egi">EGI</GlossaryTerm>
            </abbr>
          </dt>
          <dd className="egi-definition__description">
            {t('definition.acronym.full')}
          </dd>
        </div>
        
        {/* Eco */}
        <div className="egi-definition__term-group">
          <dt className="egi-definition__term">
            <strong>E</strong>co
          </dt>
          <dd className="egi-definition__description">
            {t('definition.acronym.eco')}
          </dd>
        </div>
        
        {/* Goods */}
        <div className="egi-definition__term-group">
          <dt className="egi-definition__term">
            <strong>G</strong>oods
          </dt>
          <dd className="egi-definition__description">
            {t('definition.acronym.goods')}
          </dd>
        </div>
        
        {/* Invent */}
        <div className="egi-definition__term-group">
          <dt className="egi-definition__term">
            <strong>I</strong>nvent
          </dt>
          <dd className="egi-definition__description">
            {t('definition.acronym.invent')}
          </dd>
        </div>
      </dl>
      
      {/* Extended explanation */}
      <article 
        className="egi-definition__article"
        aria-label={t('definition.articleLabel')}
      >
        <p>{t('definition.paragraph1')}</p>
        <p>{t('definition.paragraph2')}</p>
        
        {/* Key points as semantic list */}
        <h3 className="egi-definition__subheading">
          {t('definition.keyPointsTitle')}
        </h3>
        <ul 
          className="egi-definition__key-points"
          aria-label={t('definition.keyPointsLabel')}
        >
          <li>
            <GlossaryTerm termKey="blockchain">
              {t('definition.keyPoints.blockchain')}
            </GlossaryTerm>
          </li>
          <li>
            <GlossaryTerm termKey="epp">
              {t('definition.keyPoints.epp')}
            </GlossaryTerm>
          </li>
          <li>
            <GlossaryTerm termKey="co-creatore">
              {t('definition.keyPoints.cocreator')}
            </GlossaryTerm>
          </li>
          <li>
            <GlossaryTerm termKey="royalty-piattaforma">
              {t('definition.keyPoints.royalties')}
            </GlossaryTerm>
          </li>
        </ul>
      </article>
      
      {/* Schema.org DefinedTerm - hidden but crawlable */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: 'EGI',
            alternateName: 'Environment Goods Invent',
            description: t('meta.description'),
            inDefinedTermSet: {
              '@type': 'DefinedTermSet',
              name: 'FlorenceEGI Glossary',
              url: 'https://florenceegi.com/glossary',
            },
          }),
        }}
      />
    </Landmark>
  );
}

export default EgiDefinition;

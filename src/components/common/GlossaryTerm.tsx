import React, { useId, useCallback, useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useGlossary } from '../../context/GlossaryContext';

/**
 * GlossaryTerm - Componente per i termini linkati al glossario
 * 
 * INLINE STYLES per garantire visibilità (no Tailwind)
 */

type GlossaryNamespace = 'glossary' | 'glossary-art';

interface GlossaryTermProps {
  termId: string;
  termKey?: string;
  namespace?: GlossaryNamespace;
  children: React.ReactNode;
  showTooltip?: boolean;
  className?: string;
  disabled?: boolean;
}

// Stili inline costanti
const GOLD = '#d4af37';
const GOLD_LIGHT = '#f4d03f';

export const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  termId,
  termKey,
  namespace = 'glossary',
  children,
  showTooltip = true,
  className = '',
  disabled = false,
}) => {
  const { t } = useTranslation(namespace);
  const { navigateToTerm } = useGlossary();
  const uniqueId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isHovered && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + window.scrollY - 10,  // appena sopra il termine
        left: rect.left + rect.width / 2,
      });
    }
  }, [isHovered]);

  const key = termKey || termId;
  const sourceId = `glossary-source-${key.replace(/\./g, '-')}-${uniqueId}`;

  const termData = t(`terms.${key}`, { returnObjects: true, defaultValue: null });

  let definition = '';
  let termName = '';

  if (typeof termData === 'object' && termData !== null) {
    definition = (termData as { definition?: string }).definition || '';
    termName = (termData as { term?: string }).term || '';
  } else if (typeof termData === 'string') {
    definition = termData;
  }

  if (!definition && namespace === 'glossary-art') {
    const artData = t(key, { returnObjects: true, defaultValue: null });
    if (typeof artData === 'object' && artData !== null) {
      definition = (artData as { description?: string }).description || '';
      termName = (artData as { term?: string }).term || '';
    }
  }

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && definition) {
      navigateToTerm(key, sourceId);
    }
  }, [disabled, definition, navigateToTerm, key, sourceId]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLSpanElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      navigateToTerm(key, sourceId);
    }
  }, [disabled, navigateToTerm, key, sourceId]);

  // Stile base per termine - SEMPRE VISIBILE in ORO
  const baseStyle: React.CSSProperties = {
    color: isHovered ? GOLD_LIGHT : GOLD,
    fontWeight: 600,
    textDecoration: 'underline',
    textDecorationColor: isHovered ? GOLD : `${GOLD}80`,
    textUnderlineOffset: '3px',
    cursor: disabled ? 'not-allowed' : (definition ? 'pointer' : 'default'),
    opacity: disabled ? 0.5 : 1,
    position: 'relative' as const,
    display: 'inline',
    transition: 'color 0.2s, text-decoration-color 0.2s'
  };



  // Se non c'è definizione, render comunque VISIBILE
  if (!definition) {
    return (
      <span
        style={baseStyle}
        title="Termine non trovato nel glossario"
        className={className}
      >
        {children}
      </span>
    );
  }

  const tooltipPortal = showTooltip && isHovered ? createPortal(
    <span
      id={`tooltip-${sourceId}`}
      role="tooltip"
      style={{
        position: 'fixed',
        top: `${tooltipPos.top}px`,
        left: `${tooltipPos.left}px`,
        transform: 'translate(-50%, -100%)',
        marginBottom: '10px',
        padding: '12px 16px',
        maxWidth: '320px',
        minWidth: '200px',
        background: 'rgba(20, 20, 30, 0.98)',
        backdropFilter: 'blur(8px)',
        color: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        borderRadius: '10px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        border: `1px solid ${GOLD}40`,
        pointerEvents: 'none',
        zIndex: 99999,
        whiteSpace: 'normal',
        textAlign: 'left',
      }}
    >
      <strong style={{ color: GOLD, display: 'block', marginBottom: '6px' }}>
        {termName || children}
      </strong>
      {definition.length > 200 ? `${definition.substring(0, 200)}...` : definition}
      {/* Arrow */}
      <span style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: '8px solid rgba(20, 20, 30, 0.98)'
      }} />
    </span>,
    document.body
  ) : null;

  return (
    <span
      ref={spanRef}
      id={sourceId}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={baseStyle}
      className={className}
      aria-describedby={showTooltip ? `tooltip-${sourceId}` : undefined}
      aria-haspopup="dialog"
      aria-disabled={disabled}
      data-term-key={key}
    >
      {children}
      {tooltipPortal}
    </span>
  );
};

/**
 * ArtTerm - Variante specializzata per vocabolario artistico (CoA)
 * 
 * Uso:
 * <ArtTerm category="techniques" subcategory="painting" termKey="oil">
 *   Pittura a olio
 * </ArtTerm>
 */
interface ArtTermProps {
  category: 'techniques' | 'materials' | 'supports';
  subcategory: string;
  termKey: string;
  children: React.ReactNode;
  className?: string;
  showTooltip?: boolean;
}

export const ArtTerm: React.FC<ArtTermProps> = ({
  category,
  subcategory,
  termKey,
  children,
  className = '',
  showTooltip = true,
}) => {
  // Build full path for glossary-art namespace
  const fullPath = `${category}.${subcategory}.${termKey}`;

  return (
    <GlossaryTerm
      termId={fullPath}
      namespace="glossary-art"
      className={`art-term art-term--${category} ${className}`}
      showTooltip={showTooltip}
    >
      {children}
    </GlossaryTerm>
  );
};

export default GlossaryTerm;

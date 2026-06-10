# Standard Creazione Mattoncini - FlorenceEGI

> **Definizione**: Un "mattoncino" è un componente React autonomo, riutilizzabile, che rappresenta una sezione informativa completa. I mattoncini vengono poi aggregati in pagine.

---

## 1. Struttura File

### Posizione
```
/src/components/mattoncini/
├── florence/          # Mattoncini specifici FlorenceEGI
│   ├── Intro.tsx
│   ├── Impact.tsx
│   ├── Problem.tsx
│   └── ...
├── common/            # Mattoncini riutilizzabili cross-progetto
│   └── ...
└── [altro-progetto]/  # Altri progetti futuri
```

### Naming Convention
- **File**: `PascalCase.tsx` (es. `HowItWorks.tsx`, `ImpactEnvironmental.tsx`)
- **Componente**: Stesso nome del file
- **Export**: `export default NomeComponente`

---

## 2. Template Base Mattoncino

```tsx
/**
 * Mattoncino: [Nome Descrittivo]
 * 
 * [Breve descrizione di cosa mostra/spiega questo mattoncino]
 * 
 * Chiave JSON i18n: [namespace].[sezione]
 * Rotta test: /info/[progetto]/[slug]
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

// ============================================
// TYPES
// ============================================
interface HighlightItem {
  icon: string;
  text: string;
}

interface ListItem {
  title: string;
  description: string;
}

// ============================================
// CONSTANTS (Design Tokens)
// ============================================
const COLORS = {
  gold: '#d4af37',
  blue: '#60a5fa',
  green: '#4ade80',
  purple: '#a78bfa',
  red: '#f87171',
  yellow: '#fbbf24',
} as const;

// ============================================
// COMPONENT
// ============================================
const NomeMattoncino: React.FC = () => {
  const { t } = useTranslation('[namespace]');
  
  // Estrai dati da i18n
  const highlights = t('[sezione].highlights', { returnObjects: true }) as HighlightItem[];
  const items = t('[sezione].items', { returnObjects: true }) as ListItem[];

  return (
    <section
      style={{ minHeight: '100vh', padding: '80px 20px', background: '#0a0a0a' }}
      aria-labelledby="[id]-title"
      role="region"
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '50px',
              color: COLORS.gold,
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '24px'
            }}
          >
            {t('[sezione].badge')}
          </span>
          
          <h1
            id="[id]-title"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '16px'
            }}
          >
            {t('[sezione].title')}
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {t('[sezione].subtitle')}
          </p>
        </header>

        {/* CONTENT */}
        <article>
          {/* ... contenuto specifico ... */}
        </article>

        {/* HIGHLIGHTS (se presenti) */}
        {highlights && (
          <ul
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
            aria-label={t('[sezione].highlightsLabel', 'Punti chiave')}
          >
            {highlights.map((item, i) => (
              <li
                key={i}
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }} aria-hidden="true">
                  {item.icon}
                </span>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  );
};

export default NomeMattoncino;
```

---

## 3. Requisiti Obbligatori

### ✅ Header JSDoc
Ogni mattoncino DEVE avere un commento iniziale con:
```tsx
/**
 * Mattoncino: [Nome]
 * 
 * [Descrizione]
 * 
 * Chiave JSON i18n: [namespace].[sezione]
 * Rotta test: /info/[progetto]/[slug]
 */
```

### ✅ i18n Completo
- **ZERO testo hardcoded** in italiano o inglese
- Tutti i testi da `useTranslation()`
- Chiavi strutturate: `[sezione].title`, `[sezione].subtitle`, `[sezione].items`, etc.

### ✅ TypeScript Tipizzato
- Interface per tutti gli oggetti da i18n
- `as const` per oggetti costanti
- Nessun `any`

### ✅ Accessibilità ARIA
| Elemento | Attributo Richiesto |
|----------|---------------------|
| `<section>` | `role="region"` + `aria-labelledby` |
| Heading principale | `id` univoco per `aria-labelledby` |
| Liste | `<ul>` o `<ol>` con `aria-label` |
| Icone decorative | `aria-hidden="true"` |
| Elementi interattivi | `aria-label` descrittivo |
| Gruppi di card | `role="group"` + `aria-label` |

### ✅ Semantica HTML
- `<section>` come wrapper
- `<header>` per titolo/sottotitolo
- `<article>` per contenuti autonomi
- `<ul>/<ol>` per liste (non `<div>`)
- `<h1>` → `<h2>` → `<h3>` in ordine

### ✅ Design System Consistente
```tsx
// Usa sempre queste costanti
const COLORS = {
  gold: '#d4af37',      // Brand principale
  blue: '#60a5fa',      // Info/Step
  green: '#4ade80',     // Successo/Positivo
  purple: '#a78bfa',    // Accent
  red: '#f87171',       // Errore/Negativo
  yellow: '#fbbf24',    // Warning/Attention
};

// Spaziature standard
padding: '80px 20px'     // Section padding
maxWidth: '1000px'       // Container max
gap: '20px'              // Grid gap standard
borderRadius: '16px'     // Card radius
borderRadius: '24px'     // Large card radius
borderRadius: '50px'     // Badge/pill radius
```

---

## 4. Struttura JSON i18n

Per ogni mattoncino, creare chiavi in `/src/i18n/locales/[lang]/[namespace].json`:

```json
{
  "[sezione]": {
    "badge": "🎯 Badge Text",
    "title": "Titolo Principale",
    "subtitle": "Sottotitolo descrittivo",
    "description": "Paragrafo più lungo se necessario",
    
    "ui": {
      "labelX": "Label per UI element",
      "buttonText": "Testo bottone",
      "highlightsLabel": "Aria label per highlights"
    },
    
    "items": [
      {
        "icon": "🔥",
        "title": "Item Title",
        "description": "Item description"
      }
    ],
    
    "highlights": [
      { "icon": "✨", "text": "Highlight text" }
    ],
    
    "cta": {
      "primary": "Testo CTA primaria",
      "secondary": "Testo CTA secondaria",
      "link": "/percorso"
    }
  }
}
```

---

## 5. Pattern di Contenuto

### 5.1 Lista Numerata (Steps)
```tsx
<ol aria-label="Passaggi" style={{ listStyle: 'none', padding: 0 }}>
  {steps.map((step, i) => (
    <li key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <span aria-hidden="true" style={{ fontWeight: 700, color: COLORS.blue }}>
        {i + 1}.
      </span>
      <p>{step.text}</p>
    </li>
  ))}
</ol>
```

### 5.2 Confronto Due Colonne
```tsx
<div role="group" aria-label="Confronto">
  <article aria-labelledby="old-way">
    <h3 id="old-way">{t('comparison.oldTitle')}</h3>
    {/* contenuto negativo */}
  </article>
  
  <article aria-labelledby="new-way">
    <h3 id="new-way">{t('comparison.newTitle')}</h3>
    {/* contenuto positivo */}
  </article>
</div>
```

### 5.3 Card Grid
```tsx
<ul 
  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}
  aria-label={t('section.cardsLabel')}
>
  {cards.map((card, i) => (
    <li key={i} style={{ /* card styles */ }}>
      <span aria-hidden="true">{card.icon}</span>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </li>
  ))}
</ul>
```

### 5.4 Stat/Number Highlight
```tsx
<div aria-label={`${value} ${label}`} style={{ textAlign: 'center' }}>
  <div style={{ fontSize: '4rem', fontWeight: 800, color: COLORS.gold }} aria-hidden="true">
    {value}
  </div>
  <p>{label}</p>
</div>
```

### 5.5 Badge/Pill
```tsx
<span
  style={{
    display: 'inline-block',
    padding: '10px 20px',
    background: 'rgba(212, 175, 55, 0.15)',
    border: '1px solid rgba(212, 175, 55, 0.35)',
    borderRadius: '50px',
    color: COLORS.gold,
    fontSize: '14px',
    fontWeight: 600
  }}
>
  {t('section.badge')}
</span>
```

---

## 6. Responsive Design

### Breakpoints Standard
```tsx
// Usa clamp() per font-size responsive
fontSize: 'clamp(2rem, 5vw, 3.5rem)'  // h1
fontSize: 'clamp(1.5rem, 3vw, 2rem)'  // h2
fontSize: 'clamp(1rem, 2vw, 1.25rem)' // body large

// Grid auto-responsive
gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'

// Flex wrap per bottoni
display: 'flex', flexWrap: 'wrap', gap: '20px'
```

### Mobile-First
- Tutti i layout devono funzionare su 320px
- Grid con `auto-fit` + `minmax()` per responsive automatico
- Padding ridotto su mobile: usa `padding: 'clamp(40px, 8vw, 80px) 20px'`

---

## 7. Performance

### ✅ Best Practices
- Nessuna dipendenza esterna non necessaria
- Nessun `useEffect` se non strettamente necessario
- Nessuno state se il componente è statico
- Immagini: usare `loading="lazy"` se presenti

### ❌ Da Evitare
- Import di librerie pesanti (moment, lodash full, etc.)
- Animazioni CSS complesse senza `will-change`
- Re-render inutili (memo se necessario)

---

## 8. Testing Checklist

Prima di considerare un mattoncino completo:

### Funzionalità
- [ ] Si renderizza senza errori
- [ ] Tutti i testi vengono da i18n
- [ ] Cambio lingua funziona (it/en)

### Accessibilità
- [ ] Tab navigation funziona
- [ ] Screen reader legge contenuti correttamente
- [ ] Contrasto colori sufficiente (4.5:1 minimo)
- [ ] Focus visibile su elementi interattivi

### Responsive
- [ ] Mobile 320px ✓
- [ ] Tablet 768px ✓
- [ ] Desktop 1200px+ ✓

### Codice
- [ ] Nessun errore TypeScript
- [ ] Nessun warning ESLint
- [ ] JSDoc header presente
- [ ] Nessun `console.log`

---

## 9. Esempio Completo

Vedi file di riferimento:
- `/src/components/mattoncini/florence/Intro.tsx` - Pattern base
- `/src/components/mattoncini/florence/Impact.tsx` - Con highlights e confronto
- `/src/components/mattoncini/florence/Problem.tsx` - Pattern problema/soluzione

---

## 10. Glossary Integration

Il sistema glossario permette di linkare termini tecnici a definizioni con tooltip e navigazione alla pagina glossario.

### 10.1 Import e Componenti Disponibili

```tsx
// Glossario generale (blockchain, EGI, legal, etc.)
import { GlossaryTerm } from '@/components/common/GlossaryTerm';

// Glossario artistico (tecniche, materiali, supporti) - per CoA
import { ArtTerm } from '@/components/common/GlossaryTerm';
```

### 10.2 GlossaryTerm - Uso Base

```tsx
<p>
  Ogni <GlossaryTerm termId="egi">EGI</GlossaryTerm> è certificato su 
  <GlossaryTerm termId="algorand">Algorand</GlossaryTerm>.
</p>
```

**Props disponibili:**

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `termId` | `string` | **required** | Chiave del termine in `glossary.json` |
| `termKey` | `string` | `termId` | Override della chiave (se diversa da termId) |
| `namespace` | `'glossary' \| 'glossary-art'` | `'glossary'` | Namespace i18n da usare |
| `showTooltip` | `boolean` | `true` | Mostra tooltip al hover |
| `disabled` | `boolean` | `false` | Disabilita interazione |
| `className` | `string` | `''` | Classe CSS aggiuntiva |
| `children` | `ReactNode` | **required** | Testo visibile del termine |

### 10.3 Esempio con Opzioni

```tsx
// Base
<GlossaryTerm termId="nft">NFT</GlossaryTerm>

// Senza tooltip (solo link)
<GlossaryTerm termId="blockchain" showTooltip={false}>blockchain</GlossaryTerm>

// Termine disabilitato (styling dimmed)
<GlossaryTerm termId="egi" disabled>EGI</GlossaryTerm>

// Con classe custom
<GlossaryTerm termId="epp" className="highlight-term">EPP</GlossaryTerm>
```

### 10.4 ArtTerm - Per Vocabolario Artistico (CoA)

Usa `ArtTerm` per termini specifici del Certificate of Authenticity:

```tsx
<p>
  Opera realizzata con tecnica 
  <ArtTerm category="techniques" subcategory="painting" termKey="oil">
    pittura a olio
  </ArtTerm> 
  su 
  <ArtTerm category="supports" subcategory="canvas" termKey="linen">
    tela di lino
  </ArtTerm>.
</p>
```

**Props ArtTerm:**

| Prop | Tipo | Valori |
|------|------|--------|
| `category` | `string` | `'techniques'`, `'materials'`, `'supports'` |
| `subcategory` | `string` | Dipende dalla categoria (es. `'painting'`, `'sculpture'`) |
| `termKey` | `string` | Chiave specifica (es. `'oil'`, `'bronze'`) |

### 10.5 Termini Disponibili (Categorie)

Riferimento a `/src/i18n/locales/it/glossary.json`:

| Categoria | Esempi termId |
|-----------|---------------|
| `core` | `egi`, `epp`, `ammk`, `florenceegi`, `coa`, `egizzare`, `motto` |
| `blockchain` | `algorand`, `nft`, `asa`, `minting`, `smart-contract`, `hash`, `ipfs`, `wallet` |
| `legal` | `diritti-morali`, `diritti-patrimoniali`, `diritto-seguito`, `copyright`, `mica`, `gdpr` |
| `roles` | `creator`, `co-creatore`, `collector`, `mecenate`, `curatore` |
| `finance` | `egili`, `equilibrium`, `fee-dinamiche`, `royalty-piattaforma`, `stripe` |
| `ai` | `natan`, `natan-market-engine`, `art-advisor`, `ai-credits`, `rag` |
| `governance` | `governance-duale`, `florenceegi-core`, `tenant-specializzato`, `frangette-aps` |
| `technical` | `rbac`, `ulm`, `auditlogservice`, `api`, `webhook`, `metadati` |
| `art` | `drops`, `collezione`, `traits`, `tecnica`, `materiali`, `provenienza` |
| `gdpr` | `consenso`, `dati-personali`, `diritto-oblio`, `portabilita-dati` |

### 10.6 Comportamento del Componente

**Hover/Focus:**
- Testo in oro (`#d4af37`) con sottolineatura
- Tooltip appare sopra il termine con definizione
- Definizioni > 200 caratteri vengono troncate nel tooltip

**Click:**
- Naviga alla pagina glossario con il termine evidenziato
- Usa `GlossaryContext` per gestire navigazione e scroll

**Accessibilità:**
- `role="button"` per indicare interattività
- `tabIndex={0}` per navigazione keyboard
- `aria-describedby` collega al tooltip
- `aria-haspopup="dialog"` indica popup
- Supporta Enter e Space per attivazione

### 10.7 Struttura JSON Glossario

```json
// /src/i18n/locales/it/glossary.json
{
  "title": "Glossario FlorenceEGI",
  "backToText": "Torna al testo",
  "searchPlaceholder": "Cerca termine...",
  "categories": {
    "core": "Concetti Fondamentali",
    "blockchain": "Blockchain & Tecnologia"
    // ...
  },
  "terms": {
    "egi": {
      "term": "EGI (Environment Goods Invent)",
      "definition": "Il certificato digitale che...",
      "category": "core"
    },
    "algorand": {
      "term": "Algorand",
      "definition": "Blockchain sostenibile...",
      "category": "blockchain"
    }
    // ...
  }
}
```

### 10.8 Best Practices

✅ **Quando usare GlossaryTerm:**
- Prima occorrenza di un termine tecnico in una sezione
- Termini che l'utente medio potrebbe non conoscere
- Acronimi (NFT, EGI, EPP, CoA, GDPR, etc.)
- Concetti specifici di FlorenceEGI (Egizzare, Drops, etc.)

❌ **Quando NON usare:**
- Termini comuni (arte, certificato, digitale)
- Stesso termine ripetuto nella stessa sezione
- Heading/titoli (usa solo nel body text)
- Testi molto brevi dove il tooltip sarebbe invasivo

### 10.9 Pattern Comune nei Mattoncini

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlossaryTerm } from '@/components/common/GlossaryTerm';

const ExampleMattoncino: React.FC = () => {
  const { t } = useTranslation('florence');

  return (
    <section>
      <h1>{t('section.title')}</h1>
      <p>
        {/* Testo statico con termini glossario inline */}
        Con FlorenceEGI puoi{' '}
        <GlossaryTerm termId="egizzare">egizzare</GlossaryTerm>{' '}
        qualsiasi opera e creare un{' '}
        <GlossaryTerm termId="coa">Certificato di Autenticità</GlossaryTerm>{' '}
        verificabile su{' '}
        <GlossaryTerm termId="blockchain">blockchain</GlossaryTerm>.
      </p>
      
      <p>
        {/* Testo da i18n - i termini glossario sono inline */}
        {t('section.paragraph1')}{' '}
        <GlossaryTerm termId="epp">EPP</GlossaryTerm>{' '}
        {t('section.paragraph2')}
      </p>
    </section>
  );
};
```

### 10.10 Aggiungere Nuovi Termini

Per aggiungere un nuovo termine al glossario:

1. **Apri** `/src/i18n/locales/it/glossary.json`
2. **Aggiungi** nel blocco `terms`:
```json
"nuovo-termine": {
  "term": "Nome Visualizzato",
  "definition": "Definizione completa del termine...",
  "category": "core|blockchain|legal|..."
}
```
3. **Duplica** in `/src/i18n/locales/en/glossary.json` con traduzione
4. **Usa** nel codice: `<GlossaryTerm termId="nuovo-termine">testo</GlossaryTerm>`

---

## 11. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    MATTONCINO CHECKLIST                      │
├─────────────────────────────────────────────────────────────┤
│ □ JSDoc header con nome, descrizione, chiave i18n, rotta    │
│ □ useTranslation() per TUTTI i testi                        │
│ □ TypeScript interfaces per oggetti i18n                    │
│ □ COLORS constant per colori                                │
│ □ <section> con role="region" + aria-labelledby             │
│ □ <header> con badge + h1 + subtitle                        │
│ □ Liste con <ul>/<ol> + aria-label                          │
│ □ Icone con aria-hidden="true"                              │
│ □ Grid responsive con auto-fit + minmax                     │
│ □ Font responsive con clamp()                               │
│ □ Nessun testo hardcoded                                    │
│ □ Nessun errore TS/ESLint                                   │
│ □ Testato su mobile                                         │
└─────────────────────────────────────────────────────────────┘
```

---

*Ultimo aggiornamento: Dicembre 2024*

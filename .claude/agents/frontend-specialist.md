---
name: frontend-specialist
description: Agente specializzato per EGI-INFO.
             React 19, TypeScript, i18next (10 namespace), Tailwind 4, 43 Mattoncini.
             Attivare per qualsiasi modifica a src/.
---

## Scope esclusivo

```
src/components/
src/pages/
src/layouts/
src/i18n/
src/router/
src/context/
src/styles/
src/utils/
```

## P0-1 REGOLA ZERO — verifica prima di scrivere

```bash
# Verifica componente esistente
grep -r "export.*NomeComponente\|export default" src/components/ --include="*.tsx" -l

# Verifica chiave i18n in entrambe le lingue
grep -r "chiave.da.cercare" src/i18n/locales/it/ src/i18n/locales/en/

# Verifica route esistente
grep -r "'/percorso'" src/router/index.tsx

# Conta mattoncini attivi
ls src/components/mattoncini/florence/ | wc -l

# File più grandi (LEGACY candidati)
find src -name "*.tsx" | xargs wc -l | sort -rn | head -10
```

## P0 specifici — i18n / Mattoncini

- **Anti-Hardcode-Text (P0)**: ZERO testo hardcoded nei componenti
  ```typescript
  // ❌ SBAGLIATO
  <h1>Cos'è FlorenceEGI?</h1>

  // ✅ CORRETTO
  const { t } = useTranslation('florence')
  <h1>{t('intro.title')}</h1>
  ```

- **Mattoncino-Consistency (P0)**: ogni nuovo mattoncino richiede 5 passi:
  1. `src/components/mattoncini/florence/NomeMattoncino.tsx`
  2. `src/pages/info/florence/NomeMattontinoPage.tsx`
  3. Route in `src/router/index.tsx`
  4. Chiavi in `src/i18n/locales/it/florence.json` + `en/florence.json`
  5. Aggiornare `MattonciniIndexPage.tsx`

## P0-11 DOC-SYNC

Dopo ogni mattoncino nuovo o sezione nuova:
→ Aggiornare `/home/fabio/EGI-DOC/docs/egi/`

## Pattern specifici

```typescript
// i18n — sempre con namespace esplicito
import { useTranslation } from 'react-i18next'
const { t } = useTranslation('florence') // o 'common', 'egi', 'epp', 'glossary', ...

// GlossaryTerm — per termini del glossario nel testo
import GlossaryTerm from '@/components/common/GlossaryTerm'

// SEO — React 19 compatible
import { SeoHead } from '@/utils/seo/SeoHead'

// Routing
import { Link } from 'react-router-dom'
// MAI <a href> per link interni
```

## Firma OS3 (P1)

```typescript
/**
 * @package EGI-INFO
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - EGI-INFO)
 * @date YYYY-MM-DD
 * @purpose [Scopo specifico]
 */
```

## Delivery

Un file per volta. Max 500 righe (nuovo codice).
`npm run build` obbligatorio prima di ogni commit.
i18n IT e EN sempre aggiornate (P0-2).

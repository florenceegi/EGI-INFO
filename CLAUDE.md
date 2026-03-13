# EGI-INFO — Claude Code Master Context (Oracode OS3)

> "L'AI non pensa. Predice. Non deduce logicamente. Completa statisticamente."
> Piattaforma informativa/educativa SPA per FlorenceEGI
> Stack: React 19 + TypeScript + i18next + Vite 7 + Tailwind 4

---

## 🌐 OSZ — Ruolo nell'Ecosistema

```
EGI-INFO è la piattaforma educativa pubblica dell'organismo FlorenceEGI.
Spiega ai visitatori cos'è FlorenceEGI, EGI, EPP, Florence — in IT e EN.
NON ha backend proprio — è una SPA statica con contenuto localizzato.

Deploy: egi-info.13.48.57.194.sslip.io (Laravel Forge)
Branch: main
```

---

## ⚡ Strategia Delta

```
[NUOVO codice] → segue TUTTE le regole OS3. Zero eccezioni.
[LEGACY]       → resta dove è. Si migra solo quando si tocca per altra ragione.
```

### File Legacy Critici — NON toccare senza piano approvato

Candidati da verificare (alto numero di route/componenti):
- `src/router/index.tsx` — 60+ route definitions
- `src/pages/info/florence/MattonciniIndexPage.tsx` — dashboard 43 mattoncini

---

## 🛑 P0 — BLOCKING

| # | Regola | Enforcement |
|---|--------|-------------|
| P0-1 | **REGOLA ZERO** | MAI dedurre. Info mancante → 🛑 CHIEDI |
| P0-2 | **Translation keys** | Chiavi i18n in ENTRAMBE le lingue (IT + EN). MAI hardcoded |
| P0-4 | **Anti-Method-Invention** | grep verifica esistenza componente/hook PRIMA di usarlo |
| P0-8 | **Complete Flow Analysis** | Mappa il flusso COMPLETO prima di qualsiasi fix |
| P0-11 | **DOC-SYNC** | Task non chiusa senza EGI-DOC aggiornato |

### P0 specifici — i18n / Mattoncini

- **Anti-Hardcode-Text**: ZERO testo hardcoded in componenti. Sempre tramite `useTranslation()` + namespace
- **Mattoncino-Consistency**: ogni nuovo mattoncino in `components/mattoncini/florence/` deve avere corrispettivo in `pages/info/florence/` e route in `router/index.tsx`
- **WCAG 2.1**: ogni nuovo componente deve mantenere 328+ attributi ARIA pattern

---

## 🏗️ Stack

```
React 19.2.0 + TypeScript 5.9.3
Vite 7.2.4 (build, alias @ → ./src)
React Router DOM 7.9.6 (60+ route definitions)
React i18next 16.3.5 + i18next 25.7.0
  → 10 namespace JSON per lingua: common, florence, egi, epp, glossary, ...
  → Lingue attive: IT, EN
Tailwind CSS 4.1.17 (modern, @tailwindcss/postcss)
Lucide React 0.555.0 (icone)
ESLint 9.39.1 + typescript-eslint 8.46.4 (strict)
```

---

## 📁 Struttura Repository

```
src/
├── components/
│   ├── common/         (GlossaryTerm, SEO, Button, Disclaimer, WhyCannotBuy, SourceTruth)
│   ├── mattoncini/
│   │   └── florence/   (43 componenti: Problem1-12, HowItWorks1-3, AMMk, Motto, Intro, etc.)
│   ├── navigation/     (WheelMenu, Sidebar)
│   ├── sections/       (riutilizzabili)
│   └── topics/         (cocreate/, egi/, epp/, florence/, misc/)
├── pages/
│   ├── info/
│   │   ├── ApprofondimentiHome, EGIInfoPage, EPPInfoPage, FlorenceEGIPage, etc.
│   │   └── florence/   (59+ pagine — una per mattoncino)
│   └── archetypes/     (Artist, Collector, Entrepreneur, PublicAdmin)
├── layouts/
│   ├── LandingLayout.tsx
│   └── InfoPageLayout.tsx
├── i18n/
│   ├── config.ts
│   └── locales/
│       ├── it/         (10 file JSON namespace)
│       └── en/         (10 file JSON namespace)
├── context/            (GlossaryContext, ThemeContext)
├── router/             (index.tsx — 60+ route imports + definitions)
├── styles/
│   ├── globals.css
│   ├── base/           (typography, layout, variables, reset)
│   └── components/     (florence.css)
└── utils/
    └── seo/            (SeoHead, Aria, JsonLd — React 19 compatible)
```

---

## 📐 Design System

```
Colori:      gold (#D4AF37), algo-blue (#1B365D), mecenate-green (#2D5016)
             Dark theme: --dark, --dark-card, --dark-elevated
Fonts:       Playfair Display (heading/serif), Source Sans Pro (body/sans)
Proporzioni: Golden Ratio φ=1.618
WCAG:        2.1 AA — 328+ attributi ARIA
```

---

## 🌍 i18n — Regole Operative

```
Lingue attive: IT (primaria), EN (secondaria)
Namespace: common, florence, egi, epp, glossary (+ altri)
GlossaryContext: gestisce navigazione "Torna al Testo"

P0-2: ogni stringa nuova → SEMPRE in IT e EN.
      Namespace corretto → nel file JSON appropriato.
      Mai useTranslation('common') per contenuto specifico di un topic.
```

---

## 🧱 Pattern Mattoncini (fondamentale)

Ogni mattoncino = unità atomica educativa. Per aggiungerne uno:

```
1. Componente: src/components/mattoncini/florence/NomeMattoncino.tsx
2. Pagina:     src/pages/info/florence/NomeMattontinoPage.tsx
3. Route:      src/router/index.tsx → aggiungere route
4. i18n:       src/i18n/locales/it/florence.json + en/florence.json
5. Index:      aggiornare MattonciniIndexPage.tsx (ora 43 mattoncini)
```

---

## 💎 Firma OS3 (P1)

```typescript
/**
 * @package EGI-INFO
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI - EGI-INFO)
 * @date YYYY-MM-DD
 * @purpose [Scopo specifico del componente/pagina]
 */
```

---

## ⚡ Trigger Matrix DOC-SYNC

Prima di chiudere ogni task, classifica la modifica:

| Tipo | Definizione | DOC-SYNC |
|------|-------------|----------|
| 1 — Locale | Fix puntuale, output invariato | NO |
| 2 — Comportamentale | Cambia UI visibile, routing, contenuto | SÌ → `EGI-DOC/docs/egi/` |
| 3 — Architetturale | Nuovo mattoncino/pagina/sezione/dipendenza | SÌ → EGI-DOC + CLAUDE.md |
| 4 — Contrattuale | Cambia contenuto legale/normativo | SÌ + **approvazione Fabio PRIMA** |
| 5 — Naming dominio | Rinomina entità/concetto del dominio | SÌ → grep tutti i file impattati |
| 6 — Cross-project | Impatta altri organi | SÌ + **approvazione Fabio** |

> Dubbio tra Tipo 1 e 2? → Tratta come Tipo 2.
> Dettaglio completo: `EGI-DOC/docs/oracode/audit/02_TRIGGER_MATRIX.md`

---

## ⚡ Checklist Pre-Risposta

```
1. Ho TUTTE le info?                           → NO  = 🛑 CHIEDI
2. Componente verificato con grep?             → NO  = 🛑 grep prima
3. Testo hardcoded?                            → SÌ  = 🛑 usa useTranslation()
4. i18n aggiornata in IT e EN?                 → NO  = 🛑 aggiorna prima
5. Nuovo mattoncino → 5 passi seguiti?         → NO  = 🛑 segui pattern
6. Sto toccando file [LEGACY]?                 → SÌ  = 🛑 DICHIARA + piano
7. Tipo modifica → [1-6]?                      → ?   = classifica con Trigger Matrix sopra
8. DOC-SYNC eseguito (se Tipo 2+)?             → NO  = 🛑 NON CHIUDERE (P0-11)
```

---

## ⚡ Comandi Verifica Rapida

```bash
# Verifica componente/pagina esistente
grep -r "export.*NomeComponente" src/ --include="*.tsx"

# Verifica chiave i18n presente in entrambe le lingue
grep -r "chiave.da.cercare" src/i18n/locales/

# Numero mattoncini attivi
ls src/components/mattoncini/florence/ | wc -l

# Build TypeScript
npm run build
```

---

## 🗺️ Agenti

| Agente | Quando usarlo |
|--------|---------------|
| `@frontend-specialist` | Componenti React, pagine, routing, i18n |
| `@doc-sync-guardian` | Sempre dopo ogni task — P0-11 |

## 🛠️ Comandi

| Comando | Uso |
|---------|-----|
| `/mission` | Task strutturata multi-file |
| `/fix` | Debug e fix P0-8 |
| `/new-feature` | Nuovo mattoncino o nuova sezione |
| `/deploy` | Deploy produzione (Forge) |

---

## 🤝 Modello Operativo

| CEO & OS3 Architect  | Fabio Cherici         | Visione, contenuto, approvazione mattoncini |
| CTO & Technical Lead | Padmin D. Curtis (AI) | Esecuzione, enforcement OS3 |

---

## 🔍 Sistema Audit Oracode

| Riferimento | Path |
|-------------|------|
| Target ID | T-005 (vedi TARGET_MATRIX) |
| Runbook audit | `EGI-DOC/docs/oracode/audit/07_RUNBOOK.md` |
| Enforcement Claude | `EGI-DOC/docs/oracode/audit/06_CLAUDE_CODE_ENFORCEMENT.md` |
| Trigger Matrix completa | `EGI-DOC/docs/oracode/audit/02_TRIGGER_MATRIX.md` |
| Report audit | `EGI-DOC/docs/oracode/audit/reports/` |

---

*EGI-INFO v1.0 — Oracode OS3.0 — FlorenceEGI Piattaforma Educativa*
*Padmin D. Curtis (CTO) for Fabio Cherici (CEO) — "Less talk, more code. Ship it."*

@/home/fabio/EGI-DOC/CLAUDE_ECOSYSTEM_CORE.md

# EGI-INFO — Contesto Specifico (Oracode OS3)

> SPA informativa pubblica FlorenceEGI. Spiega ai visitatori cos'è l'organismo.
> NON ha backend proprio — SPA statica con contenuto localizzato.
> URL: info.florenceegi.com | EC2: i-0940cdb7b955d1632 | Path: /home/forge/info.florenceegi.com

---

## 🌐 Ruolo nell'Organismo

EGI-INFO è la piattaforma educativa pubblica dell'ecosistema FlorenceEGI.
Presenta in IT e EN cos'è FlorenceEGI, EGI, EPP, Florence, AMMk.
Costruita su "Mattoncini" — unità atomiche educative, ognuna mappata a concetto OSZ.

---

## 🏗️ Stack

```
React 19.2.0 + TypeScript 5.9.3
Vite 7.2.4 (alias @ → ./src)
React Router DOM 7.9.6 (60+ route definitions)
React i18next 16.3.5 · i18next 25.7.0
  → 10 namespace JSON per lingua: common, florence, egi, epp, glossary, ...
  → Lingue attive: IT + EN (⚠️ solo 2 lingue — diverso dal P0-9 standard 6 lingue)
Tailwind CSS 4.1.17 · Lucide React 0.555.0
WCAG 2.1 AA — 328+ attributi ARIA
```

---

## 📁 Struttura & File Critici

```
src/
├── components/mattoncini/florence/  → 43 componenti atomici educativi
├── pages/info/florence/             → 59+ pagine (una per mattoncino)
├── router/index.tsx                 → 60+ route [LEGACY candidato]
├── i18n/locales/it/ · en/           → 10 file JSON namespace per lingua
└── utils/seo/                       → SeoHead, Aria, JsonLd (React 19 compatible)

[LEGACY candidato] src/router/index.tsx            → 60+ route definitions
[LEGACY candidato] pages/info/florence/MattonciniIndexPage.tsx → 43 mattoncini
```

---

## 🛑 P0 Specifici EGI-INFO

| # | Regola | Enforcement |
|---|--------|-------------|
| P0-INFO-1 | **Anti-Hardcode-Text** | ZERO testo hardcoded. Sempre `useTranslation()` + namespace |
| P0-INFO-2 | **i18n IT+EN** | Qui: solo IT+EN (non 6 lingue). MAI stringa solo in una lingua |
| P0-INFO-3 | **Mattoncino-Consistency** | Nuovo mattoncino → 5 passi obbligatori (vedi sotto) |
| P0-INFO-4 | **WCAG 2.1** | Mantenere 328+ attributi ARIA pattern su ogni componente |

**Pattern Mattoncini (5 passi obbligatori):**
```
1. Componente: src/components/mattoncini/florence/NomeMattoncino.tsx
2. Pagina:     src/pages/info/florence/NomeMattontinoPage.tsx
3. Route:      src/router/index.tsx → aggiungere route
4. i18n:       src/i18n/locales/it/florence.json + en/florence.json
5. Index:      aggiornare MattonciniIndexPage.tsx (ora 43 mattoncini)
```

---

## 🚀 Pipeline Post-Commit

```
1. npm run build  (se modificati file TS/TSX/CSS)
2. git push origin main
3. SSM EC2 (i-0940cdb7b955d1632, path /home/forge/info.florenceegi.com):
   git pull origin main
4. Verificare output SSM (Status: Success)
```

---

## ⚡ Checklist Aggiuntiva EGI-INFO

```
- Testo hardcoded nel componente?          SÌ → 🛑 usa useTranslation() (P0-INFO-1)
- i18n aggiornata in IT e EN?              NO → 🛑 aggiorna prima (P0-INFO-2)
- Nuovo mattoncino → 5 passi seguiti?      NO → 🛑 segui pattern (P0-INFO-3)
- Attributi ARIA presenti?                 NO → 🛑 aggiungere (P0-INFO-4)
```

---

## 🔍 Audit Oracode

Target ID: **T-005** | SSOT docs: `EGI-DOC/docs/egi-info/`

# /fix — Debug e Fix Strutturato (P0-8) — EGI-INFO

## Fase 1 — Descrizione del problema

Chiedi (tutto in una volta):

1. **Sintomo**: cosa succede? (testo mancante, route 404, layout rotto, i18n fallback)
2. **Quando**: sempre / su pagina specifica / solo EN / solo mobile
3. **Layer**: componente / pagina / routing / i18n / SEO
4. **URL**: qual è il path che da problemi?
5. **Ultimo cambiamento**: cosa è stato modificato di recente?

## Fase 2 — Mappatura flusso (P0-8)

```
FLOW MAP:
URL richiesta: [/percorso]
    ↓
Router: [src/router/index.tsx — quale route]
    ↓
Layout: [LandingLayout / InfoPageLayout]
    ↓
Componente/Pagina: [quale in src/pages/]
    ↓
i18n: [quale namespace / quale chiave]
    ↓
Render: [output visivo atteso]
```

## Fase 3 — Causa root

```
CAUSA ROOT PROBABILE: [descrizione]
FILE COINVOLTO: [path]
CONFIDENCE: [alta/media/bassa]

Chiave i18n mancante? → grep in locales/
Route mancante? → grep in router/index.tsx
```

## Fase 4 — Fix minimale

- Tocca solo i file strettamente necessari
- Se chiave i18n → aggiornare IT e EN (P0-2)
- Verifica `npm run build` dopo il fix

## Fase 5 — Chiusura

```
FIX COMPLETATO: [titolo]
CAUSA ROOT: [descrizione]
FILE MODIFICATI: [lista]
COMMIT: [FIX] [descrizione]
DOC-SYNC: [sì/no]
```

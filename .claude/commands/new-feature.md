# /new-feature — Nuovo Mattoncino o Sezione (EGI-INFO)

## Fase 1 — Feature brief

Chiedi (tutto in una volta):

1. **Nome**: come si chiama il mattoncino/sezione?
2. **Contenuto**: cosa spiega? (problema, soluzione, concetto EGI, EPP, Florence)
3. **Tipo**: mattoncino educativo / nuova pagina archetipo / nuova sezione landing
4. **Namespace i18n**: quale namespace? (florence / egi / epp / common)
5. **Priority**: P0/P1/P2?

## Fase 2 — Spec tecnica

```markdown
## SPEC: [Nome Mattoncino/Sezione]
**Namespace i18n**: [florence / egi / epp / common]
**Route**: /info/[percorso]

### Contenuto
[Descrizione del contenuto educativo]

### Se nuovo mattoncino — 5 passi:
- [ ] `src/components/mattoncini/florence/[Nome].tsx`
- [ ] `src/pages/info/florence/[Nome]Page.tsx`
- [ ] `src/router/index.tsx` — nuova route
- [ ] `src/i18n/locales/it/florence.json` — chiavi IT
- [ ] `src/i18n/locales/en/florence.json` — chiavi EN
- [ ] `MattonciniIndexPage.tsx` — aggiornare count (43 → N)

### Chiavi i18n previste
[nome.titolo, nome.descrizione, nome.sottotitolo, ...]

### DOC-SYNC richiesto
- [ ] `EGI-DOC/docs/egi/` — se spiega concetto core EGI
```

## Fase 3 — Implementazione

Un file per volta. Max 500 righe.
ZERO testo hardcoded — tutto tramite useTranslation().
`npm run build` prima del commit.

## Fase 4 — Chiusura

```
FEATURE COMPLETATA: [Nome]
Mattoncini totali: [43 → N]
Commit: [hash]
Attiva /doc-sync-guardian se necessario.
```

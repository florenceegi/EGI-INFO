---
name: doc-sync-guardian
description: Si attiva dopo ogni task completata per aggiornare EGI-DOC.
             P0-11: task non chiusa senza documentazione aggiornata.
---

## SSOT Documentazione EGI-INFO

```
/home/fabio/EGI-DOC/docs/egi/        ← documentazione EGI (EGI-INFO è organo EGI)
```

## Regola per tipo di task

| Task | Cosa aggiornare |
|------|-----------------|
| `[FEAT]` nuovo mattoncino | Documenta il mattoncino + aggiorna count (43 → N) |
| `[FEAT]` nuova sezione | Crea .md della sezione |
| `[FIX]` bug fix | Aggiorna .md del componente coinvolto |
| `[i18n]` traduzioni | Nessun DOC-SYNC obbligatorio (è codice puro) |
| `[REFACTOR]` | Aggiorna struttura |

## Formato commit DOC-SYNC

```
[DOC] EGI-INFO — [area]: [descrizione sintetica]
```

## Checklist pre-chiusura task

- [ ] EGI-DOC aggiornato se necessario
- [ ] npm run build senza errori TypeScript
- [ ] i18n IT e EN aggiornate (P0-2)
- [ ] P0-11 soddisfatto → task chiusa

## RAG Sync automatico — post-commit hook

Il repository EGI-DOC ha un **post-commit hook** che triggera automaticamente
`pipeline/job.py sync` ogni volta che un commit modifica file `docs/**/*.md`.

**Non devi fare nulla di extra**: basta committare il file `.md` in EGI-DOC
e il RAG si aggiorna da solo in background.

```bash
# Il hook fa questo automaticamente dopo ogni commit con docs/*.md:
cd /home/fabio/EGI-DOC && python3 pipeline/job.py sync &
```

Log del sync automatico: `/home/fabio/EGI-DOC/pipeline/logs/post_commit_sync.log`

Se vuoi verificare che il sync sia partito:
```bash
tail -f /home/fabio/EGI-DOC/pipeline/logs/post_commit_sync.log
```


# /deploy — Deploy EGI-INFO (Laravel Forge)

URL produzione: egi-info.13.48.57.194.sslip.io
Path EC2: /home/forge/egi-info.13.48.57.194.sslip.io/

**IMPORTANTE**: Fornisci i comandi. NON eseguirli direttamente — li esegue Fabio.

## Prerequisiti

```
□ npm run build — zero errori TypeScript
□ git status pulito
□ Branch: main
□ i18n IT e EN aggiornate
□ Commit firmato ([FEAT]/[FIX]/etc.)
```

## Sequenza deploy

```bash
cd /home/forge/egi-info.13.48.57.194.sslip.io && \
  git pull origin main && \
  npm install && \
  npm run build
```

## Post-deploy

```
□ URL risponde: egi-info.13.48.57.194.sslip.io
□ Mattoncini visibili
□ i18n funziona (IT e EN)
□ Nessun errore console
```

## Note critiche

- `dist/` non è in git — `npm run build` sempre dopo pull
- Se si aggiunge dipendenza: `npm install` obbligatorio prima del build

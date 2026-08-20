# Sito per ripetizioni — GitHub Pages

Sito statico, senza backend, pronto da pubblicare gratuitamente su GitHub Pages.

## Struttura

```text
.
├── index.html                 # pagina principale
├── assets/
│   ├── css/style.css           # stile e versione mobile
│   ├── js/main.js              # menu mobile, FAQ e anno automatico
│   └── img/                    # eventuali foto o logo
└── materiale-pubblico/
    ├── matematica/             # PDF/risorse pubbliche
    ├── fisica/
    └── programmazione/
```

## Cosa personalizzare prima di pubblicare

1. In `index.html`, sostituisci **Edoardo Longo**, le materie, la biografia e le testimonianze con i tuoi contenuti reali.
2. Nella sezione prezzi, sostituisci `XX` e `XXX` con le tariffe effettive.
3. Sostituisci `tuamail@example.com` e `39XXXXXXXXXX` con email e numero WhatsApp. Per WhatsApp usa il numero internazionale senza `+`, spazi o trattini.
4. Inserisci i PDF nelle cartelle di `materiale-pubblico/`. Per collegare un PDF, modifica ad esempio il link della card in `index.html` in `materiale-pubblico/matematica/formulario.pdf`.
5. Controlla di avere il diritto di distribuire tutto il materiale pubblicato.

## Pubblicazione con GitHub Pages

1. Crea un nuovo repository pubblico su GitHub (ad esempio `ripetizioni`).
2. Carica tutti questi file nella cartella principale del repository.
3. Su GitHub, apri **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**, poi `main` e la cartella `/(root)`, quindi salva.
5. Dopo pochi minuti il sito sarà disponibile all’indirizzo indicato da GitHub, normalmente `https://tuo-username.github.io/ripetizioni/`.

## Area studenti futura

La fascia “Area studenti” è solo una predisposizione visiva: GitHub Pages da solo non protegge file o pagine. Non inserire quindi materiale riservato nel repository pubblico. In futuro l’accesso può essere collegato a un servizio con autenticazione e spazio privato (ad esempio Google Drive, Notion, GitHub privato con inviti o una piattaforma dedicata), mantenendo questa pagina pubblica come punto di accesso.

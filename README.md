# RipetizioniSito

Sito statico per presentare lezioni private di matematica e fisica a Verona e online. Il progetto non usa un backend: può essere pubblicato direttamente con GitHub Pages.

## Struttura del progetto

```text
.
├── index.html                # Home: servizi, livelli, materie e contatti
├── materiale.html            # Pagina del materiale di un singolo corso
├── condizioni.html           # Condizioni del servizio
├── privacy.html              # Informativa privacy
├── assets/
│   ├── css/
│   │   ├── style.css         # Stili principali
│   │   ├── overrides.css     # Personalizzazioni e correzioni
│   │   ├── booking.css       # Stili del modulo di contatto
│   │   ├── material-files.css # Stili della pagina dei materiali
│   │   └── why-mobile.css    # Adattamenti per schermi piccoli
│   └── js/
│       ├── main.js           # Interazioni della home e modulo WhatsApp
│       └── materiale.js      # Catalogo corsi e caricamento dei PDF
└── materiale-pubblico/       # Materiale accessibile pubblicamente
    ├── algebra/
    ├── analisi/
    ├── geometria analitica/
    ├── geometria euclidea/
    ├── goniometria/
    ├── probabilità e statistica/
    └── trigonometria/
```

## Come funziona il materiale

I link ai corsi della home usano il parametro `corso`, per esempio:

```text
materiale.html?corso=algebra
```

La pagina `materiale.html` legge il corso dall'URL. `assets/js/materiale.js` interroga l'API di GitHub, cerca i file nella cartella corrispondente e li divide automaticamente tra `teoria/` ed `esercizi/`.

Per aggiungere una risorsa pubblica, inserisci il PDF nella sottocartella corretta e fai un nuovo commit. I file `.DS_Store` sono esclusi tramite `.gitignore` e vengono comunque filtrati dal catalogo.

## Personalizzazione

- Modifica testi, materie e collegamenti in `index.html`.
- Aggiorna il catalogo dei corsi e le descrizioni in `assets/js/materiale.js`.
- Aggiorna colori, tipografia e layout nei file di `assets/css/`.
- Sostituisci il numero presente nei link WhatsApp e nel modulo di contatto con un numero internazionale senza `+`, spazi o trattini.
- Se cambi nome del repository, username GitHub o branch, aggiorna `owner`, `repository` e `branch` in `assets/js/materiale.js`.

## Pubblicazione con GitHub Pages

1. Crea o usa un repository pubblico su GitHub.
2. Carica il contenuto del progetto nella root del repository.
3. Apri **Settings → Pages**.
4. In **Build and deployment**, seleziona **Deploy from a branch**, il branch `main` e la cartella `/(root)`.
5. Salva e attendi la pubblicazione. L'indirizzo sarà simile a `https://username.github.io/nome-repository/`.

Non è necessaria una procedura di build o l'installazione di dipendenze.

## Materiale riservato

GitHub Pages è un servizio statico e non protegge file o pagine. Non inserire soluzioni, dati personali o materiale riservato in questo repository pubblico. Per questi contenuti usa un servizio con autenticazione o uno spazio privato separato.

## Licenza

Consulta il file `LICENSE` prima di riutilizzare il codice o i contenuti del progetto. Pubblica solo materiale didattico di cui possiedi i diritti o per cui hai ricevuto autorizzazione.

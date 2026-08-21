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
    ├── medie/                # Una sottocartella per ogni materia
    ├── superiori/            # Due sezioni: Matematica e Fisica
    │   ├── Matematica/
    │   │   ├── Algebra/
    │   │   ├── Analisi/
    │   │   └── ...
    │   └── Fisica/
    └── universita/           # Una sottocartella per ogni materia
```

## Catalogo statico delle materie

La home e la pagina del materiale leggono `catalogo.json`, generato dal repository locale. Questo evita chiamate runtime alle API GitHub, elimina il rischio di rate limit e migliora i tempi di caricamento.

Dopo aver aggiunto o rimosso materiale, rigenera il catalogo con:

```sh
node generate-catalog.js
```

Il workflow `.github/workflows/generate-catalog.yml` lo esegue automaticamente su GitHub quando cambia `materiale-pubblico/`. Se lavori in locale e hai Node.js installato, puoi eseguire lo stesso comando prima del push.

### Quiz

Per associare un quiz a una materia, aggiungi nella cartella della materia un file chiamato `quiz.txt` oppure `quiz-nome.txt`:

```text
Titolo: Dinamica - verifica rapida
Descrizione: Test interattivo sui principi della dinamica.
Domande: 10
Tempo: 10 minuti
Feedback: Mostra il punteggio immediato alla fine
Link: https://forms.google.com/...
```

Il generatore inserisce i metadati nella chiave `quizzes` di `catalogo.json`; la pagina del materiale mostra automaticamente la card solo per la materia associata.

Per aggiungere una materia, crea una cartella con il nome che vuoi visualizzare, ad esempio:

```text
materiale-pubblico/superiori/Matematica/nuova materia/
├── teoria/
└── esercizi/
```

Dopo il push su GitHub, `nuova materia` comparirà automaticamente nella sezione Matematica. Per una materia di fisica usa invece `materiale-pubblico/superiori/Fisica/nuova materia/`. Non devi modificare `index.html` o aggiungere link manualmente. La pagina `materiale.html` riceve livello, area e materia nell'URL, poi `assets/js/materiale.js` cerca i file e li divide tra `teoria/` ed `esercizi/`.

Per aggiungere una risorsa pubblica, inserisci il PDF nella sottocartella corretta e fai un nuovo commit. I file `.DS_Store` sono esclusi tramite `.gitignore` e vengono comunque filtrati dal catalogo.

## Materiale riservato

GitHub Pages è un servizio statico e non protegge file o pagine. Non inserire soluzioni, dati personali o materiale riservato in questo repository pubblico. Per questi contenuti usa un servizio con autenticazione o uno spazio privato separato.

## Licenza

Consulta il file `LICENSE` prima di riutilizzare il codice o i contenuti del progetto. Pubblica solo materiale didattico di cui possiedi i diritti o per cui hai ricevuto autorizzazione.

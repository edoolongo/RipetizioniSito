const courses = {
  'matematica-medie': ['Scuole medie', 'Matematica', 'Fondamenti, problemi e ripasso per verifiche.'],
  'fisica-medie': ['Scuole medie', 'Fisica', 'Primi concetti, misure e fenomeni fisici.'],
  algebra: ['Scuole superiori · Matematica', 'Algebra', 'Equazioni, disequazioni, sistemi e funzioni.'],
  geometria: ['Scuole superiori · Matematica', 'Geometria', 'Piana, analitica e solida.'],
  trigonometria: ['Scuole superiori · Matematica', 'Trigonometria', 'Formule, equazioni e problemi.'],
  funzioni: ['Scuole superiori · Matematica', 'Funzioni e limiti', 'Studio delle funzioni e calcolo dei limiti.'],
  'analisi-superiori': ['Scuole superiori · Matematica', 'Analisi e derivate', 'Derivate, integrali e studio di funzione.'],
  'probabilita-superiori': ['Scuole superiori · Matematica', 'Probabilità e statistica', 'Calcolo combinatorio, probabilità e dati.'],
  cinematica: ['Scuole superiori · Fisica', 'Cinematica', 'Moto rettilineo, circolare e relativo.'], dinamica: ['Scuole superiori · Fisica', 'Dinamica', 'Forze e principi della dinamica.'],
  energia: ['Scuole superiori · Fisica', 'Lavoro, energia e quantità di moto', 'Principi di conservazione e applicazioni.'], termodinamica: ['Scuole superiori · Fisica', 'Termodinamica', 'Calore, gas e trasformazioni.'], elettromagnetismo: ['Scuole superiori · Fisica', 'Elettromagnetismo', 'Campo elettrico, circuiti e magnetismo.'], 'onde-ottica': ['Scuole superiori · Fisica', 'Onde e ottica', 'Onde, suono, luce e fenomeni ottici.'],
  'analisi-1': ['Università · Matematica', 'Analisi 1', 'Limiti, continuità, derivate e integrali.'], 'analisi-2': ['Università · Matematica', 'Analisi 2', 'Funzioni di più variabili, integrali e serie.'], 'analisi-3': ['Università · Matematica', 'Analisi 3', 'Argomenti avanzati di analisi.'], 'geometria-differenziale': ['Università · Matematica', 'Geometria differenziale', 'Curve, superfici e strumenti geometrici.'], topologia: ['Università · Matematica', 'Topologia', 'Spazi topologici, continuità e connessione.'], probabilita: ['Università · Matematica', 'Probabilità', 'Variabili aleatorie, distribuzioni e inferenza.'], 'calcolo-numerico': ['Università · Matematica', 'Calcolo numerico', 'Metodi numerici e analisi degli errori.'],
  'fisica-1': ['Università · Fisica', 'Fisica 1', 'Meccanica, oscillazioni e termodinamica.'], 'fisica-2': ['Università · Fisica', 'Fisica 2', 'Elettromagnetismo e onde.'], java: ['Università · Programmazione', 'Programmazione Java', 'Fondamenti, oggetti e strutture dati.'], python: ['Università · Programmazione', 'Programmazione Python', 'Fondamenti, esercizi e applicazioni.'], fortran: ['Università · Programmazione', 'Programmazione Fortran', 'Sintassi, calcolo scientifico e esercizi.'], matlab: ['Università · Programmazione', 'Matlab', 'Script, matrici e calcolo scientifico.']
};
const id = new URLSearchParams(window.location.search).get('corso');
const course = courses[id];
if (course) { document.title = `${course[1]} | Materiale didattico`; document.querySelector('#course-level').textContent = course[0]; document.querySelector('#course-title').textContent = course[1]; document.querySelector('#course-intro').textContent = course[2]; }

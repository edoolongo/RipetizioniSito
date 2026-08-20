// Anagrafica dei corsi: id -> [etichetta livello, titolo, descrizione, cartella su disco (opzionale)]
// Se la cartella su disco ha un nome diverso dall'id (es. contiene spazi/accenti), va indicata esplicitamente.
const courses = {
  'matematica-medie': ['Scuole medie', 'Matematica', 'Fondamenti, problemi e ripasso per verifiche.'],
  'fisica-medie': ['Scuole medie', 'Fisica', 'Primi concetti, misure e fenomeni fisici.'],

  algebra: ['Liceo e superiori · Matematica', 'Algebra', 'Equazioni, disequazioni, sistemi e funzioni.'],
  'geometria-analitica': ['Liceo e superiori · Matematica', 'Geometria analitica', 'Punti, rette, circonferenze e parabole.', 'geometria analitica'],
  geometria: ['Liceo e superiori · Matematica', 'Geometria analitica', 'Punti, rette, circonferenze e parabole.', 'geometria analitica'],
  'geometria-euclidea': ['Liceo e superiori · Matematica', 'Geometria euclidea', 'Figure, teoremi e dimostrazioni.', 'geometria euclidea'],
  goniometria: ['Liceo e superiori · Matematica', 'Goniometria', 'Funzioni, equazioni e disequazioni goniometriche.'],
  trigonometria: ['Liceo e superiori · Matematica', 'Trigonometria', 'Formule e problemi sui triangoli.'],
  analisi: ['Liceo e superiori · Matematica', 'Analisi', 'Funzioni, limiti e derivate.'],
  funzioni: ['Liceo e superiori · Matematica', 'Analisi', 'Funzioni, limiti e derivate.', 'analisi'],
  'analisi-superiori': ['Liceo e superiori · Matematica', 'Analisi', 'Funzioni, limiti e derivate.', 'analisi'],
  'probabilita-superiori': ['Liceo e superiori · Matematica', 'Probabilità e statistica', 'Calcolo delle probabilità e analisi dei dati.', 'probabilita-statistica'],
  'probabilita-statistica': ['Liceo e superiori · Matematica', 'Probabilità e statistica', 'Calcolo delle probabilità e analisi dei dati.', 'probabilita-statistica'],

  cinematica: ['Liceo e superiori · Fisica', 'Cinematica', 'Moto rettilineo, circolare e relativo.'],
  dinamica: ['Liceo e superiori · Fisica', 'Dinamica', 'Forze e principi della dinamica.'],
  energia: ['Liceo e superiori · Fisica', 'Lavoro, energia e quantità di moto', 'Principi di conservazione e applicazioni.'],
  termodinamica: ['Liceo e superiori · Fisica', 'Termodinamica', 'Calore, gas e trasformazioni.'],
  elettromagnetismo: ['Liceo e superiori · Fisica', 'Elettromagnetismo', 'Campo elettrico, circuiti e magnetismo.'],
  'onde-ottica': ['Liceo e superiori · Fisica', 'Onde e ottica', 'Onde, suono, luce e fenomeni ottici.'],

  'analisi-1': ['Università · Matematica', 'Analisi 1', 'Limiti, continuità, derivate e integrali.'],
  'analisi-2': ['Università · Matematica', 'Analisi 2', 'Funzioni di più variabili, integrali e serie.'],
  'analisi-3': ['Università · Matematica', 'Analisi 3', 'Argomenti avanzati di analisi.'],
  'geometria-differenziale': ['Università · Matematica', 'Geometria differenziale', 'Curve, superfici e strumenti geometrici.'],
  topologia: ['Università · Matematica', 'Topologia', 'Spazi topologici, continuità e connessione.'],
  probabilita: ['Università · Matematica', 'Probabilità', 'Variabili aleatorie, distribuzioni e inferenza.'],
  'calcolo-numerico': ['Università · Matematica', 'Calcolo numerico', 'Metodi numerici e analisi degli errori.'],

  'fisica-1': ['Università · Fisica', 'Fisica 1', 'Meccanica, oscillazioni e termodinamica.'],
  'fisica-2': ['Università · Fisica', 'Fisica 2', 'Elettromagnetismo e onde.'],
  java: ['Università · Programmazione', 'Programmazione Java', 'Fondamenti, oggetti e strutture dati.'],
  python: ['Università · Programmazione', 'Programmazione Python', 'Fondamenti, esercizi e applicazioni.'],
  fortran: ['Università · Programmazione', 'Programmazione Fortran', 'Sintassi, calcolo scientifico e esercizi.'],
  matlab: ['Università · Programmazione', 'Matlab', 'Script, matrici e calcolo scientifico.']
};

// Cartella di primo livello su disco (materiale-pubblico/<livello>/...) per ciascun id
const levelFolders = {
  'matematica-medie': 'medie', 'fisica-medie': 'medie',
  algebra: 'superiori', 'geometria-analitica': 'superiori', geometria: 'superiori',
  'geometria-euclidea': 'superiori', goniometria: 'superiori', trigonometria: 'superiori',
  analisi: 'superiori', funzioni: 'superiori', 'analisi-superiori': 'superiori',
  'probabilita-superiori': 'superiori', 'probabilita-statistica': 'superiori',
  cinematica: 'superiori', dinamica: 'superiori', energia: 'superiori',
  termodinamica: 'superiori', elettromagnetismo: 'superiori', 'onde-ottica': 'superiori',
  'analisi-1': 'universita', 'analisi-2': 'universita', 'analisi-3': 'universita',
  'geometria-differenziale': 'universita', topologia: 'universita', probabilita: 'universita',
  'calcolo-numerico': 'universita', 'fisica-1': 'universita', 'fisica-2': 'universita',
  java: 'universita', python: 'universita', fortran: 'universita', matlab: 'universita'
};

const params = new URLSearchParams(window.location.search);
const id = params.get('corso');
const course = courses[id];
const level = params.get('livello') || levelFolders[id];
const subjectAliases = {
  algebra: 'Algebra', geometria: 'Geometria Analitica', trigonometria: 'Trigonometria',
  funzioni: 'Analisi', 'analisi-superiori': 'Analisi', analisi: 'Analisi',
  'probabilita-superiori': "Probabilita' Statistica", 'probabilita-statistica': "Probabilita' Statistica",
  'geometria-analitica': 'Geometria Analitica', 'geometria-euclidea': 'Geometria Euclidea', goniometria: 'Goniometria',
  cinematica: 'Cinematica', dinamica: 'Dinamica', energia: 'Lavoro, energia e quantità di moto', termodinamica: 'Termodinamica', elettromagnetismo: 'Elettromagnetismo', 'onde-ottica': 'Onde e ottica'
};
const area = params.get('area') || (level === 'superiori' ? (['cinematica', 'dinamica', 'energia', 'termodinamica', 'elettromagnetismo', 'onde-ottica'].includes(id) ? 'Fisica' : 'Matematica') : '');
const subjectFolder = params.get('materia') || subjectAliases[id] || (course && course[3]) || id;
const displaySubject = subject => subject.charAt(0).toLocaleUpperCase('it-IT') + subject.slice(1);
const legacySubjectFolders = {
  Algebra: 'algebra', Analisi: 'analisi', 'Geometria Analitica': 'Geometria',
  'Geometria Euclidea': 'Geometria', Goniometria: 'goniometria', Trigonometria: 'trigonometria',
  "Probabilita' Statistica": "probabilita' e statistica", Cinematica: 'cinematica', Dinamica: 'dinamica',
  Termodinamica: 'termodinamica', Elettromagnetismo: 'elettromagnetismo', Onde: 'onde', Ottica: 'ottica', Statica: 'statica'
};

const owner = 'edoolongo';
const repository = 'RipetizioniSito';
const branch = 'main';
const publicBase = `https://${owner}.github.io/${repository}`;

const renderFiles = (element, files, emptyText) => {
  if (!element) return;
  if (!files.length) { element.innerHTML = `<p>${emptyText}</p>`; return; }
  element.innerHTML = `<ul>${files.map(file => `<li><a href="${publicBase}/${file.path}" target="_blank" rel="noopener">${file.name} <span>↗</span></a></li>`).join('')}</ul>`;
};

const studentBanner = document.querySelector('.student-area');
if (studentBanner) {
  studentBanner.classList.add('notice-banner');
  studentBanner.innerHTML = '<p>Le soluzioni saranno condivise dopo aver inviato gli svolgimenti.</p><a href="index.html#contatti">Contattami →</a>';
}

if (level && subjectFolder) {
  const levelLabel = level === 'universita' ? 'Università' : level === 'superiori' ? 'Liceo e superiori' : 'Scuole medie';
  const title = (course && course[1]) || displaySubject(subjectFolder);
  const intro = (course && course[2]) || 'Teoria ed esercizi per questa materia.';

  document.title = `${title} | Materiale didattico`;
  document.querySelector('#course-level').textContent = levelLabel;
  document.querySelector('#course-title').textContent = title;
  document.querySelector('#course-intro').textContent = intro;

  fetch(`https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`)
    .then(response => { if (!response.ok) throw new Error('Materiale non disponibile'); return response.json(); })
    .then(data => {
      const newFolder = `materiale-pubblico/${level}/${area ? `${area}/` : ''}${subjectFolder}`;
      const oldFolder = `materiale-pubblico/${level}/${legacySubjectFolders[subjectFolder] || subjectFolder}`;
      const folder = [newFolder, oldFolder].find(candidate => data.tree.some(item => item.type === 'blob' && item.path.startsWith(`${candidate}/`))) || newFolder;
      const files = data.tree.filter(item =>
        item.type === 'blob' &&
        !item.path.split('/').pop().toLowerCase().includes('.ds_store') &&
        item.path.startsWith(`${folder}/`)
      );
      const toFile = file => ({ path: file.path, name: file.path.split('/').pop() });
      renderFiles(
        document.querySelector('#theory-list'),
        files.filter(file => file.path.startsWith(`${folder}/teoria/`)).map(toFile),
        'Nessuna dispensa pubblicata per ora.'
      );
      renderFiles(
        document.querySelector('#exercise-list'),
        files.filter(file => file.path.startsWith(`${folder}/esercizi/`)).map(toFile),
        'Nessun esercizio pubblicato per ora.'
      );
    })
    .catch(() => {
      document.querySelector('#theory-list').innerHTML = '<p>Il materiale sarà disponibile a breve.</p>';
      document.querySelector('#exercise-list').innerHTML = '<p>Il materiale sarà disponibile a breve.</p>';
    });
} else {
  document.querySelector('#course-title').textContent = 'Materia non trovata';
  document.querySelector('#course-intro').textContent = 'Torna alla home e scegli una materia dall\u2019elenco.';
}
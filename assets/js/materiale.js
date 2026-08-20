const courses = {
  'matematica-medie': ['Scuole medie', 'Matematica', 'Fondamenti, problemi e ripasso per verifiche.'],
  'fisica-medie': ['Scuole medie', 'Fisica', 'Primi concetti, misure e fenomeni fisici.'],
  algebra: ['Scuole superiori · Matematica', 'Algebra', 'Equazioni, disequazioni, sistemi e funzioni.'],
  'geometria-analitica': ['Scuole superiori · Matematica', 'Geometria analitica', 'Punti, rette, circonferenze e parabole.', 'geometria analitica'],
  'geometria-euclidea': ['Scuole superiori · Matematica', 'Geometria euclidea', 'Figure, teoremi e dimostrazioni.', 'geometria euclidea'],
  geometria: ['Scuole superiori · Matematica', 'Geometria analitica', 'Punti, rette, circonferenze e parabole.', 'geometria analitica'],
  goniometria: ['Scuole superiori · Matematica', 'Goniometria', 'Funzioni, equazioni e disequazioni goniometriche.'],
  trigonometria: ['Scuole superiori · Matematica', 'Trigonometria', 'Formule e problemi sui triangoli.'],
  analisi: ['Scuole superiori · Matematica', 'Analisi', 'Funzioni, limiti e derivate.'],
  funzioni: ['Scuole superiori · Matematica', 'Analisi', 'Funzioni, limiti e derivate.', 'analisi'],
  'analisi-superiori': ['Scuole superiori · Matematica', 'Analisi', 'Funzioni, limiti e derivate.', 'analisi'],
  'probabilita-superiori': ['Scuole superiori · Matematica', 'Probabilità e statistica', 'Calcolo delle probabilità e analisi dei dati.', 'probabilità e statistica'],
  'probabilita-statistica': ['Scuole superiori · Matematica', 'Probabilità e statistica', 'Calcolo delle probabilità e analisi dei dati.', 'probabilità e statistica'],
  cinematica: ['Scuole superiori · Fisica', 'Cinematica', 'Moto rettilineo, circolare e relativo.'], dinamica: ['Scuole superiori · Fisica', 'Dinamica', 'Forze e principi della dinamica.'],
  energia: ['Scuole superiori · Fisica', 'Lavoro, energia e quantità di moto', 'Principi di conservazione e applicazioni.'], termodinamica: ['Scuole superiori · Fisica', 'Termodinamica', 'Calore, gas e trasformazioni.'], elettromagnetismo: ['Scuole superiori · Fisica', 'Elettromagnetismo', 'Campo elettrico, circuiti e magnetismo.'], 'onde-ottica': ['Scuole superiori · Fisica', 'Onde e ottica', 'Onde, suono, luce e fenomeni ottici.'],
  'analisi-1': ['Università · Matematica', 'Analisi 1', 'Limiti, continuità, derivate e integrali.'], 'analisi-2': ['Università · Matematica', 'Analisi 2', 'Funzioni di più variabili, integrali e serie.'], 'analisi-3': ['Università · Matematica', 'Analisi 3', 'Argomenti avanzati di analisi.'], 'geometria-differenziale': ['Università · Matematica', 'Geometria differenziale', 'Curve, superfici e strumenti geometrici.'], topologia: ['Università · Matematica', 'Topologia', 'Spazi topologici, continuità e connessione.'], probabilita: ['Università · Matematica', 'Probabilità', 'Variabili aleatorie, distribuzioni e inferenza.'], 'calcolo-numerico': ['Università · Matematica', 'Calcolo numerico', 'Metodi numerici e analisi degli errori.'],
  'fisica-1': ['Università · Fisica', 'Fisica 1', 'Meccanica, oscillazioni e termodinamica.'], 'fisica-2': ['Università · Fisica', 'Fisica 2', 'Elettromagnetismo e onde.'], java: ['Università · Programmazione', 'Programmazione Java', 'Fondamenti, oggetti e strutture dati.'], python: ['Università · Programmazione', 'Programmazione Python', 'Fondamenti, esercizi e applicazioni.'], fortran: ['Università · Programmazione', 'Programmazione Fortran', 'Sintassi, calcolo scientifico e esercizi.'], matlab: ['Università · Programmazione', 'Matlab', 'Script, matrici e calcolo scientifico.']
};
const params = new URLSearchParams(window.location.search);
const legacyCourses = {
  algebra: ['superiori', 'algebra'],
  geometria: ['superiori', 'geometria analitica'],
  trigonometria: ['superiori', 'trigonometria'],
  funzioni: ['superiori', 'analisi'],
  'analisi-superiori': ['superiori', 'analisi'],
  'probabilita-superiori': ['superiori', 'probabilità e statistica'],
  'probabilita-statistica': ['superiori', 'probabilità e statistica'],
  'matematica-medie': ['medie', 'matematica'],
  'fisica-medie': ['medie', 'fisica']
};
const legacyCourse = legacyCourses[params.get('corso')];
const level = params.get('livello') || legacyCourse?.[0];
const subject = params.get('materia') || legacyCourse?.[1];
const owner = 'edoolongo';
const repository = 'RipetizioniSito';
const branch = 'main';
const publicBase = `https://${owner}.github.io/${repository}`;

const renderFiles = (element, files, emptyText) => {
  if (!files.length) { element.innerHTML = `<p>${emptyText}</p>`; return; }
  element.innerHTML = `<ul>${files.map(file => `<li><a href="${publicBase}/${file.path}" target="_blank" rel="noopener">${file.name} <span>↗</span></a></li>`).join('')}</ul>`;
};

if (level && subject) {
  const folder = `materiale-pubblico/${level}/${subject}`;
  document.title = `${subject} | Materiale didattico`;
  document.querySelector('#course-level').textContent = level === 'universita' ? 'Università' : level === 'superiori' ? 'Liceo e superiori' : 'Scuole medie';
  document.querySelector('#course-title').textContent = subject;
  document.querySelector('#course-intro').textContent = 'Teoria ed esercizi per questa materia.';
  fetch(`https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`)
    .then(response => { if (!response.ok) throw new Error('Materiale non disponibile'); return response.json(); })
    .then(data => {
      const files = data.tree.filter(item => item.type === 'blob' && !item.path.toLowerCase().includes('.ds_store') && item.path.startsWith(`${folder}/`));
      const toFile = file => ({ path: file.path, name: file.path.split('/').pop() });
      renderFiles(document.querySelector('#theory-list'), files.filter(file => file.path.startsWith(`${folder}/teoria/`)).map(toFile), 'Nessuna dispensa pubblicata per ora.');
      renderFiles(document.querySelector('#exercise-list'), files.filter(file => file.path.startsWith(`${folder}/esercizi/`)).map(toFile), 'Nessun esercizio pubblicato per ora.');
    })
    .catch(() => {
      document.querySelector('#theory-list').innerHTML = '<p>Il materiale sarà disponibile a breve.</p>';
      document.querySelector('#exercise-list').innerHTML = '<p>Il materiale sarà disponibile a breve.</p>';
    });
}
  document.title = `${course[1]} | Materiale didattico`;
  document.querySelector('#course-level').textContent = course[0];
  document.querySelector('#course-title').textContent = course[1];
  document.querySelector('#course-intro').textContent = course[2];
  fetch(`https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`)
    .then(response => { if (!response.ok) throw new Error('Materiale non disponibile'); return response.json(); })
    .then(data => {
      const folder = course[3] || id;
      const files = data.tree.filter(item => item.type === 'blob' && !item.path.split('/').pop().toLowerCase().includes('.ds_store') && item.path.startsWith(`materiale-pubblico/${folder}/`));
      const toFile = file => ({ path: file.path, name: file.path.split('/').pop() });
      renderFiles(document.querySelector('#theory-list'), files.filter(file => file.path.includes(`materiale-pubblico/${folder}/teoria/`)).map(toFile), 'Nessuna dispensa pubblicata per ora.');
      renderFiles(document.querySelector('#exercise-list'), files.filter(file => file.path.includes(`materiale-pubblico/${folder}/esercizi/`)).map(toFile), 'Nessun esercizio pubblicato per ora.');
    })
    .catch(() => {
      document.querySelector('#theory-list').innerHTML = '<p>Il materiale sarà disponibile a breve.</p>';
      document.querySelector('#exercise-list').innerHTML = '<p>Il materiale sarà disponibile a breve.</p>';
    });
}

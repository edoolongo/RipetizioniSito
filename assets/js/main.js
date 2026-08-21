const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open); });
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { toggle?.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
document.querySelector('.hero-notes')?.remove();
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('.accordion details').forEach(item => item.addEventListener('toggle', () => { if (item.open) document.querySelectorAll('.accordion details').forEach(other => { if (other !== item) other.removeAttribute('open'); }); }));

const levelButtons = document.querySelectorAll('[data-level]');
levelButtons.forEach(button => button.addEventListener('click', () => {
  levelButtons.forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('[data-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === button.dataset.level));
}));

document.querySelector('#booking-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Ciao Edoardo! Mi chiamo ${data.get('nome')} e vorrei organizzare un primo incontro conoscitivo per capire insieme come affrontare lo studio.\n\nMateria: ${data.get('materia')}\nLivello: ${data.get('livello')}\nModalità preferita: ${data.get('modalita')}\nFasce orarie comode: ${data.get('disponibilita')}\n\nGrazie, a presto!`;
  window.open(`https://wa.me/393333868540?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

const bookingForm = document.querySelector('#booking-form');
const bookingButton = bookingForm?.querySelector('button[type="submit"]');
if (bookingForm && bookingButton) {
  const emailLink = document.createElement('a');
  emailLink.className = 'email-fallback';
  emailLink.href = 'mailto:longoedoardo04@gmail.com?subject=Richiesta%20informazioni%20ripetizioni';
  emailLink.textContent = 'Preferisci? Invia via email';
  emailLink.addEventListener('click', () => {
    const data = new FormData(bookingForm);
    const subject = 'Richiesta informazioni ripetizioni';
    const body = `Ciao Edoardo! Mi chiamo ${data.get('nome') || ''} e vorrei organizzare un primo incontro.\n\nMateria: ${data.get('materia') || ''}\nLivello: ${data.get('livello') || ''}\nModalità preferita: ${data.get('modalita') || ''}\nFasce orarie comode: ${data.get('disponibilita') || ''}`;
    emailLink.href = `mailto:longoedoardo04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  bookingButton.insertAdjacentElement('afterend', emailLink);
}

const levelLabels = { medie: 'Scuole medie', superiori: 'Liceo e superiori', universita: 'Università' };

const materialSection = document.querySelector('#materiale');
const subjectsSection = document.querySelector('#materie');
const sectionNumbers = {
  '#materie .section-label': 'Materie e livelli',
  '#metodo .section-label': 'Come funziona',
  '#prezzi .section-label': 'Costi e disponibilità',
  '#materiale .section-label': 'Materiale didattico'
};
Object.entries(sectionNumbers).forEach(([selector, label]) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = label;
});
if (materialSection && subjectsSection) {
  const materialHeading = materialSection.querySelector('.resources-head');
  const studentBanner = materialSection.querySelector('.student-area');
  const integratedMaterials = document.createElement('div');
  integratedMaterials.className = 'integrated-materials';
  if (materialHeading) integratedMaterials.append(materialHeading);
  if (studentBanner) integratedMaterials.append(studentBanner);
  subjectsSection.append(integratedMaterials);
  materialSection.remove();
  document.querySelectorAll('a[href="#materiale"]').forEach(link => link.setAttribute('href', '#materie'));
}

const escapeHtml = value => value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
const displaySubject = subject => subject.charAt(0).toLocaleUpperCase('it-IT') + subject.slice(1);
const physicsSubjects = new Set(['cinematica', 'dinamica', 'energia', 'lavoro, energia e quantità di moto', 'termodinamica', 'elettromagnetismo', 'onde-ottica', 'onde', 'ottica', 'statica']);
const getCatalog = (tree, level) => tree
  .filter(item => item.type === 'blob' && !item.path.toLowerCase().includes('.ds_store'))
  .map(item => item.path.split('/'))
  .filter(parts => parts[0] === 'materiale-pubblico' && parts[1] === level && parts.length > 3)
  .reduce((catalog, parts) => {
    const legacySubject = parts[2];
    const isNewStructure = level === 'superiori' && (legacySubject === 'Matematica' || legacySubject === 'Fisica');
    const area = level === 'superiori'
      ? (isNewStructure ? legacySubject : (physicsSubjects.has(legacySubject.toLowerCase()) ? 'Fisica' : 'Matematica'))
      : levelLabels[level];
    const subject = level === 'superiori' ? (isNewStructure ? parts[3] : legacySubject) : parts[2];
    const group = catalog.find(item => item.area === area);
    if (!subject || subject === '.gitkeep') {
      if (!group) catalog.push({ area, subjects: [] });
      return catalog;
    }
    if (group && !group.subjects.includes(subject)) group.subjects.push(subject);
    else if (!group) catalog.push({ area, subjects: [subject] });
    return catalog;
  }, level === 'superiori' ? [{ area: 'Matematica', subjects: [] }, { area: 'Fisica', subjects: [] }] : [])
  .map(group => ({ ...group, subjects: group.subjects.sort((first, second) => first.localeCompare(second, 'it')) }))
  .sort((first, second) => level === 'superiori'
    ? ['Matematica', 'Fisica'].indexOf(first.area) - ['Matematica', 'Fisica'].indexOf(second.area)
    : first.area.localeCompare(second.area, 'it'));

const renderSubjects = (tree, level) => {
  const panel = document.querySelector(`[data-panel="${level}"]`);
  const container = panel?.querySelector('.course-columns, .subject-grid');
  if (!container) return;
  const catalog = getCatalog(tree, level);
  if (!catalog.length) {
    container.innerHTML = '<div class="empty-catalog"><span class="catalog-status">In arrivo</span><p>Il materiale per questo livello sarà disponibile a breve.</p></div>';
    return;
  }
  container.innerHTML = catalog.map(group => `<article><h3>${escapeHtml(group.area)}</h3>${group.subjects.length ? `<ul class="course-list">${group.subjects.map(subject => `<li><a href="materiale.html?livello=${encodeURIComponent(level)}${level === 'superiori' ? `&area=${encodeURIComponent(group.area)}` : ''}&materia=${encodeURIComponent(subject)}">${escapeHtml(displaySubject(subject))}</a></li>`).join('')}</ul>` : '<div class="empty-catalog"><span class="catalog-status">In arrivo</span><p>Materiali in preparazione.</p></div>'}</article>`).join('');
};

document.querySelectorAll('[data-panel]').forEach(panel => {
  const container = panel.querySelector('.course-columns, .subject-grid');
  if (container) container.innerHTML = '<p class="level-intro">Caricamento delle materie…</p>';
});

const superioriContainer = document.querySelector('[data-panel="superiori"] .course-columns');
if (superioriContainer) {
  superioriContainer.innerHTML = '<article><h3>Matematica</h3><ul class="course-list"></ul></article><article><h3>Fisica</h3><ul class="course-list"></ul></article>';
}

fetch('catalogo.json')
  .then(response => { if (!response.ok) throw new Error('Catalogo non disponibile'); return response.json(); })
  .then(data => ['medie', 'superiori', 'universita'].forEach(level => renderSubjects(data.tree, level)))
  .catch(() => {
    const panel = document.querySelector('[data-panel="superiori"]');
    const container = panel?.querySelector('.course-columns');
    if (container) container.innerHTML = '<div class="empty-catalog"><span class="catalog-status">In arrivo</span><p>Il catalogo sarà disponibile a breve.</p></div>';
    document.querySelectorAll('[data-panel]:not([data-panel="superiori"])').forEach(otherPanel => {
      const otherContainer = otherPanel.querySelector('.course-columns, .subject-grid');
      if (otherContainer) otherContainer.innerHTML = '<div class="empty-catalog"><span class="catalog-status">In arrivo</span><p>Il catalogo sarà disponibile a breve.</p></div>';
    });
  });

const studentBanner = document.querySelector('.integrated-materials .student-area, #materiale .student-area');
if (studentBanner) {
  studentBanner.classList.add('notice-banner');
  studentBanner.innerHTML = '<p>Le soluzioni saranno condivise dopo aver inviato gli svolgimenti.</p><a href="#contatti">Contattami →</a>';
}
document.querySelector('.form-note')?.insertAdjacentHTML('beforeend', ' <a href="privacy.html">Leggi l’informativa privacy.</a> Per gli studenti minorenni, si invita a contattare Edoardo tramite genitore o tutore.');

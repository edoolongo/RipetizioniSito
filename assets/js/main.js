const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open); });
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { toggle?.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelectorAll('.accordion details').forEach(item => item.addEventListener('toggle', () => { if (item.open) document.querySelectorAll('.accordion details').forEach(other => { if (other !== item) other.removeAttribute('open'); }); }));

const levelButtons = document.querySelectorAll('[data-level]');
levelButtons.forEach(button => button.addEventListener('click', () => {
  levelButtons.forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('[data-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === button.dataset.level));
}));

const testimonials = [
  { text: 'Le testimonianze di studenti e studentesse arriveranno qui.', author: 'Sezione in aggiornamento', initial: '✦' },
  { text: 'Qui potrai aggiungere una testimonianza reale, con il consenso dello studente.', author: 'Testimonianza futura', initial: '✦' },
  { text: 'Una frase breve e concreta aiuta chi visita il sito a conoscere il tuo approccio.', author: 'Testimonianza futura', initial: '✦' }
];
let testimonialIndex = 0;
const renderTestimonial = () => {
  const current = testimonials[testimonialIndex];
  const text = document.querySelector('#testimonial-text');
  if (!text) return;
  text.textContent = `“${current.text}”`;
  document.querySelector('#testimonial-author').textContent = current.author;
  document.querySelector('#testimonial-initial').textContent = current.initial;
  document.querySelectorAll('.testimonial-dots button').forEach((dot, index) => dot.classList.toggle('active', index === testimonialIndex));
};
document.querySelector('.previous')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex + testimonials.length - 1) % testimonials.length; renderTestimonial(); });
document.querySelector('.next')?.addEventListener('click', () => { testimonialIndex = (testimonialIndex + 1) % testimonials.length; renderTestimonial(); });
document.querySelectorAll('.testimonial-dots button').forEach((dot, index) => dot.addEventListener('click', () => { testimonialIndex = index; renderTestimonial(); }));

document.querySelector('#booking-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Ciao Edoardo! Mi chiamo ${data.get('nome')} e vorrei organizzare un primo incontro conoscitivo per capire insieme come affrontare lo studio.\n\nMateria: ${data.get('materia')}\nLivello: ${data.get('livello')}\nModalità preferita: ${data.get('modalita')}\nFasce orarie comode: ${data.get('disponibilita')}\n\nGrazie, a presto!`;
  window.open(`https://wa.me/393333868540?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

const githubTreeUrl = 'https://api.github.com/repos/edoolongo/RipetizioniSito/git/trees/main?recursive=1';
const levelLabels = { medie: 'Scuole medie', superiori: 'Liceo e superiori', universita: 'Università' };

const escapeHtml = value => value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
const getSubjects = (tree, level) => [...new Set(tree
  .filter(item => item.type === 'blob' && !item.path.toLowerCase().includes('.ds_store'))
  .map(item => item.path.split('/'))
  .filter(parts => parts[0] === 'materiale-pubblico' && parts[1] === level && parts.length > 3 && parts[2] !== '.gitkeep')
  .map(parts => parts[2]))].sort((first, second) => first.localeCompare(second, 'it'));

const renderSubjects = (tree, level) => {
  const panel = document.querySelector(`[data-panel="${level}"]`);
  const container = panel?.querySelector('.course-columns, .subject-grid');
  if (!container) return;
  const subjects = getSubjects(tree, level);
  if (!subjects.length) {
    container.innerHTML = '<p class="level-intro">Nessuna materia pubblicata per ora.</p>';
    return;
  }
  container.innerHTML = `<article><h3>${levelLabels[level]}</h3><ul class="course-list">${subjects.map(subject => `<li><a href="materiale.html?livello=${encodeURIComponent(level)}&materia=${encodeURIComponent(subject)}">${escapeHtml(subject)}</a></li>`).join('')}</ul></article>`;
};

document.querySelectorAll('[data-panel]').forEach(panel => {
  const container = panel.querySelector('.course-columns, .subject-grid');
  if (container) container.innerHTML = '<p class="level-intro">Caricamento delle materie…</p>';
});

fetch(githubTreeUrl)
  .then(response => { if (!response.ok) throw new Error('Catalogo non disponibile'); return response.json(); })
  .then(data => ['medie', 'superiori', 'universita'].forEach(level => renderSubjects(data.tree, level)))
  .catch(() => document.querySelectorAll('[data-panel]').forEach(panel => {
    const container = panel.querySelector('.course-columns, .subject-grid');
    if (container) container.innerHTML = '<p class="level-intro">Il catalogo sarà disponibile a breve.</p>';
  }));

document.querySelector('.testimonials')?.remove();
document.querySelector('.form-note')?.insertAdjacentHTML('beforeend', ' <a href="privacy.html">Leggi l’informativa privacy.</a> Per gli studenti minorenni, si invita a contattare Edoardo tramite genitore o tutore.');

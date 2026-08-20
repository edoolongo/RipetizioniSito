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

const middleSchool = document.querySelector('[data-panel="medie"]');
if (middleSchool) {
  middleSchool.querySelector('.featured')?.remove();
  const card = middleSchool.querySelector('.subject-card');
  card.querySelector('h3').textContent = 'Algebra e geometria';
  card.querySelector('p').textContent = 'Numeri, frazioni, proporzioni, equazioni, geometria piana e problemi.';
}

document.querySelector('#chi-sono')?.insertAdjacentHTML('afterend', `
  <section id="perche" class="section why-section">
    <div class="section-label">Il mio approccio</div>
    <div class="why-heading"><h2>Perché scegliere<br /><em>le mie lezioni.</em></h2><p>Un lavoro continuativo, pensato per capire davvero e arrivare più preparati alle verifiche.</p></div>
    <div class="why-grid"><article><span>01</span><h3>Teoria insieme</h3><p>All’inizio di ogni lezione analizziamo la teoria, sciogliendo dubbi e collegando i passaggi importanti.</p></article><article><span>02</span><h3>Esercizi guidati</h3><p>Svolgiamo insieme gli esercizi lasciati per casa, con attenzione al ragionamento e agli errori più comuni.</p></article><article><span>03</span><h3>Allenamento e correzione</h3><p>Al termine propongo altri esercizi su cui esercitarsi, che correggiamo per verificare che tutto sia stato appreso.</p></article><article><span>04</span><h3>Verifiche più serene</h3><p>In vista di ogni verifica preparo simulazioni per allenarsi con la stessa impostazione della prova.</p></article><article><span>05</span><h3>Orari flessibili</h3><p>Massima disponibilità nel concordare giorno e orario, in presenza a Verona e provincia oppure online.</p></article></div>
  </section>`);

document.querySelector('.testimonials')?.remove();
document.querySelector('.form-note')?.insertAdjacentHTML('beforeend', ' <a href="privacy.html">Leggi l’informativa privacy.</a> Per gli studenti minorenni, si invita a contattare Edoardo tramite genitore o tutore.');

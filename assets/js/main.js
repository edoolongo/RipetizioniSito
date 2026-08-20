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

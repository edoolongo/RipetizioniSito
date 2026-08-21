const header = document.querySelector('.site-header');
if (header && !header.querySelector('[data-theme-toggle]')) {
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.type = 'button';
  button.dataset.themeToggle = '';
  button.setAttribute('aria-label', 'Cambia tema');
  header.append(button);
}

const themeToggle = document.querySelector('[data-theme-toggle]');
const themeStorageKey = 'ripetizioni-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

const getPreferredTheme = () => localStorage.getItem(themeStorageKey) || (systemTheme.matches ? 'dark' : 'light');
const applyTheme = theme => {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.textContent = theme === 'dark' ? 'Tema chiaro' : 'Tema scuro';
  }
};

applyTheme(getPreferredTheme());
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(themeStorageKey, nextTheme);
  applyTheme(nextTheme);
});
systemTheme.addEventListener?.('change', event => {
  if (!localStorage.getItem(themeStorageKey)) applyTheme(event.matches ? 'dark' : 'light');
});

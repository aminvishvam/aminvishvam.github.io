// Portfolio site vanilla JS
(function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const yearEl = document.getElementById('year');

  yearEl && (yearEl.textContent = new Date().getFullYear());

  // Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open');
    });
    navMenu.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement && e.target.tagName === 'A') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  // Theme persistence
  const STORAGE_KEY = 'va-theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || (!saved && prefersDark.matches)) {
    root.setAttribute('data-theme', 'dark');
  }
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  // Reveal on scroll (intersection observer)
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 }) : null;

  if (io) {
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
  } else { // fallback
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
  }

  // Smooth scroll (native behavior mostly ok, but offset for sticky header)
  function scrollToHash(evt) {
    if (evt.target instanceof HTMLAnchorElement) {
      const href = evt.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          evt.preventDefault();
          const top = el.getBoundingClientRect().top + window.scrollY - 72; // header offset
          window.scrollTo({ top, behavior: 'smooth' });
          history.pushState(null, '', '#' + id);
          el.focus({ preventScroll: true });
        }
      }
    }
  }
  document.addEventListener('click', scrollToHash);

  // Accessibility: update toggle label
  prefersDark.addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
})();

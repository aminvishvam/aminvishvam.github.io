// Portfolio site tech-enhanced JS
(function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
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

  // Always use dark theme
  root.setAttribute('data-theme', 'dark');

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
  } else {
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
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'smooth' });
          history.pushState(null, '', '#' + id);
          el.focus({ preventScroll: true });
        }
      }
    }
  }
  document.addEventListener('click', scrollToHash);


  // ===== TECH ENHANCEMENTS =====

  // Matrix rain background effect
  function createMatrixBackground() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = i * 20 + 'px';
      column.style.animationDelay = Math.random() * 20 + 's';

      let text = '';
      for (let j = 0; j < 100; j++) {
        text += chars[Math.floor(Math.random() * chars.length)];
      }
      column.textContent = text;
      matrixBg.appendChild(column);
    }

    document.body.appendChild(matrixBg);
  }

  // Typing animation for hero title
  function initTypewriter() {
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      const originalText = heroTitle.innerHTML;
      heroTitle.innerHTML = '';
      heroTitle.classList.add('typewriter');

      setTimeout(() => {
        heroTitle.innerHTML = originalText;
      }, 300);
    }
  }

  // Add glitch effect to name
  function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.gradient-text');
    glitchElements.forEach(el => {
      el.classList.add('glitch');
      el.setAttribute('data-text', el.textContent);
    });
  }

  // Command Palette (Cmd/Ctrl + K)
  function initCommandPalette() {
    const commands = [
      { name: 'Go to Summary', action: () => location.hash = '#summary' },
      { name: 'Go to Experience', action: () => location.hash = '#experience' },
      { name: 'Go to Achievements', action: () => location.hash = '#achievements' },
      { name: 'Go to Skills', action: () => location.hash = '#skills' },
      { name: 'Go to Contact', action: () => location.hash = '#contact' },
      { name: 'Download Resume', action: () => window.open('VishvamAmin.pdf', '_blank') },
      { name: 'Open GitHub', action: () => window.open('https://github.com/aminvishvam', '_blank') },
      { name: 'Open LinkedIn', action: () => window.open('https://www.linkedin.com/in/vishvam-amin/', '_blank') },
      { name: 'Send Email', action: () => window.location.href = 'mailto:vishvamamin55@gmail.com' }
    ];

    // Create palette UI
    const palette = document.createElement('div');
    palette.className = 'command-palette';
    palette.innerHTML = `
      <div class="command-palette-backdrop"></div>
      <div class="command-palette-modal terminal">
        <input type="text" class="command-palette-input terminal-prompt" placeholder="Type a command..." />
        <div class="command-palette-results"></div>
      </div>
    `;
    palette.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: none;
    `;
    document.body.appendChild(palette);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .command-palette-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(5px);
      }
      .command-palette-modal {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 600px;
        max-height: 400px;
        overflow: hidden;
      }
      .command-palette-input {
        width: 100%;
        padding: 1rem;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--terminal-green);
        color: var(--terminal-green);
        font-family: 'Courier New', monospace;
        font-size: 1rem;
        outline: none;
      }
      .command-palette-results {
        max-height: 300px;
        overflow-y: auto;
        padding: 0.5rem;
      }
      .command-palette-result {
        padding: 0.5rem;
        cursor: pointer;
        color: var(--text);
        transition: background 0.1s;
      }
      .command-palette-result:hover,
      .command-palette-result.selected {
        background: var(--bg-alt);
        color: var(--terminal-green);
      }
    `;
    document.head.appendChild(style);

    const input = palette.querySelector('.command-palette-input');
    const results = palette.querySelector('.command-palette-results');
    let selectedIndex = 0;

    function showPalette() {
      palette.style.display = 'block';
      input.value = '';
      input.focus();
      renderResults(commands);
    }

    function hidePalette() {
      palette.style.display = 'none';
    }

    function renderResults(filteredCommands) {
      results.innerHTML = filteredCommands.map((cmd, i) =>
        `<div class="command-palette-result ${i === selectedIndex ? 'selected' : ''}" data-index="${i}">${cmd.name}</div>`
      ).join('');
    }

    function executeCommand(index) {
      const filteredCommands = getFilteredCommands();
      if (filteredCommands[index]) {
        filteredCommands[index].action();
        hidePalette();
      }
    }

    function getFilteredCommands() {
      const query = input.value.toLowerCase();
      return commands.filter(cmd => cmd.name.toLowerCase().includes(query));
    }

    // Event listeners
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        showPalette();
      }

      if (palette.style.display === 'block') {
        if (e.key === 'Escape') {
          hidePalette();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const filteredCommands = getFilteredCommands();
          selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
          renderResults(filteredCommands);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedIndex = Math.max(selectedIndex - 1, 0);
          renderResults(getFilteredCommands());
        } else if (e.key === 'Enter') {
          e.preventDefault();
          executeCommand(selectedIndex);
        }
      }
    });

    input?.addEventListener('input', () => {
      selectedIndex = 0;
      renderResults(getFilteredCommands());
    });

    results?.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('command-palette-result')) {
        executeCommand(parseInt(target.dataset.index));
      }
    });

    palette.querySelector('.command-palette-backdrop')?.addEventListener('click', hidePalette);
  }

  // Terminal-style console message
  function showConsoleMessage() {
    console.log('%c' +
      '╔══════════════════════════════════════╗\n' +
      '║  VISHVAM AMIN - PORTFOLIO v2.0       ║\n' +
      '║  > System: Online                     ║\n' +
      '║  > Security: Active                   ║\n' +
      '║  > Mode: DARK                         ║\n' +
      '║                                       ║\n' +
      '║  Press Cmd/Ctrl + K for commands     ║\n' +
      '╚══════════════════════════════════════╝',
      'color: #00ffcc; font-family: monospace; font-size: 12px;'
    );
  }

  // Add tech card styling to project cards
  function enhanceCards() {
    document.querySelectorAll('.timeline__item, .achievement, .project-card').forEach(card => {
      card.classList.add('tech-card');
    });
  }

  // Convert skill chips to terminal style
  function enhanceSkills() {
    const skillGroups = document.querySelectorAll('.chip-group');
    skillGroups.forEach(group => {
      const title = group.querySelector('.chip-group__title');
      if (title) {
        title.innerHTML = `<span style="color: var(--terminal-green);">~/skills/</span>${title.textContent.toLowerCase().replace(/\s+/g, '_')}`;
      }
    });
  }

  // Add ASCII art logo
  function addASCIILogo() {
    const brand = document.querySelector('.brand');
    if (brand) {
      brand.innerHTML = `<span class="ascii-art" style="font-size: 1.2rem;">[ VA ]</span>`;
    }
  }

  // Add loading animation
  function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'tech-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <pre class="ascii-art" style="font-size: 0.8rem;">
 INITIALIZING PORTFOLIO SYSTEM...
 [████████████████████] 100%

 > Loading modules...
 > Establishing connection...
 > Rendering interface...

 SYSTEM READY
        </pre>
      </div>
    `;
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--bg);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeOut 0.5s ease-out 1.5s forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOut {
        to {
          opacity: 0;
          pointer-events: none;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(loader);

    setTimeout(() => {
      loader.remove();
    }, 2000);
  }

  // Animated counter for stats
  function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed

    counters.forEach(counter => {
      const animate = () => {
        const value = +counter.getAttribute('data-value');
        const data = +counter.innerText;
        const time = value / speed;

        if (data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        } else {
          counter.innerText = value;
        }
      };

      // Start animation when element is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  // Initialize all tech features
  function initTechFeatures() {
    showLoadingScreen();

    setTimeout(() => {
      createMatrixBackground();
      initTypewriter();
      addGlitchEffect();
      initCommandPalette();
      enhanceCards();
      enhanceSkills();
      addASCIILogo();
      showConsoleMessage();
      animateNumbers();

      // Add hint for command palette
      const hint = document.createElement('div');
      hint.className = 'cmd-hint';
      hint.innerHTML = '<kbd>Cmd/Ctrl</kbd> + <kbd>K</kbd> for commands';
      hint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 0.5rem 1rem;
        background: var(--bg-alt);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        font-size: 0.75rem;
        color: var(--text-dim);
        z-index: 100;
        opacity: 0.8;
      `;
      document.body.appendChild(hint);

      // Add keyboard sound effects (optional)
      document.addEventListener('keydown', () => {
        // Create a subtle click sound effect
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF');
        audio.volume = 0.05;
        audio.play().catch(() => {}); // Silently fail if autoplay is blocked
      });
    }, 100);
  }

  // Run tech features on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechFeatures);
  } else {
    initTechFeatures();
  }
})();
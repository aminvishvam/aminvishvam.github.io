# Vishvam Amin — Portfolio

Static, framework‑free personal portfolio site using semantic HTML, modern CSS (custom properties + responsive layout), and a small amount of vanilla JavaScript for navigation, theming (dark / light), and scroll reveal.

## Structure

- `index.html` — Main single‑page layout with sections: Hero, About, Experience, Projects, Skills, Contact.
- `styles.css` — Design system variables, responsive layout, components, dark mode.
- `script.js` — Mobile nav toggle, theme persistence, intersection observer fade‑ins, smooth scrolling.
- `VishvamAmin.pdf` — Resume (linked in nav + hero).

## Features

- Accessible: skip link, focus styles, semantic landmarks, reduced‑motion respect.
- Responsive: fluid typography, grid-based cards, mobile nav drawer.
- Theming: auto-detects system preference + localStorage persistence.
- Lightweight: no build step; just open in a browser.

## Usage

Open `index.html` directly in a browser or serve with a simple static server (recommended for correct relative paths and future expansion).

```bash
# Python 3
python3 -m http.server 8080
# Node (if installed)
npx serve .
```

Visit: http://localhost:8080

## Customization To-Do

Update placeholder content:

1. About section: location, current role / focus.
2. Experience: real company names, roles, dates, measurable bullet points, tech stack.
3. Projects: replace sample cards with real projects + links.
4. Skills: add accurate languages / frameworks / tooling.
5. Add an `og-image.png` (1200x630) for social sharing.
6. Optionally add analytics (privacy‑friendly) and a contact form backend.

## License

You control all personal content. Code can be reused (MIT suggested) — add a LICENSE file if desired.

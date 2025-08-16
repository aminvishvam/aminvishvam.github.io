# Vishvam Amin — Portfolio

Static, framework‑free personal portfolio site using semantic HTML, modern CSS (custom properties + responsive layout), and a small amount of vanilla JavaScript for navigation, theming (dark / light), and scroll reveal. Theme is monochrome (black / white) with accessible contrast.

## Structure

- `index.html` — Main single‑page layout with sections: Hero, Professional Summary, About, Experience, Technical Achievements, Skills, Contact.
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

## Experience Snapshot

Roles represented: Software Engineer II (LexisNexis), Team Lead (Lexis Connect), Front‑End Developer (Techrangle). Focus areas include:

- Micro‑frontend architecture (18+ MFEs) with shared libraries & deployment automation
- Microsoft 365 add‑ins (Word, Outlook, Teams) + AAD auth flows (WAM OIDC)
- AI / LLM integration (RAG pipelines: LangChain, vector retrieval, multi‑document ingestion)
- Cloud & DevOps: AWS (S3, ECS, Lambda, CloudFront, API Gateway), Azure (App Services, Functions, Terraform infra), blue‑green & canary releases
- Performance & DX: caching (Redis), pagination, component library governance, CI/CD optimization
- Accessibility & Compliance: WCAG AA practices, SOC 2 documentation support

## Remaining Enhancements (Roadmap)

1. Expand achievements with measurable impact metrics (time saved, % improvements).
2. Add social preview image `og-image.png` (1200x630) and update meta tags URL.
3. Optional analytics (privacy friendly) e.g. Plausible or self‑hosted solution.
4. Add print stylesheet / dedicated resume route.
5. Add lightweight service worker for offline caching (only if needed).
6. Consider contact form backend (Netlify Forms / serverless function) + spam mitigation (honeypot).

## License

You control all personal content. Code can be reused (MIT suggested) — add a LICENSE file if desired.

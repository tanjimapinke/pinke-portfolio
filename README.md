# Tanjima Abbas Pinke - Portfolio

> Modern Web Developer | Computer Science & Engineering Student

🌐 **Live Portfolio:** https://tanjimapinke.github.io/pinke-portfolio/


A modern, responsive personal portfolio site for Tanjima Abbas Pinke - a Computer Science
& Engineering student and AI-assisted web developer. Built as a static site with a
floating card visual language, full dark/light theming, and a strong focus on
accessibility and performance.

## Features

- Modern floating UI - layered cards, floating hero elements, pill navigation
- Full dark/light theme system with `localStorage` persistence and OS preference detection
- Responsive design, tested from small mobile up through large desktop
- Interactive project showcase with graceful image fallbacks
- Accessible navigation - semantic HTML, keyboard support, visible focus states, reduced-motion support
- AI-assisted development workflow, with every result personally reviewed, modified, and refined
- Built for GitHub Pages deployment - no build step, no backend, no dependencies beyond the CDN fonts/icons

## Technologies

- HTML5
- CSS3 (custom properties, Grid, Flexbox)
- JavaScript (vanilla, no frameworks)

## Sections

- Home / Hero
- About
- Skills
- Projects
- Education
- Achievements
- Contact

## Project structure

```
portfolio/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   │   ├── pinke.png
│   │   ├── favicon.png
│   │   └── projects/
│   │       ├── cafe-bloom.png
│   │       ├── hsc-science-hub.png
│   │       └── glowup.png
│   │
│   └── cv.pdf
│
└── README.md
```

## Local development

No build step is required. Open `index.html` directly in a browser, or serve the folder
with any static server, for example:

```bash
python -m http.server 8000
```

## Deployment

Deployed via GitHub Pages. Push the `portfolio/` folder contents to the repository and
enable GitHub Pages on the appropriate branch/folder in the repository settings.

## Notes on assets

- `assets/images/pinke.png` - profile photo (add this yourself)
- `assets/images/favicon.png` - small "TP" monogram icon used as the favicon
- `assets/images/projects/*.png` - project screenshots; if a file is missing, the site
  shows a clean placeholder instead of a broken image
- `assets/cv.pdf` - optional local copy of the CV; the site currently links to the CV on
  Google Drive

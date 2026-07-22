# Mojtaba Hajian — Personal Website

A single-page, self-contained portfolio for **Dr. Mojtaba Hajian** — AI/ML Systems Researcher & Engineer.
Semantic HTML + modern CSS + vanilla JavaScript. No build step, no dependencies.

## Positioning
> I design and build AI & machine-learning systems — from deep-learning architectures to scalable
> big-data analytics — and apply them to hard problems in medicine, neuroscience, and large-scale data.

## Run locally
Because publication data is embedded in JavaScript, you can simply **open `index.html`** in a browser.
For a fully faithful preview (fonts, relative paths), serve it over HTTP:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

## Structure
```
index.html                     # all content + sections
assets/css/styles.css          # design system (dark/light, tokens, components, responsive)
assets/js/main.js              # nav, theme toggle, reveal, counters, hero neural-net canvas
assets/js/publications.js      # publications data (edit here to add papers) + filtering
assets/img/                    # favicon + social-preview image
files/cv/                      # downloadable CVs (AI-ML, Medical AI, Big Data, Neuroscience)
files/publications/            # publication PDFs (linked from the Publications section)
```

## Editing content
- **Publications:** edit the `PUBLICATIONS` array at the top of `assets/js/publications.js`.
  Each entry: `title, authors, venue, year, type, status, themes[], pdf`. Newest first.
- **CVs:** replace the PDFs in `files/cv/` (keep the filenames, or update the links in `index.html`).
- **Text:** everything else lives directly in `index.html`.

## Design
- Dark-first, with a light-mode toggle (persisted in `localStorage`).
- Brand gradient: cyan → indigo → violet (`#22d3ee → #6366f1 → #a855f7`).
- Type: Space Grotesk (headings), Inter (body), JetBrains Mono (labels).
- All motion respects `prefers-reduced-motion`. WCAG-AA contrast in both themes.

## Deploy (GitHub Pages)
1. `git init && git add . && git commit -m "Personal website"`
2. Push to a GitHub repo (e.g. `mojtaba-hajian.github.io`).
3. Settings → Pages → deploy from `main` / root.
4. (Optional) add a custom domain via a `CNAME` file.

### Social preview image
The Open Graph image is `assets/img/og-image.svg`. Slack, Discord, Telegram and
most modern scrapers render SVG, **but LinkedIn and Facebook require a raster
image**. Before sharing there, export a PNG/JPG (1200×630) — e.g. open the SVG in
a browser and screenshot it, or `File → Export` from any vector editor — save it
as `assets/img/og-image.png`, and point the `og:image` / `twitter:image` meta
tags in `index.html` at the `.png`.

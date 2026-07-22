# Mojtaba Hajian — Personal Website

A single-page, self-contained portfolio for **Dr. Mojtaba Hajian** — AI/ML Systems Researcher & Engineer.
Semantic HTML + modern CSS + vanilla JavaScript. No build step, no dependencies.

## Positioning
> I design and build AI & machine-learning systems — from deep-learning architectures to scalable
> big-data analytics — and apply them to hard problems in medicine, neuroscience, cybersecurity, and large-scale data.

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
files/cv/                      # single downloadable general CV
files/publications/            # publication PDFs (linked from the Publications section)
```

## Editing content
- **Publications:** edit the `PUBLICATIONS` array at the top of `assets/js/publications.js`.
  Each entry: `title, authors, venue, year, type, status, themes[], pdf`. Newest first.
- **CV:** replace `files/cv/Mojtaba_Hajian_CV_AI-ML.pdf` (keep the filename, or update the two links in `index.html`). The public PDF should omit phone/home address and reference contacts — see privacy note below.
- **Text:** everything else lives directly in `index.html`.

## Design
- Dark-first, with a light-mode toggle (persisted in `localStorage`).
- Brand gradient: cyan → indigo → violet (`#22d3ee → #6366f1 → #a855f7`).
- Type: Space Grotesk (headings), Inter (body), JetBrains Mono (labels).
- All motion respects `prefers-reduced-motion`. WCAG-AA contrast in both themes.

## Deploy (GitHub Pages)
1. Commit your changes (this repo is already initialised).
2. Create a GitHub repo named **`MojHajian.github.io`** (a *user site*, under github.com/MojHajian) and push to it.
3. Settings → Pages → deploy from `main` / root. Live at `https://mojhajian.github.io/` (GitHub Pages URLs are always lowercase).
4. (Optional) add a custom domain via a `CNAME` file, then update the `canonical` / `og:*` URLs in `index.html`.

## Privacy notes
- The public Contact section and nav only link email + LinkedIn + Google Scholar — no phone number or home address anywhere on the page.
- The downloadable CV PDF is a **redacted** export: the source `.docx` (kept outside this repo, gitignored) has a home street address, phone number, and a References section with other people's personal emails. The published PDF drops the phone/street (keeps city/country only) and replaces References with "Available upon request." If you regenerate the PDF from a newer source `.docx`, reapply both redactions before publishing.
- `background/` (CVs, publications, presentation sources) is gitignored and must never be pushed.

### Social preview image
The Open Graph / Twitter image is **`assets/img/og-image.png`** (1200×630), wired up via the
`og:image` and `twitter:image` meta tags in `index.html` (absolute URLs, which LinkedIn and
Facebook require). The editable vector source is `og-image.svg` — if you change it, re-export a
1200×630 PNG to the same path.

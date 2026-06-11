# parissmith.com

Personal website for Paris Smith — gaming industry leader, investor, and advisor.

A modern, single-page static site built with plain HTML, CSS, and JavaScript. No build step or dependencies required.

## Structure

```
index.html        Page structure (all sections)
css/styles.css    Design system and layout
js/main.js        Nav, scroll animations, contact form stub
assets/           Favicon and (future) logo images
```

## Preview locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

The site is fully static — host it anywhere:

- **Netlify / Vercel**: drag-and-drop the folder or connect the repo
- **GitHub Pages**: push to a repo and enable Pages
- **Any web host**: upload the files to the document root

Point the `parissmith.com` DNS at your chosen host.

## TODO

- **Contact form**: submission is currently stubbed in `js/main.js`. Hook it up to Formspree (or a backend email endpoint) — see the comment in that file.
- **Logos**: the organization and investment cards use styled placeholder marks (`.logo-mark` elements in `index.html`). Swap each one for an `<img>` tag when official logo files are available.

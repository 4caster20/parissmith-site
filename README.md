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

## Contact form

The contact form forwards submissions by email to **psconsulting07@gmail.com** via
[Web3Forms](https://web3forms.com) (no server required).

To activate it:

1. Go to [web3forms.com](https://web3forms.com), enter `psconsulting07@gmail.com`, and verify via the email they send.
2. Copy the **access key** they provide.
3. In `index.html`, replace `REPLACE_WITH_WEB3FORMS_ACCESS_KEY` (the `access_key` hidden input) with that key.

That's it — submissions will then arrive in the Gmail inbox, with the sender's email set as the reply-to address.

## TODO

- **Logos**: the organization and investment cards use styled placeholder marks (`.logo-mark` elements in `index.html`). Swap each one for an `<img>` tag when official logo files are available.

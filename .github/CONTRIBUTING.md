# Contributing to Orvano

Thanks for your interest in contributing. Clear, well-scoped contributions are very welcome.

## Getting set up

Orvano is a static site with no build step. You only need a browser and, ideally, a simple
local web server (the catalog loads product data with `fetch`, which does not work from a
`file://` path).

1. **Fork** and **clone** the repository.
2. Serve the folder over HTTP, for example:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Then open `http://localhost:8000/` in your browser.
   (In VS Code, the "Live Server" extension works well too.)

## Project structure

- `index.html`, `catalog.html`, `about.html`, `services.html`, `contact.html` - page views
- `assets/css/` - global and catalog styles
- `assets/js/` - navbar and shared UI behavior
- `controllers/catalogController.js` - catalog rendering, filtering, sorting, pagination
- `models/products.json` - sample product data

## Making changes

1. Create a branch: `git checkout -b fix/short-description`
2. Keep changes focused. One feature or fix per pull request.
3. Match the existing style (semantic HTML, plain CSS, vanilla JS, no frameworks).
4. Test every page in the browser after your change, including the catalog filters,
   search, sort, and pagination.

## Pull requests

1. Push your branch and open a pull request against `main`.
2. Fill in the pull request template: what changed, why, and how you tested it.
3. Link any related issue (for example, `Closes #12`).

For security issues, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.

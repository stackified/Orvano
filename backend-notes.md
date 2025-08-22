## ORVANO Frontend – Backend Integration Notes

This repository contains a static, responsive frontend built in HTML/CSS/JS with a lightweight MVC-ish structure to make backend integration straightforward.

### Structure
- `index.html`, `about.html`, `services.html`, `contact.html` – page views
- `assets/css/style.css` – global, responsive CSS
- `assets/js/main.js` – UI interactions (menu, search modal, form, carousel)
- `controllers/appController.js` – data fetching + simple navigation helper
- `models/products.json` – sample data (seed/reference)
- `assets/images/*` – placeholder assets. Replace with CDN or static server paths

### Where to integrate
1. Product/catalog data
   - Replace `models/products.json` with API endpoints. Examples:
     - GET `/api/products` returns `{ products: [...], categories: [...] }`
   - In `controllers/appController.js`, change `fetch('models/products.json')` to your API URL and add auth headers if needed.
   - If using SSR (Node + Express + EJS/Pug), render products into the views and remove the client fetch.

2. Contact form
   - In `assets/js/main.js` hook `#contactForm` submit to POST to your backend:
     - POST `/api/contact` with `{ firstName, lastName, email, phone, subject, message }`
   - Validate on server, store in MongoDB, and optionally send an email (Nodemailer) to the support inbox.

3. Auth / Cart (future)
   - Nav icons are prepared. Add routes and handlers in Express and hydrate UI state from cookies/localStorage.

4. Assets
   - Serve static files with Express:
```js
app.use('/assets', express.static(path.join(__dirname, 'assets')));
```

### Suggested Backend Stack
- Node.js 20+, Express 4+
- MongoDB + Mongoose for products, categories, and orders
- Templating (optional): EJS/Pug/Handlebars, or keep it SPA-light with vanilla JS
- Validation: `zod` or `joi`
- Mailing: `nodemailer`

### API Sketch
```http
GET /api/health                     200 OK
GET /api/products                   200 { products: [...], categories: [...] }
GET /api/products/:id               200 { ...product }
POST /api/contact                   201 { id }
```

### SEO/Meta
- Update `<title>` and `<meta description>` per page.
- Serve optimized images (WebP/AVIF) and proper caching headers.

### Notes
- Replace placeholder images in `assets/images/` with production assets.
- Colors/typography follow the Fine Legends aesthetic to match the design brief.
- Keep class names stable for integration; avoid renaming without coordination.

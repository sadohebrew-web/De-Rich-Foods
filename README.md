# De-Rich Foodhub

Static site (single `index.html`) - deploy on Vercel as-is (no build step).

- `index.html`            the site
- `assets/hero/`          hero banners (landscape 1280/1920/2560, portrait 720/1080)
- `vercel.json`           long-term caching for /assets
- `design-source/`        editable source for the portrait banner (`hero-mobile.html`); re-export as 1080x1500 JPG if you change its text

# K-Bite Guide

Mobile web app for visitors learning how to eat Korean food. Runs as a Cloudflare Worker (`dist/server/index.js`).

## Dish guide pages (crawlable)

The app shows dish guides inside a single view at `/`, so search engines only see a few URLs.
`dist/server/dish-pages.js` publishes the same guidance as real pages:

- `/dishes` — all dishes grouped by category
- `/dishes/<category>` — category guide (11 categories)
- `/dish/<id>` — one page per dish (115)

`/sitemap.xml` lists them all. The data file `dist/server/dish-data.js` is generated from the app — after
adding or editing dishes in `index.js`, run:

    node scripts/build-dish-data.mjs

## AdSense

Ads load only when the `ADSENSE_CLIENT` Worker variable is set (app screen and guide pages).
While it is not set, the "Remove ads" purchase banner is hidden, because there are no ads to remove.

## Deploying (Cloudflare dashboard)

k-biteguide.com is deployed by pasting code in the Cloudflare dashboard, not from this repo's
Workers Builds (that build only serves the old root `index.html` on workers.dev / pages.dev).

`deploy/worker.js` is a single-file bundle of `dist/server/*` ready to paste:

1. Cloudflare dashboard → Workers & Pages → the worker attached to k-biteguide.com → Edit code
2. Replace the whole file with `deploy/worker.js` → Deploy
3. Keep the existing variables (ADSENSE_PUBLISHER_ID, OPENAI_API_KEY, payment links) — they are not in code.
4. Roll back from Deployments → previous version if anything looks wrong.

Rebuild the bundle after changes:

    npx esbuild dist/server/index.js --bundle --format=esm --platform=neutral --charset=utf8 --outfile=deploy/worker.js

`scripts/sync_live_2026_09.py` records how the repo was brought in line with the live site
(verified byte-identical for /, /about, /privacy, /contact, /partners, /buy, /ads.txt,
manifest, sw.js and icon before the new features were added).

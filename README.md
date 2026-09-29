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

## Deploying

The `k-bite-guide` Cloudflare Worker builds from `main` automatically (Workers Builds:
`npm run build` then `npx wrangler deploy`). `wrangler.jsonc` points at `dist/server/index.js`.
Secrets such as OPENAI_API_KEY and payment links live in the dashboard and survive deploys.

`deploy/worker.js` is the same code as one file, for pasting into the dashboard editor if ever needed.
Rebuild it after changes:

    npx esbuild dist/server/index.js --bundle --format=esm --platform=neutral --charset=utf8 --outfile=deploy/worker.js

`scripts/sync_live_2026_09.py` records how this code was brought in line with the version that was
serving k-biteguide.com in Sept 2026 (verified byte-identical for every existing route, including the
404 page, before the new features were added). The old static prototype is kept in `legacy/`.

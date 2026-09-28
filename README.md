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

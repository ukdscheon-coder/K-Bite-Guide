// Crawlable, one-URL-per-dish guide pages for k-biteguide.com.
//
// The app shows dish guides inside a single-page view at "/", so search engines
// (and the AdSense review) only ever see a handful of URLs. These routes publish
// the same guidance as real HTML pages:
//   /dishes              — index of every dish, grouped by category
//   /dishes/<category>   — category guide (shared etiquette + dish list)
//   /dish/<id>           — one dish: description, how to eat it, a Korean phrase
//
// Data comes from dish-data.js, generated from the app by
// scripts/build-dish-data.mjs, so the pages always match what the app shows.
import { dishes } from "./dish-data.js";

const SITE = "https://k-biteguide.com";

// Category guides. Written once per category so each dish page carries
// practical context beyond the one-line description.
export const categories = [
  {
    slug: "korean-bbq",
    title: "Korean BBQ",
    lede: "Meat, seafood and eel grilled at your table.",
    guide: [
      "At most Korean BBQ restaurants the grill is built into your table. Staff often start the cooking, turn the meat and cut it with scissors. Let them lead at first; you can take over once you see how they do it.",
      "Cooked meat is usually eaten as ssam: take a lettuce or perilla leaf, add a piece of meat, a little ssamjang, and garlic or chilli if you like, then fold it and eat it in one bite.",
      "Pork and chicken must be cooked all the way through. Premium beef is often grilled only briefly. If you are not sure whether something is ready, ask — the phrase on each dish page helps.",
      "Many BBQ places finish with fried rice or cold noodles (naengmyeon). Ask for them near the end of the meal.",
    ],
    ids: ["samgyeopsal", "samgyeopsal_bbq", "sogalbi", "hanwoo", "la_galbi", "bulgogi", "gopchang", "dakgalbi", "deunggalbi", "tteokgalbi", "jangeogui", "jogaegui"],
  },
  {
    slug: "stews-and-braises",
    title: "Stews and braised dishes",
    lede: "Jjigae, jjim and bubbling pots served to share.",
    guide: [
      "Jjigae (stew) usually arrives boiling in a stone or metal pot. It is served with a bowl of rice each; take a spoonful of stew and eat it with rice rather than drinking it like soup.",
      "Stone pots stay very hot for a long time. Do not touch the pot, and let each spoonful cool for a moment.",
      "Jjim (braised or steamed dishes) and hotpots are normally shared from the middle of the table. Use the serving ladle if there is one, and pick bones out onto the side plate.",
      "Stews are often topped up with rice or noodles at the end. Ask staff before adding anything to a pot they are still cooking.",
    ],
    ids: ["kimchijjigae", "sundubu", "doenjangjjigae", "budaejjigae", "cheonggukjang", "maeuntang", "agujjim", "haemuljjim", "jjimdak", "galbijjim", "maeun_deunggalbi_jjim", "gyeranjjim", "eomuk_tang"],
  },
  {
    slug: "soups",
    title: "Soups and gukbap",
    lede: "Guk, tang and soup-with-rice for any time of day.",
    guide: [
      "Korean soups (guk and tang) are eaten with a spoon, often with rice added straight into the bowl. Gukbap means the rice is already in the soup.",
      "Many clear beef or pork soups are served lightly seasoned on purpose. Salt, pepper, chopped spring onion or saeujeot (salted shrimp) are on the table so you can season it yourself — taste first.",
      "Kkakdugi (radish kimchi) is the classic side for these soups. Some people pour a little kimchi juice into the soup for extra flavour.",
      "Soups with bones, such as gamjatang or galbitang, come with an empty bowl for the bones. Picking meat off with your hands is normal.",
    ],
    ids: ["seolleongtang", "galbitang", "samgyetang", "gamjatang", "sundaeguk", "dwaejigukbap", "kongnamulgukbap", "haejangguk", "yukgaejang", "bokjiri", "dakhanmari", "chueotang", "sujebi", "tteokguk", "miyeokguk", "kimchi_mandu_guk", "tteok_mandu_guk"],
  },
  {
    slug: "noodles",
    title: "Noodles",
    lede: "Hot, cold, spicy and black-bean noodles.",
    guide: [
      "Long noodles such as naengmyeon are often cut with scissors before eating. Staff may offer to do it; it is not rude to say yes.",
      "Mix sauce-based noodles (bibim guksu, jajangmyeon) thoroughly before you start. For cold noodles, vinegar and mustard are usually on the table — add a little at a time.",
      "Slurping noodles is normal in Korea and nobody will mind.",
      "Chinese-Korean restaurants serving jajangmyeon and jjamppong often deliver, and many serve danmuji (yellow pickled radish) and raw onion with black-bean sauce on the side.",
    ],
    ids: ["naengmyeon", "bibim_guksu", "makguksu", "kongguksu", "kalguksu", "janchi_guksu", "jajangmyeon", "jjamppong", "kimbapcheongukramyeon"],
  },
  {
    slug: "rice-and-porridge",
    title: "Rice dishes, gimbap and porridge",
    lede: "Bibimbap, rolled rice and comforting juk.",
    guide: [
      "Bibimbap is meant to be mixed. Add gochujang a little at a time, mix everything evenly, then taste before adding more sauce.",
      "In a hot stone bowl (dolsot) the rice at the bottom turns crisp. Mix early, then scrape the crispy rice at the end.",
      "Gimbap is a finger food; you can eat pieces with chopsticks or your hands. It is sold everywhere from convenience stores to snack bars.",
      "Juk (porridge) is mild and often eaten when someone wants something gentle. It usually comes with small sides such as kimchi or soy-braised beef to add flavour.",
    ],
    ids: ["bibimbap", "dolsot_bibimbap", "saengchae_bibimbap", "ssambap", "kimchibokkeumbap", "gondeure_bap", "baekban", "nurungji", "gimbap", "chungmu_gimbap", "kkoma_gimbap", "yubuchobap", "jeonbokjuk", "hobakjuk", "dakjuk", "patjuk"],
  },
  {
    slug: "seafood-and-raw",
    title: "Seafood and raw dishes",
    lede: "Raw fish, marinated crab, grilled fish and spicy seafood.",
    guide: [
      "Korean raw fish (hoe) is usually eaten with a choice of dips: chogochujang (sweet-sour chilli sauce), soy sauce with wasabi, or ssamjang in a lettuce wrap. Try each to find your favourite.",
      "Marinated raw crab (gejang) is eaten by sucking the meat out of the shell and mixing the rich roe with rice in the shell. Gloves or a plastic bib may be provided.",
      "Grilled fish is served whole with bones in. Lift the flesh off the bone with chopsticks and put bones on the side plate.",
      "If you have a shellfish or seafood allergy, say so before ordering — broths and sauces often contain seafood even when the main ingredient is meat.",
    ],
    ids: ["hoe", "mulhoe", "ganjanggejang", "yangnyeomgejang", "yukhoe", "samhab", "saengseongui", "godeungeogui", "nakjibokkeum", "ojingeo_bokkeum"],
  },
  {
    slug: "pork-and-chicken",
    title: "Pork, chicken and fried chicken",
    lede: "Bossam, jokbal, spicy stir-fries and Korean fried chicken.",
    guide: [
      "Bossam (boiled pork) and jokbal (braised trotters) are shared platters, often ordered for delivery or with drinks in the evening. Wrap slices with cabbage or lettuce and add kimchi, garlic or saeujeot.",
      "Korean fried chicken comes plain (huraideu), sauced (yangnyeom) or half-and-half. Pickled radish cubes are served to cut through the richness.",
      "Spicy stir-fries such as jeyuk bokkeum are eaten with rice and often wrapped in lettuce like BBQ.",
      "Using your hands for chicken and ribs is completely normal; plastic gloves are often provided.",
    ],
    ids: ["bossam", "jokbal", "jeyuk_bokkeum", "yangnyeom_chicken", "dakgangjeong", "kkanpunggi"],
  },
  {
    slug: "pancakes-and-sides",
    title: "Pancakes (jeon), dumplings and shared plates",
    lede: "Savoury pancakes, mandu, japchae and tofu with kimchi.",
    guide: [
      "Jeon are savoury pancakes cut into pieces to share. Dip each piece lightly in the soy-vinegar sauce that comes with them.",
      "Pancakes and makgeolli (rice wine) are a classic pairing, especially on rainy days.",
      "Mandu (dumplings) can be steamed, pan-fried or served in soup. Filling is often very hot inside — bite a small corner first.",
      "Plates in the middle of the table are for everyone. Take a piece onto your own plate or rice bowl rather than eating directly from the shared plate for a long time.",
    ],
    ids: ["pajeon", "haemulpajeon", "kimchijeon", "bindaetteok", "modeumjeon", "hobakjeon", "saeujeon", "dongtaejeon", "mandu", "japchae", "dubukimchi"],
  },
  {
    slug: "street-food",
    title: "Street food and bunsik",
    lede: "Tteokbokki, fish cakes, sundae and hot sweet snacks.",
    guide: [
      "Street stalls and bunsik (snack) shops are quick and cheap. You usually order, pay and eat standing up or at a small counter.",
      "At fish-cake stalls, the broth is often free: take a paper cup and help yourself. Pay for the skewers you ate — the vendor may count your sticks.",
      "Hotteok, bungeoppang and fresh fillings are extremely hot inside. Wait a moment and bite from the edge.",
      "Tteokbokki spice levels vary widely. Ask for less spicy if you are unsure.",
    ],
    ids: ["tteokbokki", "odeng", "soondae", "sotteok_sotteok", "tteokkochi", "hotteok", "bungeoppang"],
  },
  {
    slug: "kimchi-and-banchan",
    title: "Kimchi and banchan (side dishes)",
    lede: "The small shared dishes that come with almost every meal.",
    guide: [
      "Banchan are the small side dishes placed on the table with your meal. They are shared by everyone at the table and are included in the price.",
      "Refills of banchan are usually free. You can ask politely, and at some restaurants there is a self-service counter.",
      "Take banchan onto your rice or eat them between bites of the main dish; you do not need to finish them all.",
      "Different kimchi suit different dishes: cabbage kimchi goes with almost everything, while kkakdugi (radish kimchi) is the classic partner for soups.",
    ],
    ids: ["baechu_kimchi", "kkakdugi", "oisobagi", "kongnamul_muchim", "sigeumchi_namul", "doraji_muchim"],
  },
  {
    slug: "desserts-and-drinks",
    title: "Desserts, rice cakes and drinks",
    lede: "Bingsu, tteok, traditional sweets, sikhye and makgeolli.",
    guide: [
      "Bingsu (shaved ice) is made to share. Mix the toppings into the ice as you go so every spoonful has some.",
      "Tteok (rice cakes) are chewy — take small bites, especially with children and older relatives.",
      "Sikhye (sweet rice drink) and sujeonggwa (cinnamon punch) are often served cold after a meal or at bathhouses.",
      "Makgeolli is an alcoholic rice wine. Shake or stir gently before pouring, and the legal drinking age in Korea applies.",
    ],
    ids: ["bingsu", "injeolmi", "songpyeon", "baekseolgi", "yakgwa", "sikhye", "sujeonggwa", "makgeolli"],
  },
];

const byId = new Map(dishes.map((d) => [d.id, d]));
const catOf = new Map();
for (const c of categories) for (const id of c.ids) if (byId.has(id)) catOf.set(id, c);
// Any dish added to the app later without a category still gets a page.
const uncategorised = dishes.filter((d) => !catOf.has(d.id)).map((d) => d.id);
if (uncategorised.length) {
  categories.push({
    slug: "more-dishes",
    title: "More Korean dishes",
    lede: "Other dishes covered in the K-Bite app.",
    guide: ["These dishes are covered in the K-Bite app. Each page explains what the dish is and how to eat it."],
    ids: uncategorised,
  });
  for (const id of uncategorised) catOf.set(id, categories[categories.length - 1]);
}

const LANG_LABEL = { ja: "Japanese", zhCN: "Chinese (Simplified)", zhTW: "Chinese (Traditional)", fil: "Filipino", th: "Thai", vi: "Vietnamese" };

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

const STYLE = `
:root{--bg:#101419;--card:#171d24;--line:#26303a;--text:#eef2f5;--muted:#9aa7b3;--accent:#ff6b4a;--accent2:#ffd08a}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.7 system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans KR",sans-serif}
a{color:var(--accent2)}
header.top{border-bottom:1px solid var(--line);background:#0c1014}
header.top .in{max-width:860px;margin:0 auto;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
header.top a.brand{color:var(--text);text-decoration:none;font-weight:800;font-size:18px}
header.top nav{display:flex;gap:16px;font-size:14px}
header.top nav a{color:var(--muted);text-decoration:none}
main{max-width:860px;margin:0 auto;padding:24px 16px 48px}
.crumbs{font-size:13px;color:var(--muted)}
.crumbs a{color:var(--muted)}
h1{font-size:32px;line-height:1.2;margin:10px 0 6px}
h2{font-size:21px;margin:30px 0 10px}
.ko{font-size:20px;color:var(--accent2);margin:0 0 14px}
.lede{font-size:18px;color:#d7dee4}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}
.tag{background:#222b35;border:1px solid var(--line);border-radius:999px;padding:3px 12px;font-size:13px;color:#cdd6de}
ol.steps{padding-left:22px}
ol.steps li{margin:6px 0}
.phrase{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
.phrase .k{font-size:22px;font-weight:700}
.phrase .e{color:var(--muted)}
.guide p{color:#d7dee4}
.cta{display:inline-block;margin-top:8px;background:var(--accent);color:#fff;text-decoration:none;font-weight:700;padding:11px 18px;border-radius:12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;padding:0;list-style:none}
.grid a{display:block;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px;text-decoration:none;color:var(--text)}
.grid a:hover{border-color:var(--accent)}
.grid small{display:block;color:var(--muted)}
figure{margin:18px 0}
figure img{width:100%;max-height:380px;object-fit:cover;border-radius:14px;background:var(--card)}
figcaption{font-size:12px;color:var(--muted)}
.note{font-size:13px;color:var(--muted);border-top:1px solid var(--line);margin-top:34px;padding-top:14px}
footer{max-width:860px;margin:0 auto;padding:0 16px 40px;font-size:13px;color:var(--muted)}
footer a{color:var(--muted);margin-right:14px}
@media(max-width:600px){h1{font-size:26px}}
`;

function layout({ title, description, path, body, jsonLd = [] }) {
  const url = SITE + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="K-Bite Guide">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#101419">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<meta name="google-adsense-account" content="ca-pub-9335333067725848">
<!--adsense-->
<style>${STYLE}</style>
${jsonLd.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n")}
</head>
<body>
<header class="top"><div class="in">
  <a class="brand" href="/">🍽️ K-Bite</a>
  <nav><a href="/dishes">All dishes</a><a href="/">Open the app</a><a href="/about">About</a></nav>
</div></header>
<main>
${body}
</main>
<footer>
  <a href="/about">About</a><a href="/privacy">Privacy</a><a href="/contact">Contact</a><a href="/partners">Partners</a>
  <p>K-Bite Guide helps visitors eat Korean food with confidence. Guides are general information; always tell restaurant staff about allergies.</p>
</footer>
</body>
</html>`;
}

function crumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + path })),
  };
}

function dishCard(d) {
  return `<li><a href="/dish/${d.id}">${esc(d.emoji)} ${esc(d.en.name)}<small>${esc(d.ko)}</small></a></li>`;
}

export function renderDish(id) {
  const d = byId.get(id);
  if (!d) return null;
  const c = catOf.get(id);
  const related = c.ids.filter((x) => x !== id).map((x) => byId.get(x)).filter(Boolean).slice(0, 6);
  const others = Object.entries(d.otherNames || {});
  const path = `/dish/${id}`;
  const title = `How to eat ${d.en.name} (${d.ko}) — K-Bite Guide`;
  const description = `${d.en.desc} Step-by-step: how to eat ${d.en.name}, plus a Korean phrase to ask restaurant staff.`;
  const body = `
<p class="crumbs"><a href="/">K-Bite</a> › <a href="/dishes">Dishes</a> › <a href="/dishes/${c.slug}">${esc(c.title)}</a></p>
<h1>${esc(d.emoji)} How to eat ${esc(d.en.name)}</h1>
<p class="ko">${esc(d.ko)}</p>
<p class="lede">${esc(d.en.desc)}</p>
<div class="tags">${d.en.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
${d.photo ? `<figure><img src="${esc(d.photo)}?width=900" alt="${esc(d.en.name)} (${esc(d.ko)})" loading="lazy"><figcaption>Photo: <a href="${esc(d.photo.replace("/wiki/Special:FilePath/", "/wiki/File:"))}" rel="noopener">Wikimedia Commons — see the file page for author and licence</a></figcaption></figure>` : ""}
<h2>How to eat it</h2>
<ol class="steps">${d.en.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
<h2>Ask the staff in Korean</h2>
<div class="phrase"><div class="k" lang="ko">${esc(d.phrase)}</div><div class="e">${esc(d.meaning)}</div></div>
${others.length ? `<h2>${esc(d.en.name)} in other languages</h2><ul>${others.map(([k, v]) => `<li>${esc(LANG_LABEL[k] || k)}: <span>${esc(v)}</span></li>`).join("")}</ul>` : ""}
<h2>${esc(c.title)}: what to know</h2>
<div class="guide">${c.guide.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
<p><a href="/dishes/${c.slug}">More about ${esc(c.title.toLowerCase())} →</a></p>
${related.length ? `<h2>Similar dishes</h2><ul class="grid">${related.map(dishCard).join("")}</ul>` : ""}
<h2>At the restaurant?</h2>
<p>Open the K-Bite app to search ${dishes.length} dishes by name or ingredient, or scan a menu photo to find the dish name first.</p>
<a class="cta" href="/">Open K-Bite</a>
<p class="note">Spice levels, ingredients and serving style vary between restaurants. If you have an allergy or dietary requirement, tell the staff before ordering.</p>`;
  return layout({
    title,
    description,
    path,
    body,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `How to eat ${d.en.name} (${d.ko})`,
        description: d.en.desc,
        inLanguage: "en",
        mainEntityOfPage: SITE + path,
        ...(d.photo ? { image: d.photo } : {}),
        publisher: { "@type": "Organization", name: "K-Bite Guide", url: SITE },
      },
      crumbLd([["K-Bite", "/"], ["Dishes", "/dishes"], [c.title, `/dishes/${c.slug}`], [d.en.name, path]]),
    ],
  });
}

export function renderCategory(slug) {
  const c = categories.find((x) => x.slug === slug);
  if (!c) return null;
  const list = c.ids.map((x) => byId.get(x)).filter(Boolean);
  const path = `/dishes/${slug}`;
  const body = `
<p class="crumbs"><a href="/">K-Bite</a> › <a href="/dishes">Dishes</a></p>
<h1>${esc(c.title)}: how to eat them in Korea</h1>
<p class="lede">${esc(c.lede)}</p>
<div class="guide">${c.guide.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
<h2>${list.length} dishes in this guide</h2>
<ul class="grid">${list.map(dishCard).join("")}</ul>
<h2>Other food guides</h2>
<ul class="grid">${categories.filter((x) => x.slug !== slug).map((x) => `<li><a href="/dishes/${x.slug}">${esc(x.title)}<small>${esc(x.lede)}</small></a></li>`).join("")}</ul>`;
  return layout({
    title: `${c.title} — how to eat them in Korea | K-Bite Guide`,
    description: `${c.lede} Practical tips for visitors and a guide to ${list.length} dishes.`,
    path,
    body,
    jsonLd: [crumbLd([["K-Bite", "/"], ["Dishes", "/dishes"], [c.title, path]])],
  });
}

export function renderIndex() {
  const body = `
<p class="crumbs"><a href="/">K-Bite</a></p>
<h1>Korean food guide: ${dishes.length} dishes and how to eat them</h1>
<p class="lede">What each dish is, how Koreans eat it, and a phrase to ask restaurant staff — grouped by type of food.</p>
${categories.map((c) => `<h2><a href="/dishes/${c.slug}">${esc(c.title)}</a></h2><p>${esc(c.lede)}</p><ul class="grid">${c.ids.map((x) => byId.get(x)).filter(Boolean).map(dishCard).join("")}</ul>`).join("\n")}`;
  return layout({
    title: `Korean food guide: ${dishes.length} dishes and how to eat them | K-Bite Guide`,
    description: `A visitor's guide to ${dishes.length} Korean dishes — BBQ, stews, noodles, street food and more — with how to eat each one and a Korean phrase for restaurant staff.`,
    path: "/dishes",
    body,
    jsonLd: [crumbLd([["K-Bite", "/"], ["Dishes", "/dishes"]])],
  });
}

// Returns a Response for dish routes, or null if the path is not a dish route.
// adsenseClient: when set, the AdSense script is added (guide pages are content pages).
export function handleDishRoute(pathname, adsenseClient = "") {
  let html = null;
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/dishes") html = renderIndex();
  else if (p.startsWith("/dishes/")) html = renderCategory(p.slice(8));
  else if (p.startsWith("/dish/")) html = renderDish(p.slice(6));
  else return null;
  if (!html) return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  const ads = adsenseClient
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(adsenseClient)}" crossorigin="anonymous"></script>`
    : "";
  return new Response(html.replace("<!--adsense-->", ads), {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}

export function dishSitemapPaths() {
  return ["/dishes", ...categories.map((c) => `/dishes/${c.slug}`), ...dishes.map((d) => `/dish/${d.id}`)];
}

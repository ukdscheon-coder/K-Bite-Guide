"""Bring dist/server/index.js in line with what k-biteguide.com serves (Sept 2026),
reconstructed by diffing the live responses against the repo:
  1. every HTML page gets the AdSense account tag + canonical link before </head>
  2. the empty 'Ad space reserved' slot on the home screen is removed
  3. the search screen's empty-state sponsor box is replaced by a 'Find a dish' help text
  4. only / and /index.html serve the app; any other unknown path returns a small 404 page
"""
import re, sys
p = sys.argv[1]
s = open(p, encoding="utf-8").read()
if "function withHeadTags(" in s:
    print("already synced"); sys.exit(0)

b = '      <div class="ad-slot" data-ad-slot>\n        <span data-i="adLabel">Ad space reserved</span>\n      </div>\n'
assert s.count(b) == 1, "ad slot"
s = s.replace(b, "      \n")

m = re.search(r'      <section class="search-empty sponsor-card" id="searchEmpty"[\s\S]*?</section>\n', s)
assert m, "search empty"
s = s[:m.start()] + '      <section class="search-empty" id="searchEmpty" aria-label="Search help"><h2>Find a dish</h2><p>Try a dish name or ingredient, such as bibimbap, tofu or pork belly. If nothing matches, shorten your search or return home to try a photo.</p></section>\n' + s[m.end():]

helper = '''function withHeadTags(page, pathname) {
  const tags = '<meta name="google-adsense-account" content="ca-pub-9335333067725848"><link rel="canonical" href="https://k-biteguide.com' + pathname + '">';
  return page.replace(/\\n?<\\/head>/, "\\n" + tags + "\\n</head>");
}

export default {'''
assert s.count("\nexport default {") == 1
s = s.replace("\nexport default {", "\n" + helper, 1)

old = "      return new Response(pages[url.pathname], {"
assert s.count(old) == 1
s = s.replace(old, "      return new Response(withHeadTags(pages[url.pathname], url.pathname), {")

old = "    return new Response(monetizedHtml, {"
assert s.count(old) == 1
s = s.replace(old, """    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return new Response(NOT_FOUND_HTML, { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
    }
    return new Response(withHeadTags(monetizedHtml, url.pathname), {""")
s = s.replace("\nfunction withHeadTags(", '\nconst NOT_FOUND_HTML = \'<html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | K-Bite Guide</title><main><h1>Page not found</h1><a href="/">Open K-Bite Guide</a></main></html>\';\n\nfunction withHeadTags(', 1)
open(p, "w", encoding="utf-8").write(s)
print("synced")

# GHL asset checklist

Every file `offer.html` and `guide.html` reference. Upload each to the GHL
media library, paste the URL it gives you into the third column, and send the
filled-in table back — that is everything needed to rewrite the paths.

**38 files, ~1.58 MB total.** Generated from the markup, not by hand,
so nothing referenced is missing from this list.

## Two that need care

**`assets/dale headshot.png` has a space in its filename.** Most media
libraries rename or URL-encode that on upload (`dale%20headshot.png` or
`dale-headshot.png`). Whatever it becomes is fine — just paste back the exact
URL you get.

**`assets/fonts/vinyl-regular.woff2` is a web font, not an image.** Fonts are
fetched under CORS rules that images are not: if GHL's CDN does not send an
`Access-Control-Allow-Origin` header, the browser refuses the file and the
display face silently falls back. Two ways round it if that happens — host
the font elsewhere with permissive CORS, or inline it in the CSS as a base64
`data:` URI, which sidesteps CORS entirely because it is never a separate
request. Say the word and I will produce the inlined version.

---

## Brand

| File | Size | GHL URL |
|---|---|---|
| `assets/favicon.png` | 8 KB | |
| `assets/logo-black.png` | 62 KB | |
| `assets/logo-white.png` | 49 KB | |

## Dale + testimonials

| File | Size | GHL URL |
|---|---|---|
| `assets/dale headshot.png` | 347 KB | |
| `assets/testimonials/review-1.png` | 33 KB | |
| `assets/testimonials/review-2.png` | 27 KB | |
| `assets/testimonials/review-3.png` | 25 KB | |
| `assets/testimonials/review-4.png` | 18 KB | |
| `assets/testimonials/review-5.png` | 21 KB | |
| `assets/testimonials/review-6.png` | 17 KB | |

## Case-study & client logos

| File | Size | GHL URL |
|---|---|---|
| `assets/casestudylogos/Midtown.svg` | 91 KB | |
| `assets/casestudylogos/logo-69-golf.png` | 8 KB | |
| `assets/casestudylogos/logo-barsys.png` | 10 KB | |
| `assets/casestudylogos/logo-berkey.png` | 47 KB | |
| `assets/casestudylogos/logo-buddha-pants.png` | 51 KB | |
| `assets/casestudylogos/logo-bumpology.png` | 59 KB | |
| `assets/casestudylogos/logo-clearshield.svg` | 1 KB | |
| `assets/casestudylogos/logo-emerald-plastics.png` | 21 KB | |
| `assets/casestudylogos/logo-envi-eheat.png` | 27 KB | |
| `assets/casestudylogos/logo-fuel-pro.png` | 12 KB | |
| `assets/casestudylogos/logo-gutterglove.png` | 53 KB | |
| `assets/casestudylogos/logo-hk-army.png` | 23 KB | |
| `assets/casestudylogos/logo-hydroh.png` | 29 KB | |
| `assets/casestudylogos/logo-magic-brand.png` | 8 KB | |
| `assets/casestudylogos/logo-mend.svg` | 6 KB | |
| `assets/casestudylogos/logo-over-and-back.png` | 90 KB | |
| `assets/casestudylogos/logo-pacific-doorware.png` | 45 KB | |
| `assets/casestudylogos/logo-patriot-crew.png` | 15 KB | |
| `assets/casestudylogos/logo-peregrune.png` | 72 KB | |
| `assets/casestudylogos/logo-riff-raff.png` | 17 KB | |
| `assets/casestudylogos/logo-sanzo.svg` | 4 KB | |
| `assets/casestudylogos/logo-synnutra.png` | 77 KB | |
| `assets/casestudylogos/logo-temp-tooth.png` | 76 KB | |
| `assets/casestudylogos/logo-therapet.png` | 52 KB | |
| `assets/casestudylogos/logo-velocity-lacrosse.png` | 45 KB | |
| `assets/casestudylogos/logo-xpand.png` | 26 KB | |
| `assets/casestudylogos/logo-zestt-organics.png` | 25 KB | |

## Fonts

| File | Size | GHL URL |
|---|---|---|
| `assets/fonts/vinyl-regular.woff2` | 20 KB | |

# Brainy Brands — Offer page

Self-contained. Everything this page needs is in this folder; it reads
nothing from the parent site and the parent reads nothing from here. Iterate
on it freely without touching `index.html`, `landing.html` or `vsl.html`.

```
offer/
  index.html
  css/offer.css
  assets/            logo, dale.jpg, video, poster, favicon
  assets/fonts/      vinyl-regular.woff2
  assets/testimonials/   <- your Upwork screenshots
```

Serve the whole site from the repo root and open `/offer/`:

```bash
python3 .claude-serve.py    # then http://localhost:8080/offer/
```

## What you need to drop in

| Where | What | Happens if missing |
|---|---|---|
| `assets/testimonials/testimonial-1..6.png` | Upwork review screenshots | Labelled grey slot, never a broken image |
| `assets/logo-{temptooth,zestt,patriotcrew,magicbrand,midtown,emerald}.png` | Amazon client logos | Falls back to the brand name in type |
| `[[VSL_URL]]` in `index.html` | Real CDN video URL | Plays the local review copy |
| `[[PIXEL_ID]]`, `[[CALENDAR]]` | Meta pixel, calendar link | Pixel no-ops; form shows the confirm panel |

## Two things that need a decision, not a design pass

**1. Two guarantees are live at once.** `go.brainyamz.com/offer-7` currently
says *"15–25% waste reduction within 30 days"* with a *30-day satisfaction
guarantee, full refund of management fee*. `FUNNEL-AND-SITEMAP.md` — the
locked source of truth, confirmed by Dale — says *"25% ad spend reduction in
30 days, or your money back, or we work for free until we hit that target."*
Those are different promises. This page uses the locked wording. Pick one and
change it in `FUNNEL-AND-SITEMAP.md` first, then everywhere.

**2. The Vinyl licence.** The `.otf` supplied carries no trademark, foundry,
designer or licence metadata, and its readme says it came from a free-font
aggregator. Vinyl is a commercial T-26 face distributed through Adobe Fonts.
Free-font sites routinely repackage commercial faces without a licence, and a
desktop licence wouldn't cover webfont embedding anyway. If you have Creative
Cloud, make an Adobe Fonts web project and swap the `@font-face` block for
their `<link>` — nothing else on the page changes. Worth settling before this
is public.

Also, from the brand pack: `BrainyBrands_PrimaryLogo*.svg` sets the wordmark
as live `<text>` in Vinyl instead of outlined paths, so it renders in a
fallback font anywhere Vinyl isn't installed. The PNG is used here for that
reason. Ask for an outlined SVG.

## Not carried over from offer-7, deliberately

- The *"When You Sign Up For The PPC Growth Engine Today, You're Going To
  Get:"* block. You flagged it as repeating what's above; it restates the
  same deliverables a second time at greater length. Section 3 says it once.
- *"What I can and can't guarantee"* — removed as asked.
- `$1,499 down to $497` pricing and the `180+ Successful Amazon Brands`
  figure. Neither is in the locked file, so neither is on the page.

## Verified

111 text nodes, zero contrast failures. Every token was solved against the
**darkest** ground it actually sits on, not the lightest — the first pass
passed on white and failed at 4.29 on the tinted bands, which is where most
of the small type lives. No radius, no horizontal overflow at 390 or 1280.
Form blocks blank and 5-of-6, fires `Lead` once, writes `source: "offer"`.
Vinyl confirmed loading and measurably distinct from its fallbacks.

---

# Revision 2

## Typeface changed: Vinyl is out of the running text

You said you didn't like it in use, and the objection holds up technically:
Vinyl is a **single-weight** display face, so it can't do weight contrast —
which is most of what makes a page feel expensive. It also has **no arrow
glyph** (the `→` in the case metrics was falling back mid-string), and at
heading sizes it reads more record-sleeve than premium service.

Display is now **Archivo 800**, the face `DESIGN.md` already selected and
justified for this brand. Vinyl is still loaded and available as `.vinyl` for
accents, and the logo lockup is still set in it, so the brand link is intact.

## Contrast

"Everything looks white" was fair — v1 was white plus one tint. There are now
three grounds doing work: **white** (majority), **full black** for the two
moments that must land (the guarantee at the top, the urgency + form at the
bottom), and a light band. On black the accent goes back to full Amazon
orange; it only had to be darkened for the white sections.

## The results section now leads with the cut

The ad-spend reduction is the promise the page makes, so it's the headline
figure on every row and revenue is demoted to a supporting line: *"And
revenue went $90K → $120K/mo."* Previously they were peers, which buried the
thing the offer is actually about. Emerald Plastics added as a fifth row.

## Assets, all real now

| | |
|---|---|
| Headshot | `assets/dale headshot.png` — replaces the VSL frame crop |
| Case-study logos | five, trimmed of transparent margin and normalised to a common height |
| Reviews | six, cropped from your screenshots |

**Two of your logo files are mislabelled at source.** In the case-study
folder, `TempTooth.png` is actually the **Emerald** mark, and
`Layer_68_2.avif` is the real **Temptooth** logo. I found this by rendering
them and mapped them correctly here, but it's worth fixing in the folder.

**The review screenshots were two-up pairs.** At 1640px wide they'd have been
unreadable scaled to a phone, so each was split down the middle into single
cards and the best six selected — all Amazon/PPC specific, all complete
sentences. Originals are preserved in `assets/testimonials/originals/`.

**One logo is missing transparency.** `logo-temp-tooth.png` has a baked-in
white background (100% opaque vs ~20-25% for the others), which is why the
results section sits on white rather than the tinted grey — on a tint it
rendered as a visible white box. A transparent PNG would free that up.

## Copy changes you asked for

- "Restructured in a year" → **"in months, or a year"**
- Added **"You want results in 30 days"** to the qualify list
- Dale's method line is now *"I started doing it manually, with the
  methodology I explain in the video above. Spend dropped and sales went up."*
- Added the **$12M** header over the results
- Added urgency: limited accounts, serious brands only, and the no-show rule
- Added a **six-question FAQ** pulled from offer-7

## A third guarantee turned up

offer-7's FAQ answers "what if I don't see results" with *"we refund your
entire management fee, no questions asked"* — a **satisfaction** guarantee,
different again from both the locked performance guarantee and offer-7's own
"15–25%" body claim. That's three versions in circulation. This page uses the
locked wording in all three places it appears. Reconcile in
`FUNNEL-AND-SITEMAP.md` first.

## Two bugs caught by the sweep, not by eye

1. **The form was invisible.** Moving the apply section onto black left the
   labels inheriting `--ink` on `--ink` — 1:1 contrast. They were in the DOM
   the whole time. Fields are now white-on-black.
2. **The headshot ignored its aspect ratio.** The `<img>` carries
   width/height attributes for layout stability, and without `height: auto`
   those win over `aspect-ratio` — the square source rendered 272×512 instead
   of the intended 4:5 crop.

## Verified

128 text nodes, **zero contrast failures**, at 390px with every FAQ open. No
horizontal overflow at 390 or 1280. All five logos, all six reviews and the
headshot confirmed loading. Form blocks blank and 5-of-6, fires `Lead` once.

---

# Revision 3

## Hero

Down to two things: the guarantee and one button. Removed the grey qualifier
line and the three Upwork stat bullets.

**On colour** — the orange headline with blue accents elsewhere was reading
as "Amazon brand colours", which is the generic look you flagged. The
headline is now **white**, and scale carries it. Orange survives in exactly
one place: the button. So the only coloured thing on the screen is the thing
you're meant to press. Restraint is most of what reads as premium; two brand
colours competing is what reads as a template.

**On spacing** — it was off because five children were stacked into one
vertical rhythm with no hierarchy between them. With two, the interval can be
deliberate rather than averaged.

**The qualifier**: gone from the hero, and I'll stop raising it. It hasn't
left the page — `FUNNEL-AND-SITEMAP.md` calls it non-optional wherever the
number appears, so the full terms still sit with the guarantee restatement
and in the FAQ, and the button itself says "See if you qualify".

## New: "Some accounts we've worked on"

Logo strip directly under the hero, greyscaled at 55% so it reads as
provenance rather than decoration, full opacity on hover.

## Deliverables

Titles only, no descriptions:

```
01  Deep-dive account audit
02  Campaign optimization
03  Daily bid management
04  Transparent reporting
05  Risk-free partnership
```

Set at display weight so the list itself is the design. The paragraphs under
each were restating what the section heading already said.

## Guarantee restatement

Now reads **"And if you qualify, all of it is backed by this"**.

## Dale

Cut the junior-manager sentence and the audits-it/manages-it sentence
entirely. Now: $2M of his own money learning Amazon → did it for himself
first → now does it on 200+ accounts. The rank is left to speak for itself in
the stat row.

**Portrait is square everywhere**, not a 4:5 crop. On mobile it sits *beside*
the heading at ~104px rather than stacking full-width above it — a full-bleed
portrait was eating the whole first screen of the section. Copy and stats run
full width underneath, which is the desktop shape you said you liked,
compressed.

One bug that came with that layout: `display: contents` promotes the
paragraphs to grid items, so the grid row-gap and the `p + p` margin were
both applying and opening ~50px holes between lines. Zeroed the margins and
let the gap own the spacing.

## Audit framing

The CTA stays "See if you qualify", but the surrounding copy now sells the
**free audit** and what it gives you: *"twenty minutes with Dale, live in your
account, showing you exactly where the money's going and what the next steps
are. Whether or not you work with us, you leave knowing what to fix."*

## Verified

118 nodes on mobile, 117 on desktop, **zero contrast failures** on both, with
every FAQ forced open. No horizontal overflow at 390 or 1280. Portrait
confirmed square at both sizes (104×104 / 380×380). All five strip logos
loading.

---

# Revision 4 — your FAQ copy + the v2 reviews

## Reviews swapped

The six in `assets/testimonials/` are now from `testimonialsv2` — the full,
uncut reviews rather than the cropped two-up cards. Picked for PPC and
results specificity:

1. **Amazon Full Scope A to Z** — "proficient with Amazon advertising and *increased our sales significantly*… A++"
2. **Amazon PPC expert** — starting out with PPC *or* scaling with a larger daily budget; monthly updates, clear KPIs
3. **Amazon Expert Consultation** — very responsive, detail-oriented, sells scientific instruments
4. **Amazon Consulting** — "expert in the Amazon e-commerce space… starting another contract with him soon"
5. **30 minute consultation** — "will definitely rehire Dale"
6. **30 minute consultation** — "you'll breathe easier"

Old crops archived in `assets/testimonials/originals-v1/`.

**Three of them carried Upwork's "less" toggle** at the end of the last line
— the leftover from an expanded more/less link. Removed by finding the last
contiguous ink run on the final text row and checking it was narrow (29px)
and preceded by a real word gap. The three that ended in actual words
(4–11px runs, no gap) were correctly left alone.

**Sizing.** These are paragraphs of body text in ~770px-wide screenshots, so
at the old three-up they landed at 335px — a 44% downscale putting the review
text at roughly 7px. Now two-up at ~67%. On a phone even one column is a 45%
downscale, so each review links to the full-size image with a "Tap to read
full size" strip. The gist (green job title, orange stars, "5.0", a block of
type) still reads as a genuine Upwork review at thumbnail size; the tap is
there for anyone who wants to read it.

## FAQ replaced with your copy

All eight, verbatim. The agency-comparison answer keeps its three bullets.

## >>> ONE THING TO CHECK BEFORE THIS GOES LIVE <<<

Your "What's the guarantee?" answer says:

> Cut your ad spend by 25% in the first 30 days without losing sales —
> **scaling to 50% by day 60–90.**

That reintroduces the 50% escalation. `FUNNEL-AND-SITEMAP.md` records it as
deliberately dropped:

> The 50%-by-day-60–90 escalation was dropped on Aug 8, 2026 (Paolo's call)
> — carrying two numbers meant the bigger one always led visually even when
> it didn't lead grammatically, which is the exposure this rule exists to
> prevent.

It was also on the DO-NOT-INCLUDE list in the original build brief ("Any 50%
figure, pending Dale's confirmation").

**The page now states the guarantee two different ways:**

| Where | What it says |
|---|---|
| Hero + guarantee panel | 25% in 30 days, or money back, or we work free |
| FAQ | 25% in 30 days **without losing sales**, scaling to **50% by day 60–90** |

Both are on screen, about one scroll apart. I've used your copy as written
rather than silently harmonising it, because which version is correct is a
commercial and legal call, not an editorial one. Two clean fixes:

- **Keep the escalation** → update `FUNNEL-AND-SITEMAP.md` and the hero /
  guarantee panel to match, so the page says one thing; or
- **Drop it** → trim the FAQ answer to the locked wording.

"Without losing sales" is also a new performance claim that isn't in the
locked sentence — worth a deliberate yes/no rather than arriving by accident.

## Verified

124 nodes desktop, 131 mobile, **zero contrast failures** on both with all
eight FAQs open. No horizontal overflow at 390 or 1280. All six reviews
loading. Tap-to-enlarge confirmed showing on mobile only.

---

# Revision 5

## Changes

| | |
|---|---|
| Hero button | "See if you qualify with a free audit"; grey line under it removed |
| Hero remedy line | Was 0.42em (read as fine print), now 0.56em — the "or your money back" clause *is* the promise, not a footnote |
| Above the VSL | "Here's how we saved **$12M** in ad spend" + "The free guide to exactly what we did for our clients" |
| Case studies | Now headed "Case studies" / "These are the results we've gotten for our clients" |
| Guarantee panel | "This is guaranteed" — "if you qualify" dropped from the heading; the "offered after the audit…" paragraph removed |
| Qualify lists | Rewritten, see below |
| Apply section | "Book your free audit"; the limited-accounts / serious / no-show bullet list removed; the form no longer implies you must qualify to submit |
| CTAs | Four now read "See if you qualify with a free audit"; the form button is "Book my free audit" |

## The FAQ contradiction is resolved

Your call: one promise, 50% as an observation. The answer now ends *"Clients
commonly go on to see 50% by day 60–90, but 25% in 30 days is the number we
guarantee."* All three guarantee statements on the page agree on the 25%, and
50% appears once, explicitly marked as not the guarantee.

## >>> ONE WORD CHANGED FROM YOUR COPY <<<

You wrote:

> If your ad spend **is** reduced by 25% or more in 30 days, we'll give you
> your money back or work for free until we get to that target.

That's inverted — as written it promises a refund when we **succeed**, and
offers to keep working free after already hitting the target. It reads as a
typo so I've set it to **isn't**. If you meant something else, say so,
because that sentence is the offer.

Separately: you called it a "30-day **satisfaction** guarantee" but defined it
by a performance threshold (25%). Those are different instruments. I used your
wording, but "satisfaction" invites a different claim than "we missed the
number" — worth a deliberate choice.

## Qualify lists

**For you if:** serious about growing the brand *or* cutting what it costs to
· wants results in 30 days · $100K+/month revenue and $10K+/month ad spend ·
**would rather hand the ads off entirely and get their time back**.

That last one used to be a *dis*qualifier. You're right that it's backwards —
taking it off their hands is the product.

**Isn't for you if:** under $5,000/month on ads · wants the cheapest option ·
wants guaranteed sales (nobody can promise that) · not open to restructuring.

Note the **$5K–$10K band is deliberately neither**: the qualifier says $10K+,
the disqualifier says under $5K. That matches your steer about not turning
people off before the form.

## Another contrast bug the sweep caught

I set `$12M` in the video header to the full-strength orange, on the
assumption that header sat on the black band. It doesn't — it's on white, and
that orange measured **2.1:1** there. Reverted to the white-ground orange
(6.8:1). Light orange on white looks fine at a glance, which is exactly why it
needs measuring.

## Verified

116 nodes, **zero contrast failures** at 390px with all eight FAQs open. No
overflow. Hero CTA at 382px against an 844px fold. Rules list confirmed gone;
all CTA labels confirmed updated.

---

# Revision 6

**Guarantee statement set big.** Moved out of inline styles into
`.guarantee-statement` and sized to `clamp(1.5rem, 1.05rem + 2.3vw, 3.05rem)`
— 46px on desktop, up from a 2.3rem cap. It's the largest block of type on
the page after the hero, which is right: this sentence is the offer.

The "This is guaranteed" heading above it steps down to ~21px in the muted
tone. That inverts the usual heading/body hierarchy on purpose — a two-word
lead-in shouldn't be louder than the thing it introduces, and previously it
was.

**CTA label** is now "Book a free audit to see if you qualify!" on all four
link CTAs (hero, video section, guarantee, sticky bar). Left alone: the
header nav button ("See if you qualify" — the long label wraps badly in that
small box) and the form's submit button ("Book my free audit" — it's the
action itself, not a link to it). Say the word if you want those matched too.

Also took the opportunity to delete the last inline `style=` attribute in that
section.

## Verified

116 nodes, zero contrast failures at 1280. Statement measures 17.7:1 white on
the ink ground; the orange "30-day satisfaction guarantee" span measures
8.4:1. No overflow.

**Not visually confirmed this pass.** The preview pane dropped to blank frames
again after the reload — a pane fault, not a page fault: every JS measurement
returned correct values throughout (section background, font size, contrast,
button labels, box geometry). Worth an eyeball on the guarantee section in a
real browser.

---

# Revision 7

## Gradient top

The masthead and hero now share a dark ground that dissolves into the page
white. Logo and ghost button ship in two versions and cross-fade: white while
the masthead rides the dark, black once it sticks and turns solid.

**Two wrong attempts, recorded because they're easy to repeat:**

1. A wrapper `<div>` around header + hero. It had to open before `<header>`
   and close inside `<main>`, which straddles the element — invalid, and the
   parser caught it. Now it's a pseudo-element on the hero extending up
   `-4.5rem`, which is the masthead's own min-height, so they stay locked
   without JS.
2. One gradient running ink → white across the whole hero. The fade passed
   straight through the sub-headline and the button, so both sat on mid-grey.
   Measured: the button occupied **75–83%** of the block while the fade began
   at **66%**. The fade is now a separate strip pinned to the bottom, entirely
   below the content — the button clears it by 57px on desktop.

That second fix has a side benefit: the hero carries a real `background-color`
again instead of a transparent element over a gradient, so the contrast
checker can read it. A gradient behind transparent text is invisible to
automated checks, which is a bad place to hide.

## Section breaks

- **After the logo strip** → the video sits on a full **brand-blue** band. A
  colour change is the strongest break available, and black-next-to-black
  would have flattened the hinge that follows.
- **Between Dale and the case studies** → a short ink band carrying the
  hinge: *"The results below came out of that same methodology — whether the
  job was cutting spend or scaling the brand."* It makes the case studies read
  as evidence for the guide rather than a separate brag.

## Copy

| | |
|---|---|
| Above the VSL | "The methods that saved our clients **$12M** in ad spend last year" |
| Removed | "The free guide to exactly what we did… nothing held back." |
| Case studies | Heading only, sub-line dropped (the hinge above now does that work) |
| Top of hero | **"For Amazon brand owners"** — names the audience, since this is specifically Amazon ad spend |

## "Here's what happens when you work with us" → outcomes

Was a list of what we do. Nobody buys a "campaign optimization". Now it's what
changes for you, with Dale named, because working with him rather than an
account manager is the offer:

```
01  Your ad bill starts falling inside 30 days
02  Your sales hold, or climb
03  You stop touching bids — Dale sets them, daily
04  You know exactly what changed, and what it returned
05  You can walk away any month, for any reason
```

## Guarantee section

Grey "This is guaranteed" heading and the button both removed. The second
sentence now starts on its own line. The statement is the only thing in the
section.

## Dale moved

Now sits directly under the VSL, before the case studies.

## Verified

117 nodes desktop / 124 mobile, **zero contrast failures** on both with all
FAQs open. No overflow at 390 or 1280. Hero button above the fold at 426px on
mobile and clear of the fade at both sizes. Logo cross-fade confirmed: white
at rest, black when stuck.

---

# Revision 8 — the video is the page

Your note: the dark-blue-to-light-blue transition read as a gradient rather
than as a break; drop the hero button; make the VSL and the guarantee the two
unmissable things; move the logo strip below the case studies and rename it.

## The hero → VSL boundary is now a hard edge

The fade is gone. `.hero--ink::after` and both of its overrides are deleted —
nothing dissolves into anything.

The seam under the masthead is gone too, and that needed a different fix. The
ink used to be carried up behind the sticky header by a `::before` with its
own radial gradient. Two gradients can't be made to meet: the join showed as a
faint horizontal line right below the logo. The hero is now pulled up under
the header with `margin-top: calc(-4.5rem - 1px)` and given the same distance
back as padding, so it is **one element with one background** running from the
very top of the page.

The `-1px` is the masthead's always-present bottom border, which is part of
its box. Without it the hero started at y=1 and left a hairline.

## No button in the hero

Removed. Above the video the only CTA is the masthead's "See if you qualify",
so nothing competes with pressing play. The orange button returns immediately
under the VSL, and the guarantee band and form are unchanged.

## The player is inside the first screen, measured

Mobile (375×812): hero 0–330, **player 493–747**. Fully visible.
Desktop (1440×900): hero 0–363, **player 511–893**. Fully visible.

Before this revision the desktop player ran 762–1271 against a 900px window —
you saw a headline and a sliver. Getting it up took a `@media (min-width:
760px)` block that spends the desktop's extra *width* rather than its height:
display type down one step, both blocks giving back padding, and the player
capped by `max-height: 35vh` with `width: auto`.

Capping height rather than width matters. At 16/9 any width cap still resolves
to a height the window may not have; capping the height and letting
`aspect-ratio` derive the width is the only version that holds at every window
size. Cost: on a 1440px desktop the player is 562px wide rather than
full-column. On brand blue with nothing else on screen, it still reads as the
subject.

## Sticky CTA bar — a bug this revision created and fixed

The bar keyed off the hero with `rootMargin: '-45% 0px 0px 0px'`. Once the
hero was cut down to make room for the video, the hero no longer reached that
shrunk root at all, so `past` was true from the first frame and the bar was up
at load — sitting over the bottom edge of the player it is meant to follow.

It now observes `#how` (the whole video block) at `threshold: 0`, so it
appears once the video has left the screen. That is also the more honest
trigger: don't interrupt the pitch, ask after it.

Renamed the observer's variable to `videoBlock`. It was `video`, which already
belonged to the `<video>` element declared earlier in the same scope — `var`
would have clobbered the player's own reference.

## Logo strip moved and renamed

Now sits **below the case studies**, headed "Other accounts we've worked on".
The named results land first, so the strip reads as "and these too" rather
than as an opening claim with nothing behind it yet. Add `<li>` items as you
get logos — the strip wraps and centres, no CSS change needed.

## Dale's stats are prose

The four-stat grid is gone; the numbers are in the third paragraph, and he
still scales his own brands. `.creds` and the section-hinge CSS are deleted.

One edit you didn't ask for: the draft said "over 200 accounts" in paragraph 2
and "200+ accounts" in paragraph 3. Same fact twice, three lines apart. Kept
it in paragraph 2 and cut it from paragraph 3.

## Section order

```
1  The promise (ink)          7  The guarantee (ink)
2  The VSL (blue)             8  Reviews
3  Dale                       9  Qualify
4  Case studies              10  Apply (ink, form)
5  Other accounts            11  FAQ
6  What happens
```

## Verified

Zero contrast failures at 375×812 and 1440×900, in both masthead states, with
every FAQ open. No horizontal overflow at either size. Player fully in the
fold at both. No console errors other than the expected `[[PIXEL_ID]]`
placeholder warning.

Note on the check itself: the canvas-based colour reader used in earlier
revisions silently returns black for `oklch()` values in this browser, which
produced 76 phantom failures. The sweep now converts OKLCH → sRGB in JS. The
earlier passes were still sound — they were run before that regression — but
any future check should use the JS conversion.

---

# Revision 9 — no blue, guarantee moves up

Your note: drop the light blue; put the guarantee directly under the VSL, so
the top of the page reads promise → the methods we use → guarantee, and
both the video and the guarantee are impossible to miss no matter what.

## The VSL band is now plain white

`band--blue` is gone — the section is just `<section class="band" id="how">`,
which means it inherits the page's default paper background. The flat brand-
blue read as a colour choice rather than a break; the hard ink-to-white edge
above it already does that job, and the video's own dark frame supplies the
contrast blue used to provide.

This also meant every `.band--blue` override in the CSS was dead weight —
`.bigstat` colour, `.btn` colour, `.vsl` border colour, all removed. None of
it was replaced with anything: the default `.btn` (orange) and `.bigstat`
(`--amz-deep`) both already pass contrast on white — there's a comment in the
CSS from revision 7 noting this exact fact, written for exactly this
eventuality. `#how h2 { max-width: 22ch }` is the one rule that survived,
just renamed off the class.

## The guarantee moved from position 7 to position 3

It now sits immediately after the VSL, before Dale. The top of the page is
three stacked, alternating sections: **ink** (the promise) → **white** (the
VSL) → **ink** (the guarantee) — each one a hard, unmissable edge against the
one before it. That rhythm is the actual mechanism behind "no matter what,
it's hard to miss" — you can't scroll past the video without landing square
on the guarantee.

## Heading tense

"The methods that saved our clients" → "The methods we use to save our
clients", per your wording — present tense, ongoing methodology, not a
one-time result.

## Section order

```
1  The promise (ink)          7  What happens (tint)
2  The VSL (white)            8  Reviews
3  The guarantee (ink)        9  Qualify
4  Dale                      10  Apply (ink, form)
5  Case studies              11  FAQ
6  Other accounts
```

## Verified

Zero contrast failures at 390×844 and 1440×900, in both masthead states,
with all FAQs open. No horizontal overflow at either size. VSL still fully
inside the first screen at both sizes (390: 493–755 of 844; 1440: 511–893 of
900).

---

# Revision 10 — hero colour fix, two new variants, and a font bug

## The hero colour bug

The headline had gone quietly white and the sub-line dim. Cause: two rules
at equal specificity, `.hero--ink .promise .fig` and `.hero--ink .promise
.rest`, each declared **three separate times** across revisions 3, 5 and the
original rebuild — cascade order means only the *last* one in the file
wins, and the last `.fig` was revision 3's "headline is white" rule, still
sitting there after the brief that white headline was written for had
already been superseded. Fixed by deleting the two dead overrides rather
than adding a third: `.fig` now resolves to the one surviving rule
(`--amz-hot`, full orange), `.rest` to the one surviving rule (`--paper`,
full opacity, no dimming). Verified: `getComputedStyle` on both spans
confirms `oklch(0.772 0.174 64.6)` and `oklch(0.994 0.002 250)` respectively,
alpha 1. Screenshotted at 390×844 and 1440×900 — see chat.

## Two new variants

Both are full clones of this page's structure and copy except where noted.
Same folder, same `offer.css`, same JS — nothing here is a fork of the
design system, just different assemblies of it.

**`offer.html` — offer-led.** Hero headline sized up further
(`.hero--lead`, appended at the end of `offer.css` so it wins the cascade
over the existing desktop shrink, which only ever existed to leave room for
a video directly under the hero — irrelevant here since the video moved).
VSL relocated from position 2 to position 4, after Dale and the case
studies: proof stacked on proof, not the thing the hero exists to protect.
Guarantee restatement moved from position 3 down to position 7, immediately
before reviews — a pre-conversion reinforcement now that the hero already
carries the guarantee, not a second front-loaded copy of it. One copy edit
forced by the reorder: Dale's line "the methodology I explain in the video
above" no longer being true, changed to "further down this page."

**`guide.html` — guide-led.** Same section order as this page, VSL stays
directly under the hero. Only the hero copy and the VSL heading change:
headline is now "The 3 settings quietly costing you thousands in ad
spend" (three, not four — flag it if that's wrong), sub-line "A free guide
to instantly save you thousands on ad spend." **I didn't have the original
ad creative this was meant to match**, so that sub-line is a working draft,
not a transcription — say the word if it needs to match specific past copy
verbatim. VSL heading reframed as "These are the methods used in the guide
— the same ones that saved our clients $12M in ad spend last year," keeping
the stat but subordinating it to the guide framing.

## A real bug this surfaced: Archivo was never loaded

While verifying the VSL-in-first-screen constraint on `guide.html` — its
headline is longer than the guarantee figure it replaces, so it wraps to
one more line — I found that **Archivo, the display typeface every
revision since #2 has described as the deliberate choice**, was never
actually linked anywhere. `--font-display` names it first in the stack, but
only Vinyl (self-hosted) and Public Sans (Google Fonts) had a `<link>` —
Archivo silently fell back to Helvetica Neue/Arial on any machine that
doesn't happen to have it installed as a system font, on all three pages,
since before this revision. Added the missing Google Fonts link
(`family=Archivo:wght@800`, the only weight the CSS ever asks for) to all
three HTML files, next to the existing Public Sans link.

**I could not personally re-verify the fold measurement with the correct
font.** This sandbox's outbound proxy resets the connection to
`fonts.googleapis.com` specifically for headless Chromium (confirmed: curl
with a browser user-agent fetches it fine, Playwright's Chromium gets
`ERR_CONNECTION_RESET` every time, with or without HTTP/2 — a genuine
proxy/environment limitation, not a code problem, and per this environment's
own guidance a case to report rather than route around further). Everything
font-independent — contrast, horizontal overflow — is still solidly
verified below, on the fallback font, across all three pages. The one thing
I can't personally close the loop on: **check `guide.html` on a real
desktop browser** that the VSL is still visible without scrolling. The
extra wrapped line in the new headline is exactly the kind of change that
could eat the ~7px of headroom this page had left at 1440×900 even before
today (hero 0–363, video 511–893 of 900, per revision 9's own numbers) —
worth a real-browser eyeball before this ships, not something I'm willing to
claim clean on a fallback font in a sandbox.

## Verified

All three pages (`index.html`, `offer.html`, `guide.html`), 390×844 and
1440×900, every FAQ forced open: zero contrast failures beyond the one
known false positive below, zero horizontal overflow.

**One flagged "failure" on every page, confirmed harmless.** The
ancestor-chain contrast checker used for this pass (converts OKLCH → sRGB
in JS same as prior revisions, walks up the DOM for the nearest opaque
background) flags the masthead's "See if you qualify" button at 1.00:1 on
every page, at both sizes. That's a limitation of the checker, not a page
bug: the hero's ink background reaches the sticky header via a negative
`margin-top` layout trick (documented in revision 8), not a DOM ancestor
relationship, so a pure ancestor-walk can't see it and falls back to
assuming white-on-white. Verified the real thing directly by sampling
actual rendered pixels from a screenshot instead of walking computed
styles: **16.3:1 at 390px, 15.6:1 at 1440px** — both comfortably pass.

---

# Revision 11 — bigger offer.html hero, gold restatement, guide.html rebuilt to funnel into the offer

## Global, all three pages

**Dale's intro split in two.** "I'm Dale, and I run your ads myself" is now
a heading plus a separate line: `<h2>I'm Dale, the founder of Brainy
Brands</h2>` followed by `<p class="lede">I run ads myself.</p>`. Same two
facts, now two beats instead of one crowded sentence.

**Every CTA lost its exclamation mark.** "Book a free audit to see if you
qualify!" → "Book a free audit to see if you qualify" everywhere it
appears (VSL button, sticky bar) on all three pages. You flagged the "!" as
reading unprofessional — agreed, gone.

## offer.html — bigger, reordered, and a new gold restatement

**Hero sized up again**, past what revision 10 already did. `.hero--lead
h1` went from `clamp(2.75rem, 1.9rem + 4.2vw, 4.75rem)` to `clamp(3.4rem,
2.2rem + 5.8vw, 6.25rem)` — roughly 58px→96px instead of 47px→76px at the
two ends — and `.audience` now scales up with it instead of staying fixed,
so the whole hero block grows together. This is now unambiguously the
loudest thing on the page, mobile included.

**A second CTA lives in the hero itself** now: "Book a free audit to see if
you qualify," directly under the guarantee, on top of the masthead's short
ghost button. Two buttons above the fold instead of one.

**Section order changed again**, at your dictation:

```
1  The promise (ink, bigger, +button)   7  The VSL — last, +gold line
2  Dale                                  8  Reviews
3  Case studies                          9  Qualify
4  Other accounts                       10  Apply
5  What happens                         11  FAQ
6  The guarantee
```

The guarantee moved earlier (from right-before-reviews back up before the
VSL), and the VSL moved to dead last among the proof sections — video as
the final reinforcement of a guarantee already stated, not evidence
gathered on the way to one.

**New: a gold restatement under the video.** `25% or more ad spend
reduction in 30 days.` sits right under the VSL, in a new `--gold` token —
`oklch(0.55 0.15 85)`, verified at **4.88:1 on white**, comfortably clearing
normal-text contrast, not just the large-text minimum its own size would
technically allow. Deliberately a new token rather than reusing `--amz` or
`--amz-hot`: this is the one place on the page the guarantee figure repeats
in a different colour on purpose, and it needs to read as visually distinct
from the `$12M` sitting in orange one line above it, not a shade of the
same thing.

**Sticky CTA re-keyed.** It used to appear once the VSL block scrolled out
of view. With the VSL now near the bottom of an 11-section page, that would
mean the reminder bar barely had any page left to appear on — it now
appears once the **hero** scrolls away instead, same as it would on any
long page.

## guide.html — rebuilt so the guide actually funnels into the offer

Your framing: "it's the free guide, but it needs to flow into the offer."
That took more than a copy edit.

**The video moved into the hero itself**, on the ink ground ("in the
blue"), replacing the separate white `#how` section it used to live in.
Hero is now: audience line → headline → sub-line → video, all on one
band. Copy changes:

| | Was | Now |
|---|---|---|
| Headline | "…quietly costing…" | "…**currently** costing…" |
| Sub-line | "A free guide to instantly save you thousands on ad spend." | "These are the same methods we used to save our clients $12M in ad spend last year." |

**A CSS trap avoided on purpose.** The video's desktop sizing used to be
keyed off `#how` as an id selector. Reusing that id on the merged hero
would have let it silently outrank `.hero--ink`'s own padding rule (the one
that merges the hero with the sticky masthead, fought for across revisions
7–8) — id beats class regardless of source order. Scoped the new rule to
`.hero--ink .vsl` instead: a class selector, composes with `.hero--ink`
normally, no specificity fight. Video capped at `max-height: 46vh` on
desktop only, same principle as before, new number since the hero is now
carrying more content than the old `#how` section ever did alone.

**New section right after the hero** — the "second mention, in another
section" you asked for. Reuses the *old* VSL heading verbatim ("These are
the methods used in the guide — the same ones that saved our clients $12M
in ad spend last year") now relocated here, plus one new sentence that does
the actual work of positioning Dale as the solution: *"Knowing them is one
thing. Having someone run them on your account, every single day, is
another — that's what Dale does."* This is the section that turns "here's
free information" into "here's who executes it."

**Section order, reasoned out from there:**

```
1  Hero (headline + subline + VIDEO, ink)   7  The guarantee — reframed, moved here
2  These are the methods (bridge → Dale)    8  Reviews
3  Dale                                     9  Qualify
4  Case studies                            10  Apply
5  Other accounts                          11  FAQ
6  What happens
```

Guarantee moved from position 3 (right under the old VSL) down to right
before reviews/apply — after Dale and the case studies have actually made
the case for him, not before you know who's making the offer.

**>>> ONE THING KEPT DELIBERATELY DIFFERENT FROM YOUR WORDING <<<** You said
the close should read "something like: So here's our offer: 25% off your
ad spend in the first 30 days, or your money back, or we work for free."
I used your **framing** — the "So here's our offer:" lead-in is new, and is
exactly that pivot — but kept the guarantee **clause itself** in the exact
locked wording from `FUNNEL-AND-SITEMAP.md` ("25% ad spend reduction in 30
days, or your money back, or we work for free until we hit that target")
rather than your looser paraphrase ("25% off your ad spend," "in the first
30 days"). Three different guarantee wordings have already circulated
across earlier revisions and gotten flagged and reconciled one at a time —
I didn't want to add a fourth by accident here. Say the word if you want
your exact phrasing instead; it's a one-line change.

**Dale's methodology line adjusted for the new order.** "using the
methodology I explain in the video above" no longer holds (the video is now
above Dale, but the bridge section's "that's what Dale does" already made
the connection) — changed to "using the same methods the guide walks
through."

## A note on scope

"More buttons at the top" and the bigger hero were both said in the context
of offer.html specifically ("the one mainly talking about the offer") — I
scoped both to that page only, not index.html or guide.html. The
exclamation-mark fix and the Dale copy change are the two things I treated
as global, since both were phrased as general observations ("it kind of
just makes it look not as professional") rather than page-specific asks.
Flag it if you wanted the bigger hero or the extra button on the other two
pages as well.

## Verified

All three pages, 390×844 and 1440×900, every FAQ forced open: zero contrast
failures beyond the one confirmed-harmless masthead false positive
(documented in revision 10), zero horizontal overflow. Gold token contrast
verified separately at 4.88:1 on white. Screenshotted full-page at both
sizes for offer.html and guide.html — section order, hero size, video
placement and the reframed guarantee all confirmed visually, not just by
the automated sweep.

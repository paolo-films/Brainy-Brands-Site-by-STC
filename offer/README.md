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
| `[[CALENDAR]]` | Calendar link | Form shows the confirm panel |
| ~~`[[PIXEL_ID]]`~~ | Meta pixel | **Done as of revision 15** — real ID (`258230770694638`) is live in all three pages |

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

---

# Revision 12 — your GHL calendar embedded on offer.html and guide.html

## Where it went

Both pages already had a `#applyConfirm` panel that appeared after the
6-question form validated — previously just static text ("Dale reviews
every account before booking… you'll hear back within one business day").
That text assumed a manual, async review step. Your GHL booking widget
handles qualify/disqualify itself off the same answers, so the panel now
embeds the widget directly instead: form submits → `#applyConfirm` shows →
your calendar (or its own disqualify message) renders in place of the old
text. Nothing about the form itself changed — same six fields, same
client-side validation, same `Lead` pixel event on submit.

Added to both pages, not index.html — you asked for "the offer and the
guide landing pages" specifically.

```html
<div class="confirm-calendar">
  <iframe src="https://api.leadconnectorhq.com/widget/booking/rMTistvxT1FAUAfDRPzE" …></iframe>
</div>
```
plus `form_embed.js` loaded once near the end of `<body>` on each page —
that script is what resizes the iframe to fit its actual content instead of
sitting at a fixed height.

## One CSS addition

`.confirm-calendar iframe { min-height: 700px; }` — a fallback only, for the
instant before `form_embed.js` runs and takes over sizing. Picked as a
reasonable floor for a scheduling widget, not a real measurement of yours;
adjust if the real thing renders shorter or taller than that before the
resize script kicks in.

## Verified, with one honest gap

Confirmed in the DOM: the iframe exists in both `#applyConfirm` panels with
the correct `src`, at the correct width (matches the `.confirm` box's own
padded width), and the CSS fallback height applies correctly before any
resize script runs.

**Could not visually confirm the widget itself renders**, same root cause
as the Archivo font issue in revision 10: this sandbox's proxy resets the
connection to both `api.leadconnectorhq.com` and `link.msgsndr.com` for
headless Chromium specifically (`ERR_CONNECTION_RESET`), while the markup
and script tag are otherwise correct. This is an environment limitation,
not a page bug — worth clicking through the actual form → calendar flow
yourself on the live raw.githack link or your own machine before trusting
it end to end.

Contrast/overflow sweep re-run on both pages after the change: zero new
failures, zero overflow, at 390×844 and 1440×900.

---

# Revision 13 — fixed it: calendar shows directly now, no form in front of it

Revision 12 put the calendar behind a `hidden` attribute that only cleared
once the 6-question form validated — so on a fresh page load there was
nothing to see, which is exactly the bug you caught. That was backwards
from what you actually asked for.

**Fixed on both pages** by removing the form entirely — no more six
fields, no more client-side validation, no more `#applyConfirm` gate. The
apply section is now just the heading/lede on one side and your live
calendar embed on the other, visible on load, every time.

Cleaned up alongside it, since they only existed to serve the form that's
gone:

- `ROUTING`/`CALENDAR` JS variables and the whole submit handler (form
  validation, the `sessionStorage` lead capture, the `Lead` pixel event on
  submit, the direct-vs-review branching).
- The "Six questions, then twenty minutes with Dale…" lede line, since
  there's no longer a six-question form — now just "Twenty minutes with
  Dale, live in your account…"
- The `field-hint` privacy note, which was specifically about what happens
  to the form's answers.

`index.html` untouched — its own form/confirm flow is a separate,
deliberate design (there for a different reason: this session never asked
to change it) and still works exactly as before.

**One thing to flag**: the site's own `PageView`-on-load and
`ViewContent`-at-25%-of-VSL pixel events still fire as before, but the
`Lead` event that used to fire on the removed form's submit is now gone
with it — GHL's own booking flow presumably fires its own conversion event
inside the widget, but that's on GHL's side, not something this page
controls or can verify from here.

## Verified

Confirmed in the DOM on both pages: no `#applyForm` element exists,
`#apply iframe` exists at the correct position in the two-column layout.
Screenshotted the apply section on both — calendar box visible immediately
on page load, no form to fill first. (The broken-image icon inside the box
in these screenshots is this sandbox's known inability to reach
`leadconnectorhq.com` for headless Chromium, documented in revision 12 —
not a page bug.) Contrast/overflow sweep re-run on both pages, both sizes:
zero new failures beyond the one confirmed-harmless masthead false
positive, zero overflow.

---

# Revision 14 — Vimeo player, reordered guide, standalone calendar

## Both pages

**The native `<video>` player is gone, replaced by your Vimeo embed.** The
hand-rolled chrome went with it: unmute prompt, play/pause button, progress
readout, and the ~45 lines of JS driving them. Two things worth knowing:

- **Autoplay is no longer on.** The old player was `autoplay muted
  playsinline` with a "Tap for sound" overlay — a deliberate VSL pattern
  from revision 2. The embed URL you sent carries no autoplay params, so
  the video now waits for a click. I used your URL exactly as given rather
  than silently editing it; **add `&autoplay=1&muted=1` to the iframe
  `src` on both pages if you want the old behaviour back.**
- **The 25%-watched `ViewContent` pixel was rebuilt**, not dropped. It used
  to hang off the `<video>` element's `timeupdate`. It now hangs off
  Vimeo's Player API (`player.on('timeupdate', …)`, checking
  `data.percent`), with `player.js` loaded *before* the inline script so
  `window.Vimeo` exists when it runs. Deleting the video element would
  otherwise have silently killed that event.

`index.html` still uses the native player, so all the `.vsl-unmute` /
`.vsl-bar` / `.vsl-play` CSS stays — it's inert on the two Vimeo pages, and
removing it would break index.

**The calendar is its own section now.** The "Book your free audit / twenty
minutes with Dale, live in your account / you keep whatever he finds"
header and the two-column split are both gone; the GHL widget stands alone
on the ink band. It carries its own headings and its own qualify logic, so
everything the page said around it was either duplicating that or arguing
with it.

**Qualify column headings lost their icons.** "This is for you if" and "It
isn't for you if" are now plain text; the eight list items underneath keep
their checks and crosses. Verified by count: 0 heading icons, 8 list icons.

## offer.html

**The VSL moved up to position 2**, directly under the hero and above
Dale, retitled *"If you don't believe us, these are the methods we use to
save our clients $12M in ad spend last year."*

**The gold line and the button under the player are gone** — your call that
there are already enough buttons pointing at the calendar (masthead, hero,
sticky bar). The `--gold` token and `.gold-statement` rule went with them;
nothing else referenced either, so revision 11's gold experiment is now
fully reverted.

Order: hero → **VSL** → Dale → case studies → other accounts → what
happens → guarantee → reviews → qualify → **calendar** → FAQ.

## guide.html

**Hero headline sized up** to nearly match offer.html — same `.hero--lead`
treatment via a new `.hero--lead-video` step-down, one size smaller purely
because this hero also has to fit the player under it.

**The hero sub-line is gone.** *"These are the same methods we used to save
our clients $12M…"* sat under the headline and again one section later —
that was the repetition you flagged. The opening screen is now the headline
and the video, nothing else.

**Section 3 inherited that sentence verbatim** as its heading, replacing
*"These are the methods used in the guide — the same ones that saved our
clients $12M…"*. The *"Knowing them is one thing…"* paragraph under it is
deleted.

**The offer moved up to position 2**, straight off the back of the video:
watch, scroll once, land on the offer.

**Dale moved up and onto the tint.** You called the gap above him awkward.
A colour change is the hardest break available — it reads as a new chapter
rather than more of the same page — and the band above now gives back its
bottom padding (`.band--sm`) so he starts higher as well.

Order: hero + video → **offer** → methods → **Dale (tint)** → case studies
→ other accounts → what happens → reviews → qualify → **calendar** → FAQ.

## Two bugs found while doing this

**1. The Vimeo iframe collapsed to 2px tall on desktop.** Measured, not
guessed: `vsl={"top":970,"bottom":972}` at 1440×900. The desktop rule
capped the player with `max-height: 35vh; width: auto` inside a
`width: fit-content` container — which works for `<video>`, because a video
has an intrinsic aspect ratio to resolve `auto` against, and fails for an
`<iframe>`, which doesn't: the two constraints resolve against each other
into nothing. Rewritten to cap the *container's width* at the 16:9
equivalent instead (35vh tall → `min(100%, 62.22vh)` wide; 46vh → 81.78vh
in guide's hero). Same visual result, no dependence on intrinsic ratio, and
the `<video>` rule is left intact for index.html.

**2. A stray `</div>` in the qualify section**, inherited from the original
index.html and copied into both variants — one extra closing tag left the
`<main>` tree unbalanced. Browsers silently recover from it, which is why
it survived thirteen revisions. Fixed in **all three** pages (index.html
included; it's the same one-line defect and leaving it there made no
sense). All three now parse balanced.

**3. And one I caused myself, doing the Vimeo swap.** The regex that
replaced the old player block used a non-greedy `.*?` before `</div>`,
which stopped at the *first* closing div it found — the `.vsl-bar`
closer nested inside — rather than the `.vsl` wrapper's own. That left an
orphan `</div>` behind on both pages. Caught it by re-running the tag
balance check after the edit rather than trusting the replacement, which
is the only reason it isn't in this commit. Worth remembering: a
non-greedy match against a closing tag is wrong whenever the block can
contain nested instances of that tag.

The balance checker is three lines of Python and has now caught two
separate unbalanced-div bugs in one revision. Worth running against these
files after any structural edit.

## Verified

Section order, hero sizes, VSL geometry, gold-statement removal and the
qualify icon counts all confirmed by direct DOM measurement at 390×844 and
1440×900 on both pages. Contrast/overflow sweep clean on both, both sizes.

Same standing sandbox caveat as revisions 10 and 12: this environment's
proxy blocks `player.vimeo.com` and `leadconnectorhq.com` for headless
Chromium, so **the Vimeo player and the GHL calendar cannot be seen
rendering here** — their geometry and wiring are verified, their content
isn't. Worth an eyeball on a real browser, particularly that the video
actually plays and that you're happy without autoplay.

---

# Revision 15 — real Pixel ID, sixth logo added

## Pixel is live

`[[PIXEL_ID]]` → `258230770694638` in the `fbq('init', …)` call and the
`<noscript>` fallback `<img>`, on all three pages. This was flagged in
revision 1 and every revision since — first time it's actually been filled
in. `PageView` fires on load, `ViewContent` at 25% of the VSL watched, same
as before; nothing else about the tracking changed.

Also corrected: I'd said offer.html/guide.html lost their `Lead` event when
their form was removed in revision 13. You corrected that — the form is
still there, it's just inside the GHL booking widget now rather than
hand-rolled HTML. Whatever event GHL fires on a completed booking is
outside this page's code and wasn't touched here.

## Sixth logo added to the strip

`assets/casestudylogos/Midtown.svg` was sitting in the folder, unused, since
before this variant work even started — it's one of the six names the
original brief asked for (`logo-{temptooth,zestt,patriotcrew,magicbrand,
midtown,emerald}`), but only five ever made it into the `<ul class=
"logostrip">` on either page. Added as a sixth `<li>`, same markup pattern
as the rest, on both offer.html and guide.html (not index.html — wasn't
asked for there).

It's an SVG with an embedded raster pattern fill rather than a flat PNG,
which is why it wasn't confirmed working by eye until now: loaded it
directly and checked `naturalWidth`/`naturalHeight` came back non-zero
(200×26) rather than trusting the file extension.

**This is not the full set you're picturing.** You mentioned seeing "Dale's
old client logos" on your desktop — I don't have any way to see your local
Desktop from this session; Midtown was the one extra logo already sitting
in this repo's `assets/casestudylogos/` folder, unused. If there are more
brand logos you want in the strip, send me the image files directly (drag
into chat) and I'll drop them in the same way.

## Verified

Pixel ID confirmed present at both live locations on all three pages, no
leftover `[[PIXEL_ID]]` instances. Midtown logo confirmed loading with real
pixel dimensions rather than a broken-image fallback. No horizontal
overflow introduced at 390 or 1440 on offer.html; guide.html uses the
identical `.logostrip` markup and CSS so the same holds there.

---

# Revision 16 — 20 more client logos, pixel moved to the top of `<head>`

## The strip is now 26 logos

Dale confirmed usage rights on the `dales-old-client-logos` set, so all 20
are in, on both offer.html and guide.html. Added after Midtown, all with
`loading="lazy"` since they sit well below the fold.

Xpand · HK Army · Envi by eheat · Berkey · TheraPet MD · Gutterglove ·
Pacific Doorware · Hydroh · Bumpology · Riff Raff Baby · Peregrune ·
Buddha Pants · Sanzo · MEND · Velocity Lacrosse · Over & Back · SynNutra ·
Fuel Pro Nutrition · 69 Golf · Barsys

## Nine of the twenty needed real work, not just a copy

The source set was scraped from each brand's live site, so the files were
whatever that site happened to serve — not a consistent logo pack. Checked
every one against the strip's actual rendering conditions (tint band,
`grayscale(1)`, `opacity: .55`) rather than trusting the filenames:

| Problem | Files | Fix |
|---|---|---|
| Pure **white** mark on transparent — invisible on a light page | Barsys, Sanzo | Repainted to `#1E232B`. Sanzo is an SVG so that's a `fill="white"` → dark swap; Barsys is raster, so alpha was kept and RGB replaced |
| Light mark on an opaque **black** box | HK Army, 69 Golf | Luminance → alpha, mark repainted dark. Box gone, mark now reads on white |
| Coloured mark on an opaque **white** box | SynNutra, Peregrune, Gutterglove, Pacific Doorware, Over & Back | Alpha derived from distance-from-white, original colours kept |

Barsys' source was literally named `Barsys-icon-white.png` — it was never
going to work on this page as shipped. Four of the five white-box cases
(Peregrune, Gutterglove, Pacific Doorware, Over & Back) looked "fine" in a
file browser and only revealed themselves as boxes when checked for
corner opacity, which is why every file got measured rather than eyeballed.

All 20 were then trimmed to content and normalised to 120px tall, matching
the six that were already there.

**Barsys is icon-only** (a cocktail glass, no wordmark) because that's the
only mark on their site. It reads as a small abstract shape next to 25
wordmarks. Swap it if you have a lockup version.

## Meta Pixel moved to the top of `<head>`

Was sitting at position 12, after the favicon, both `preconnect`s, the
Google Fonts stylesheet, the Vinyl preload and offer.css — so every one of
those render-blocking requests resolved before the pixel fired. Now
directly after the `<meta>` block and before the first `<link>`, on all
three pages. Charset stays first, which is a spec requirement (must be in
the first 1024 bytes), not a preference.

## Verified

26 logos on both pages, at 390 and 1440: all load (`naturalWidth > 0`
after scrolling the strip into view — checked post-scroll, since
`loading="lazy"` means an un-scrolled check reports every one of them as
broken), zero horizontal overflow. Head order dumped and confirmed on all
three pages.

---

# Revision 17 — Meta click ID (fbclid) capture

One block, added to `<head>` on all three pages directly after the Pixel.
Vanilla JS, no dependencies, ~70 lines.

1. Reads `?fbclid=` from the URL.
2. Writes it to a first-party cookie, `stc_fbclid`, 90 days.
3. Falls back to that cookie when the URL has no `fbclid` — covers the
   visitor who clicks the ad today and books next week.
4. Keeps the query string on internal navigation.

## Where the click ID actually lands differs per page, because the forms differ

**`index.html` has a real native `<form>`**, so it got exactly what was
specced: `<input type="hidden" name="fbclid" id="fbclid">`, populated on
load. It also now rides along in the `bb_lead` sessionStorage payload
next to the other six fields.

**`offer.html` and `guide.html` do not have a form on the page.** The
booking form lives inside the GHL widget at
`api.leadconnectorhq.com`, which is a different origin — a hidden input
cannot be inserted into it from here, and no amount of JS on our side
changes that. Same-origin policy, not a gap in the implementation.

So on those two the click ID rides in on the **iframe URL** instead:

```
…/widget/booking/rMTistvxT1FAUAfDRPzE?fbclid=<value>
```

To make that work the iframe now ships with `data-src` and gets its real
`src` set by the script, so the widget loads once, already carrying the
param — rather than loading clean and then being reloaded to add it.

> **This needs one thing done in GHL that cannot be done from this repo:**
> a custom field on the booking widget that accepts an inbound `fbclid`
> query param. Without it GHL receives the param and discards it, and the
> click ID never reaches the contact record. If GHL's native Meta CAPI
> integration is switched on it may already handle click IDs itself, in
> which case this is belt-and-braces.

A `<noscript>` fallback link to the booking page was added under each
widget, since `data-src` means no iframe at all without JS.

## Two things worth recording

**The Vimeo embed closes with byte-identical markup to the GHL embed** —
`</iframe>\n      </div>\n    </div>\n  </section>`. An edit anchored on
that pattern hit the video player first. Caught by an assertion on match
count rather than by the edit appearing to succeed; re-anchored on the
GHL iframe's own `id`. Verified after: the Vimeo `src` is untouched and
never receives an `fbclid`.

**`SameSite=Lax`, not `Strict`.** The visitor arrives here as a cross-site
navigation from `facebook.com`; `Strict` withholds the cookie on exactly
that first hop, which is the only hop that matters. `Secure` is applied
only on https so the cookie still works when serving locally over http.

## Verified

11 scenarios per page, in a real browser, with a fresh browser context per
case: URL capture, cookie write, cookie fallback on a clean URL, GHL
iframe param injection, Vimeo iframe left alone, internal-link query
preservation, organic visitor (no param, no cookie) producing an empty
value with no dangling `?fbclid=` on the widget, and no JS errors.
`offer.html` and `guide.html` 11/11; `index.html` covers the hidden-input
path instead of the iframe path.

---

# Revision 18 — August 25, 2026

## Added the ClearShield Auto Glass Repair case study to both landing pages

New entry in the case-studies list on `offer.html` and `guide.html`
(index.html's case studies were never part of this variant work, so it's
untouched):

- `↓ 53%` TACoS, in the first full month
- Revenue went `$41.8K → $91.6K`/mo — with ad spend flat

That last clause matters and was called out explicitly by the client: unlike
every other case study on the page, this one didn't come with a spend cut —
spend held flat while revenue roughly doubled. The copy says "ad spend flat"
rather than reusing the "ad spend, in two months" wording the other rows
use, so it doesn't imply a reduction that didn't happen.

Also added the logo to the "Other accounts we've worked on" strip, the same
place every other case-study logo already appears a second time.

## The logo had to be rebuilt, not copied

The ClearShield mark was shared as an inline image in the chat, not as an
uploaded file — there's nothing on disk for it the way there was for the
client-logos zip. I checked `/root/.claude/uploads/` and the whole
filesystem for anything recently written; nothing came back. There's no
tool available to this session that pulls the raw bytes of an inline chat
image onto disk, so there was no file to place in
`assets/casestudylogos/` and no way to verify one via the corner-pixel
check this project otherwise relies on for logo work.

Given that, and that the mark itself is a simple two-color wordmark (navy
"ClearShield" logotype, gray auto-glass/windshield arc, italic "Auto Glass
Repair" underneath), I rebuilt it as a plain SVG —
`assets/casestudylogos/logo-clearshield.svg` — rather than block on a
re-upload. It's a vector reconstruction, not a scan, so it won't be
pixel-identical to Dale's original file. Flagging this clearly: if the
original logo file becomes available, it should replace this SVG rather
than sit alongside it.

## Verified

- Tag-balance check (div/section/main/ol/ul/li) on both files: balanced.
- `sweep.js` on both pages, mobile + desktop: no new contrast failures, no
  overflow. The one failure it reports ("See if you qualify", 1.00:1) is
  the same masthead-button false positive documented in earlier revisions
  — a background-image button the checker can't composite against — and
  is unrelated to this change.
- Screenshotted the case-studies section and the logo strip on both pages:
  the new row matches the existing rows' layout and typography exactly,
  and the logo renders and desaturates correctly in the strip (same
  `grayscale(1)` treatment as every other logo there).
- No console/JS errors, no broken image request for the new SVG.

---

# Revision 19 — August 26, 2026

Six fixes from your walkthrough. Two of them were real bugs with measurable
causes, not taste calls — worth reading those bits.

## 1. guide.html: no break between the video and the offer

The hero (`.band--ink`) carries the video, and the offer band underneath was
also `.band--ink`. Two dark sections with no edge between them read as one
continuous slab, which is what you were seeing.

The offer band is now `.band--tint`. Coming straight off a dark section, any
light ground is the hardest break available, and the statement keeps its
weight because it is still the largest type in its section.

## 2. offer.html: no break between the video and Dale

Same class of problem, opposite direction — the VSL band is white and Dale's
section was white too. Dale is now `.band--tint`, which also matches how
guide.html already separates that section.

## 3. The guarantee statement needed a light-ground variant

`.guarantee-statement` is white type with an `--amz-hot` highlight. It was
only ever used on `.band--ink`, so moving it to a light band (fix 1) and
adding one under the video (fix 6) would have rendered it white-on-white.

Added `.band:not(.band--ink) .guarantee-statement`, which switches to ink
type and drops the highlight from `--amz-hot` to `--amz-deep`. That colour
change is not cosmetic: `--amz-hot` measures **2.1:1** on a light ground,
which is the exact trap already documented against `.bigstat` further up the
file. `--amz-deep` is 7.1:1 and reads as the same orange.

Written as `:not(.band--ink)` rather than a modifier class so it keys off the
ground the statement actually sits on, and cannot be forgotten next time one
of them moves.

## 4. Dale's mobile spacing — a specificity bug, not a design choice

You were right that the gaps were too big, and the cause was a fix that had
been written but never took effect.

On mobile `.dale-copy` is `display: contents`, so the paragraphs become grid
items and the 24px row gap separates them. A rule was already there to zero
the paragraph margins so they would not double-count:

```css
.dale-copy p { margin-top: 0; }     /* (0,1,1) */
```

It loses to the base rule up the file:

```css
.dale p + p { margin-top: var(--s3); }   /* (0,1,2) */
```

So every paragraph kept its 24px margin **on top of** the 24px row gap.
Measured at 390px: **48px between every line**, against an intended 24px.
The comment sitting above the broken rule even described the exact 50px hole
it was failing to prevent.

Fixed by matching on `p + p` as well — equal specificity, and the mobile
block is later in the file. Measured after: **24px**, on both pages.

## 5. Case-study logos were inconsistently sized

Each logo was capped by whichever dimension it hit first (`max-height:
2.2rem`, `max-width: 100%`). A wide mark ran the full column while a squarer
one shrank to ~35px and read as an afterthought.

The cell is now a 3.5rem box in a 10.5rem column. Measured heights went from
27–35px to a consistent **55–56px**, except Temptooth, which is a ~6:1
wordmark and is still width-limited at 168×27. That one cannot be equalised
without giving it a column wide enough to unbalance the row — it reads fine
because it is wide, and it is the only remaining outlier.

## 6. The calendar embed was too long — and it was our CSS, not GHL

`.calendar-embed iframe` carried `min-height: 700px`. The comment above it
said the height was owned by GHL's `form_embed.js` resize script, which was
wrong in one important way: **`min-height` beats the height that script
sets.** Whatever GHL measured its widget to be, the band could never render
shorter than 700px.

Dropped to `420px`, which is now what it was always described as — a
placeholder for the moment before the script runs. GHL's own computed height
now wins.

If it still renders long in production, that height is genuinely coming from
GHL and has to be changed on their side. I cannot confirm which it is from
here: `api.leadconnectorhq.com` and `link.msgsndr.com` are both blocked to
headless Chromium in this sandbox, so the widget never mounts and I only
ever see the 420px floor.

## 7. offer.html: the video header split, and the guarantee restated

Header was one long sentence. Now:

- `<h2>` — **Don't believe us**
- lede — These are the methods we used to save our clients **$12M** in ad
  spend last year.

Kept `$12M` rather than "$12 million" as dictated, to match how the figure is
set everywhere else on both pages. Say the word if you want it spelled out.

The guarantee is restated under the player at
`.guarantee-statement--sm`, deliberately smaller than the full guarantee band
that still owns its own section further down — a reminder at the point of
highest intent, not a second headline competing with it. Note this partly
reverses Revision 14, which removed the gold statement from under the video
at your request; this is the guarantee only, with no button.

## Verified

- Contrast sweep, both pages, mobile + desktop: no new failures. This
  mattered more than usual because fix 3 moved white type onto light grounds
  — the sweep confirms both guarantee statements pass where they now sit.
  The one reported failure ("See if you qualify", 1.00:1) is the long-standing
  masthead-button false positive, unrelated.
- No horizontal overflow at 390px or 1440px.
- Tag balance (div/section/main/ol/ul/li/p/h2) clean on both files.
- Dale gaps re-measured at 390px: 48px → 24px on both pages.
- Logo heights re-measured: 27–35px → 55–56px.
- Screenshots reviewed for all six changes.

## Still open, flagged not fixed

**guide.html has no call to action anywhere in its body.** The only routes to
the calendar are the small masthead link and the sticky bar — between the
hero and the booking widget, roughly nine screens, there is not one in-content
button. offer.html has one in its hero. Left alone because a soft
guide-led page may want that on purpose, but it is the single biggest
conversion gap on either page.

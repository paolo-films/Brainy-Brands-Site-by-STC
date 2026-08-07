# Migration audit — old brainyamz.com → new build

Pulled from the live site Aug 6, 2026. Pages checked: home, about-us, services,
portfolio. Every content block on the live site is listed below with where it
landed.

**Read the "Conflicts" section first.** Three things on the live site directly
contradict the offer we built the funnel around. Those need Dale's answer, not
mine.

---

## Conflicts — need Dale to decide

### 1. The live site says there is no guarantee

Live FAQ, appearing on three separate pages:

> **Do you offer any guarantees?**
> "It's important to note that nobody can promise assured sales unless they're
> resorting to tactics against Amazon's Terms of Service... **While we cannot
> offer a guarantee of success**, our commitment is to apply our utmost effort..."

Our entire funnel is built on the 25% ad spend reduction guarantee.

These can actually coexist, and I've written the new FAQ that way: no guarantee
on *sales* (which nobody can promise), a specific guarantee on *ad spend
reduction* (which is measurable and within Dale's control). That distinction is
honest and it's a stronger answer than either version alone.

**But Dale needs to sign off on the rewrite**, because the old wording is a flat
"no guarantees" and the new one isn't. Don't launch with both live.

### 2. Full-service agency vs. PPC specialist

The live site sells **ten services** — graphics, keyword optimization, A+ content,
3D rendering, PPC, account troubleshooting, product vetting, A/B testing,
inventory management, IP enforcement. Pricing is per-SKU.

Everything we scripted — the 20 ads, the 26 Reels, the VSL, the guarantee — is
PPC-only positioning.

I've kept both: `services.html` carries the full ten-service catalogue, and the
funnel stays PPC-only. That's the right structure — the ads sell the sharp thing,
the site proves there's a real agency behind it.

**Question for Dale:** should the homepage lead PPC-first (as I've built it) or
full-service-first (as the live site does)? I'd argue PPC-first. A specialist
claim converts cold traffic; "we do everything" doesn't. The other nine services
sell themselves once someone's a client.

### 3. Two different pricing models

| Live site | What we've been told |
|---|---|
| Per-SKU: $500 audit, $800 creative, $1,000 PPC | Flat monthly fee, never a % of ad spend |

The new FAQ currently says "flat monthly fee, quoted after the audit." The live
site says per-SKU with published starting prices.

These aren't compatible. **Which is current?** I've put the per-SKU tiers on
`services.html` marked as needing confirmation. If they're stale, I'll pull them.

---

## Content that carried over

| Live content | Where it is now |
|---|---|
| Dale bio — inventor, scaled own brands to 7 figures | `about.html` |
| Highest ranked "Amazon Expert" worldwide on Upwork | `about.html`, `index.html` |
| Founder and CEO of Brainy Brands | `about.html` |
| "Not passed around to different account managers" | `about.html`, `index.html` |
| "That is the Brainy Brands promise" | `about.html` |
| A-to-Z full service agency positioning | `services.html` |
| "We've built seven-figure brands for our own portfolio" | `about.html` |
| Small team, deliberately limited client count | `about.html`, `faq.html` |
| "Only accept clients when confident we can deliver value" | `about.html`, `faq.html` |
| Since 2013 | `about.html`, `index.html` |
| Stats band (years / products launched / sales) | `index.html` — **see note below** |
| Who we accept: Original Brands | `services.html` |
| Who we accept: Manufacturers | `services.html` |
| Who we accept: Exclusive distributors | `services.html` |
| All 10 service descriptions | `services.html` |
| "We charge based on SKUs managed" | `services.html` (flagged) |
| 4 pricing tiers ($500 / $800 / $1,000 / Contact) | `services.html` (flagged) |
| 3 simple steps to get started | `index.html` |
| "Amazon Sellers face many challenges" — 4 items | `index.html` |
| Solutions suite — 11 items | `services.html` |
| Our Mission | `about.html` |
| Data reporting / centralized hub | `services.html` |
| Portfolio: A+ content, 3D rendering, PPC screenshots | `portfolio.html` |
| Amazon Advance Certifications (6 of them) | `portfolio.html` |
| "$1,000 to $200,000/month ad spend" range | `portfolio.html` |
| "Actual screenshots, not flashy case studies" | `portfolio.html` |
| FAQ: Why do you charge so much | `faq.html` |
| FAQ: Other marketplaces (Walmart, eBay, Shopify) | `faq.html` |
| FAQ: Guarantees | `faq.html` — **rewritten, see Conflicts** |
| FAQ: Main point of contact | `faq.html` — **was lorem ipsum, now written** |
| FAQ: Working hours | `faq.html` |
| FAQ: Can't afford your rates | `faq.html` |
| FAQ: How many clients | `faq.html` |
| "Get In Touch" copy | `contact.html` |
| Contact form fields | `contact.html` — see below |
| Head office: 1007 N Orange St. 4th Floor, Wilmington, DE 19801 | footer, all pages |
| Footer tagline: "real-world experience in product branding..." | footer, all pages |
| Social: YouTube, Instagram, Facebook, LinkedIn, Twitter | footer — **URLs needed** |
| Privacy Policy | `privacy.html` |
| Terms and Conditions | `terms.html` |

**Contact form fields.** Live form is: Full Name*, Email Address*, Amazon
Storefront link, Monthly AD spend Budget, Annual Revenue, Message. I've added
storefront link, ad spend, and revenue to `contact.html` — they were missing and
they're genuinely useful for qualification.

---

## Content deliberately NOT carried over

| Live content | Why |
|---|---|
| Stats band showing **0 YRS+, 0 K+, 0 M+** | These are broken placeholders on the live site — the numbers never got filled in. I've put real-looking structure in with `[NUMBER]` markers. **Dale needs to supply the actual figures.** Do not launch showing zeros. |
| Lorem ipsum in the "main point of contact" FAQ | Replaced with a real answer. |
| WhatsApp-compressed brand video | Being replaced by the new VSL. |
| Broken Contact Us link (`?page_id=682`) | Fixed — points to `contact.html`. |
| Duplicated FAQ block on every page | Consolidated into `faq.html`, with a short subset on the funnel pages only. |
| "List Item" in the solutions list | Leftover template junk on the live site. Dropped. |
| "Experts on Amazon" heading, twice, with different copy | Merged into one block. |
| Per-service pages (10 separate URLs) | Folded into one `services.html`. Ten thin pages hurt SEO more than one good one. If Dale wants them back for keyword targeting, that's a pSEO conversation, not a rebuild. |

---

## Still needed from Dale

- [ ] **Real numbers for the stats band** — years of expertise, products launched, total sales
- [ ] **Confirm or kill the per-SKU pricing** ($500 / $800 / $1,000 tiers)
- [ ] **Sign off on the rewritten guarantee FAQ** (no guarantee on sales, specific guarantee on ad spend)
- [ ] **Social profile URLs** — five icons in the live footer, none of them recoverable from the page
- [ ] **Confirm the Delaware address is still current**
- [ ] **Legal entity name** for privacy/terms
- [ ] Homepage positioning call: PPC-first or full-service-first

---

## Still needed from Isabella

- [ ] Logo (live one is 184×108px)
- [ ] Portfolio images — the live site has ~90 JPGs across A+ content, 3D rendering,
      and PPC screenshots, plus 6 certification badges. They're on the old server
      and will need pulling down and re-optimizing before the WordPress site goes away.

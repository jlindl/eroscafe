# Eros Cafe: homepage concept and growth review

Prepared by Integrate, 2 November 2026. Live preview: see the deployment URL in the final report (noindex, preview only).

## 1. Project summary

- **Business:** Eros Cafe (Eros Cafe Group). European-style dessert café and coffee house, established in Manchester in 2016. Four UK cafés (Manchester, Wigan, Urmston, St Helens) plus Tripoli and Cairo, with Saudi Arabia and Syria announced. Hot cookie dough, crêpes, waffles, sundaes, gelato made daily, signature milkshakes, speciality coffee, afternoon tea, an Italian kitchen.
- **Current website:** https://eros-cafe.com/ (WordPress + WooCommerce, credited to Balance Advertising Agency).
- **Goal of the demo:** show what a premium, conversion-led homepage looks like using only their real menu, photography, addresses and Google reviews.
- **Primary conversion action:** book a table. **Secondary:** order to collect. Both are front-end demonstrations in the preview: each ends in a confirmation that says plainly nothing was sent, and nothing contacts the café. In the full build they connect to a real diary and the café's order system.

## 2. Free site audit: eros-cafe.com

All findings below were checked on 2 November 2026. Screenshots of the current site are in `docs/screens/current-*.png`.

### What is working and worth keeping
- **The brand photography is genuinely premium.** The cappuccino in the crested cup on black marble, the crêpe rolls with pistachio and raspberries, the three coffees: these are better than most national chains have. The new homepage is built almost entirely on them.
- **The positioning copy is clear.** "Italian gelato, French pâtisserie, a refined coffee house", "gelato and desserts prepared fresh daily", "allergen care" and "lighter options" are strong, specific claims. They were reused word for word.
- **The structure exists.** Branch addresses and phone numbers, a franchise page, social links and a contact form are all present. Lighthouse SEO basics score 92/100 (title tag, meta description, crawlable links, valid HTML).
- **The real product line-up is strong:** 47 items across hot cookie dough, crêpes, waffles, sundaes, milkshakes, gelato, coffee and tea, with recurring signature flavours (Eros Special, Dubai, Biscoff, Bueno, Nutella, Oreo). The new menu shows every one of them.

### What is holding it back (each with evidence)
1. **Online ordering does not work.** Every product in the shop shows "£" or "£0.00" with "Read more" instead of "Add to cart" (`docs/screens/current-desktop-02.png`; `/shop/` HTML has 12 `product_type_simple` items and no `add_to_cart_button`). A visitor who wants to order hits a dead end.
2. **There is no way to reserve a table.** No booking system, no "book" button, no link to a reservations provider anywhere on the site. Guests must phone.
3. **The homepage says nothing concrete in the first screen.** "A refined coffee experience. Signature Coffee & Elegant Desserts" gives no town, no hours, no proof and no reason to act (`docs/screens/current-desktop-01-hero.png`). The page title is literally "Home Food - Eros Cafe" and the meta description is auto-scraped button text ("A refined coffee experience Signature Coffee & Elegant Desserts VIEW OUR MENU Crafted Moments…").
4. **Trust signals are missing or placeholders.** The only testimonial is "Sarah Connor, Google Inc.", a template placeholder. The site never mentions the real 4.7-star Google rating.
5. **Mobile experience.** The viewport tag blocks pinch-zoom (`user-scalable=no`, flagged by Lighthouse accessibility), touch targets are too small in places (the newsletter field), colour contrast fails on several buttons and category links, and the heading order is broken (H4 and H6 used for section titles).
6. **Speed and errors.** Lighthouse mobile on the live homepage: **Performance 82, Accessibility 85, Best Practices 75, SEO 92**; Largest Contentful Paint 4.6 s; the hero image is lazy-loaded (so it paints late); a JavaScript error fires on every load (`ReferenceError: cookieadmin_policy is not defined`) and one resource 404s.
7. **Hours contradict Google.** The site says 8am–11pm every day; the Wigan Google listing shows closing at 5pm. One of them is wrong, and guests see both.
8. **Every café shares one page.** There is no page for Eros Wigan, Eros Urmston, Eros St Helens or Eros Manchester, and no page for "cookie dough", "crêpes", "gelato" or "afternoon tea". Google cannot rank a page that does not exist.
9. **Technical SEO.** Schema markup covers Organization, WebSite, WebPage and BreadcrumbList only: there is no LocalBusiness/CafeOrCoffeeShop schema, no per-branch schema, no Menu schema. The sitemap index (`/sitemaps.xml`) lists a single page sitemap. Nine links have no descriptive text.

### Lighthouse comparison (mobile, same tool, same day)
| | Current eros-cafe.com | New homepage (local production build) |
|---|---|---|
| Performance | 82 | 91 (median of five runs, range 89–92) |
| Accessibility | 85 | 100 |
| Best practices | 75 | 100 |
| SEO | 92 | 63 (deliberately `noindex` while a preview; 100 of the remaining checks pass) |
| Largest Contentful Paint | 4.6 s | 3.19 s |
| Total Blocking Time | 90 ms | 104 ms |
| Cumulative Layout Shift | 0.004 | 0.000 |

## 3. Search and local visibility

Method: Google's web search blocks automated browsers, so organic results were checked with a web-search index (Brave-style, US-indexed), with Bing in a real Edge browser set to the UK market, and with DuckDuckGo UK; the local pack was read from Google Maps. The full table with every result is in `qa/audit/AUDIT-RESEARCH.md` (kept out of the repo) and summarised here.

**eros-cafe.com appeared in none of the eleven searches**, including its own brand name:

| Search | eros-cafe.com | Who appears instead (top results) | Eros on Google Maps? |
|---|---|---|---|
| dessert cafe Wigan | No | Creams Cafe Wigan, Tripadvisor's "Best dessert in Wigan", Safi's Desserts, Wigan Today's sweet-treat lists, AYA Delights, Kiki Desserts | No (Safi's, Little Dessert Shop, Bake & Shake, Aya delights, Tom & Jerries) |
| cookie dough Wigan | No | Deliveroo, Little Dessert Shop product pages, Wanderlog | No |
| crepes Wigan | No | crêpe-van hire sites, Wigan Today's Pancake Day list, Just Eat | No |
| milkshake Wigan | No | Just Eat, Uber Eats, Blend 'n' Shake, Creams | No |
| afternoon tea Wigan | No | Lily & Arthur's, Wigan Today, Mrs Lyon's Tea Room, Lancashire Manor Hotel | No (Caffè Rosso at 17 Wigan Lane leads) |
| gelato Wigan | No | — | **Shows the old "Gelato Royale" listing at 51 Wigan Lane, marked "Permanently closed"** |
| dessert cafe Urmston / St Helens / Manchester | No | Kin Bakehouse, Haute Dolci, Pinkeez, Creams Arndale, Black Milk and others | No |
| Eros Cafe / Eros Cafe Wigan | No | Greek-mythology pages, Eros Now, namesake cafés abroad | Found only by the exact name "Eros cafe Wigan" |

- Bing returns nothing from the domain for `site:eros-cafe.com`, which is consistent with the site not being indexed by Bing at all (no `noindex` is set, so the cause is not a directive; confirm in Bing Webmaster Tools).
- The one hyper-local search where Eros does appear on Google Maps is "coffee shop Wigan Lane" (second, behind Caffè Rosso with 351 reviews).
- No analytics, tag manager, pixel or Search Console verification tag exists on the site, so the business cannot see any of this itself.

**The brand is split.** Public records show that 51 Wigan Lane was "Gelato Royale" and is now "Eros Cafe" under the same director: Companies House lists Gelato Royale Ltd (incorporated 31 August 2016, which matches "Est. 2016") and Eros Cafe (UK) Ltd (renamed on 19 June 2026); the Food Standards Agency registers the premises as "Eros Cafe - Gelato Royale". Almost every reputation asset still sits on the old name: a Google listing for Gelato Royale at the same address (3.7 stars from 245 reviews, 92 photos, unclaimed and marked "Permanently closed"), a "Gelato Royale | Wigan" Facebook page with 6,202 followers and 699 reviews that was still posting on 1 November 2026 and links to a dead website (gelatoroyale.co.uk returns an error), a Tripadvisor listing, and Just Eat and Deliveroo history. The Eros name holds 20 Google reviews and 188 Facebook followers.

**Competitors who are winning these searches** (Google Maps, 2 November 2026):

| Town | Competitor | Google | Website | Order or book on Google |
|---|---|---|---|---|
| Wigan | Safi's Desserts, 3 Library St | 5.0 (63) | Yes | Order online |
| Wigan | Little Dessert Shop, 28 Hallgate | 4.6 (105) | Linktree | Order online |
| Wigan | Aya delights, 21 Powell St | 4.9 (84) | Yes | — |
| Wigan | Suga Rush, Scholes | 4.6 (164) | — | — |
| Urmston / Trafford | Haute Dolci, Trafford Centre | 4.7 (5,554) | Yes | Reserve a table + Order online |
| Urmston / Trafford | Delicea, Ashton upon Mersey | 4.9 (148) | Yes | Order online |
| Urmston | Kin Bakehouse & Kitchen, 52 Gloucester Rd | 4.8 (381) | Yes | — |
| St Helens | Pinkeez, 91 Junction Ln | 4.7 (235) | Yes | Order online + Find a table |
| St Helens | Only Dessertz, 45a Westfield St | 4.7 (89) | Yes | — |
| St Helens | Safi's Desserts, 224a Boundary Rd | 4.6 (100) | Yes | Order online |
| Manchester | Creams Cafe, Arndale | 4.6 (1,093) | Yes | Order online |
| Manchester | Haute Dolci, Deansgate | 4.5 (725) | Yes | Reserve a table + Order online |
| Manchester | Black Milk, 88 Oldham St | 4.4 (883) | Yes | — |

Every one of these has a working website or ordering route from its Google listing; the two with table reservations on Google (Haute Dolci, Pinkeez) are exactly what the new homepage's "Reserve a table" is built to match.

## 4. Google Business Profile

- **Wigan:** listed as "Eros cafe", 4.7 stars from 20 reviews (19 when first checked that morning, 20 by the evening), 22 photos, category "Cafe", website link present, "Order online" button present. Missing: phone number (Google shows "Add place's phone number"), hours inconsistent with the website, no posts, no menu link, no booking link. The reviews are excellent and recent (within the last three months): "beautiful interior", "prices are very reasonable", "one of the best waffles I've had".
- **Manchester, Urmston, St Helens:** searches on Google Maps for each café by name and by address returned no Eros listing (the Wigan listing came up instead). Either these cafés have no Google Business Profile or they are listed under a different name. 51 Wigan Lane also appears online as "Gelato Royale" (gelatoroyale.co.uk, currently offline), described as having stores in Wigan, Urmston and St Helens, which suggests older listings may still carry the previous name.
- **Against the top local competitors** (Google Maps, 2 November 2026): Wigan dessert shops rate 4.3–5.0 with 38–105 reviews; Urmston rivals have 138–381 reviews; St Helens rivals 89–235. Eros Wigan's 4.7 is competitive on rating and well behind on review count; the other three cafés are invisible.

- **Technical extras found:** no HSTS or other security headers; HTML served with `Cache-Control: public, max-age=0`; the sitemap submits cart, checkout, my-account, wishlist and compare pages and the "Coming Soon" placeholder, has no product sitemap, and the blog sitemap lists only the home page; page titles are generic ("Shop – Eros Cafe") and descriptions are auto-extracted sentences beginning with a dingbat; the branches page prints garbled postcodes ("2LF, 51 Wigan Ln, Wigan WN1 1XS", "M8 41GY", "WA1 9RY") where the correct ones appear to be WN1 2LF, M41 8GY and WA9 1RY.

## 5. Content and reputation

- **Publishing:** the blog in the main navigation is empty ("Nothing Found"). A live "Eros Café is Coming Soon" placeholder page at `/eros-cafe/` is in the sitemap. Product pages contain lorem ipsum in the "Shipping and Delivery" tab.
- **Reviews:** 20 Google reviews under the Eros name (4.7), all recent and warm. None are quoted or linked from the website. 245 Google reviews (3.7) and 699 Facebook reviews sit on the old Gelato Royale pages; the Google one is unclaimed and marked permanently closed, so it cannot be answered or merged until it is claimed.
- **Social:** Facebook `eroscafe0` has 188 followers, lists the Wigan address, phone and email, links to the website, and last posted on 22 October 2026 (a 29-second video, one reaction). TikTok `@eroscafe00` has 21 followers, one video and no link in the bio. Instagram `eroscafe0`, as linked from the website, shows "Profile isn't available" when opened logged-out: the handle may be wrong or the account private. The Google listing links to the website but to no social profile. Meanwhile the "Gelato Royale | Wigan" Facebook page (6,202 followers) is still the page people follow.
- **Delivery platforms:** search snippets place "Eros Cafe" on Just Eat area pages for Wigan (WN3, WN5) and reference the Wigan address on Uber Eats, but the listing pages could not be opened to verify menu, rating or status. Not on Deliveroo's Wigan dessert page. No Tripadvisor listing under the Eros name.
- **Food hygiene (public record):** the Food Standards Agency lists "Eros Cafe - Gelato Royale", 51 Wigan Lane, with a hygiene rating of **3 ("generally satisfactory")**, inspected 14 September 2026. This appears on ratings.food.gov.uk and is shown by delivery apps. A re-inspection can be requested once the inspector's points are addressed.
- **Press:** no coverage found under the Eros name. Wigan Today has covered Gelato Royale in ice-cream and hygiene-rating round-ups; its 2026 "Top 10 places for a sweet treat in Wigan borough" names Tom & Jerries, Bake & Shake, Little Dessert Shop and Suga Rush, not Eros.

## 6. Missed opportunities and what they are likely costing

**Searches Eros could own and currently does not:** its own name ("Eros Cafe", "Eros Cafe Wigan"); the legacy name and "gelato Wigan" (which today resolves to a "Permanently closed" listing with 245 reviews nobody owns); the category searches "dessert cafe Wigan / Urmston / St Helens / Manchester"; the product searches "cookie dough Wigan", "crepes Wigan", "waffles Wigan", "milkshake Wigan", "ice cream Wigan" (Wigan Today runs an annual ice-cream list that still names Gelato Royale) and "afternoon tea Wigan" (Eros sells it and has no page for it); the occasion searches "breakfast Wigan Lane" (it opens at 8am), "dessert delivery Wigan" and "book a table dessert Wigan" (rivals show "Reserve a table" on Google); and "fresh pasta Wigan" for the Italian kitchen.

**Towns:** Wigan is the only café that is verifiably trading as Eros, and its Google listing is categorised "Cafe" rather than "Dessert shop", has no phone number, no social links, no menu link, 22 photos and 20 reviews, so it loses the Maps results to seven dessert shops with 38–164 reviews. Urmston's address (Unit 4 Woodsend Circle) is listed on Google as "Gelato Royale, permanently closed", and St Helens' address (2 McCormack Avenue) is registered with the FSA as a pizza takeaway and listed on Google as "Royale Pizza Express"; 3 Hardman Street (the stated Manchester head office) has no food registration or listing. Either these are real cafés that need their own listings, pages and consistent name, address and phone, or they should come off the site until they are. A searcher who reads the branches page and then looks up the address meets contradictory information.

**Services and content with no page:** cookie dough, crêpes, waffles, sundaes, gelato, milkshakes, speciality coffee, afternoon tea, the Italian kitchen, breakfast, delivery and collection, table booking, parties and events, and a real menu with prices.

**Customer questions the current presence cannot answer:** what time do you close (5pm or 11pm)? What is the phone number (Google has none; three different numbers appear across the site and the Facebook pages)? Is Gelato Royale closed? Where exactly are the Urmston and St Helens cafés and are they open? How much is a cookie dough? Can I order delivery or book a table? Which Instagram is yours?

**Reputation to recover:** 245 Google reviews and 92 photos on the unclaimed Gelato Royale listing at the same address; 6,202 Facebook followers and 699 reviews on the Gelato Royale page; the Tripadvisor listing; the Just Eat and Deliveroo history. Claiming and merging or redirecting these is free.

**What it is likely costing (ESTIMATE, reasoning-based, not a measurement).** No search-volume tool was authorised and the site has no analytics, so no traffic figure can be given. Published benchmarks: Google reports that 76% of people who search for something nearby on a smartphone visit a related business within a day and 28% of those searches end in a purchase (Think with Google); BrightLocal's 2025 survey reports 83% of consumers use Google to read local business reviews; position 1 in Google takes roughly 19–28% of clicks and an absent business takes none (Sistrix via Search Engine Journal). A Creams Cafe review puts a typical dessert at £7–10. Scenario: for every 100 local dessert searches in Wigan that Eros is absent from, up to 28 purchases happen that day at competitors, worth roughly **£200–£280 per 100 searches** at one dessert per searcher, before drinks and before the second person at the table. Multiply by the real monthly volume once Search Console and Google Business Profile Insights are connected. Separately, every searcher who sees "Permanently closed" on the old listing is a near-certain lost visit. The 245 reviews on the old listing against 20 on the new one are the clearest sign that demand existed and was being captured under the previous name.

## 7. Quick wins you can do this week

1. **Claim the old "Gelato Royale" Google listing at 51 Wigan Lane and ask Google to merge it into "Eros cafe".** It is unclaimed, marked "Permanently closed", and holds 245 reviews and 92 photos; right now it is what Google shows people who search "gelato Wigan". Claiming it is free (Google Business Profile, "Claim this business") and a merge request moves the history under the current name. Do the same for the "Gelato Royale | Wigan" Facebook page: rename it to Eros Cafe rather than running a second, smaller page, and point its link at eros-cafe.com instead of the dead gelatoroyale.co.uk.
2. **Fix the Google Business Profile for every café.** Add the phone number to Wigan (Google currently shows "Add place's phone number"), change the category to "Dessert shop", add the social links and the menu link, and set the correct hours. Create Urmston, St Helens and Manchester listings only if those cafés are open as Eros, and correct or remove the pizza-takeaway and "permanently closed" listings at those addresses.
3. **Make the hours agree everywhere.** Website footer, contact page, Google, Facebook and Instagram bio must all say the same thing.
4. **Fix or hide the shop.** Either add prices and enable "Add to cart", or replace the shop with a simple "Order to collect: call your café" page. A £0.00 shop reads as abandoned.
5. **Replace the placeholder testimonial** with three real Google reviews (quoted with permission or as displayed on Google) and the 4.7 rating.
6. **Rewrite the home page title and description.** For example: "Eros Cafe | Dessert café & coffee house in Manchester, Wigan, Urmston and St Helens" and a one-sentence description that names the towns and the signature dishes.
7. **Allow zooming on mobile** (remove `maximum-scale=1.0, user-scalable=no` from the viewport tag) and ask your developer to clear the `cookieadmin_policy` JavaScript error.
8. **Ask every happy table for a review**, starting with Wigan: a small card with the Google review link. Twenty reviews can become fifty in a quarter.

## 8. The new homepage

### Concept
**Eros, in the language of a modern dessert house: black marble, gold and a confident Fraunces serif, written in Eros's own words.** The direction came from Jack's reference (cube-ten-pi.vercel.app): dark full-bleed photography, display type with real weight, a solid "visit" bar under the hero, the full menu as cards that turn over, a pinned signatures sequence and a giant final call to action. Everything in it is Eros: the gold of the crest, the black-and-gold marble of their own photographs, a warm, high-contrast Fraunces serif with the confidence of the reference and the refinement of the brand, the gold diamond as the mark on every label and status, headlines taken from their own site ("Served with soul", "Discover the taste of elegance", "Where taste meets elegance", "Indulge in every sip", "Find your nearest Eros", "Become an Eros partner"), and their own cappuccino, which steams.

### The scroll, section by section
1. **Header (fixed).** Crest logo, section links with a drawn underline, a café picker that the whole page follows (and remembers on the next visit), an order count once something is in the basket, and a gold "Book a table". A thin gold line along the top edge shows how far down the page you are. On phones and tablets: logo, "Book", a full-screen menu, and a bottom bar, there from the first screen, with your café, a call button and "Book a table".
2. **Hero.** On arrival the Eros crest sits on a cocoa-coloured cover for a beat, the cover lifts, the photograph settles from a zoom and the headline rises out of masks line by line: "Hot cookie dough, crêpes and gelato, served with soul.", with a single sweep of light across the gold words. Then "Book a table" and "See the menu", one line of copy, the chosen café with its live status and phone number, and 4.7★ on Google, always labelled as Eros Wigan's. **Signature moment:** steam rises from the crested cup. It is a 70 KB loop made from their own photograph, aligned to the still pixel for pixel and masked to the air above the cup, so the cup, the latte art and the Eros crest stay exactly as photographed.
3. **Visit bar (gold, overlapping the hero): "Sit in or collect".** Book a table or order to collect, your café, today's status and that café's phone number, and one button that names the café.
4. **Discover the taste of elegance (the menu).** A sticky tab bar with counts (hot cookie dough, crêpes, waffles, sundaes, milkshakes, gelato, coffee, tea) and a gold indicator that slides between tabs. The first dish of each tab is a large feature card with everything on its face; every other photographed dish turns over in 3D (hover on desktop, tap + on phones) to show what is in it and "Add to order", and Escape turns it back. A gold hairline traces each card on hover, like the rim of the Eros cup. Dishes the website has no photograph for are set as typographic cards rather than with invented pictures. Every grid ends with a gold "Book a table" card that completes the row.
5. **In our guests' own words.** Straight after the menu: 4.7 on Google from 20 reviews (Eros Wigan, 51 Wigan Lane), one featured review and four more. The welcome comes up in every one.
6. **Our signature selections.** Three of their own dark photographs side by side (crêpes, milkshakes, coffee), the middle one set lower, each drifting gently inside its frame as you scroll, with its name ("Sweet creations", "Cold indulgence", "Signature drinks"), a line from their site and a link to that part of the menu. On phones they become a swipeable row. It ends with "Best enjoyed at the table." and "Book at …".
7. **Book a table. Or order ahead.** Their own plating clip holds in a sticky frame while three numbered points, a "your café today" table (Wigan's hours by day from Google, neutral wording for the others) and the actions scroll past.
8. **Find your nearest Eros.** The four cafés set as a large typographic list. Choosing one opens it in place: address, live status, Wigan's hours by day, "Book at …", the phone number and directions in Google Maps, and the whole page follows the choice. Tripoli (with a tappable number) and Cairo, and the openings in Saudi Arabia and Syria, sit beside the heading.
9. **Manchester, 2016. Where taste meets elegance.** The éclair with slow parallax, the About page story in three short paragraphs, a pull quote and four facts (2016, six cafés, 47 on the menu, two openings ahead).
10. **See you at Eros.** The headline opens out from the centre over a slowly drifting photograph; a magnetic gold "Book at …" button, "Order to collect", today's status and the phone number. The climax of the scroll.
11. **Become an Eros partner.** The franchise offer, after the final call to action so it never interrupts a guest: three gold-ruled pillars, "Request franchise information" (email) and the direct line.
12. **Footer.** "Indulgence, crafted.", cafés with phone numbers, contacts, socials, the preview notice and the Integrate credit.

### How it converts
- **First screen on every device:** what (hot cookie dough, crêpes, gelato), where (the four towns), when (live status for Wigan), proof (4.7★ from 20 reviews, attributed to Eros Wigan), a phone number, and "Book a table". On a 375×548 phone the bottom bar's call and booking buttons are there from the start.
- **Always one tap away:** the header button; the gold visit bar; "Book at …" in every signature chapter, every café card, every menu grid, the booking section and the finale; the phone bottom bar. Thumb reach was checked at every 400 px of scroll at 375×667 with no gaps.
- **Order to collect:** "Add to order" on every card, a toast with "View order", an order count in the header, and an order sheet that collects the dishes, the café, the collection time and a name. In this preview it ends in a confirmation that says plainly nothing was sent; it never texts the café.
- **Booking:** café, day, time and guests, name and mobile, with the action pinned under the thumb. It starts at the next real slot, refuses times that have passed or fall outside the café's hours, and confirms honestly that nothing was sent.
- **Objections answered before the final call to action:** price (a real review on prices, and an honest note that prices aren't online yet), welcome (five reviews, straight after the menu), allergens (menu note), which café and when (live status, hours, phone numbers, directions), groups and events (booking point 03).
- **Motion never blocks:** every button, number and heading is in the HTML from first paint; the intro is CSS only and finishes within about 1.6 s; the animation library and both videos load only after the page has painted, and never on data-saver; `prefers-reduced-motion` removes all of it, including the scroll drift.

### Photography note
Every photograph, product shot and video clip is from eros-cafe.com. The one generated element is the hero's steam: generated motion layered over their own, untouched photograph. It should be replaced with their own footage in the full build.

## 9. What Integrate can do beyond the homepage

Each item is tied to a problem found above.

- **Full website build, hosting and ongoing edits.** A page for every café (Manchester, Wigan, Urmston, St Helens) and every service (cookie dough, crêpes, gelato, milkshakes, afternoon tea, Italian kitchen, catering and events), the menu with prices, a working reservation diary and a working order-to-collect flow. Fixes findings 1, 2, 3, 5, 6, 8.
- **SEO automations.** An automated content and blog engine targeting the searches in section 3; per-café and per-service pages; LocalBusiness, Menu and FAQ schema; sitemap and technical fixes; automated Google Business Profile posts for all four cafés; rank tracking and a monthly analytics report. Fixes findings 7, 8, 9 and the visibility gaps in sections 3 and 4.
- **Review automation.** NFC and QR review plates on every table and counter plus automatic review requests after each visit, so the three invisible cafés build the review count Wigan already has and Wigan catches up with the 100–300-review competitors. Fixes finding 4 and section 4.
- **AI lead capture.** Instant replies to every enquiry (website form, email, Instagram, WhatsApp), a website assistant that answers menu, allergen and hours questions and takes reservations, and a WhatsApp agent that qualifies catering, event and franchise enquiries and books them straight into the calendar. Fixes findings 2 and 3 and the "who answers at 9pm?" gap.

## 10. Brand system used

| Role | Colour | Hex |
|---|---|---|
| Page background | Ink | `#0B0908` |
| Alternate sections (visit, signatures, booking, reviews) | Cocoa | `#16100D` |
| Raised panels, menu text cards, franchise section | Marble | `#1E1814` |
| Story section gradient | Wine | `#1D0E10` |
| Brand accent, primary buttons, numerals, the diamond mark | Gold | `#D4AE64` |
| Hover on gold | Gold light | `#EAD3A0` |
| Primary text | Cream | `#F5ECDF` |
| Secondary text | Oat | `#B8AB9C` |
| Captions and footnotes | Ash | `#8E847B` |

The gold is measured from the Eros logo. Contrast: cream on ink about 17:1, gold on ink about 9:1, ink on gold about 9:1, oat on ink about 9:1, ash on ink about 5:1.

**Typefaces:** Fraunces (display: semibold 600 for headlines, medium for quotes, optical sizing on, tracking −0.02em, sentence case) and Instrument Sans (body and interface, 400–600). **Buttons:** square, solid gold with ink text (primary), ink with cream text on gold, or a cream hairline (secondary). **Mark:** the gold diamond (a rotated square) on every status, label and list item; no numbered steps.

**Voice:** headlines come from Eros's own site wherever possible: "Served with soul", "Discover the taste of elegance", "Sweet creations", "Indulge in every sip", "Find your nearest Eros", "Where taste meets elegance", "Become an Eros partner".

**Motion principles:** two easings only, `cubic-bezier(0.76, 0, 0.24, 1)` for masks, wipes, flips and the intro cover, and `cubic-bezier(0.22, 1, 0.36, 1)` for fades and settles. The crest holds on the cover for a beat before it lifts; headlines rise out of masks line by line; photographs wipe in from the left or the bottom and drift 7–12% on scroll; 3D is used once (menu cards turn over); the signature photographs drift inside their frames at slightly different speeds; a gold hairline traces each menu card on hover, like the rim of the cup; the finale's headline opens out from the centre; primary buttons are magnetic on desktop; one sweep of light across the gold words in the hero. Nothing loops except the steam. Everything is removed under `prefers-reduced-motion`.

## 11. Tech stack and quality bar

- Next.js 15.5 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP 3.15 with ScrollTrigger and Lenis 1.3 (both loaded once the page has painted and the browser is idle), `next/image` with blurred previews, `next/font` (Fraunces, Instrument Sans). Video: the hero steam loop (70 KB) and the plating clip (554 KB, loaded only when it is about to be seen). Opening hours and live status run in London time from one helper (`lib/hours.ts`). `noindex` meta tag plus an `X-Robots-Tag: noindex, nofollow` header. Deployed on Vercel.
- **Lighthouse mobile, production build, median of five runs:** Performance 91 (89–92), Accessibility 100, Best Practices 100, SEO 63 (only because of the deliberate `noindex`). LCP 3.19 s, Total Blocking Time 104 ms, CLS 0.000. First-load JavaScript 134 KB.
- **Interaction tests (22, all pass):** cards turn on hover and on tap; "Add to order" shows a toast; the Waffles tab shows five waffles; changing café updates the visit bar while the rating stays attributed to Eros Wigan; the booking sheet opens, validates, confirms honestly and closes on Escape; the order sheet never texts the café and confirms honestly; the phone menu opens full height; the phone bottom bar shows and opens the sheet; no console errors; no horizontal overflow at 375 px; on a Sunday at 08:30 Wigan shows "Opens at 10am today"; after Wigan closes, booking defaults to tomorrow; a time that has passed is refused.
- **Critique rounds (my own scoring, 1–10):**
  - Rounds 1 to 3 (the first two designs): the first build was rejected by Jack as "AI slop"; the second, an ivory editorial with a Cormorant serif, was rejected as not good enough.
  - Round 4 (first pass in the reference's language): concept 8, originality 8, journey 8, motion 8, typography 9, composition 7, polish 6, clarity 9, trust 9, ease of enquiry 9. Found and fixed: an over-zoomed hero, video tiles fighting the steam, wipe reveals that never fired, a hidden reveal widening the phone layout, card backs overflowing on phones, ragged grid rows, a soft booking clip.
  - Round 5: 9 or above on every criterion by my own scoring.
- **Independent quality-bar agents:**
  - The first stalled before reporting.
  - The second returned FAIL, with all twenty scores between 4 and 8, and these findings:
    - the phone and tablet menu opened blank;
    - the 4.7 rating followed whichever café was selected;
    - "Open now" was wrong on Sunday mornings (Google gives Wigan 10am on Sundays);
    - the order sheet could text the café's real number from the preview;
    - bookings accepted past times;
    - no phone number in the first screen;
    - the booking button was below the fold on phones;
    - two captions didn't match their photos;
    - the copy borrowed the reference's formulas.

    All of it was fixed: the menu moved out of the header, the rating was pinned to Wigan, Wigan's hours set by day, the order became an honest preview, booking validated against real slots, a call link and an always-on phone bar added, the sheet's action pinned, the captions corrected, every headline rewritten in Eros's own words and the reviews moved up. The generated cookie-dough photograph was also replaced with the café's own product shots.
  - Third agent: <!-- QA-RESULT -->

## 12. Screenshots and video

- Current site: `docs/screens/current-desktop-01-hero.png`, `current-desktop-02.png`, `current-desktop-03.png`, `current-mobile-01-hero.png`, `current-mobile-02.png`, `current-mobile-03.png`, `current-montage.png`
- New homepage, desktop (1440 px): `docs/screens/new-desktop-01-hero.png` to `new-desktop-12-footer.png`, plus `new-desktop-13-card-turned.png`, `new-desktop-14-booking-sheet.png`, `new-desktop-15-order-sheet.png`
- New homepage, mobile (375 px): `docs/screens/new-mobile-01-hero.png` to `new-mobile-12-finale.png`, plus `new-mobile-13-card-turned.png`, `new-mobile-14-menu.png`
- Contact sheets: `docs/screens/new-desktop-montage.png`, `docs/screens/new-mobile-montage.png`
- Scroll-through video: `docs/video/scroll-1440.mp4`, `docs/video/scroll-375.mp4`

## 13. Facts left out because they could not be verified

- **Prices:** not published anywhere on eros-cafe.com (every product shows £0.00), so the demo shows none and says so honestly.
- **Opening hours:** the website says 8am to 11pm every day for every café; Google gives Wigan Monday to Thursday 8am to 5pm, Friday and Saturday 8am to 10pm, Sunday 10am to 10pm. The demo follows Google for Wigan (including the live status) and uses neutral wording ("call ahead for today's hours") for the other three, which have no hours of their own anywhere. The site's 8am to 11pm is used only to keep booking times sensible for them.
- **Product descriptions cut off on their own site:** several product pages end mid-word ("…bringing that perfect ca", "Available in Raspberry and Man", "Raspberry, Lemon and Mang"). The demo uses only the complete part of each sentence and does not guess the rest (so no sorbet or frozen yoghurt flavours are listed).
- **Photographs for 14 dishes:** the waffles, six sundaes, gelato, sorbet and frozen yoghurt have no photograph on the website (the shop shows placeholders), so they appear as typographic cards. Nothing was generated to fill them.
- **Reviews:** Google shows 4.7 from 20 reviews for Eros Wigan; five can be read without signing in, and only those five are quoted (names shortened to first name and initial, emoji removed, text otherwise as written). The other fifteen were not read. The rating is never shown as a figure for the group or for another café.
- **The four UK cafés are shown exactly as the website lists them.** Public records only confirm Wigan as trading under the Eros name (section 6). Before the demo is used with the public, the owner must confirm which cafés are open as Eros, and the postcodes: the site prints "WN1 1XS" with a stray "2LF", "M8 41GY" and "WA1 9RY"; the FSA and Google records give WN1 2LF, M41 8GY and WA9 1RY. Only the Wigan and Manchester postcodes from the site are shown.
- **Social:** the Instagram link on the website opens "Profile isn't available", so the demo links only Facebook and TikTok, without follower counts.
- **Abroad:** Tripoli (47 Galleria De Bono, 24 December Street, +218 91 472 4949) and Cairo (Mamsha El Zamalek) are shown as the branches page prints them; Saudi Arabia and Syria as "opening soon", as the site says.
- **The éclair:** it is the café's own photograph (the hero of the current site) but it is not on the published menu, so the story section shows it without naming a dish.
- **Audit-only facts:** the Gelato Royale history, the hygiene rating and the Companies House details appear in this document only, never on the demo. Trust inputs the full build would normally carry (owner photo, surname, company number) were not requested in this run's intake.

## 14. Next step

Book a call with Jack to plan the full build: **sales@integrate.co.uk**, WhatsApp **07765 977085**, integrate.co.uk.

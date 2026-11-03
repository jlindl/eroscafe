# Eros Cafe: creative direction (round 3)

## Concept in one sentence
**Eros, in the language of a modern dessert house: black marble, gold and a confident Fraunces serif, written in Eros's own words, with their own cappuccino steaming in the first screen.**

Jack's direction for this round: make it look more like cube-ten-pi.vercel.app, premium and professional, using the content, images and inspiration of eros-cafe.com. So the structure, density and motion follow that reference, and every brand decision comes from Eros: the gold of the crest (measured from the logo, `#D4AE64`), the black-and-gold marble of their photography, a warm, high-contrast Fraunces serif for display, the gold diamond as the page's mark, their real menu, cafés and reviews, and headlines taken from their own site rather than the reference's copy formulas.

## What I took from the reference, and how it becomes Eros
| Reference technique (Cube) | On the Eros homepage |
|---|---|
| Full-bleed dark hero, heavy display type, one accent phrase | The crested cappuccino on black marble; "Hot cookie dough, crêpes and gelato, served with soul." ("Served with Soul" is their About page heading), the gold words given one sweep of light |
| Intro: a cover lifts, the photo settles from a zoom, lines rise from masks | The same intro in CSS, with the Eros crest held on the cover for a beat |
| Coloured order bar overlapping the hero | A gold "Sit in or collect" bar: book or order, your café, today's status, one button |
| Location picker that the whole page follows | Café picker in the header, the bar, the map and the cards; remembered on the next visit |
| Full menu with sticky tabs and cards that turn over | "Discover the taste of elegance": all 47 items from their site and shop; photographed dishes turn over in 3D with a gold rim traced on hover; dishes without a photograph are typographic cards |
| Signature desserts | "Our signature selections": three of their own dark photographs side by side, drifting gently on scroll |
| Split section with parallax media and numbered points | "Book a table. Or order ahead." with their plating clip held in a sticky frame and a hairline list |
| Location list with a picker | "Find your nearest Eros": the four cafés as a large typographic list that opens in place, plus Tripoli and Cairo |
| Review wall with the rating | "In our guests' own words", moved up to follow the menu |
| Story with facts | "Manchester, 2016. Where taste meets elegance." from their About page |
| Special-venue section | "Become an Eros partner", placed after the final call to action |
| Giant final call to action that opens out | "See you at Eros." over their collection shot |

What was deliberately not taken: Cube's neon pink, its Unbounded typeface, its photography, its copy and its copy formulas.

## Feeling down the scroll
- **Top: arrival.** The crest on a dark cover, the cover lifts, the cup appears and begins to steam. Calm, expensive, and immediately clear about what Eros serves, where, and how to book or call.
- **Middle: appetite and proof.** The gold bar, the whole menu in bright product shots against black with cards turning under the hand, then real reviews, then the pinned signatures. The busiest, most tactile part.
- **End: decision.** Booking, cafés and the story slow the pace, then the page opens out into one huge "See you at Eros."; the franchise offer for investors sits after it.

## Signature moment
**Their own cup breathes.** The steam is a 70 KB loop generated from Eros's cappuccino photograph, aligned to the still and masked to the air above the cup, so the cup, the latte art and the crest stay exactly as photographed. It loads only after the page has painted and never on data-saver; with reduced motion it never plays.

## Storyboard
1. Header: logo, links, café picker, order count, gold "Book a table", gold progress line. Phones: "Book", a full-screen menu and a bottom bar from the first screen.
2. Hero: crest intro, headline, Book and Menu, the café with live status and phone, 4.7★ for Eros Wigan, the steam.
3. Sit in or collect (gold bar).
4. Discover the taste of elegance: eight tabs, 47 items, a feature card and cards that turn over, a booking card completing each grid.
5. In our guests' own words: rating and five reviews.
6. Our signature selections: crêpes, milkshakes and coffee, three photographs that drift on scroll.
7. Book a table. Or order ahead.: sticky clip, three numbered points, "your café today", actions.
8. Find your nearest Eros: map, cards with hours and directions, abroad.
9. Manchester, 2016. Where taste meets elegance.: éclair, story, quote, four facts.
10. See you at Eros.: the finale.
11. Become an Eros partner: franchise.
12. Footer: "Indulgence, crafted."

## Conversion path
- **Persuaded:** the hero (what, where, when, proof), the menu (appetite), the reviews (proof straight after appetite), the signatures (the best of it).
- **Objections answered:** price (a real review on prices; an honest note that prices aren't online), welcome (five reviews), allergens (menu note), which café and when (live status, hours, phone numbers, directions), groups and events (booking point 03).
- **Every point to act:** header button; hero; gold bar; every menu grid; every signature chapter; the booking section; every café card; the finale; the phone bottom bar. "Add to order" on every card, then the order sheet.
- **Honest by design:** the booking and the order both end in a confirmation that says nothing was sent, and nothing in the preview contacts the café.
- **Motion never blocks:** buttons and copy are in the HTML from first paint; the animation library and videos load after the page has painted; reduced motion removes everything.

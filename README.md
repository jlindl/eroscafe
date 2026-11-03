# Eros Cafe — homepage demo

A single-page homepage concept for Eros Cafe (Manchester, Wigan, Urmston, St Helens), built by Integrate as a preview. It is deliberately **not indexed** (`noindex` meta plus an `X-Robots-Tag` header). The booking and order flows are front-end demonstrations: both end in a confirmation that says plainly nothing was sent, and nothing in the preview contacts the café.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4
- GSAP 3.15 with ScrollTrigger, and Lenis smooth scroll, both loaded after first paint ([lib/motion.ts](lib/motion.ts))
- `next/image` with blurred previews ([lib/blur.ts](lib/blur.ts)); `next/font` for Fraunces and Instrument Sans
- Video: the hero steam loop (`public/video/steam.mp4`, 70 KB, a 460×360 crop placed over the still) and the plating clip (`public/video/plating.mp4`, loaded when it is about to be seen)

## Run

```bash
npm install
npm run dev      # http://localhost:3210
npm run build && npm start   # http://localhost:3211
```

## Content

All copy, menu items, addresses, phone numbers, hours and reviews come from eros-cafe.com (home, shop and product pages, about, franchise, branches, contact) and the public Google listing for Eros on Wigan Lane (checked 2 November 2026). They live in [lib/data.ts](lib/data.ts). Photography, product shots and the plating clip are the café's own; the only generated element is the hero steam, layered over their untouched photograph, and it is marked as such in [OVERVIEW.md](OVERVIEW.md).

## Project files

- [direction.md](direction.md): concept, what was taken from the reference, storyboard and conversion path
- [OVERVIEW.md](OVERVIEW.md): the free site audit, the new homepage, scores and next steps
- [BRANDED-DOC-PROMPT.md](BRANDED-DOC-PROMPT.md): prompt that turns the overview into a branded client document
- [docs/screens](docs/screens) and [docs/video](docs/video): screenshots and scroll-throughs of the current site and the new homepage
- [scripts](scripts): Playwright and Lighthouse helpers used for QA (install `playwright lighthouse sharp ffmpeg-static` with `--no-save` to use them)

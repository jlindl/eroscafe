// First-screen fit at real device sizes + thumb-zone sweep + typography slips. node scripts/sizes.mjs <url> <outDir>
import { chromium } from "playwright";
import fs from "fs";
const [, , url, out] = process.argv;
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ channel: "msedge" });
const sizes = (process.argv[4] ? process.argv[4].split(",").map((p) => p.split("x").map(Number)) : [[1366, 657], [1280, 720], [1024, 768], [768, 1024], [375, 667], [375, 548], [320, 568]]);
const report = [];
for (const [w, h] of sizes) {
  const mobile = w < 800;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "domcontentloaded" }); await p.waitForTimeout(3200);
  await p.screenshot({ path: `${out}/first-${w}x${h}.png` });
  const r = await p.evaluate(() => {
    const vis = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.bottom > 0 && r.top < innerHeight && r.width > 0 && s.visibility !== "hidden" && +s.opacity > 0.5; };
    const h1 = document.querySelector("h1");
    const primary = [...document.querySelectorAll("button, a")].filter((e) => /book a table|book at|reserve a table/i.test(e.textContent) && vis(e));
    const contact = [...document.querySelectorAll("a[href^='tel:']")].filter(vis);
    const overflow = document.documentElement.scrollWidth > innerWidth + 1;
    const h1Box = h1.getBoundingClientRect();
    return { h1Visible: vis(h1) && h1Box.bottom <= innerHeight, h1Bottom: Math.round(h1Box.bottom), primaryVisible: primary.length, primaryBottoms: primary.map((e) => Math.round(e.getBoundingClientRect().bottom)), telVisible: contact.length, overflow };
  });
  report.push({ size: `${w}x${h}`, ...r });
  await ctx.close();
}
if (process.argv[5] !== "full") { await b.close(); console.log(JSON.stringify(report, null, 1)); process.exit(0); }
// Thumb-zone sweep at 375x667: at every 400px of scroll, is a primary action tappable in the lower half?
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "domcontentloaded" }); await p.waitForTimeout(2500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const misses = [];
  for (let y = 0; y < H; y += 400) {
    await p.evaluate((t) => scrollTo(0, t), y); await p.waitForTimeout(350);
    const ok = await p.evaluate(() => {
      const els = [...document.querySelectorAll("button, a")].filter((e) => /reserve|order|book|call|^\+$|add/i.test(e.textContent + " " + (e.getAttribute("aria-label") || "")));
      return els.some((e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.top >= innerHeight * 0.5 && r.bottom <= innerHeight && r.width >= 40 && r.height >= 40 && s.visibility !== "hidden" && +s.opacity > 0.5; });
    });
    if (!ok) misses.push(y);
  }
  report.push({ thumbZoneMisses: misses, scrollHeight: H });
  // typography slips
  const text = await p.evaluate(() => document.body.innerText);
  const straight = (text.match(/\w'\w/g) || []).slice(0, 10);
  const doubleSpace = (text.match(/\S  \S/g) || []).length;
  const badArticles = (text.match(/\b(a) [aeiou]\w+/gi) || []).filter((m) => !/\ba (one|uni|eu|user)/i.test(m)).slice(0, 10);
  report.push({ straightApostrophes: straight, doubleSpaces: doubleSpace, badArticles });
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(report, null, 1));

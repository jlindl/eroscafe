// node scripts/sections.mjs <url> <outDir> <width> <height>
// Screenshots each section in turn (after its reveals have run) and steps through the pinned signatures.
import { chromium } from "playwright";
import fs from "fs";
const [, , url, out, W = "1440", H = "900"] = process.argv;
fs.mkdirSync(out, { recursive: true });
const w = +W, h = +H, mobile = w < 800;
const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
const p = await ctx.newPage();
const errors = [];
p.on("pageerror", (e) => errors.push(String(e)));
p.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 300)));
await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await p.mouse.move(5, h - 5);
await p.waitForTimeout(3200);
await p.screenshot({ path: `${out}/00-hero.png` });
const shots = [
  ["01-visit", "#visit", -120],
  ["02-menu", "#menu", 0],
  ["03-grid", "#menu-grid", -140],
  ["05-sig", "#signatures", 0],
  ["09-book", "#book", 0],
  ["10-book2", "#book", 0.75],
  ["11-cafes", "#cafes", 0],
  ["12-cafes2", "#cafes", 0.8],
  ["13-reviews", "#reviews", 0],
  ["14-story", "#story", 0],
  ["15-story2", "#story", 0.7],
  ["16-franchise", "#franchise", 0],
  ["17-cta", "#book-now", 0],
  ["18-footer", "footer", 0],
];
for (const [name, sel, off] of shots) {
  const y = await p.evaluate(([s, o, vh]) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const top = el.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, Math.round(top + (Math.abs(o) < 1 ? o * vh : o)));
  }, [sel, off, h]);
  if (y === null) continue;
  // approach from just above so scroll-triggered reveals fire as they would for a person
  await p.evaluate((t) => window.scrollTo(0, Math.max(0, t - 300)), y);
  await p.waitForTimeout(250);
  await p.evaluate((t) => window.scrollTo(0, t), y);
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `${out}/${name}.png` });
  if (name === "05-sig" && !mobile) {
    for (let k = 1; k <= 3; k++) {
      await p.evaluate(([t, vh, kk]) => window.scrollTo(0, t + kk * vh * 0.9), [y, h, k]);
      await p.waitForTimeout(1500);
      await p.screenshot({ path: `${out}/0${5 + k}-sig${k}.png` });
    }
  }
}
console.log(JSON.stringify({ errors }));
await b.close();

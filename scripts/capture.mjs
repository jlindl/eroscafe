// Capture a site the way a person sees it: wheel scrolling (works with Lenis), screenshots every N px, optional video.
// Usage: node scripts/capture.mjs <url> <outDir> <width> <height> [stepPx=700] [video=1] [introFrames=0]
import { chromium } from "playwright";
import fs from "fs";
const [, , url, out, W = "1440", H = "900", step = "700", video = "1", intro = "0"] = process.argv;
fs.mkdirSync(out, { recursive: true });
const w = +W, h = +H, mobile = w < 800;
const browser = await chromium.launch({ channel: "msedge" });
const ctx = await browser.newContext({
  viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile,
  ...(video === "1" ? { recordVideo: { dir: out, size: { width: w, height: h } } } : {}),
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
if (+intro > 0) {
  for (let i = 0; i < +intro; i++) { await page.screenshot({ path: `${out}/intro-${String(i).padStart(2, "0")}.png` }); await page.waitForTimeout(180); }
} else await page.waitForTimeout(2500);
let total = await page.evaluate(() => document.documentElement.scrollHeight);
let i = 0, y = 0;
await page.screenshot({ path: `${out}/s-${String(i++).padStart(3, "0")}.png` });
await page.mouse.move(w / 2, h / 2);
while (y < total - h - 5 && i < 120) {
  if (mobile) {
    // touch devices: Lenis usually leaves native scroll; scroll in small steps
    await page.evaluate(async (d) => { for (let s = 0; s < 20; s++) { window.scrollBy(0, d / 20); await new Promise((r) => setTimeout(r, 16)); } }, +step);
  } else {
    for (let s = 0; s < 7; s++) { await page.mouse.wheel(0, +step / 7); await page.waitForTimeout(40); }
  }
  await page.waitForTimeout(1100);
  y = await page.evaluate(() => window.scrollY);
  total = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.screenshot({ path: `${out}/s-${String(i++).padStart(3, "0")}.png` });
}
console.log(JSON.stringify({ w, h, total, shots: i, finalY: y, errors: errors.slice(0, 8) }));
await ctx.close();
await browser.close();

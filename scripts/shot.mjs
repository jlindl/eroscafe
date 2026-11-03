// Usage: node scripts/shot.mjs <url> <outPrefix> [widths=1440,375] [stops=6] [video=0]
import { chromium } from "playwright";
const [, , url, out, widths = "1440,375", stops = "6", video = "0", wait = "1500"] = process.argv;
let browser;
browser = await chromium.launch({ channel: "msedge" });
for (const w of widths.split(",").map(Number)) {
  const mobile = w < 800;
  const ctx = await browser.newContext({
    viewport: { width: w, height: mobile ? 812 : 900 },
    deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile,
    ...(video === "1" ? { recordVideo: { dir: `${out}-video-${w}`, size: { width: w, height: mobile ? 812 : 900 } } } : {}),
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(+wait);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = mobile ? 812 : 900;
  const n = +stops;
  for (let i = 0; i < n; i++) {
    const y = Math.round(((H - vh) * i) / Math.max(1, n - 1));
    if (video === "1") {
      // smooth progressive scroll to y for the recording
      await page.evaluate(async (target) => {
        const start = window.scrollY; const d = target - start; const steps = 40;
        for (let s = 1; s <= steps; s++) { window.scrollTo(0, start + (d * s) / steps); await new Promise((r) => setTimeout(r, 30)); }
      }, y);
    } else {
      await page.evaluate((t) => window.scrollTo(0, t), y);
    }
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}-${w}-${String(i).padStart(2, "0")}.png` });
  }
  console.log(`w=${w} height=${H} errors=${errors.length}`, errors.slice(0, 5).join(" | "));
  await ctx.close();
}
await browser.close();

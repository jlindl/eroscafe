import { chromium } from "playwright";
const qs = process.argv.slice(2);
const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ locale: "en-GB", viewport: { width: 1300, height: 900 } });
const p = await ctx.newPage();
for (const q of qs) {
  await p.goto("https://www.google.com/maps/search/" + encodeURIComponent(q) + "?hl=en", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2500);
  const btn = p.locator('button:has-text("Accept all"), button:has-text("Reject all")').first();
  if (await btn.count()) { await btn.click().catch(()=>{}); await p.waitForTimeout(3000); }
  await p.waitForTimeout(3500);
  const txt = await p.evaluate(() => document.body.innerText.slice(0, 1800));
  const slug = q.replace(/\W+/g, "-").slice(0, 40);
  await p.screenshot({ path: `qa/gmaps-${slug}.png` });
  console.log("=== " + q + "\n" + txt.replace(/\n{2,}/g, "\n"));
}
await b.close();

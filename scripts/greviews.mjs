import { chromium } from "playwright";
const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ locale: "en-GB", viewport: { width: 1300, height: 1000 } });
const p = await ctx.newPage();
await p.goto("https://www.google.com/maps/search/" + encodeURIComponent("Eros cafe 51 Wigan Ln Wigan WN1 1XS") + "?hl=en", { waitUntil: "domcontentloaded" });
await p.waitForTimeout(2500);
const btn = p.locator('button:has-text("Accept all")').first();
if (await btn.count()) { await btn.click().catch(()=>{}); }
await p.waitForTimeout(5000);
// hours
const hoursBtn = p.locator('[data-item-id="oh"], [aria-label*="hours" i]').first();
const tab = p.locator('button[role="tab"]:has-text("Reviews")').first();
await tab.click().catch(e=>console.log("no reviews tab", e.message));
await p.waitForTimeout(3000);
const sort = p.locator('button[aria-label*="Sort" i]').first();
for (let i=0;i<6;i++){ await p.mouse.move(300,700); await p.mouse.wheel(0,2500); await p.waitForTimeout(1200); }
const more = p.locator('button:has-text("More")'); const n = await more.count(); for (let i=0;i<n;i++) await more.nth(i).click().catch(()=>{});
await p.waitForTimeout(800);
const txt = await p.evaluate(() => document.body.innerText);
console.log(txt.replace(/\n{2,}/g, "\n").slice(0, 9000));
await p.screenshot({ path: "qa/gmaps-wigan-reviews.png" });
await b.close();

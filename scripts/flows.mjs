// Interaction tests (desktop and mobile): node scripts/flows.mjs <url> <outDir>
import { chromium } from "playwright";
import fs from "fs";
const [, , url, out] = process.argv;
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ channel: "msedge" });
const log = [];
const ok = (c, m) => log.push(`${c ? "PASS" : "FAIL"} ${m}`);

// ---------- Desktop ----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);

  // flip on hover
  await p.evaluate(() => document.getElementById("menu-grid").scrollIntoView());
  await p.waitForTimeout(900);
  const card = p.locator("#menu-grid li").nth(1);
  await card.hover();
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/d-flip.png` });
  const flipped = await card.evaluate((el) => getComputedStyle(el.firstElementChild).transform !== "none");
  ok(flipped, "desktop: menu card turns over on hover");
  await card.getByRole("button", { name: /Add to order/ }).click();
  await p.waitForTimeout(500);
  const toast = await p.getByRole("status").filter({ hasText: "added to your order" }).count();
  ok(toast > 0, "desktop: add to order shows a toast");
  await p.screenshot({ path: `${out}/d-toast.png` });

  // tabs
  await p.getByRole("tab", { name: /Waffles/ }).click();
  await p.waitForTimeout(900);
  const waffles = await p.locator("#menu-grid li h3").allInnerTexts();
  ok(waffles.includes("Dubai Classic") && waffles.length === 5, `desktop: Waffles tab shows 5 waffles (${waffles.length})`);
  await p.screenshot({ path: `${out}/d-waffles.png` });

  // change café: the page follows, the rating stays attributed to Wigan
  await p.selectOption("#nav-cafe", "manchester");
  await p.waitForTimeout(300);
  const lbl = await p.locator("#visit button.btn-ink").innerText();
  ok(/Manchester/.test(lbl), `desktop: café picker updates the visit bar (${lbl.trim()})`);
  const heroRating = await p.locator('#top a[href="#reviews"]').innerText();
  ok(/Eros Wigan/.test(heroRating), `desktop: hero rating stays attributed to Eros Wigan (${heroRating.trim()})`);
  await p.selectOption("#nav-cafe", "wigan");
  await p.waitForTimeout(300);

  // booking sheet
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(600);
  await p.locator("#top").getByRole("button", { name: "Book a table" }).click();
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/d-sheet.png` });
  const dlg = await p.locator("dialog[open]").count();
  ok(dlg === 1, "desktop: Book a table opens the booking sheet");
  await p.getByRole("button", { name: "Request a table" }).click();
  await p.waitForTimeout(200);
  ok((await p.locator("dialog[open]").getByRole("alert").count()) === 1, "desktop: empty booking shows a validation message");
  await p.getByLabel("Name").fill("Jack Test");
  await p.getByLabel("Mobile").fill("07700 900123");
  await p.getByRole("button", { name: "Request a table" }).click();
  await p.waitForTimeout(400);
  const done = await p.locator("dialog[open]").innerText();
  ok(/nothing has been sent/.test(done), "desktop: booking confirmation says nothing was sent");
  await p.screenshot({ path: `${out}/d-sent.png` });
  await p.getByRole("tab", { name: /Order to collect/ }).click();
  await p.waitForTimeout(400);
  ok((await p.locator('dialog a[href^="sms:"]').count()) === 0, "desktop: the order sheet never texts the café from the preview");
  await p.screenshot({ path: `${out}/d-order.png` });
  await p.getByLabel("Name for the order").fill("Jack");
  await p.getByRole("button", { name: /Send the order/ }).click();
  await p.waitForTimeout(400);
  ok(/nothing has been sent/.test(await p.locator("dialog[open]").innerText()), "desktop: the order confirmation says nothing was sent");
  await p.keyboard.press("Escape");
  await p.waitForTimeout(700);
  ok((await p.locator("dialog[open]").count()) === 0, "desktop: Escape closes the sheet");
  ok(errs.length === 0, `desktop: no console errors (${errs.join(" | ")})`);
  await ctx.close();
}

// ---------- Mobile ----------
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 200)));
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(2500);
  const heroBtn = await p.locator("#top").getByRole("button", { name: "Book a table" }).boundingBox();
  ok(heroBtn && heroBtn.y + heroBtn.height <= 812, `mobile: hero Book a table is in the first screen (bottom ${heroBtn && Math.round(heroBtn.y + heroBtn.height)})`);
  await p.getByRole("button", { name: "Open menu" }).tap();
  await p.waitForTimeout(900);
  const mh = await p.evaluate(() => document.getElementById("mobile-menu").getBoundingClientRect().height);
  ok(mh > 400, `mobile: the menu opens full height (${Math.round(mh)}px)`);
  await p.screenshot({ path: `${out}/m-menu.png` });
  await p.getByRole("button", { name: "Close menu" }).tap();
  await p.waitForTimeout(700);
  await p.evaluate(() => document.getElementById("menu-grid").scrollIntoView());
  await p.waitForTimeout(1200);
  const bar = await p.locator("div.fixed.bottom-0").last().boundingBox();
  ok(bar && bar.y < 812 && bar.y > 700, `mobile: bottom bar is showing (y ${bar && Math.round(bar.y)})`);
  await p.locator("#menu-grid li").nth(1).getByRole("button", { name: /What’s in/ }).tap();
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/m-flip.png` });
  const fl = await p.locator("#menu-grid li").nth(1).evaluate((el) => getComputedStyle(el.firstElementChild).transform !== "none");
  ok(fl, "mobile: tapping + turns the card over");
  await p.locator("div.fixed.bottom-0").last().getByRole("button", { name: "Book a table" }).tap();
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/m-sheet.png` });
  ok((await p.locator("dialog[open]").count()) === 1, "mobile: bottom bar opens the booking sheet");
  ok(errs.length === 0, `mobile: no console errors (${errs.join(" | ")})`);
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(overflow <= 0, `mobile: no horizontal overflow (${overflow}px)`);
  await ctx.close();
}
// ---------- Clock checks: Sunday morning hours, and no past booking times ----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, timezoneId: "Europe/London" });
  const p = await ctx.newPage();
  await p.clock.setFixedTime(new Date("2026-11-08T08:30:00Z")); // Sunday 08:30 in London
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  ok(/Opens at 10am today/.test(await p.locator("#top").innerText()), "clock: Sunday 08:30 shows Wigan opening at 10am");
  await p.clock.setFixedTime(new Date("2026-11-03T18:30:00Z")); // Tuesday 18:30, after Wigan closes
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  await p.locator("#top").getByRole("button", { name: "Book a table" }).click();
  await p.waitForTimeout(700);
  const dateVal = await p.locator("dialog input[type=date]").inputValue();
  ok(dateVal === "2026-11-04", `clock: after closing, booking defaults to tomorrow (${dateVal})`);
  await p.locator("dialog input[type=date]").fill("2026-11-03");
  await p.locator("dialog input[type=time]").fill("12:30");
  await p.getByLabel("Name").fill("Jack Test");
  await p.getByLabel("Mobile").fill("07700 900123");
  await p.getByRole("button", { name: "Request a table" }).click();
  await p.waitForTimeout(300);
  ok((await p.locator("dialog[open]").getByRole("alert").count()) === 1, "clock: a booking time that has passed is refused");
  await ctx.close();
}
await b.close();
console.log(log.join("\n"));

// node scripts/el.mjs <url> <out> <width> <selector> [offsetY] [action]
import { chromium } from "playwright";
const [, , url, out, w = "1440", sel = "body", off = "0", action = ""] = process.argv;
const b = await chromium.launch({ channel: "msedge" });
const mobile = +w < 800;
const p = await b.newPage({ viewport: { width: +w, height: mobile ? 812 : 900 }, isMobile: mobile, hasTouch: mobile });
const errs = []; p.on("pageerror", (e) => errs.push(String(e))); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(url, { waitUntil: "domcontentloaded" }); await p.waitForTimeout(1500);
const y = await p.evaluate((s) => { const el = document.querySelector(s); return el ? el.getBoundingClientRect().top + window.scrollY : 0; }, sel);
await p.evaluate((t) => window.scrollTo(0, t), y + +off); await p.waitForTimeout(1600);
if (action) { for (const a of action.split(";")) { const [kind, arg] = a.split("|"); if (kind === "click") await p.click(arg); if (kind === "hover") await p.hover(arg); if (kind === "wait") await p.waitForTimeout(+arg); } await p.waitForTimeout(1600); }
await p.screenshot({ path: out });
console.log("errors:", errs.length, errs.slice(0, 3).join(" | "));
await b.close();

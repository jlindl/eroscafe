// node scripts/inspect.mjs <url> <outPrefix> [frames] [wheelPx] — wheel-scroll capture plus a DOM/tech report
import { chromium } from "playwright";
const [, , url, out, frames = "10", per = "900"] = process.argv;
const b = await chromium.launch({ channel: "msedge" });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const reqs = new Set();
p.on("request", (r) => { const u = r.url(); if (/\.(js|mjs)(\?|$)/.test(u)) reqs.add(u.split("?")[0].split("/").slice(-1)[0]); });
await p.goto(url, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
await p.waitForTimeout(4000);
await p.mouse.move(720, 450);
for (let i = 0; i < +frames; i++) {
  await p.screenshot({ path: `${out}-${String(i).padStart(2, "0")}.png` });
  for (let k = 0; k < 10; k++) { await p.mouse.wheel(0, +per / 10); await p.waitForTimeout(50); }
  await p.waitForTimeout(1400);
}
const report = await p.evaluate(() => {
  const w = window;
  const libs = { gsap: !!w.gsap, ScrollTrigger: !!(w.ScrollTrigger || (w.gsap && w.gsap.plugins && w.gsap.plugins.ScrollTrigger)), lenis: !!(w.lenis || w.__lenis || document.documentElement.classList.contains("lenis")), three: !!w.THREE, framer: !!document.querySelector("[data-framer-name],[style*='transform: translate']"), canvas: document.querySelectorAll("canvas").length, video: document.querySelectorAll("video").length, svg: document.querySelectorAll("svg").length };
  const fonts = [...new Set([...document.querySelectorAll("h1,h2,h3,p,a,button,span")].map((e) => getComputedStyle(e).fontFamily.split(",")[0].replace(/['"]/g, "")))].slice(0, 8);
  const colors = [...new Set([...document.querySelectorAll("section,div,header,footer")].map((e) => getComputedStyle(e).backgroundColor).filter((c) => c !== "rgba(0, 0, 0, 0)"))].slice(0, 12);
  const headings = [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName + ": " + h.textContent.trim().replace(/\s+/g, " ").slice(0, 90)).slice(0, 30);
  const buttons = [...document.querySelectorAll("a,button")].map((b) => b.textContent.trim().replace(/\s+/g, " ")).filter((t) => t && t.length < 40).slice(0, 40);
  const classes = [...new Set([...document.querySelectorAll("[class]")].flatMap((e) => String(e.className).split(/\s+/)))].filter((c) => /anim|reveal|marquee|parallax|pin|sticky|split|mask|cursor|magnet|hover|stagger|scroll|float|rotate|tilt|glow|blob|noise|grain|gradient|orbit|ticker|count/i.test(c)).slice(0, 60);
  const pinned = [...document.querySelectorAll(".pin-spacer, [style*='position: fixed'], [style*='position: sticky']")].length;
  const inlineTransforms = [...document.querySelectorAll("[style*='transform']")].length;
  return { libs, fonts, colors, headings, buttons, classes, pinned, inlineTransforms, height: document.documentElement.scrollHeight, title: document.title };
});
console.log(JSON.stringify({ scripts: [...reqs].slice(0, 25), ...report }, null, 1));
await b.close();

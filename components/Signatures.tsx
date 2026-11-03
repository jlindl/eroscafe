"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { SIGNATURES } from "@/lib/data";
import { useVisit } from "./visit";
import { goTo } from "./SmoothScroll";
import { MaskLines, Reveal } from "./Reveal";
import { Arrow } from "./ui";
import { blur } from "@/lib/blur";
import { reducedMotion, withMotion } from "@/lib/motion";

const POSITION: Record<string, string> = {
  crepes: "object-[50%_45%]",
  milkshakes: "object-[51%_50%]",
  coffee: "object-[72%_55%]",
};

function seeAll(menu: string) {
  window.dispatchEvent(new CustomEvent("eros:menu", { detail: menu }));
  goTo("#menu-grid");
}

export function Signatures() {
  const { open, cafe } = useVisit();
  const root = useRef<HTMLElement>(null);

  // Each photograph drifts a little inside its frame as the section passes.
  useEffect(() => {
    if (reducedMotion()) return;
    return withMotion(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { yPercent: -6 - i * 2 },
            { yPercent: 6 + i * 2, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      }, root);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={root} id="signatures" aria-labelledby="signatures-heading" className="relative overflow-clip bg-cocoa py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(212,174,100,0.09),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal kind="fade" className="eyebrow">
              <span className="lozenge" aria-hidden /> Eros signatures
            </Reveal>
            <MaskLines id="signatures-heading" lines={["Our signature", "selections."]} className="font-display t-h2 mt-5 font-semibold text-cream" />
          </div>
          <Reveal kind="fade" delay={0.2} className="t-lead max-w-[40ch] text-oat text-pretty">
            <p>Handcrafted crêpes, rich milkshakes and speciality coffee, made fresh daily.</p>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {SIGNATURES.map((s, i) => (
            <li
              key={s.id}
              className={`group w-[82vw] max-w-[420px] shrink-0 snap-start sm:w-[56vw] lg:w-auto lg:max-w-none ${i === 1 ? "lg:mt-20" : ""}`}
              style={{ "--i": i } as CSSProperties}
            >
              <Reveal kind="wipe-up" delay={0.12 * i} amount={0.2}>
                <figure className="relative aspect-[3/4] overflow-hidden border border-cream/10 bg-marble">
                  <div data-drift className="absolute -inset-y-[9%] inset-x-0">
                    <Image
                      src={s.image}
                      {...blur(s.image)}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 31vw, 82vw"
                      quality={72}
                      className={`object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05] ${POSITION[s.id]}`}
                    />
                  </div>
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(11,9,8,0.75),transparent)]" />
                  <figcaption className="absolute bottom-4 left-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold-light">{s.kicker}</figcaption>
                </figure>
              </Reveal>
              <Reveal kind="fade" delay={0.12 * i + 0.15} className="mt-6">
                <h3 className="font-display text-[clamp(1.7rem,1.2rem+1.3vw,2.4rem)] font-semibold leading-[1.02] text-cream">{s.title}</h3>
                <p className="mt-3 max-w-[40ch] text-[1rem] leading-relaxed text-cream/75 text-pretty">{s.body}</p>
                <div className="mt-5 border-t border-cream/10 pt-4">
                  <button type="button" onClick={() => seeAll(s.menu)} className="link-draw inline-flex items-center gap-2 text-[0.95rem] font-semibold text-cream">
                    {s.note} <Arrow className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </button>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal kind="fade" className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8">
          <p className="font-display text-[clamp(1.3rem,1rem+0.8vw,1.8rem)] font-medium text-cream">Best enjoyed at the table.</p>
          <button type="button" onClick={() => open("book")} className="btn btn-gold btn-lg">
            Book at {cafe.town}
          </button>
        </Reveal>
      </div>
    </section>
  );
}

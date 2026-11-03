"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PULL_QUOTE, STORY_FACTS } from "@/lib/data";
import { MaskLines, Reveal } from "./Reveal";
import { blur } from "@/lib/blur";
import { reducedMotion, withMotion } from "@/lib/motion";

export function Story() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    return withMotion(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(img.current, { yPercent: -7, scale: 1.12 }, { yPercent: 7, scale: 1.02, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      }, root);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section
      ref={root}
      id="story"
      aria-labelledby="story-heading"
      className="relative bg-[linear-gradient(to_bottom,var(--color-cocoa),var(--color-wine)_45%,var(--color-ink))] py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1600px] gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <Reveal kind="wipe-up" amount={0.25} className="relative">
          <figure className="relative aspect-[4/5] overflow-hidden border border-cream/10 lg:aspect-[5/6]">
            <div ref={img} className="absolute inset-0">
              <Image src="/img/eclair-dark.webp" {...blur("/img/eclair-dark.webp")} alt="A chocolate éclair on a gold-rimmed plate, on a dark table" fill sizes="(min-width: 1024px) 50vw, 100vw" quality={72} className="object-cover object-[46%_50%]" />
            </div>
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-[0.8rem] text-cream/80">
              <span>From the Eros photography</span>
              <span className="font-display text-[1.05rem] font-semibold text-gold">Est. 2016</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <MaskLines id="story-heading" lines={["Manchester, 2016.", "Where taste meets elegance."]} className="font-display t-h2 font-semibold text-cream" />
          <Reveal kind="fade" delay={0.2} className="mt-8 space-y-5 text-[1.08rem] leading-relaxed text-cream/85 text-pretty">
            <p>
              Eros was established in Manchester in 2016, born from a passion for European dessert culture: the richness of Italian
              gelato, the elegance of French pâtisserie and the warmth of a refined coffee house, all in one place.
            </p>
            <p>
              Gelato and desserts are prepared fresh every day. Speciality coffee and fine teas are served with the same attention to
              quality, and every café works to the same standards.
            </p>
            <p>
              Today there are four cafés in the North West and two more in Tripoli and Cairo, with openings ahead in Saudi Arabia and
              Syria.
            </p>
          </Reveal>

          <Reveal kind="fade" delay={0.1} className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-display text-[1.45rem] font-medium leading-snug text-cream">“{PULL_QUOTE.text}”</p>
            <p className="mt-2 text-[0.88rem] text-oat">{PULL_QUOTE.who}</p>
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 gap-2.5">
            {STORY_FACTS.map((f, i) => (
              <Reveal key={f.big} kind="fade" delay={0.08 * i} className="flex flex-col border border-cream/10 bg-ink/30 p-5">
                <dt className="order-2 mt-2 text-[0.9rem] text-oat">{f.small}</dt>
                <dd className="font-display order-1 text-[2.4rem] font-semibold leading-none text-gold">{f.big}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

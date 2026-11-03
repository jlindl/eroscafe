"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { MENU, MENU_COUNT, type Category, type Item } from "@/lib/data";
import { useVisit } from "./visit";
import { MaskLines, Reveal } from "./Reveal";
import { blur } from "@/lib/blur";

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

function usePointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

function singular(c: Category) {
  const map: Record<string, string> = {
    "cookie-dough": "Cookie dough",
    crepes: "Crêpe",
    waffles: "Waffle",
    sundaes: "Sundae",
    milkshakes: "Milkshake",
    gelato: "Gelato",
    coffee: "Coffee",
    tea: "Tea",
  };
  return map[c.id] ?? c.label;
}

/** The gold rim: a hairline that traces the card on hover, like the rim of the Eros cup. */
function Rim() {
  return (
    <svg aria-hidden className="rim pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <rect x="0.6" y="0.6" width="98.8" height="98.8" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" pathLength={1} />
    </svg>
  );
}

function AddButton({ item, cat, tone = "ink", btnRef }: { item: Item; cat: Category; tone?: "ink" | "gold"; btnRef?: React.Ref<HTMLButtonElement> }) {
  const { add } = useVisit();
  return (
    <button
      ref={btnRef}
      type="button"
      onClick={() => add({ id: item.id, name: item.name, detail: singular(cat) })}
      aria-label={`Add to order: ${item.name} ${singular(cat).toLowerCase()}`}
      className={`btn !min-h-11 !gap-2 !px-3.5 text-[0.85rem] ${tone === "ink" ? "btn-ink" : "btn-gold"}`}
    >
      <span className="sm:hidden">Add</span>
      <span className="hidden sm:inline">Add to order</span>
      <span aria-hidden className="text-base leading-none">
        +
      </span>
    </button>
  );
}

/** The first dish of each category: large, with everything on its face. */
function FeatureCard({ item, cat, i }: { item: Item; cat: Category; i: number }) {
  return (
    <li className="card-in group relative col-span-2 row-span-2 aspect-square overflow-hidden bg-[#f3f1ee]" style={{ "--i": i } as CSSProperties}>
      <Image
        src={item.img!}
        {...blur(item.img!)}
        alt={`${item.name} ${singular(cat).toLowerCase()}`}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
        quality={70}
        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,9,8,0.94)_0%,rgba(11,9,8,0.45)_42%,transparent_66%)]" />
      {item.tag && (
        <span className="absolute left-3 top-3 bg-gold px-2 py-1 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">{item.tag}</span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-gold-light">{singular(cat)}</p>
          <h3 className="font-display mt-1 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-[0.95] text-cream">{item.name}</h3>
          <p className="mt-2 max-w-[42ch] text-[0.95rem] text-cream/85 text-pretty">{item.desc}</p>
        </div>
        <div className="shrink-0">
          <AddButton item={item} cat={cat} tone="gold" />
        </div>
      </div>
      <Rim />
    </li>
  );
}

function FlipCard({ item, cat, i }: { item: Item; cat: Category; i: number }) {
  const [flip, setFlip] = useState(false);
  const fine = usePointerFine();
  const addRef = useRef<HTMLButtonElement>(null);
  const frontRef = useRef<HTMLButtonElement>(null);
  const keyboard = useRef(false);

  useEffect(() => {
    if (!keyboard.current) return;
    keyboard.current = false;
    const t = window.setTimeout(() => (flip ? addRef.current : frontRef.current)?.focus({ preventScroll: true }), 80);
    return () => window.clearTimeout(t);
  }, [flip]);

  const back = () => {
    keyboard.current = true;
    setFlip(false);
  };

  return (
    <li
      className="card-in perspective group relative aspect-square"
      style={{ "--i": i } as CSSProperties}
      onMouseEnter={() => fine && setFlip(true)}
      onMouseLeave={() => fine && setFlip(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && flip) {
          e.stopPropagation();
          back();
        }
      }}
    >
      <div className="preserve-3d relative h-full w-full transition-transform duration-700 ease-[var(--ease-cube)]" style={{ transform: flip ? "rotateY(180deg)" : "none" }}>
        {/* Front */}
        <div className="backface-hidden absolute inset-0 overflow-hidden bg-[#f3f1ee]" inert={flip}>
          <Image
            src={item.img!}
            {...blur(item.img!)}
            alt={`${item.name} ${singular(cat).toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            quality={70}
            className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,9,8,0.92)_0%,rgba(11,9,8,0.35)_38%,transparent_62%)]" />
          {item.tag && (
            <span className="absolute left-2 top-2 bg-gold px-1.5 py-0.5 text-[0.56rem] font-bold uppercase tracking-[0.06em] text-ink sm:left-3 sm:top-3 sm:px-2 sm:py-1 sm:text-[0.66rem] sm:tracking-[0.08em]">
              {item.tag}
            </span>
          )}
          <button
            ref={frontRef}
            type="button"
            aria-expanded={flip}
            aria-label={`What’s in the ${item.name} ${singular(cat).toLowerCase()}`}
            onClick={() => setFlip(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") keyboard.current = true;
            }}
            className="absolute inset-0 z-10 cursor-pointer"
          >
            <span
              aria-hidden
              className="absolute right-1.5 top-1.5 grid h-11 w-11 place-items-center bg-ink/60 text-lg text-cream backdrop-blur transition-colors group-hover:bg-gold group-hover:text-ink sm:right-3 sm:top-3"
            >
              +
            </span>
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <h3 className="font-display text-[1.12rem] font-semibold leading-[0.95] text-cream sm:text-[1.3rem]">{item.name}</h3>
          </div>
        </div>

        {/* Back */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between gap-2 bg-gold p-3 text-ink [transform:rotateY(180deg)] sm:p-5" inert={!flip} aria-hidden={!flip}>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink/65 max-sm:hidden">{singular(cat)}</p>
            <p className="font-display text-[1rem] font-semibold leading-[0.95] sm:mt-1 sm:text-[1.35rem]">{item.name}</p>
            <p className="mt-1.5 text-[0.72rem] leading-[1.32] text-ink/80 text-pretty sm:mt-2.5 sm:text-[0.9rem] sm:leading-snug">{item.desc}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <AddButton item={item} cat={cat} btnRef={addRef} />
            <button
              type="button"
              aria-label={`Turn the ${item.name} card back`}
              onClick={back}
              className="grid h-11 w-11 shrink-0 place-items-center border border-ink/30 text-xl leading-none hover:border-ink"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      <Rim />
    </li>
  );
}

// A booking card that completes the last row of the grid at every breakpoint.
const SPAN = {
  base: { 1: "col-span-1", 2: "col-span-2" } as Record<number, string>,
  md: { 1: "md:col-span-1", 2: "md:col-span-2", 3: "md:col-span-3" } as Record<number, string>,
  lg: { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4" } as Record<number, string>,
};
function fill(n: number, cols: number) {
  const r = (n + 3) % cols; // the first card takes four cells
  return r ? cols - r : cols;
}
function BookCard({ n, i }: { n: number; i: number }) {
  const { open, cafe } = useVisit();
  return (
    <li className={`card-in ${SPAN.base[fill(n, 2)]} ${SPAN.md[fill(n, 3)]} ${SPAN.lg[fill(n, 4)]}`} style={{ "--i": i } as CSSProperties}>
      <button
        type="button"
        onClick={() => open("book")}
        className="group flex h-full min-h-40 w-full flex-col justify-between gap-4 bg-gold p-4 text-left text-ink transition-colors duration-500 hover:bg-gold-light sm:p-5"
      >
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-ink/65">Eros {cafe.town}</span>
        <span className="font-display text-[clamp(1.3rem,1rem+1.1vw,2.1rem)] font-semibold leading-[0.95]">Book a table and try them in the café.</span>
        <span className="flex items-center gap-2.5 text-[0.95rem] font-semibold">
          Book at {cafe.town}
          <span aria-hidden className="grid h-6 w-6 place-items-center bg-ink transition-transform duration-500 ease-[var(--ease-cube)] group-hover:rotate-90">
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        </span>
      </button>
    </li>
  );
}

function TextCard({ item, cat, large, i }: { item: Item; cat: Category; large: boolean; i: number }) {
  return (
    <li
      className={`card-in group lattice-bg relative flex aspect-square flex-col justify-between overflow-hidden border border-cream/10 bg-marble p-3.5 sm:p-5 ${large ? "col-span-2 row-span-2" : ""}`}
      style={{ "--i": i } as CSSProperties}
    >
      <div>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-gold">{singular(cat)}</p>
        <h3 className={`font-display mt-1.5 font-semibold leading-[0.95] text-cream ${large ? "text-[clamp(2rem,4vw,3.6rem)]" : "text-[1.12rem] sm:text-[1.35rem]"}`}>{item.name}</h3>
        <p className={`mt-2.5 text-oat text-pretty ${large ? "max-w-[34ch] text-[1.05rem]" : "text-[0.8rem] leading-snug sm:text-[0.9rem]"}`}>{item.desc}</p>
      </div>
      <div>
        <AddButton item={item} cat={cat} tone="gold" />
      </div>
      <Rim />
    </li>
  );
}

export function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  const cat = MENU.find((c) => c.id === active)!;

  useIso(() => {
    const list = listRef.current;
    const p = pill.current;
    if (!list || !p) return;
    const place = () => {
      const btn = list.querySelector<HTMLButtonElement>(`[data-tab="${active}"]`);
      if (!btn) return;
      p.style.transition = first.current ? "none" : "";
      p.style.width = `${btn.offsetWidth}px`;
      p.style.transform = `translateX(${btn.offsetLeft}px)`;
      first.current = false;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  const choose = (id: string) => {
    setActive(id);
    const btn = listRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${id}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    const sec = document.getElementById("menu-grid");
    if (sec && sec.getBoundingClientRect().top < 0) {
      const y = sec.getBoundingClientRect().top + window.scrollY - 150;
      if (window.__lenis) window.__lenis.scrollTo(y, { duration: 0.9 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Other sections ask for a category ("See them on the menu").
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (MENU.some((c) => c.id === id)) setActive(id);
    };
    window.addEventListener("eros:menu", on);
    return () => window.removeEventListener("eros:menu", on);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const i = MENU.findIndex((c) => c.id === active);
    const n = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : -2;
    if (n === -2) return;
    e.preventDefault();
    const next = MENU[(n + MENU.length) % MENU.length].id;
    choose(next);
    listRef.current?.querySelector<HTMLButtonElement>(`[data-tab="${next}"]`)?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-heading" className="relative bg-ink pb-20 pt-24 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal kind="fade" className="eyebrow">
              <span className="lozenge" aria-hidden /> Our dessert and drinks menu
            </Reveal>
            <MaskLines id="menu-heading" lines={["Discover the", "taste of elegance."]} className="font-display t-h2 mt-5 font-semibold text-cream" />
            <Reveal kind="fade" delay={0.25} className="t-lead mt-6 max-w-[46ch] text-oat text-pretty">
              <p>
                All {MENU_COUNT} desserts and drinks on the Eros menu, from hot cookie dough and the Dubai Delight crêpe to sundaes, milkshakes, coffee and fine teas.
              </p>
            </Reveal>
          </div>
          <Reveal kind="slide-left" delay={0.2} className="flex items-center gap-3 text-[0.9rem] text-oat md:justify-end">
            <span className="lozenge" aria-hidden />
            <span className="hidden md:inline">Hover a dish for what’s in it</span>
            <span className="md:hidden">Tap + for what’s in it</span>
          </Reveal>
        </div>
      </div>

      <div className="sticky top-(--nav-h) z-30 mt-10 border-y border-cream/10 bg-ink/88 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div ref={listRef} role="tablist" aria-label="Menu categories" onKeyDown={onKey} className="no-scrollbar relative flex gap-1 overflow-x-auto py-2.5">
            <span ref={pill} aria-hidden className="absolute left-0 top-2.5 h-11 bg-gold transition-[transform,width] duration-[550ms] ease-[var(--ease-cube)]" />
            {MENU.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  data-tab={c.id}
                  id={`tab-${c.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="menu-grid"
                  tabIndex={on ? 0 : -1}
                  onClick={() => choose(c.id)}
                  className={`relative z-10 flex h-11 shrink-0 items-center gap-2 px-4 text-[0.95rem] font-semibold transition-colors duration-300 ${
                    on ? "text-ink" : "text-cream/75 hover:text-cream"
                  }`}
                >
                  {c.label}
                  <span className={`text-[0.72rem] tabular-nums ${on ? "text-ink/70" : "text-ash"}`}>{c.items.length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div id="menu-grid" role="tabpanel" aria-labelledby={`tab-${active}`} className="pt-8">
          <p key={`b-${active}`} className="card-in t-lead max-w-[60ch] text-cream/80">
            {cat.blurb}
          </p>
          <ul key={active} className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {cat.items.map((it, i) =>
              it.img ? (
                i === 0 ? (
                  <FeatureCard key={it.id} item={it} cat={cat} i={i} />
                ) : (
                  <FlipCard key={it.id} item={it} cat={cat} i={i} />
                )
              ) : (
                <TextCard key={it.id} item={it} cat={cat} large={i === 0} i={i} />
              ),
            )}
            <BookCard n={cat.items.length} i={cat.items.length} />
          </ul>
          <p className="mt-8 max-w-[90ch] text-[0.9rem] text-ash">
            Prices aren’t published online yet, so ask in the café or call ahead. Eros promises full transparency on allergens: ask the team in any café.
          </p>
        </div>
      </div>
    </section>
  );
}

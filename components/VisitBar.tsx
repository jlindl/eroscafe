"use client";

import { useState, type CSSProperties } from "react";
import { useVisit, type Tab } from "./visit";
import { CafeSelect } from "./Nav";
import { OpenBadge, PhoneIcon } from "./ui";

const MODES: { id: Tab; label: string; help: string }[] = [
  { id: "book", label: "Book a table", help: "Choose a day, a time and how many of you." },
  { id: "order", label: "Order to collect", help: "Add dishes from the menu, then send your order to the café." },
];

export function VisitBar() {
  const { open, cafe, count, branch } = useVisit();
  const [mode, setMode] = useState<Tab>("book");
  const m = MODES.find((x) => x.id === mode)!;

  return (
    <section id="visit" aria-labelledby="visit-heading" className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-10">
      <div className="hero-fade mx-auto max-w-[1600px]" style={{ "--d": "1.05s" } as CSSProperties}>
        <div className="grid bg-gold text-ink md:grid-cols-[1.25fr_1fr_auto]">
          <div className="p-6 md:p-8">
            <h2 id="visit-heading" className="font-display text-[1.25rem] font-semibold leading-tight sm:text-[1.4rem]">
              Sit in or collect
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Book or order">
              {MODES.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={mode === x.id}
                  onClick={() => setMode(x.id)}
                  className={`flex min-h-12 items-center gap-2.5 border px-4 text-left text-[0.95rem] font-semibold transition-colors duration-300 ${
                    mode === x.id ? "border-ink bg-ink text-cream" : "border-ink/35 text-ink hover:border-ink"
                  }`}
                >
                  <span aria-hidden className={`h-2 w-2 shrink-0 rotate-45 ${mode === x.id ? "bg-gold" : "bg-ink"}`} />
                  {x.label}
                  {x.id === "order" && count > 0 && <span className="ml-auto text-[0.8rem] opacity-80">({count})</span>}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[0.92rem] text-ink/75">{m.help}</p>
          </div>

          <div className="border-t border-ink/15 p-6 md:border-l md:border-t-0 md:p-8">
            <p className="font-display text-[1.25rem] font-semibold leading-tight sm:text-[1.4rem]">Your café</p>
            <CafeSelect id="bar-cafe" tone="gold" className="mt-4 w-full" />
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.92rem] text-ink/80">
              <OpenBadge cafe={branch} tone="ink" />
              <a href={`tel:${cafe.tel}`} className="link-draw inline-flex items-center gap-1.5 font-semibold text-ink">
                <PhoneIcon className="h-3.5 w-3.5" />
                {cafe.phone}
              </a>
            </p>
          </div>

          <div className="flex items-center border-t border-ink/15 p-6 md:border-l md:border-t-0 md:p-8">
            <button type="button" onClick={() => open(mode)} className="btn btn-ink btn-lg group w-full md:w-auto">
              {mode === "book" ? `Book at ${cafe.town}` : `Order from ${cafe.town}`}
              <span aria-hidden className="grid h-7 w-7 place-items-center bg-gold transition-transform duration-500 ease-[var(--ease-cube)] group-hover:rotate-90">
                <span className="h-2 w-2 rotate-45 bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

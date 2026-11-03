"use client";

import { ABROAD, BRANCHES, HOURS, SOON, WIGAN_HOURS_ROWS } from "@/lib/data";
import { useVisit } from "./visit";
import { MaskLines, Reveal } from "./Reveal";
import { OpenBadge, PhoneIcon } from "./ui";

const mapsUrl = (address: string, town: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Eros Cafe ${address} ${town}`)}`;

export function Locations() {
  const { branch, setBranch, open } = useVisit();
  return (
    <section id="cafes" aria-labelledby="cafes-heading" className="relative bg-ink py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(212,174,100,0.07),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
          <Reveal kind="fade" className="eyebrow">
            <span className="lozenge" aria-hidden /> Our cafés
          </Reveal>
          <MaskLines id="cafes-heading" lines={["Find your", "nearest Eros."]} className="font-display t-h2 mt-5 font-semibold text-cream" />
          <Reveal kind="fade" delay={0.2} className="t-lead mt-6 max-w-[40ch] text-oat text-pretty">
            <p>Four cafés in the North West. Choose yours and the page follows: the booking, the phone number and the order.</p>
          </Reveal>

          <Reveal kind="fade" delay={0.3} className="mt-12 hidden border-t border-cream/10 pt-8 lg:block">
            <Abroad />
          </Reveal>
        </div>

        <div>
          <ul className="border-t border-cream/15" aria-label="Eros cafés">
            {BRANCHES.map((b, i) => {
              const on = b.key === branch;
              return (
                <Reveal as="li" key={b.key} kind="fade" delay={i * 0.06} className="border-b border-cream/15">
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`cafe-${b.key}`}
                    onClick={() => setBranch(b.key)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                  >
                    <span className="flex items-center gap-4 sm:gap-6">
                      <span
                        aria-hidden
                        className={`h-2.5 w-2.5 shrink-0 rotate-45 transition-colors duration-500 ${on ? "bg-gold" : "bg-cream/20 group-hover:bg-gold/60"}`}
                      />
                      <span
                        className={`font-display text-[clamp(2.2rem,1.4rem+2.6vw,4rem)] font-semibold leading-none transition-colors duration-500 ${
                          on ? "text-cream" : "text-cream/45 group-hover:text-cream/80"
                        }`}
                      >
                        {b.town}
                      </span>
                    </span>
                    <span className="hidden text-right text-[0.88rem] text-oat sm:block">
                      {on ? <span className="font-semibold text-gold">Your café</span> : b.address}
                    </span>
                  </button>

                  <div
                    id={`cafe-${b.key}`}
                    inert={!on}
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-cube)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 pb-8 sm:grid-cols-2 sm:gap-10 sm:pl-[2.1rem]">
                        <div className="text-[0.95rem]">
                          <p className="text-cream/90">{[b.address, b.postcode].filter(Boolean).join(", ")}</p>
                          {b.note && <p className="mt-1 text-oat">{b.note}</p>}
                          <p className="mt-4 text-cream/85">
                            <OpenBadge cafe={b.key} />
                          </p>
                          {b.key === "wigan" ? (
                            <dl className="mt-4 max-w-xs">
                              {WIGAN_HOURS_ROWS.map((h) => (
                                <div key={h.days} className="flex justify-between gap-6 border-b border-dotted border-cream/15 py-1.5 text-[0.9rem]">
                                  <dt className="text-oat">{h.days}</dt>
                                  <dd className="text-cream">{h.time}</dd>
                                </div>
                              ))}
                            </dl>
                          ) : null}
                        </div>
                        <div className="flex flex-col items-start gap-3 sm:items-end sm:text-right">
                          <button type="button" onClick={() => open("book", b.key)} className="btn btn-gold w-full sm:w-auto">
                            Book at {b.town}
                          </button>
                          <a href={`tel:${b.tel}`} className="inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-semibold text-cream hover:text-gold-light">
                            <PhoneIcon /> {b.phone}
                          </a>
                          <a
                            href={mapsUrl(b.address, b.town)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-draw inline-flex min-h-11 items-center text-[0.95rem] text-oat hover:text-cream"
                          >
                            Get directions<span className="sr-only"> to Eros {b.town} (opens Google Maps in a new tab)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-5 text-[0.85rem] text-ash">
            {HOURS.wiganSource} {HOURS.caveat}
          </p>

          <Reveal kind="fade" className="mt-12 border-t border-cream/10 pt-8 lg:hidden">
            <Abroad />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Abroad() {
  return (
    <div>
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-gold">Further afield</p>
      <ul className="mt-4 grid gap-4 text-[0.95rem] sm:grid-cols-2">
        {ABROAD.map((a) => (
          <li key={a.town}>
            <p className="font-display text-[1.35rem] font-semibold leading-tight text-cream">
              {a.town} <span className="font-sans text-[0.85rem] font-normal text-ash">{a.country}</span>
            </p>
            <p className="mt-1 text-oat">{a.address}</p>
            {"tel" in a && a.tel && (
              <a href={`tel:${a.tel}`} className="link-draw mt-0.5 inline-block text-oat hover:text-cream">
                {a.phone}
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2.5 text-[0.95rem] text-cream/85">
        <span className="lozenge !h-2 !w-2" aria-hidden />
        Opening soon in {SOON.join(" and ")}.
      </p>
    </div>
  );
}

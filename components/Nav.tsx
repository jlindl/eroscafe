"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { BRANCHES } from "@/lib/data";
import { useVisit } from "./visit";
import { goTo } from "./SmoothScroll";
import { Chevron, PhoneIcon } from "./ui";

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#signatures", label: "Signatures" },
  { href: "#book", label: "Book" },
  { href: "#cafes", label: "Cafés" },
  { href: "#story", label: "Our story" },
];
const MENU_LINKS = [...LINKS, { href: "#franchise", label: "Franchise" }];

export function CafeSelect({ id, className = "", tone = "dark" }: { id: string; className?: string; tone?: "dark" | "gold" }) {
  const { branch, setBranch } = useVisit();
  const skin = tone === "dark" ? "border-cream/20 bg-ink/70 text-cream hover:border-cream/50" : "border-ink bg-ink text-cream hover:bg-cocoa";
  return (
    <label htmlFor={id} className={`relative flex items-center ${className}`}>
      <span className="sr-only">Your café</span>
      <span aria-hidden className="lozenge pointer-events-none absolute left-4 !h-2 !w-2" />
      <select
        id={id}
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        className={`h-12 w-full cursor-pointer appearance-none border pl-10 pr-10 text-[0.95rem] font-semibold transition-colors focus:border-gold focus:outline-none ${skin}`}
      >
        {BRANCHES.map((b) => (
          <option key={b.key} value={b.key} className="bg-ink text-cream">
            {b.town}
          </option>
        ))}
      </select>
      <Chevron className="pointer-events-none absolute right-3.5 h-4 w-4 text-oat" />
    </label>
  );
}

export function Nav() {
  const { open, cafe, isOpen, count } = useVisit();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 40);
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  useEffect(() => {
    if (menu) window.__lenis?.stop();
    else if (!isOpen) window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu, isOpen]);

  const solid = scrolled || menu;

  return (
    <>
      <header
        className={`nav-in fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-cream/10 bg-ink/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div ref={bar} aria-hidden className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />
        <div className="mx-auto flex h-(--nav-h) max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <a href="#top" className="shrink-0" aria-label="Eros Cafe, back to the top">
            <Image src="/img/logo.png" alt="Eros Cafe" width={277} height={70} loading="eager" className="h-[28px] w-auto md:h-[32px]" />
          </a>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-8 text-[0.95rem] font-medium text-cream/80">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-draw py-2 transition-colors hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <CafeSelect id="nav-cafe" className="hidden w-48 md:flex" />
            {count > 0 && (
              <button type="button" onClick={() => open("order")} className="btn btn-ghost hidden !min-h-12 !px-4 md:inline-flex">
                Order · {count}
              </button>
            )}
            <button type="button" onClick={() => open("book")} className="btn btn-gold !min-h-11 !px-4 sm:!min-h-12 sm:!px-5">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book a table</span>
            </button>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center border border-cream/20 text-cream sm:h-12 sm:w-12 xl:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-cube)] ${menu ? "translate-y-1.5 rotate-45" : ""}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-cube)] ${menu ? "-translate-y-1.5 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu, phones and tablets. A sibling of the header, never a child: the header's
          transform and backdrop-filter would make it the containing block and squash the menu to nothing. */}
      <div
        id="mobile-menu"
        inert={!menu}
        className={`fixed inset-x-0 bottom-0 top-(--nav-h) z-[45] bg-ink transition-[clip-path] duration-700 ease-[var(--ease-cube)] xl:hidden ${
          menu ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-4 pb-8 pt-6 sm:px-6" data-lenis-prevent>
          <ul>
            {MENU_LINKS.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-cream/10">
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenu(false);
                    window.setTimeout(() => goTo(l.href), 380);
                  }}
                  className="font-display block py-3 text-[2.35rem] font-semibold leading-none text-cream transition-[transform,opacity] duration-700 ease-[var(--ease-cube)]"
                  style={{ transform: menu ? "none" : "translateY(110%)", transitionDelay: menu ? `${0.12 + i * 0.05}s` : "0s" } as CSSProperties}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <CafeSelect id="menu-cafe" className="w-full" />
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                open("book");
              }}
              className="btn btn-gold btn-lg w-full"
            >
              Book at {cafe.town}
            </button>
            <a href={`tel:${cafe.tel}`} className="btn btn-ghost w-full">
              <PhoneIcon /> Call {cafe.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/** Bottom bar on phones: the primary action always under the thumb. */
export function MobileBar() {
  const { open, cafe, count, isOpen, toast } = useVisit();
  // On phones the bar is there from the first screen: the call and the booking are always under the thumb.
  const visible = !isOpen;
  return (
    <>
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--bar-h)+env(safe-area-inset-bottom)+0.75rem)] z-[60] flex justify-center px-4 md:bottom-8"
      >
        {toast && (
          <button
            type="button"
            onClick={() => open("order")}
            className="pointer-events-auto flex items-center gap-3 bg-cream px-4 py-3 text-sm font-semibold text-ink shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] [animation:toast-in_.5s_var(--ease-out-soft)_both]"
          >
            <span className="lozenge !h-2 !w-2" aria-hidden />
            {toast}
            <span className="underline underline-offset-4">View order</span>
          </button>
        )}
      </div>
      <div
        inert={!visible}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-cube)] md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex h-(--bar-h) items-center gap-2 px-4">
          <a href="#visit" className="min-w-0 flex-1 leading-tight">
            <span className="block text-[0.75rem] text-oat">Your café</span>
            <span className="font-display block truncate text-[1.1rem] font-medium text-cream">{cafe.town}</span>
          </a>
          {count > 0 ? (
            <button type="button" onClick={() => open("order")} className="btn btn-ghost !min-h-12 !px-4">
              Order · {count}
            </button>
          ) : (
            <a
              href={`tel:${cafe.tel}`}
              aria-label={`Call Eros ${cafe.town}`}
              className="grid h-12 w-12 place-items-center border border-cream/20 text-cream"
            >
              <PhoneIcon />
            </a>
          )}
          <button type="button" onClick={() => open("book")} className="btn btn-gold !min-h-12 !px-5">
            Book a table
          </button>
        </div>
      </div>
    </>
  );
}

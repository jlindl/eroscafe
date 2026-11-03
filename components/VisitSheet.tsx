"use client";

import { useEffect, useRef, useState } from "react";
import { useVisit } from "./visit";
import { BookingForm, OrderForm } from "./VisitForms";
import { goTo } from "./SmoothScroll";

export function VisitSheet() {
  const { isOpen, close, tab, setTab, count, cafe } = useVisit();
  const dlg = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(false);
  // The forms are built on first open, in the visitor's browser: they depend on the time of day.
  const [used, setUsed] = useState(false);

  useEffect(() => {
    const d = dlg.current!;
    if (isOpen && !d.open) {
      setUsed(true);
      d.showModal();
      window.__lenis?.stop();
      requestAnimationFrame(() => setShown(true));
    } else if (!isOpen && d.open) {
      setShown(false);
      const t = window.setTimeout(() => {
        d.close();
        window.__lenis?.start();
      }, 480);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    const d = dlg.current!;
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    d.addEventListener("cancel", onCancel);
    return () => d.removeEventListener("cancel", onCancel);
  }, [close]);

  const browse = () => {
    close();
    window.setTimeout(() => goTo("#menu"), 500);
  };

  return (
    <dialog
      ref={dlg}
      className="sheet fixed inset-0 h-[100dvh] w-screen"
      aria-labelledby="sheet-title"
      onClick={(e) => {
        if (e.target === dlg.current) close();
      }}
    >
      <div
        className={`absolute bottom-0 right-0 flex max-h-[94dvh] w-full flex-col overflow-hidden border-cream/10 bg-cocoa text-cream shadow-[0_0_120px_rgba(0,0,0,0.6)] transition-transform duration-[600ms] ease-[var(--ease-cube)] md:top-0 md:max-h-none md:w-[540px] md:border-l ${
          shown ? "translate-x-0 translate-y-0" : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        <div aria-hidden className="h-[3px] w-full bg-gold" />
        <div className="flex items-center justify-between gap-4 px-6 pt-5 md:px-10 md:pt-8">
          <p className="eyebrow">
            <span className="lozenge !h-2 !w-2" aria-hidden /> Eros {cafe.town}
          </p>
          <h2 id="sheet-title" className="sr-only">
            {tab === "book" ? "Book a table" : "Order to collect"} at Eros {cafe.town}
          </h2>
          <button type="button" onClick={close} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center border border-cream/20 text-2xl leading-none text-cream hover:border-cream">
            ×
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1 px-6 md:px-10" role="tablist" aria-label="Book or order">
          {(["book", "order"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`font-display h-14 border text-[1.2rem] font-semibold transition-colors duration-300 ${
                tab === t ? "border-gold bg-gold text-ink" : "border-cream/15 text-cream/80 hover:border-cream/40 hover:text-cream"
              }`}
            >
              {t === "book" ? "Book a table" : `Order to collect${count > 0 ? ` (${count})` : ""}`}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 pt-7 md:px-10 md:pt-8" data-lenis-prevent>
          {used && (tab === "book" ? <BookingForm /> : <OrderForm onBrowse={browse} />)}
          <div className="h-6" />
        </div>
      </div>
    </dialog>
  );
}

"use client";

import { useId, useMemo, useState } from "react";
import { BRANCHES } from "@/lib/data";
import { addDays, bookingWindow, fmtTime, fromHHMM, hoursFor, londonNow, nextSlot, toHHMM } from "@/lib/hours";
import { useVisit } from "./visit";

function pretty(dateIso: string) {
  const d = new Date(dateIso + "T12:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

const legend = "mb-3 block text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-oat";
// The action stays under the thumb at the bottom of the sheet.
const dock = "sticky bottom-0 z-10 -mx-6 mt-2 grid gap-3 border-t border-cream/10 bg-cocoa/95 px-6 pb-5 pt-4 backdrop-blur md:-mx-10 md:px-10";

export function BranchChips({ value, onChange, label = "Café" }: { value: string; onChange: (k: string) => void; label?: string }) {
  return (
    <fieldset>
      <legend className={legend}>{label}</legend>
      <div className="grid grid-cols-2 gap-2">
        {BRANCHES.map((b) => (
          <button type="button" key={b.key} onClick={() => onChange(b.key)} aria-pressed={value === b.key} className="chip">
            {b.town}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function PreviewNote({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 border-l-2 border-gold pl-4 text-[0.95rem] text-oat">{children}</p>;
}

export function BookingForm() {
  const { branch, setBranch, cafe } = useVisit();
  const id = useId();
  const now = useMemo(() => londonNow(), []);
  const first = useMemo(() => nextSlot(branch), []); // eslint-disable-line react-hooks/exhaustive-deps
  const today = now.iso;
  const tomorrow = addDays(today, 1);
  const [date, setDate] = useState(first.date);
  const [time, setTime] = useState(first.time);
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [open, last] = bookingWindow(branch, date);
  const hours = hoursFor(branch, new Date(date + "T12:00:00").getDay());
  const earliestToday = Math.max(open, Math.ceil((now.minutes + 30) / 30) * 30);
  const todayFull = bookingWindow(branch, today)[1] < earliestToday;
  const minTime = date === today ? earliestToday : open;

  if (sent)
    return (
      <div role="status">
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-gold">Preview only</p>
        <p className="font-display mt-3 text-[2rem] font-semibold leading-none text-cream">Thank you, {name.split(" ")[0]}.</p>
        <p className="mt-5 text-cream/85">
          You asked for a table for {guests} at Eros {cafe.town} on {pretty(date)} at {fmtTime(fromHHMM(time))}.
        </p>
        <PreviewNote>
          This is a design preview, so nothing has been sent and no table is held. On the finished site, this request would go straight to Eros {cafe.town}
          and you would get a confirmation by text.
        </PreviewNote>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${cafe.tel}`} className="btn btn-gold">
            Call Eros {cafe.town} to book
          </a>
          <button type="button" onClick={() => setSent(false)} className="btn btn-ghost">
            Change details
          </button>
        </div>
      </div>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = fromHHMM(time);
    if (date < today) return setErr("That day has already gone. Please choose today or a later date.");
    if (date === today && t < earliestToday)
      return setErr(todayFull ? "There are no times left today. Please choose another day." : `The earliest time today is ${fmtTime(earliestToday)}.`);
    if (t < open || t > last) return setErr(`Please choose a time between ${fmtTime(open)} and ${fmtTime(last)}.`);
    if (!name.trim()) return setErr("Please add your name.");
    if (phone.replace(/\D/g, "").length < 10) return setErr("Please add a mobile number so the café can confirm.");
    setErr(null);
    setSent(true);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-7">
      <BranchChips value={branch} onChange={setBranch} />

      <fieldset>
        <legend className={legend}>Day</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-[auto_auto_1fr]">
          <button
            type="button"
            disabled={todayFull}
            onClick={() => {
              setDate(today);
              if (fromHHMM(time) < earliestToday) setTime(toHHMM(earliestToday));
            }}
            aria-pressed={date === today}
            className="chip disabled:cursor-not-allowed disabled:opacity-40"
          >
            Today
          </button>
          <button type="button" onClick={() => setDate(tomorrow)} aria-pressed={date === tomorrow} className="chip">
            Tomorrow
          </button>
          <label className="field col-span-2 sm:col-span-1">
            <span className="sr-only">Pick a date</span>
            <input type="date" min={todayFull ? tomorrow : today} value={date} onChange={(e) => setDate(e.target.value)} className="!h-[2.9rem]" />
          </label>
        </div>
        {todayFull && <p className="mt-2 text-[0.85rem] text-ash">No times left today.</p>}
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <label htmlFor={`${id}-t`} className="field">
          <span>Time</span>
          <input id={`${id}-t`} type="time" min={toHHMM(minTime)} max={toHHMM(last)} step={1800} value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <div className="field">
          <span id={`${id}-g`}>Guests</span>
          <div className="flex h-12 items-center justify-between border border-cream/22 bg-ink px-1" role="group" aria-labelledby={`${id}-g`}>
            <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-11 w-11 place-items-center text-xl text-cream hover:text-gold">
              −
            </button>
            <span className="text-[1.05rem] font-semibold tabular-nums text-cream" aria-live="polite">
              {guests}
            </span>
            <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(20, g + 1))} className="grid h-11 w-11 place-items-center text-xl text-cream hover:text-gold">
              +
            </button>
          </div>
        </div>
      </div>
      <p className="-mt-4 text-[0.85rem] text-ash">{hours ? `Eros ${cafe.town} is open ${fmtTime(hours[0])} to ${fmtTime(hours[1])} on ${pretty(date).split(" ")[0]}s.` : "Opening hours vary by café, so call ahead to check."}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor={`${id}-n`} className="field">
          <span>Name</span>
          <input id={`${id}-n`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" />
        </label>
        <label htmlFor={`${id}-p`} className="field">
          <span>Mobile</span>
          <input id={`${id}-p`} type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07…" />
        </label>
      </div>

      <div className={dock}>
        {err && (
          <p role="alert" className="text-[0.92rem] font-semibold text-[#f0a48f]">
            {err}
          </p>
        )}
        <button type="submit" className="btn btn-gold btn-lg w-full">
          Request a table
        </button>
        <p className="text-center text-[0.9rem] text-oat">
          Or call Eros {cafe.town} on{" "}
          <a className="link-draw font-semibold text-cream" href={`tel:${cafe.tel}`}>
            {cafe.phone}
          </a>
        </p>
      </div>
    </form>
  );
}

export function OrderForm({ onBrowse }: { onBrowse: () => void }) {
  const { basket, inc, branch, setBranch, cafe } = useVisit();
  const id = useId();
  const [name, setName] = useState("");
  const [when, setWhen] = useState<"asap" | "later">("asap");
  const [time, setTime] = useState(() => nextSlot(branch).time);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (sent)
    return (
      <div role="status">
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-gold">Preview only</p>
        <p className="font-display mt-3 text-[2rem] font-semibold leading-none text-cream">Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</p>
        <ul className="mt-5 text-cream/85">
          {basket.map((l) => (
            <li key={l.id}>
              {l.qty} × {l.name} {l.detail.toLowerCase()}
            </li>
          ))}
        </ul>
        <PreviewNote>
          This is a design preview, so nothing has been sent. On the finished site, this order would go straight to Eros {cafe.town} for collection
          {when === "asap" ? " as soon as it is ready" : ` at ${fmtTime(fromHHMM(time))}`}.
        </PreviewNote>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${cafe.tel}`} className="btn btn-gold">
            Call Eros {cafe.town} to order
          </a>
          <button type="button" onClick={() => setSent(false)} className="btn btn-ghost">
            Back to the order
          </button>
        </div>
      </div>
    );

  if (!basket.length)
    return (
      <div>
        <p className="font-display text-[2rem] font-semibold leading-none text-cream">Your order is empty.</p>
        <p className="mt-4 text-cream/80">Turn over any dish on the menu and tap “Add to order”, then send the order to your café.</p>
        <button type="button" onClick={onBrowse} className="btn btn-gold mt-8">
          See the menu
        </button>
        <p className="mt-8 text-[0.9rem] text-oat">
          Or call Eros {cafe.town} on{" "}
          <a href={`tel:${cafe.tel}`} className="link-draw font-semibold text-cream">
            {cafe.phone}
          </a>
        </p>
      </div>
    );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErr("Please add a name for the order.");
    setErr(null);
    setSent(true);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-7">
      <ul className="border-t border-cream/12">
        {basket.map((l) => (
          <li key={l.id} className="flex items-center justify-between gap-3 border-b border-cream/12 py-3.5">
            <div className="min-w-0">
              <p className="font-display truncate text-[1.25rem] font-semibold leading-tight text-cream">{l.name}</p>
              <p className="mt-0.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-oat">{l.detail}</p>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => inc(l.id, -1)} aria-label={`One fewer ${l.name}`} className="grid h-11 w-11 place-items-center border border-cream/20 text-cream hover:border-cream">
                −
              </button>
              <span className="w-8 text-center font-semibold tabular-nums text-cream">{l.qty}</span>
              <button type="button" onClick={() => inc(l.id, 1)} aria-label={`One more ${l.name}`} className="grid h-11 w-11 place-items-center border border-cream/20 text-cream hover:border-cream">
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <BranchChips value={branch} onChange={setBranch} label="Collect from" />

      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset>
          <legend className={legend}>Collection</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["asap", "later"] as const).map((w) => (
              <button type="button" key={w} onClick={() => setWhen(w)} aria-pressed={when === w} className="chip">
                {w === "asap" ? "When ready" : "Later"}
              </button>
            ))}
          </div>
        </fieldset>
        {when === "later" && (
          <label htmlFor={`${id}-ot`} className="field">
            <span>Time</span>
            <input id={`${id}-ot`} type="time" step={1800} value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        )}
      </div>
      <label htmlFor={`${id}-on`} className="field">
        <span>Name for the order</span>
        <input id={`${id}-on`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" />
      </label>

      <div className={dock}>
        {err && (
          <p role="alert" className="text-[0.92rem] font-semibold text-[#f0a48f]">
            {err}
          </p>
        )}
        <button type="submit" className="btn btn-gold btn-lg w-full">
          Send the order to Eros {cafe.town}
        </button>
        <a href={`tel:${cafe.tel}`} className="btn btn-ghost w-full">
          Or call {cafe.phone}
        </a>
      </div>
    </form>
  );
}

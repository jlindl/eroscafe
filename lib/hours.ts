// Opening hours and live status, always in London time.
import { HOURS, LISTED_HOURS, WIGAN_HOURS } from "./data";

const DAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function londonNow(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    day: DAYS[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
    iso: `${get("year")}-${get("month")}-${get("day")}`,
  };
}

/** Hours of their own exist only for Wigan (Google). */
export function hoursFor(cafe: string, day: number): [number, number] | null {
  return cafe === "wigan" ? WIGAN_HOURS[day] : null;
}

export function fmtTime(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")}${suffix}` : `${h12}${suffix}`;
}

export const toHHMM = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
export const fromHHMM = (v: string) => {
  const [h, m] = v.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

export type Status = { open: boolean; label: string };

export function statusFor(cafe: string, d = new Date()): Status {
  const now = londonNow(d);
  const h = hoursFor(cafe, now.day);
  if (!h) return { open: false, label: HOURS.neutral };
  if (now.minutes < h[0]) return { open: false, label: `Opens at ${fmtTime(h[0])} today` };
  if (now.minutes < h[1]) return { open: true, label: `Open now until ${fmtTime(h[1])}` };
  const next = hoursFor(cafe, (now.day + 1) % 7);
  return { open: false, label: next ? `Closed now, opens ${fmtTime(next[0])} tomorrow` : "Closed now" };
}

/** The window a table can be booked in on a given date: the café's own hours, else the website's listed hours. */
export function bookingWindow(cafe: string, isoDate: string): [number, number] {
  const day = new Date(isoDate + "T12:00:00").getDay();
  const h = hoursFor(cafe, day) ?? LISTED_HOURS;
  return [h[0], h[1] - 30];
}

function addDays(iso: string, n: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** The next sensible slot: at least 30 minutes from now, on the half hour, inside the café's hours. */
export function nextSlot(cafe: string, d = new Date()) {
  const now = londonNow(d);
  const soonest = Math.ceil((now.minutes + 30) / 30) * 30;
  const [open, last] = bookingWindow(cafe, now.iso);
  if (soonest <= last) return { date: now.iso, time: toHHMM(Math.max(soonest, open)) };
  const tomorrow = addDays(now.iso, 1);
  const [o2] = bookingWindow(cafe, tomorrow);
  return { date: tomorrow, time: toHHMM(o2 + 60) };
}

export { addDays };

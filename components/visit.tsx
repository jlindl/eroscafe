"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BRANCHES, type Branch } from "@/lib/data";

export type Tab = "book" | "order";
export type Line = { id: string; name: string; detail: string; qty: number };

type Ctx = {
  isOpen: boolean;
  tab: Tab;
  open: (tab?: Tab, branch?: string) => void;
  close: () => void;
  setTab: (t: Tab) => void;
  branch: string;
  cafe: Branch;
  setBranch: (b: string) => void;
  basket: Line[];
  add: (l: Omit<Line, "qty">) => void;
  inc: (id: string, d: number) => void;
  count: number;
  toast: string | null;
};

const VisitCtx = createContext<Ctx | null>(null);
const KEY = "eros-cafe";

export function VisitProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("book");
  const [branch, setBranchState] = useState("wigan");
  const [basket, setBasket] = useState<Line[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  // Remember the visitor's café, like a regular would expect.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && BRANCHES.some((b) => b.key === saved)) setBranchState(saved);
    } catch {}
    (window as unknown as { __erosReady?: boolean }).__erosReady = true;
  }, []);

  const setBranch = useCallback((b: string) => {
    setBranchState(b);
    try {
      localStorage.setItem(KEY, b);
    } catch {}
  }, []);

  const open = useCallback(
    (t: Tab = "book", b?: string) => {
      setTab(t);
      if (b) setBranch(b);
      setOpen(true);
    },
    [setBranch]
  );
  const close = useCallback(() => setOpen(false), []);

  const add = useCallback((l: Omit<Line, "qty">) => {
    setBasket((prev) => {
      const hit = prev.find((p) => p.id === l.id);
      if (hit) return prev.map((p) => (p.id === l.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...l, qty: 1 }];
    });
    setToast(`${l.name} ${l.detail.toLowerCase()} added to your order`);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const inc = useCallback((id: string, d: number) => {
    setBasket((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + d } : p)).filter((p) => p.qty > 0));
  }, []);

  const count = basket.reduce((n, l) => n + l.qty, 0);
  const cafe = BRANCHES.find((b) => b.key === branch) ?? BRANCHES[0];

  const value = useMemo(
    () => ({ isOpen, tab, open, close, setTab, branch, cafe, setBranch, basket, add, inc, count, toast }),
    [isOpen, tab, open, close, branch, cafe, setBranch, basket, add, inc, count, toast]
  );
  return <VisitCtx.Provider value={value}>{children}</VisitCtx.Provider>;
}

export function useVisit() {
  const v = useContext(VisitCtx);
  if (!v) throw new Error("useVisit outside provider");
  return v;
}

"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Panel = "menu" | "contact" | "assistant" | null;

type UIState = {
  panel: Panel;
  open: (p: Exclude<Panel, null>) => void;
  close: () => void;
  toggle: (p: Exclude<Panel, null>) => void;
};

const Ctx = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const open = useCallback((p: Exclude<Panel, null>) => setPanel(p), []);
  const close = useCallback(() => setPanel(null), []);
  const toggle = useCallback((p: Exclude<Panel, null>) => setPanel((cur) => (cur === p ? null : p)), []);
  const value = useMemo(() => ({ panel, open, close, toggle }), [panel, open, close, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUI must be used inside <UIProvider>");
  return v;
}

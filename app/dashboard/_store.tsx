"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { VERIFICATIONS, VerificationStatus } from "./_data";

interface StatusMap {
  [id: number]: VerificationStatus;
}

interface StoreCtx {
  getStatus: (id: number) => VerificationStatus;
  setStatus: (id: number, status: VerificationStatus) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<StatusMap>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kyc-statuses");
      if (saved) setMap(JSON.parse(saved));
    } catch {}
  }, []);

  function setStatus(id: number, status: VerificationStatus) {
    setMap((prev) => {
      const next = { ...prev, [id]: status };
      try { localStorage.setItem("kyc-statuses", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function getStatus(id: number): VerificationStatus {
    return map[id] ?? VERIFICATIONS.find((v) => v.id === id)?.status ?? "pending";
  }

  return <Ctx.Provider value={{ getStatus, setStatus }}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}
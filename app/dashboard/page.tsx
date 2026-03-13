"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "./_store";
import { VERIFICATIONS, VerificationStatus } from "./_data";

const STATUS_LABEL: Record<VerificationStatus, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

const STATUS_STYLE: Record<VerificationStatus, string> = {
  pending: "bg-amber-50 text-amber-600 border border-amber-100",
  approved: "bg-green-50 text-green-600 border border-green-100",
  rejected: "bg-red-50 text-red-500 border border-red-100",
};

const FILTERS: { label: string; value: VerificationStatus | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Aprovados", value: "approved" },
  { label: "Rejeitados", value: "rejected" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-PT", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const { getStatus, setStatus } = useStore();
  const [filter, setFilter] = useState<VerificationStatus | "all">("all");

  const filtered = VERIFICATIONS.filter(
    (v) => filter === "all" || getStatus(v.id) === filter
  );

  return (
    <div className="pt-[57px] md:pt-0">
      <div className="px-6 py-6 border-b border-gray-100 bg-white">
        <h1 className="text-lg font-semibold">Verificações</h1>
        <p className="text-sm text-black/50">{VERIFICATIONS.length} submissões no total</p>
      </div>

      <div className="px-4 sm:px-6 py-5 space-y-4">
        <div className="flex gap-1.5 bg-white border border-gray-100 rounded-xl p-1 w-fit">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                filter === f.value
                  ? "bg-[#ff4000] text-white shadow-sm"
                  : "text-black/50 hover:text-black hover:bg-black/5",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[60px_1fr_200px_140px_120px_32px] gap-4 px-5 py-3 border-b border-gray-50">
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">#</span>
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Nome</span>
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Submetido em</span>
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Estado</span>
            <span className="text-xs font-semibold text-black/50 uppercase tracking-wide">Acção</span>
            <span />
          </div>

          {filtered.length === 0 ? (
            <div className="py-14 text-center text-sm text-gray-300">Nenhuma verificação encontrada.</div>
          ) : (
            filtered.map((v, i) => {
              const status = getStatus(v.id);
              return (
                <div
                  key={v.id}
                  className={[
                    "px-5 py-3.5 flex flex-col sm:grid sm:grid-cols-[60px_1fr_200px_140px_120px_32px] gap-2 sm:gap-4 items-start sm:items-center",
                    i !== filtered.length - 1 ? "border-b border-gray-50" : "",
                  ].join(" ")}
                >
                  <span className="text-xs font-mono text-black/50">#{v.id}</span>
                  <span className="text-sm font-medium text-black">{v.name}</span>
                  <span className="text-xs font-medium text-black pl-[60px] sm:pl-0">{formatDate(v.submittedAt)}</span>
                  <span className={`text-xs font-semibold py-1 px-2 rounded-full w-fit pl-[60px] sm:pl-0 ${STATUS_STYLE[status]}`}>
                    {STATUS_LABEL[status]}
                  </span>

                  <div className="flex gap-1.5 pl-[60px] sm:pl-0">
                    {status === "pending" && (
                      <>
                        <button
                          onClick={() => setStatus(v.id, "approved")}
                          className="px-2.5 py-1 rounded-md bg-green-100 hover:bg-green-200 text-green-600 text-xs font-semibold transition-colors border border-green-100 cursor-pointer"
                        >
                          Aprovar
                        </button>
                        <button
                          onClick={() => setStatus(v.id, "rejected")}
                          className="px-2.5 py-1 rounded-md bg-red-100 hover:bg-red-200 text-red-500 text-xs font-semibold transition-colors border border-red-100 cursor-pointer"
                        >
                          Rejeitar
                        </button>
                      </>
                    )}
                    {status !== "pending" && (
                      <button
                        onClick={() => setStatus(v.id, "pending")}
                        className="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-black/50 text-xs font-semibold transition-colors border border-gray-100 cursor-pointer"
                      >
                        Repor
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <p className="text-xs text-gray-300 text-center">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
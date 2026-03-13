"use client";

import { useState } from "react";
import { CheckIcon } from "./Icons";

const STEPS = [
  { id: 1, label: "Captura do Documento" },
  { id: 2, label: "Verificação Facial" },
  { id: 3, label: "Processamento" },
];

interface SidebarProps {
  currentStep: number;
}

function NavContent({ currentStep }: { currentStep: number }) {
  return (
    <nav className="flex flex-col mt-4">
      {STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        const isPending = step.id > currentStep;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-all",
                  isActive ? "bg-[#ff4000] text-white ring-4 ring-orange-100" : "",
                  isCompleted ? "bg-[#ff4000] text-white" : "",
                  isPending ? "bg-gray-100 text-gray-400 border border-gray-200" : "",
                ].join(" ")}
              >
                {isCompleted ? <CheckIcon /> : <span>{step.id}</span>}
              </div>
              {!isLast && (
                <div
                  className={`w-px h-9 mt-1 transition-colors ${
                    isCompleted ? "bg-[#ff4000]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
            <span
              className={[
                "pt-1 text-sm leading-snug",
                !isLast ? "pb-9" : "pb-0",
                isActive ? "text-gray-900 font-semibold" : "",
                isCompleted ? "text-gray-600 font-medium" : "",
                isPending ? "text-gray-400 font-medium" : "",
              ].join(" ")}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

export function Sidebar({ currentStep }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-gray-100 flex-col px-6 py-8 z-20">
        <NavContent currentStep={currentStep} />
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                step.id === currentStep ? "w-6 bg-[#ff4000]" : "",
                step.id < currentStep ? "w-4 bg-[#ff4000] opacity-60" : "",
                step.id > currentStep ? "w-4 bg-gray-200" : "",
              ].join(" ")}
            />
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label="Abrir menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[260px] bg-white h-full px-6 py-8 flex flex-col shadow-xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Fechar menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <NavContent currentStep={currentStep} />
          </div>
        </div>
      )}
    </>
  );
}
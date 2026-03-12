"use client";

import Image from "next/image";

export function StepResult() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 py-6 sm:py-8 text-center">
      <div className="w-full">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1">
          Resultado da Verificação
        </h1>
        <p className="text-sm text-gray-400">Os seus dados foram validados.</p>
      </div>

      <Image
        src="/ok.svg"
        alt="Verificação concluída"
        width={300}
        height={240}
        className="w-full max-w-[260px] sm:max-w-[340px]"
      />

      <div className="bg-green-50 border border-green-100 rounded-xl px-5 sm:px-8 py-4 flex items-center gap-3 w-full max-w-sm">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-green-800">Identidade verificada com sucesso</p>
          <p className="text-xs text-green-600 mt-0.5">Todos os seus documentos foram validados.</p>
        </div>
      </div>
    </div>
  );
}
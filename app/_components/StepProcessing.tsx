"use client";

import { useEffect } from "react";
import Image from "next/image";

interface StepProcessingProps {
  onDone: () => void;
}

export function StepProcessing({ onDone }: StepProcessingProps) {
  useEffect(() => {
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 py-6 sm:py-8 text-center">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1">
          Processamento
        </h1>
        <p className="text-sm text-gray-400">
          Aguarde enquanto validamos os seus dados.
        </p>
      </div>

      <Image
        src="/processing.svg"
        alt="A processar..."
        width={300}
        height={220}
        className="w-full max-w-[260px] sm:max-w-[340px]"
      />

      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
        <div className="absolute inset-0 rounded-full border-[3px] border-[#ff4000] border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
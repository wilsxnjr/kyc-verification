"use client";

import { useState } from "react";
import { Sidebar } from "./_components/Sidebar";
import { StepDocument } from "./_components/StepDocument";
import { StepFacial } from "./_components/StepFacial";
import { StepProcessing } from "./_components/StepProcessing";
import { StepResult } from "./_components/StepResult";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex min-h-screen bg-[#f2f2f2]">
      <Sidebar currentStep={currentStep} />

      <main className="flex-1 md:ml-[220px] pt-[56px] md:pt-0 flex items-center justify-center px-4 sm:px-8 md:px-12 py-6 sm:py-12 min-h-screen">
        <div className="w-full max-w-[660px] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-7">
          {currentStep === 1 && (
            <StepDocument onNext={() => setCurrentStep(2)} />
          )}
          {currentStep === 2 && (
            <StepFacial onNext={() => setCurrentStep(3)} />
          )}
          {currentStep === 3 && (
            <StepProcessing onDone={() => setCurrentStep(4)} />
          )}
          {currentStep === 4 && <StepResult />}
        </div>
      </main>
    </div>
  );
}
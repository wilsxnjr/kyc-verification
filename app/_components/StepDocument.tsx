"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { FileIcon } from "./Icons";

interface StepDocumentProps {
  onNext: () => void;
}

export function StepDocument({ onNext }: StepDocumentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  }, []);

  return (
    <>
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1">
          Captura do Documento de Identificação
        </h1>
        <p className="text-sm text-gray-400">
          Submeta um documento de identificação válido.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        className={`min-h-[200px] sm:min-h-[240px] rounded-xl border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${isDragging ? "scale-[1.01]" : ""}`}
        style={{
          borderColor: isDragging ? "rgba(255,64,0,0.5)" : "rgba(255,64,0,0.15)",
          backgroundColor: "rgba(255,64,0,0.05)",
        }}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.jpeg,.jpg,.png"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setUploadedFile(f);
          }}
        />

        {uploadedFile ? (
          <div className="flex flex-col items-center gap-2 text-center px-6 py-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileIcon />
            </div>
            <p className="text-sm font-semibold text-gray-800 max-w-[200px] sm:max-w-[240px] truncate">
              {uploadedFile.name}
            </p>
            <p className="text-xs text-gray-400">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setUploadedFile(null);
              }}
              className="text-xs text-[#ff4000] underline font-medium mt-1"
            >
              Trocar arquivo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 text-center px-6 py-8">
            <Image
              src="/cloud.svg"
              alt="Upload"
              width={48}
              height={48}
              className={`transition-transform duration-200 ${isDragging ? "scale-110" : ""}`}
            />
            <p className="text-sm font-semibold text-gray-700">
              Escolha o seu documento ou arreste para aqui
            </p>
            <p className="text-xs text-gray-400">
              PDF, JPEG, PNG, JPG de até 20MB.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        <button className="w-full sm:w-auto px-8 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all min-w-[130px]">
          Cancelar
        </button>
        <button
          disabled={!uploadedFile}
          onClick={onNext}
          className={[
            "w-full sm:w-auto px-8 py-2.5 rounded-lg text-sm font-semibold text-white transition-all min-w-[170px]",
            uploadedFile
              ? "bg-[#ff4000] hover:bg-orange-600 shadow-md shadow-orange-200 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed",
          ].join(" ")}
        >
          Enviar e Continuar
        </button>
      </div>
    </>
  );
}
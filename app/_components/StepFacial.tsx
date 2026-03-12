"use client";

import { useRef, useState, useEffect } from "react";
import { SmileIcon } from "./Icons";

interface StepFacialProps {
  onNext: () => void;
}

export function StepFacial({ onNext }: StepFacialProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [camError, setCamError] = useState(false);
  const [camReady, setCamReady] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setCamReady(true);
      }
    } catch {
      setCamError(true);
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function takePhoto() {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    setPhoto(canvas.toDataURL("image/jpeg"));
    stopCamera();
  }

  return (
    <>
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-1">
          Verificação Facial
        </h1>
        <p className="text-sm text-gray-400 flex items-center gap-1.5">
          Tire uma foto sua desse exacto momento. Sorria.
          <SmileIcon />
        </p>
      </div>

      <div
        className="rounded-xl overflow-hidden bg-gray-200 relative w-full"
        style={{ aspectRatio: "16/9" }}
      >
        {!photo && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{
              transform: "scaleX(-1)",
              display: camReady ? "block" : "none",
            }}
          />
        )}

        {photo && (
          <img
            src={photo}
            alt="Foto capturada"
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
        )}

        {!photo && !camReady && !camError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-100">
            <div className="w-8 h-8 border-2 border-[#ff4000] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">A iniciar câmera...</p>
          </div>
        )}

        {camError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100 px-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#d1d5db" strokeWidth="2" />
              <path d="M14 26l12-12M26 26L14 14" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-gray-500 text-center">
              Não foi possível aceder à câmera.<br />
              Verifique as permissões do browser.
            </p>
            <button
              onClick={() => { setCamError(false); startCamera(); }}
              className="text-sm text-[#ff4000] underline font-medium mt-1"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!photo && camReady && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
            <div
              className="w-32 h-40 sm:w-44 sm:h-56 border-2 border-white/60 rounded-full"
              style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.25)" }}
            />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!photo && !camError && (
        <div className="flex justify-center">
          <button
            disabled={!camReady}
            onClick={takePhoto}
            aria-label="Tirar foto"
            className={[
              "w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all",
              camReady
                ? "border-[#ff4000] bg-white hover:bg-orange-50 shadow-md cursor-pointer"
                : "border-gray-200 bg-gray-100 cursor-not-allowed",
            ].join(" ")}
          >
            <div className={`w-9 h-9 rounded-full transition-colors ${camReady ? "bg-[#ff4000]" : "bg-gray-300"}`} />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-1">
        <button className="w-full sm:w-auto px-8 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all min-w-[130px]">
          Cancelar
        </button>
        <button
          disabled={!photo}
          onClick={onNext}
          className={[
            "w-full sm:w-auto px-8 py-2.5 rounded-lg text-sm font-semibold text-white transition-all min-w-[170px]",
            photo
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
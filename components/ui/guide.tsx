"use client";

import { useEffect, useState } from "react";

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface PageInfoModalProps {
  pageKey: string; // unique 
  title: string;
  subtitle?: string;
  steps: Step[];
  accentColor?: string; 
}

export default function PageInfoModal({
  pageKey,
  title,
  subtitle,
  steps,
  accentColor = "indigo",
}: PageInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const storageKey = `page-intro-seen:${pageKey}`;

  useEffect(() => {
    const seen = localStorage.getItem(storageKey);
    if (!seen) {
      const t = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, [storageKey]);

  const handleClose = () => {
    localStorage.setItem(storageKey, "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((s) => s + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  if (!isOpen) return null;

  const isLast = activeStep === steps.length - 1;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        style={{ animation: "fadeIn 0.5s ease" }}
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
          style={{ animation: "slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}
          onClick={(e) => e.stopPropagation()}
        >

          <div className="p-6">
            <div className="mb-5">
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex gap-1.5 mb-5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i === activeStep
                      ? `bg-${accentColor}-600`
                      : i < activeStep
                        ? `bg-${accentColor}-200 dark:bg-${accentColor}-800`
                        : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <div
              key={activeStep}
              className="min-h-30"
              style={{ animation: "stepIn 0.2s ease" }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl bg-${accentColor}-50 dark:bg-${accentColor}-950 flex items-center justify-center text-2xl`}
                >
                  {steps[activeStep].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleClose}
                className="text-xm text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Ko'rsatma &apos;ni o&apos;tkazib yuborish
              </button>

              <div className="flex gap-2">
                {activeStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Orqaga
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className={`px-5 py-2 text-sm rounded-lg bg-${accentColor}-500 hover:bg-${accentColor}-600 text-white font-medium transition-colors cursor-pointer`}
                >
                  {isLast ? "Boshlash →" : "Keyingi →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(44px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes stepIn {
          from { opacity: 0; transform: translateX(18px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

"use client"

import React, { useEffect, useState } from "react"
import { useFormStore } from "@/store/useFormStore"
import { StepIndicator } from "@/components/StepIndicator"
import { Step1Personal } from "@/components/Step1Personal"
import { Step2Address } from "@/components/Step2Address"
import { Step3Account } from "@/components/Step3Account"
import { Step4Confirmation } from "@/components/Step4Confirmation"
import { SuccessModal } from "@/components/SuccessModal"
import { Layers, Database, ShieldCheck, Sparkles, RefreshCw } from "lucide-react"

export default function MultiStepFormPage() {
  const { currentStep, resetForm } = useFormStore()
  const [mounted, setMounted] = useState(false)

  // Prevent SSR hydration mismatch when reading localStorage via Zustand persist
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
          <RefreshCw className="h-4 w-4 animate-spin text-indigo-600" />
          <span>Hydrating Zustand persistent store...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      {/* Success Modal */}
      <SuccessModal />

      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Top Badges & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>React-Hook-Form &bull; Zustand Persistent Store</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            User Registration Flow
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Multi-step form with inline field validation, persistent state navigation, and final confirmation review.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 p-6 sm:p-8 shadow-xl backdrop-blur-sm">
          {/* Progress & Steps Indicator */}
          <StepIndicator />

          {/* Dynamic Step View */}
          <div className="mt-6 animate-in fade-in-50 duration-300">
            {currentStep === 1 && <Step1Personal />}
            {currentStep === 2 && <Step2Address />}
            {currentStep === 3 && <Step3Account />}
            {currentStep === 4 && <Step4Confirmation />}
          </div>
        </div>

        {/* Bottom Utility Bar: State Persistence Status & Reset */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-indigo-500" />
            <span>State synchronized to localStorage with Zustand</span>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="text-gray-500 hover:text-rose-500 underline transition-colors"
          >
            Clear and reset form
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-[11px] text-gray-400">
        Next.js Multi-Step Form Assignment &bull; React-Hook-Form &bull; Zustand
      </footer>
    </div>
  )
}

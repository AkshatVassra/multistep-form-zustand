"use client"

import React, { useState } from "react"
import { useFormStore } from "@/store/useFormStore"
import { CheckCircle2, Copy, Check, RotateCcw, Sparkles } from "lucide-react"

export const SuccessModal: React.FC = () => {
  const { isSubmitted, submittedData, resetForm } = useFormStore()
  const [copied, setCopied] = useState(false)

  if (!isSubmitted || !submittedData) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(submittedData, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-2xl space-y-6">
        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-2 shadow-inner">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-3 w-3" />
            <span>Registration Succeeded</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            Welcome, {submittedData.fullName}!
          </h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Your multi-step registration data has been captured, validated, and persisted in Zustand state.
          </p>
        </div>

        {/* JSON Payload Inspection Box */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Submitted Payload (Printed to Console)</span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied JSON" : "Copy Payload"}</span>
            </button>
          </div>
          <pre className="max-h-48 overflow-y-auto rounded-xl bg-gray-900 p-3 text-[11px] font-mono text-emerald-400">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-xs font-bold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Start New Registration</span>
          </button>
        </div>
      </div>
    </div>
  )
}

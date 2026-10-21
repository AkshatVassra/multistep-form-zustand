"use client"

import React, { useState } from "react"
import { useFormStore } from "@/store/useFormStore"
import {
  User,
  MapPin,
  Lock,
  CheckCircle2,
  ArrowLeft,
  Edit2,
  Loader2,
  Send,
  ShieldCheck
} from "lucide-react"

export const Step4Confirmation: React.FC = () => {
  const { formData, setStep, prevStep, setSubmitted } = useFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    // Simulate brief network request before finalizing
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    setSubmitted(formData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Confirmation & Review
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Step 4 of 4: Review your information before final submission
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* Section 1: Personal Info */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 p-4 transition-all hover:border-indigo-300 dark:hover:border-indigo-900/60 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                1. Personal Information
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-gray-400 block">Full Name</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formData.fullName || "Not provided"}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Email Address</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formData.email || "Not provided"}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Phone Number</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formData.phone || "Not provided (optional)"}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Address Details */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 p-4 transition-all hover:border-indigo-300 dark:hover:border-indigo-900/60 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                2. Address Details
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="sm:col-span-2">
              <span className="text-[11px] text-gray-400 block">Street Address</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formData.streetAddress || "Not provided"}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">City</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formData.city || "Not provided"}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Zip Code / Country</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formData.zipCode} &bull; {formData.country}
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Account Credentials */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 p-4 transition-all hover:border-indigo-300 dark:hover:border-indigo-900/60 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700/60">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                3. Account Credentials
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[11px] text-gray-400 block">Username</span>
              <span className="font-semibold font-mono text-gray-900 dark:text-gray-100">
                {formData.username || "Not provided"}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-gray-400 block">Password</span>
              <span className="font-mono text-gray-500">
                •••••••••••• (Encrypted in store)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Statement Notice */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/60 dark:border-gray-700/60 text-xs text-gray-500">
        <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
        <span>All data is validated with React-Hook-Form and preserved in Zustand store.</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2.5 text-xs font-bold transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Edit</span>
        </button>

        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white px-6 py-2.5 text-xs font-bold shadow-md shadow-emerald-600/30 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting Registration...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Confirm & Complete Registration</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

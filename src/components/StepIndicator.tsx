"use client"

import React from "react"
import { useFormStore } from "@/store/useFormStore"
import { User, MapPin, Lock, CheckCircle2, Check } from "lucide-react"

const STEPS = [
  { id: 1, title: "Personal Info", desc: "Name & contact details", icon: User },
  { id: 2, title: "Address Details", desc: "Location & country", icon: MapPin },
  { id: 3, title: "Account Security", desc: "Username & password", icon: Lock },
  { id: 4, title: "Confirmation", desc: "Review & submit", icon: CheckCircle2 },
]

export const StepIndicator: React.FC = () => {
  const { currentStep, setStep } = useFormStore()

  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="w-full mb-8 select-none">
      {/* Top Mobile Bar */}
      <div className="flex sm:hidden items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
        <span>Step {currentStep} of 4</span>
        <span className="text-indigo-600 dark:text-indigo-400">{STEPS[currentStep - 1].title}</span>
      </div>

      {/* Background track & Animated Fill bar */}
      <div className="relative mb-6">
        <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Desktop Step Nodes */}
      <div className="hidden sm:grid grid-cols-4 gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                // Allow jumping backwards to already visited steps
                if (step.id < currentStep) setStep(step.id)
              }}
              disabled={step.id > currentStep}
              className={`flex items-center gap-3 p-2 rounded-xl text-left transition-all ${
                isCurrent
                  ? "bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 shadow-sm"
                  : isCompleted
                  ? "hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs transition-transform ${
                  isCompleted
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                    : isCurrent
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
              </div>

              <div className="truncate">
                <p
                  className={`text-xs font-bold truncate leading-tight ${
                    isCurrent
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isCompleted
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate hidden lg:block">
                  {step.desc}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

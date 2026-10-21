"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { useFormStore } from "@/store/useFormStore"
import { PersonalFormData } from "@/types/form"
import { User, Mail, Phone, ArrowRight, Sparkles } from "lucide-react"

export const Step1Personal: React.FC = () => {
  const { formData, updateFormData, nextStep } = useFormStore()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalFormData>({
    defaultValues: {
      fullName: formData.fullName || "",
      email: formData.email || "",
      phone: formData.phone || "",
    },
    mode: "onBlur",
  })

  const onSubmit = (data: PersonalFormData) => {
    updateFormData(data)
    nextStep()
  }

  const handleAutofill = () => {
    setValue("fullName", "Akshat Vassra", { shouldValidate: true })
    setValue("email", "akshat.vassra@example.com", { shouldValidate: true })
    setValue("phone", "+91 98765 43210", { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Header & Autofill */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Personal Information
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Step 1 of 4: Enter your basic contact details
          </p>
        </div>
        <button
          type="button"
          onClick={handleAutofill}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/70 dark:text-indigo-400 transition-colors border border-indigo-200/60 dark:border-indigo-900/40 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Autofill Step
        </button>
      </div>

      {/* Full Name Field */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g., Akshat Vassra"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Full name must be at least 2 characters",
              },
            })}
            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.fullName
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Email Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            placeholder="akshat@example.com"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email format (name@domain.com)",
              },
            })}
            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.email
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number Field (Optional) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <span className="text-[10px] text-gray-400 font-medium">Optional</span>
        </div>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone", {
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: "Please enter a valid phone number format",
              },
            })}
            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.phone
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.01]"
        >
          <span>Continue to Address</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

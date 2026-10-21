"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { useFormStore } from "@/store/useFormStore"
import { AddressFormData } from "@/types/form"
import { Home, Building2, Hash, Globe2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

const COUNTRIES = [
  "United States",
  "India",
  "United Kingdom",
  "Canada",
  "Germany",
  "Australia",
  "Singapore",
  "Japan",
]

export const Step2Address: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: {
      streetAddress: formData.streetAddress || "",
      city: formData.city || "",
      zipCode: formData.zipCode || "",
      country: formData.country || "",
    },
    mode: "onBlur",
  })

  const onSubmit = (data: AddressFormData) => {
    updateFormData(data)
    nextStep()
  }

  const handleAutofill = () => {
    setValue("streetAddress", "42 Cyber Hub, DLF Phase 2", { shouldValidate: true })
    setValue("city", "Gurugram", { shouldValidate: true })
    setValue("zipCode", "122002", { shouldValidate: true })
    setValue("country", "India", { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Header & Autofill */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Address Details
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Step 2 of 4: Where are you located?
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

      {/* Street Address */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Street Address <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="123 Innovation Boulevard, Suite 400"
            {...register("streetAddress", {
              required: "Street address is required",
              minLength: {
                value: 5,
                message: "Street address must be at least 5 characters long",
              },
            })}
            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.streetAddress
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
        </div>
        {errors.streetAddress && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.streetAddress.message}
          </p>
        )}
      </div>

      {/* City & Zip Code Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            City <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="e.g., Gurugram / New York"
              {...register("city", {
                required: "City is required",
                minLength: {
                  value: 2,
                  message: "City must be at least 2 characters",
                },
              })}
              className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
                errors.city
                  ? "border-rose-400 focus:ring-rose-400/20"
                  : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
            />
          </div>
          {errors.city && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Postal / Zip Code <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="e.g., 122002 or 90210"
              {...register("zipCode", {
                required: "Zip code is required",
                pattern: {
                  value: /^[0-9]{4,8}$/,
                  message: "Zip code must be numeric (4-8 digits)",
                },
              })}
              className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
                errors.zipCode
                  ? "border-rose-400 focus:ring-rose-400/20"
                  : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
            />
          </div>
          {errors.zipCode && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>

      {/* Country Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Country <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Globe2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <select
            {...register("country", {
              required: "Please select your country",
            })}
            className={`w-full rounded-xl border pl-10 pr-8 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
              errors.country
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          >
            <option value="">-- Choose Country --</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {errors.country && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.country.message}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2.5 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.01]"
        >
          <span>Continue to Security</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

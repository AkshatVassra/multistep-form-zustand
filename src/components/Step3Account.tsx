"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useFormStore } from "@/store/useFormStore"
import { AccountFormData } from "@/types/form"
import { User, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react"

export const Step3Account: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountFormData>({
    defaultValues: {
      username: formData.username || "",
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
    },
    mode: "onBlur",
  })

  const passwordVal = watch("password", "")

  const onSubmit = (data: AccountFormData) => {
    updateFormData(data)
    nextStep()
  }

  const handleAutofill = () => {
    setValue("username", "akshat_vassra", { shouldValidate: true })
    setValue("password", "SecretDev2026!", { shouldValidate: true })
    setValue("confirmPassword", "SecretDev2026!", { shouldValidate: true })
  }

  const hasMinLength = passwordVal.length >= 8
  const hasLetterAndNumber = /(?=.*[a-zA-Z])(?=.*[0-9])/.test(passwordVal)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Header & Autofill */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Account Credentials
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Step 3 of 4: Setup your login authentication
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

      {/* Username */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Username <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="e.g., akshat_dev"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Username can only contain letters, numbers, and underscores",
              },
            })}
            className={`w-full rounded-xl border pl-10 pr-3.5 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.username
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Password <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              validate: (val) =>
                /(?=.*[a-zA-Z])(?=.*[0-9])/.test(val) ||
                "Password must contain at least one letter and one number",
            })}
            className={`w-full rounded-xl border pl-10 pr-10 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.password
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.password.message}
          </p>
        )}

        {/* Real-time password validation indicators */}
        <div className="mt-2.5 flex flex-col gap-1 text-[11px]">
          <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-gray-400"}`}>
            <Check className={`h-3 w-3 ${hasMinLength ? "opacity-100" : "opacity-40"}`} />
            <span>At least 8 characters</span>
          </div>
          <div className={`flex items-center gap-1.5 ${hasLetterAndNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-gray-400"}`}>
            <Check className={`h-3 w-3 ${hasLetterAndNumber ? "opacity-100" : "opacity-40"}`} />
            <span>Combination of letters & numbers</span>
          </div>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
          Confirm Password <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) =>
                val === passwordVal || "Passwords do not match",
            })}
            className={`w-full rounded-xl border pl-10 pr-10 py-2.5 text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800/60 focus:outline-none focus:ring-2 transition-all ${
              errors.confirmPassword
                ? "border-rose-400 focus:ring-rose-400/20"
                : "border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            tabIndex={-1}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium">
            {errors.confirmPassword.message}
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
          <span>Review Summary</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  )
}

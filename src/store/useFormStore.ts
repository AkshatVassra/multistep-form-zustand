import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { FormStoreState, MultiStepFormData } from "@/types/form"

const initialFormData: MultiStepFormData = {
  fullName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  country: "",
  username: "",
  password: "",
  confirmPassword: "",
}

export const useFormStore = create<FormStoreState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialFormData,
      isSubmitted: false,
      submittedData: null,

      setStep: (step: number) =>
        set({ currentStep: Math.min(Math.max(step, 1), 4) }),

      nextStep: () =>
        set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),

      prevStep: () =>
        set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

      updateFormData: (data: Partial<MultiStepFormData>) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      setSubmitted: (data: MultiStepFormData) => {
        console.log("=========================================")
        console.log("🎉 FINAL REGISTRATION SUBMISSION PAYLOAD:")
        console.log(JSON.stringify(data, null, 2))
        console.log("=========================================")
        set({
          isSubmitted: true,
          submittedData: data,
        })
      },

      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          isSubmitted: false,
          submittedData: null,
        }),
    }),
    {
      name: "multistep_form_zustand_storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist formData and currentStep
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: state.formData,
      }),
    }
  )
)

export interface PersonalFormData {
  fullName: string
  email: string
  phone: string
}

export interface AddressFormData {
  streetAddress: string
  city: string
  zipCode: string
  country: string
}

export interface AccountFormData {
  username: string
  password: string
  confirmPassword: string
}

export interface MultiStepFormData extends PersonalFormData, AddressFormData, AccountFormData {}

export interface FormStoreState {
  currentStep: number
  formData: MultiStepFormData
  isSubmitted: boolean
  submittedData: MultiStepFormData | null

  // Actions
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateFormData: (data: Partial<MultiStepFormData>) => void
  setSubmitted: (data: MultiStepFormData) => void
  resetForm: () => void
}

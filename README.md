# Multi-Step Form with React-Hook-Form & Zustand

A Next.js application implementing a multi-step user registration workflow using **React-Hook-Form** for form state handling & validation, and **Zustand** for centralized and persistent state management.

---

## 🌟 Key Architecture & Highlights

### 1. Step-by-Step Registration Flow
- **Step 1 (Personal Information)**: Full Name (required, min 2 chars), Email (required with RFC regex format validation), Phone Number (optional).
- **Step 2 (Address Details)**: Street Address (required, min 5 chars), City (required), Zip Code (numeric 4–8 digits, required), Country (dropdown selector, required).
- **Step 3 (Account Credentials)**: Username (required, alphanumeric/underscore, min 3 chars), Password (min 8 chars, letters + numbers), Confirm Password (must match Password). Includes real-time password strength checklists and visibility toggles.
- **Step 4 (Confirmation & Review)**: Comprehensive summary of all entered information grouped into distinct review cards with direct "Edit" jump buttons for any step.
- **Final Submission**: Console payload logging (`JSON.stringify`) and interactive success modal with JSON copy utility and form reset action.

### 2. State Management with Zustand (`useFormStore`)
- Centralized store tracking: `currentStep`, `formData` across all steps, `isSubmitted`, and `submittedData`.
- **Persistent Storage**: Utilizes Zustand's `persist` middleware with `localStorage` so user inputs survive page reloads.
- Step actions: `setStep(step)`, `nextStep()`, `prevStep()`, `updateFormData(partialData)`, `resetForm()`.

### 3. Form Handling & Inline Validation (`React-Hook-Form`)
- Independent form instances per step preventing cross-step contamination while populating defaults from the persistent Zustand store.
- Real-time inline field error messages displayed directly below inputs.
- Form navigation guards: users cannot proceed to the next step without passing validation on the current step.

---

## 📁 Project Directory Structure

```text
multistep-form-zustand/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global layout & metadata
│   │   ├── page.tsx              # Main multi-step form container
│   │   └── globals.css           # Tailwind styling & animations
│   ├── components/
│   │   ├── StepIndicator.tsx     # Progress bar & animated step nodes
│   │   ├── Step1Personal.tsx     # Step 1: React-Hook-Form for Personal Info
│   │   ├── Step2Address.tsx      # Step 2: React-Hook-Form for Address Details
│   │   ├── Step3Account.tsx      # Step 3: React-Hook-Form for Account Security
│   │   ├── Step4Confirmation.tsx # Step 4: Summary review with Edit jump actions
│   │   └── SuccessModal.tsx      # Registration success celebration modal
│   ├── store/
│   │   └── useFormStore.ts       # Centralized Zustand store with persistence
│   └── types/
│       └── form.ts               # TypeScript interfaces for all steps & store
├── package.json
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Navigate to the project directory:
```bash
cd d:\WhatBytes\Assignments\multistep-form-zustand
```

### 2. Start the application:
```bash
npm run start -- --port 3001
# or for hot-reloading dev mode:
# npm run dev -- --port 3001
```

### 3. Open in your browser:
👉 **[http://127.0.0.1:3001/](http://127.0.0.1:3001/)**

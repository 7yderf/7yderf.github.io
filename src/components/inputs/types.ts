/* ============================================
   Input System — TypeScript Interfaces
   Vue 3 equivalent of React's withField + Input
   ============================================ */

/** Option for VSelect dropdown */
export interface SelectOption {
  value: string
  label: string
}

/** Props for FieldWrapper.vue (internal, not exported to consumers) */
export interface FieldWrapperProps {
  /** vee-validate field name (REQUIRED) */
  name: string
  /** Floating label text */
  label: string
  /** Dark variant */
  black?: boolean
  /** Enable float animation (default: true) */
  transition?: boolean
  /** Show error message (default: true) */
  displayError?: boolean
  /** Force active state from outside */
  active?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Readonly state */
  readonly?: boolean
  /** Additional data-* attributes */
  data?: Record<string, string | boolean>
}

/** Props for VInput.vue */
export interface VInputProps extends FieldWrapperProps {
  /** Input type: text, password, password-default, email, number */
  type?: string
  /** Iconify icon name (e.g. 'lucide:search') */
  icon?: string
  /** Placeholder text */
  placeholder?: string
}

/** Props for VSelect.vue */
export interface VSelectProps extends FieldWrapperProps {
  /** Dropdown options */
  options: SelectOption[]
  /** Text when no value is selected */
  withoutValue?: string
}

/** Props for VTextArea.vue */
export interface VTextAreaProps extends FieldWrapperProps {
  /** Number of visible rows */
  rows?: number
  /** Placeholder text */
  placeholder?: string
}

/** Value stored by VMonthPicker — month is 1-indexed (Jan=1, Dec=12) */
export interface MonthValue {
  year: number
  month: number
}

/** Props for VMonthPicker.vue (standalone, no FieldWrapper) */
export interface VMonthPickerProps {
  /** vee-validate field name */
  name: string
  /** Accessible label (not rendered — parent provides visual label) */
  label?: string
  /** Show error message (default: true) */
  displayError?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Earliest selectable year (default: current year - 2) */
  minYear?: number
  /** Latest selectable year (default: current year) */
  maxYear?: number
}

export type DatePickerMode = 'date' | 'range'

/** Props for VDatePicker.vue (uses FieldWrapper) */
export interface VDatePickerProps extends FieldWrapperProps {
  /** Picker mode (default: 'date') */
  mode?: DatePickerMode
  /** Earliest selectable date */
  minDate?: Date
  /** Latest selectable date */
  maxDate?: Date
  /** Display format (default: 'dd/MM/yyyy') */
  format?: string
  /** Show clear button (default: true) */
  clearable?: boolean
  /** Placeholder text */
  placeholder?: string
}

/** Props for VCheckbox.vue (standalone, no FieldWrapper) */
export interface VCheckboxProps {
  /** vee-validate field name (REQUIRED) */
  name: string
  /** Checkbox label text */
  label: string
  /** Secondary label text */
  label2?: string
  /** Dark variant */
  black?: boolean
  /** Render as toggle switch */
  isSwitch?: boolean
}

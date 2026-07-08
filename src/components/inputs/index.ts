/* Input System — Barrel export
   Consumer only sees the V* components.
   FieldWrapper is internal — never exported here. */

export { default as VInput }        from './VInput.vue'
export { default as VSelect }       from './VSelect.vue'
export { default as VTextArea }     from './VTextArea.vue'
export { default as VCheckbox }     from './VCheckbox.vue'
export { default as VMonthPicker }  from './VMonthPicker.vue'
export { default as VDatePicker }   from './VDatePicker.vue'

// Types (for consumers that need them)
export type {
  VInputProps,
  VSelectProps,
  VTextAreaProps,
  VCheckboxProps,
  VMonthPickerProps,
  VDatePickerProps,
  DatePickerMode,
  MonthValue,
  SelectOption,
} from './types'

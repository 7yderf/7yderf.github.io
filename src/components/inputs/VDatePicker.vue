<!-- VDatePicker.vue — Date picker (single date o rango) powered by @vuepic/vue-datepicker
     Uses FieldWrapper — same pattern as VSelect.
     Vue 3 equivalent of React's DatePicker / DateRangePicker custom inputs in withField.

     CSS: @vuepic/vue-datepicker/dist/main.css importado en style.scss.
     Tokens del sistema aplicados via --dp-* CSS vars en el template.

     Value stored in vee-validate:
       mode='date'  → Date | null
       mode='range' → [Date | null, Date | null]

     Mapper convierte a string "YYYY-MM-DD" al construir payloads del API.
     NUNCA guardar strings de fecha en vee-validate — siempre Date objects. -->
<template>
  <FieldWrapper
    :name="name"
    :label="label"
    :display-error="displayError"
    :transition="false"
    :disabled="disabled"
    :active="hasValue"
    :data="{ select: true }"
  >
    <template #default="{ setValue, hasError }">
      <VueDatePicker
        :model-value="fieldValue as unknown as ModelValue"
        :range="mode === 'range'"
        :min-date="minDate"
        :max-date="maxDate"
        :format="format"
        :clearable="clearable"
        :placeholder="placeholder"
        :disabled="disabled"
        :enable-time-picker="false"
        :auto-apply="mode !== 'range'"
        :locale="'es'"
        :week-start="1"
        :day-names="['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']"
        class="input__select"
        :class="{ 'data-error': hasError }"
        :style="dpTokens"
        @update:model-value="handleChange(setValue, $event)"
        @open="isOpen = true"
        @closed="isOpen = false"
      />
    </template>
  </FieldWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useField } from 'vee-validate'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { ModelValue } from '@vuepic/vue-datepicker'
import FieldWrapper from './FieldWrapper.vue'
import type { VDatePickerProps } from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VDatePickerProps>(), {
  mode:        'date',
  format:      'dd/MM/yyyy',
  clearable:   true,
  placeholder: '',
  displayError: true,
  transition:  false,
  disabled:    false,
  label:       '',
})

// ── vee-validate ──────────────────────────────────────────────────────────────

const { value: fieldValue } = useField<Date | [Date | null, Date | null] | null>(
  () => props.name,
)

// ── Estado local ──────────────────────────────────────────────────────────────

const isOpen = ref(false)

const hasValue = computed(() => {
  if (!fieldValue.value) return false
  if (Array.isArray(fieldValue.value)) return !!fieldValue.value[0]
  return true
})

// ── Cambio de valor ───────────────────────────────────────────────────────────

const handleChange = (
  setValue: (val: unknown, shouldValidate?: boolean) => void,
  newVal: Date | [Date | null, Date | null] | null,
) => {
  setValue(newVal ?? null)
}

// ── Design tokens → CSS vars de VueDatePicker ────────────────────────────────
// Sobreescribe los colores del picker con el sistema de tokens del proyecto.

const dpTokens = {
  '--dp-primary-color':       '#CEFF1C',
  '--dp-primary-text-color':  '#242636',
  '--dp-secondary-color':     '#F0F0F3',
  '--dp-border-color':        '#D5D7DA',
  '--dp-border-color-hover':  '#FF7A4D',
  '--dp-text-color':          '#242636',
  '--dp-hover-color':         '#F0F0F3',
  '--dp-font-family':         'Poppins, sans-serif',
  '--dp-font-size':           '1.3rem',
  '--dp-border-radius':       '0.8rem',
  '--dp-input-padding':       '0.8rem 1.2rem',
}
</script>

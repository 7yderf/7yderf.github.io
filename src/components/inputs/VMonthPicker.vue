<!-- VMonthPicker.vue — Selector de mes y año (grilla 6×2)
     Standalone: NOT via FieldWrapper (grid layout incompatible with floating label).
     Calls useField() directly — same approach as VCheckbox.
     Vue 3 equivalent of React's DatePicker custom input wrapped in withField.

     Value stored in vee-validate: MonthValue { year: number; month: number }
       month is 1-indexed: Jan=1 ... Dec=12
       Mapper converts to { date_from: "YYYY-MM-01", date_to: "YYYY-MM-01" }

     Parent provides the visual label (use Patrón B de ClientCreateView).
     This component only renders the grid + error message. -->
<template>
  <div class="flex flex-col gap-[1rem]">

    <!-- ── Navegación de año ──────────────────────────────────────────── -->
    <div class="flex items-center justify-between px-[0.4rem]">
      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F0F0F3] transition-colors text-[#242636] disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="disabled || displayYear <= minYear"
        @click="displayYear--"
      >
        <Icon icon="mdi:chevron-left" width="18" />
      </button>

      <span class="text-[1.4rem] font-semibold text-[#242636]">{{ displayYear }}</span>

      <button
        type="button"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F0F0F3] transition-colors text-[#242636] disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="disabled || displayYear >= maxYear"
        @click="displayYear++"
      >
        <Icon icon="mdi:chevron-right" width="18" />
      </button>
    </div>

    <!-- ── Grilla de meses (6 × 2) ────────────────────────────────────── -->
    <div class="grid grid-cols-6 gap-[0.6rem]">
      <button
        v-for="m in MONTHS"
        :key="m.value"
        type="button"
        class="flex flex-col items-center justify-center py-[0.8rem] px-[0.4rem] rounded-[0.6rem] transition-colors text-center"
        :class="[
          isSelected(m.value)
            ? 'bg-[#242636] text-white'
            : 'bg-[#F9FAFB] text-[#242636] hover:bg-[#F0F0F3]',
          isMuted(m.value) ? 'opacity-40' : '',
          disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer',
        ]"
        :disabled="disabled"
        @click="selectMonth(m.value)"
      >
        <span class="text-[1.2rem] font-semibold leading-none">{{ m.abbr }}</span>
        <span class="text-[1.0rem] leading-none mt-[0.3rem] font-mono opacity-70">
          {{ String(displayYear).slice(2) }}
        </span>
      </button>
    </div>

    <!-- ── Error ──────────────────────────────────────────────────────── -->
    <p
      v-if="displayError && hasError"
      class="text-[1.1rem] text-[#F32D2D] mt-[0.2rem]"
      aria-live="polite"
    >
      {{ errorMessage }}
    </p>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useField } from 'vee-validate'
import { Icon } from '@iconify/vue'
import type { VMonthPickerProps, MonthValue } from './types'

const props = withDefaults(defineProps<VMonthPickerProps>(), {
  label:       '',
  displayError: true,
  disabled:    false,
  minYear:     () => new Date().getFullYear() - 2,
  maxYear:     () => new Date().getFullYear(),
})

// ── vee-validate ──────────────────────────────────────────────────────────────

const { value, errorMessage, setValue, meta } = useField<MonthValue | null>(
  () => props.name,
)

const hasError = computed(() => Boolean(meta.touched && errorMessage.value))

// ── Estado local del año visible ──────────────────────────────────────────────

const displayYear = ref(value.value?.year ?? new Date().getFullYear())

// ── Meses ─────────────────────────────────────────────────────────────────────

const MONTHS = [
  { value: 1,  abbr: 'Ene' }, { value: 2,  abbr: 'Feb' },
  { value: 3,  abbr: 'Mar' }, { value: 4,  abbr: 'Abr' },
  { value: 5,  abbr: 'May' }, { value: 6,  abbr: 'Jun' },
  { value: 7,  abbr: 'Jul' }, { value: 8,  abbr: 'Ago' },
  { value: 9,  abbr: 'Sep' }, { value: 10, abbr: 'Oct' },
  { value: 11, abbr: 'Nov' }, { value: 12, abbr: 'Dic' },
] as const

// ── Lógica de selección ───────────────────────────────────────────────────────

const isSelected = (month: number): boolean =>
  value.value?.year === displayYear.value && value.value?.month === month

// Meses futuros respecto al mes actual (cuando estamos en el año actual)
const isMuted = (month: number): boolean => {
  const now = new Date()
  return displayYear.value === now.getFullYear() && month > now.getMonth() + 1
}

const selectMonth = (month: number) => {
  if (props.disabled) return
  setValue({ year: displayYear.value, month })
}
</script>

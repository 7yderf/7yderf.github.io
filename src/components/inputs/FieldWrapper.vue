<!-- FieldWrapper.vue — Internal wrapper (not exported to consumers)
     Vue 3 equivalent of React's withField HOC.
     Calls useField(), renders label + error, exposes state via scoped slot. -->
<template>
  <label
    :for="name"
    class="input"
    :data-readonly="readonly"
    :data-error="hasError"
    :data-disabled="disabled"
    :data-black="black"
    :data-select="isSelect"
    :data-active="computedActive"
    v-bind="dataAttrs"
  >
    <p
    v-if="label"
      class="input__text"
      :title="errorMessage"
    >
      {{ label }}
    </p>

    <slot
      :value="value"
      :error-message="errorMessage"
      :meta="meta"
      :handle-change="handleChange"
      :handle-blur="handleBlur"
      :set-value="setValue"
      :has-error="hasError"
      :set-active="setActive"
    />

    <p
      v-if="displayError"
      class="input__error text-base"
      aria-live="polite"
      :data-error="hasError"
    >
      {{ hasError ? errorMessage : '' }}
    </p>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useField } from 'vee-validate'
import type { FieldWrapperProps } from './types'

const props = withDefaults(defineProps<FieldWrapperProps>(), {
  black: false,
  transition: true,
  displayError: true,
  active: undefined,
  disabled: false,
  readonly: false,
  data: () => ({})
})

defineSlots<{
  default(slotProps: {
    value: unknown
    errorMessage: string | undefined
    meta: { touched: boolean; dirty: boolean; valid: boolean; pending: boolean; initialValue?: unknown }
    handleChange: (e: Event | unknown, shouldValidate?: boolean) => void
    handleBlur: (e?: Event, shouldValidate?: boolean) => void
    setValue: (value: unknown, shouldValidate?: boolean) => void
    hasError: boolean
    setActive: (val: boolean) => void
  }): unknown
}>()

// --- vee-validate integration ---
const {
  value,
  errorMessage,
  meta,
  handleChange,
  handleBlur,
  setValue
} = useField(() => props.name)

// --- Active state (label float) ---
const isActive = ref(false)

const setActive = (val: boolean) => {
  isActive.value = val
}

const hasError = computed(() => Boolean(meta.touched && errorMessage.value))

const computedActive = computed(() => {
  if (!props.transition) return undefined
  // External prop override
  if (props.active !== undefined) return props.active
  // Internal: active if focused OR has value
  return isActive.value || !!value.value
})

// --- Additional data-* attributes ---
const dataAttrs = computed(() => {
  const attrs: Record<string, string | boolean> = {}
  if (props.data) {
    Object.keys(props.data).forEach((key) => {
      attrs[`data-${key}`] = props.data![key]
    })
  }
  return attrs
})

// --- Select mode (set by VSelect via data prop) ---
const isSelect = computed(() => props.data?.select === true || props.data?.select === 'true')
</script>

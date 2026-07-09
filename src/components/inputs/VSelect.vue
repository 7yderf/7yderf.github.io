<!-- VSelect.vue — Custom dropdown select
     Uses FieldWrapper with data-select. No native <select>. -->
<template>
  <FieldWrapper
    :name="name"
    :label="label"
    :black="black"
    :transition="transition"
    :display-error="displayError"
    :active="active"
    :disabled="disabled"
    :readonly="readonly"
    :data="{ ...data, select: true }"
  >
    <template #default="{ value: fieldValue, hasError, setValue }">
      <div
        class="input__select"
        :data-error="hasError"
        :data-active="isOpen"
        @click="handleToggle"
      >
        <p class="input__select-value">
          {{ resolveLabel(fieldValue) }}
        </p>
        <Icon
          icon="mdi:chevron-down"
          class="input__select-chevron"
          width="16"
        />
        <div
          class="input__select-options"
          @mouseleave="close"
        >
          <span
            v-for="option in options"
            :key="option.value"
            class="input__select-option"
            :data-value="option.value"
            @click.stop="handleSelect(option.value, setValue)"
          >
            {{ option.label }}
          </span>
        </div>
      </div>
    </template>
  </FieldWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import FieldWrapper from './FieldWrapper.vue'
import type { VSelectProps, SelectOption } from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VSelectProps>(), {
  black: false,
  transition: false,
  displayError: true,
  active: undefined,
  disabled: false,
  readonly: false,
  data: () => ({}),
  withoutValue: '',
})

const emit = defineEmits<{
  select: [value: string]
}>()

const isOpen = ref(false)

const handleToggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleSelect = (
  optionValue: string,
  setValue: (val: unknown, shouldValidate?: boolean) => void,
) => {
  setValue(optionValue)
  emit('select', optionValue)
  isOpen.value = false
}

const resolveLabel = (currentValue: unknown): string => {
  const found = props.options.find((opt: SelectOption) => String(opt.value) === String(currentValue))
  return found?.label ?? props.withoutValue
}
</script>

<!-- VTextArea.vue — Textarea input with optional rows prop. -->
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
    :data="data"
  >
    <template #default="{ value, hasError, handleChange, setActive }">
      <textarea
        :id="name"
        class="input__area"
        :value="value as string"
        :rows="rows"
        :placeholder="placeholder"
        :data-error="hasError"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
        @input="handleChange"
        @focus="setActive(true)"
        @blur="(e) => { setActive(false); handleChange(e, false) }"
      />
    </template>
  </FieldWrapper>
</template>

<script setup lang="ts">
import FieldWrapper from './FieldWrapper.vue'
import type { VTextAreaProps } from './types'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<VTextAreaProps>(), {
  rows: 4,
  black: false,
  transition: false,
  displayError: true,
  active: undefined,
  disabled: false,
  readonly: false,
  data: () => ({})
})
</script>

<!-- VCheckbox.vue — Checkbox + switch variant
     Standalone: does NOT use FieldWrapper (different layout, no floating label).
     Calls useField directly, same pattern as React's Checkbox export. -->
<template>
  <label
    :for="name"
    class="input input--check"
    :data-black="black"
    :data-checked="checked"
    :data-switch="isSwitch"
  >
    <input
      :id="name"
      type="checkbox"
      class="input__checkbox"
      :checked="checked"
      @change="handleChange"
    >
    <span class="input__text input__text--check">
      {{ label }}
      <slot />
      <template v-if="label2">{{ label2 }}</template>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import type { VCheckboxProps } from './types'

const props = withDefaults(defineProps<VCheckboxProps>(), {
  black: false,
  isSwitch: false
})

const { value, handleChange: fieldHandleChange } = useField(() => props.name, undefined, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false
})

const checked = computed(() => Boolean(value.value))

const handleChange = (e: Event) => {
  fieldHandleChange(e)
}
</script>

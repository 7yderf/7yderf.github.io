<!-- VInput.vue — Text input (text, password, password-default, email, number)
     Supports: password toggle, auto-generate password, icon. -->
<template>
  <FieldWrapper
    :name="name"
    :label="label"
    :black="black"
    :transition="transition"
    :display-error="displayError"
    :active="active"
    :disabled="disabled"
    :readonly="isPasswordDefault || readonly"
    :data="data"
  >
    <template #default="{ value, hasError, handleChange, setActive }">
      <input
        :id="name"
        class="input__input"
        :type="resolvedType"
        :value="value"
        :data-error="hasError"
        :disabled="disabled"
        :readonly="isPasswordDefault || readonly"
        v-bind="$attrs"
        @input="handleChange"
        @focus="setActive(true)"
        @blur="(e) => { setActive(false); handleChange(e, false) }"
      >

      <!-- Icon -->
      <button v-if="icon" type="button" class="input__icon-text">
        <Icon :icon="icon" width="24" height="24" color="#a6a4a4" />
      </button>

      <!-- Password toggle (show/hide) -->
      <button
        v-if="type === 'password'"
        type="button"
        class="input__show input__icon-text"
        @click="showPassword = !showPassword"
      >
        <Icon
          :icon="showPassword ? 'mdi:eye' : 'mdi:eye-off'"
          width="20"
          height="20"
        />
      </button>

      <!-- Password-default (copy) -->
      <button
        v-if="isPasswordDefault"
        type="button"
        class="input__show"
        :title="copied ? '¡Copiado!' : 'Copiar contraseña'"
        @click="handleCopyPassword(value as string)"
      >
        <Icon
          :icon="copied ? 'mdi:check' : 'mdi:content-copy'"
          width="20"
          height="20"
        />
      </button>
    </template>
  </FieldWrapper>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useField } from 'vee-validate'
import { Icon } from '@iconify/vue'
import FieldWrapper from './FieldWrapper.vue'
import type { VInputProps } from './types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<VInputProps>(), {
  type: 'text',
  black: false,
  transition: false,
  displayError: true,
  active: undefined,
  disabled: false,
  readonly: false,
  data: () => ({})
})

// --- Password toggle ---
const showPassword = ref(false)

const isPasswordDefault = computed(() => props.type === 'password-default')

const resolvedType = computed(() => {
  if (isPasswordDefault.value) return 'text'
  if (props.type === 'password' && showPassword.value) return 'text'
  return props.type
})

// --- Password-default: auto-generate ---
const generateSecurePassword = (): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const special = '@$!%*?&'

  let password = ''
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]

  const allChars = lowercase + uppercase + numbers + special
  while (password.length < 12) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  return password.split('').sort(() => Math.random() - 0.5).join('')
}

// Access setValue via useField for password-default auto-generation
const { setValue: setFieldValue } = useField(() => props.name)

onMounted(() => {
  if (isPasswordDefault.value) {
    setFieldValue(generateSecurePassword())
  }
})

// --- Password-default: copy to clipboard ---
const copied = ref(false)

const handleCopyPassword = async (value: string) => {
  if (value) {
    await navigator.clipboard.writeText(value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<template>
  <div class="grid grid-cols-2 gap-x-[2rem] gap-y-[0.8rem]">
    <div
      v-for="item in visibleChecks"
      :key="item.key"
      class="flex items-center gap-[0.6rem]"
    >
      <Icon
        :icon="checks[item.key] ? 'mdi:check-circle' : 'mdi:circle-outline'"
        class="text-[1.8rem] shrink-0 transition-colors duration-200"
        :class="checks[item.key] ? 'text-[#32D583]' : 'text-[#D5D7DA]'"
      />
      <span
        class="text-[1.2rem] leading-none transition-colors duration-200"
        :class="checks[item.key] ? 'text-text' : 'text-[#828282]'"
      >
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  password?: string
  minCharacters?: number
  resetTrigger?: boolean
}

interface Emits {
  (e: 'validation-change', isValid: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  password: '',
  minCharacters: 8,
  resetTrigger: false,
})

const emits = defineEmits<Emits>()

const characters = ref(props.minCharacters)

const checks = ref({
  minus: false,
  mayus: false,
  special: false,
  number: false,
  min: false,
})

// Solo los 4 checks visibles en el diseño — minus (minúscula) se valida pero no se muestra
const visibleChecks = [
  { key: 'min' as const,     label: `Mínimo ${characters.value} caracteres` },
  { key: 'mayus' as const,   label: 'Una mayúscula' },
  { key: 'number' as const,  label: 'Un número' },
  { key: 'special' as const, label: 'Un símbolo (! @ # …)' },
]

const checkPassword = (password: string) => {
  checks.value = {
    minus: /[a-z]/.test(password),
    mayus: /[A-Z]/.test(password),
    special: /[_.@$!%*?&#]/.test(password),
    number: /\d/.test(password),
    min: password.length >= characters.value,
  }
  emits('validation-change', Object.values(checks.value).every(Boolean))
}

watch(() => props.password, checkPassword, { immediate: true })

watch(
  () => props.resetTrigger,
  (shouldReset) => {
    if (shouldReset) {
      checks.value = { minus: false, mayus: false, special: false, number: false, min: false }
    }
  },
)

defineExpose({ validatePassword: checkPassword, checks })
</script>

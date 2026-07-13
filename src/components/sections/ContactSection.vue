<!-- ContactSection.vue — Formulario de contacto (contact.png).
     Dos columnas: tarjeta de info (estatica) + tarjeta de formulario (vee-validate + yup). -->
<template>
  <section class="sc-section w-full px-4 py-20 lg:px-8">
    <h2 class="mx-auto max-w-2xl text-center font-secondary text-deep-ink">{{ t('contact.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center">{{ t('contact.subtitle') }}</p>

    <div class="sc-article mx-auto mt-12 flex w-full max-w-5xl flex-col items-stretch gap-8 md:flex-row">
      <!-- Tarjeta izquierda: datos de contacto (estatica) -->
      <div class="sc-section flex flex-col rounded-3xl bg-primary-soft/40 p-8 md:w-2/5">
        <img src="/images/fox.svg" alt="" aria-hidden="true" class="h-16 w-16">
        <p class="mt-4 font-secondary text-sm text-ink-3">{{ t('contact.info.eyebrow') }}</p>
        <p class="font-secondary text-lg font-bold text-deep-ink">{{ t('contact.info.name') }}</p>

        <div class="mt-6 flex flex-col gap-3">
          <a
            :href="`mailto:${contactEmail}`"
            class="flex items-center gap-2 rounded-full bg-bg-second px-4 py-3 font-secondary text-sm text-primary hover:underline"
          >
            <Icon icon="mdi:email-outline" width="18" height="18" />
            {{ contactEmail }}
          </a>
          <a
            :href="`tel:${t('contact.info.phone').replace(/\s+/g, '')}`"
            class="flex items-center gap-2 rounded-full bg-bg-second px-4 py-3 font-secondary text-sm text-primary hover:underline"
          >
            <Icon icon="mdi:phone-outline" width="18" height="18" />
            {{ t('contact.info.phone') }}
          </a>
        </div>

        <div class="mt-6 flex flex-col gap-3 border-t border-line-2 pt-6 text-sm text-ink-3">
          <p class="flex items-start gap-2">
            <Icon icon="mdi:map-marker-outline" class="mt-0.5 shrink-0 text-ink-4" width="18" height="18" />
            {{ t('contact.info.address') }}
          </p>
          <p class="flex items-center gap-2">
            <Icon icon="mdi:clock-outline" class="shrink-0 text-ink-4" width="18" height="18" />
            {{ t('contact.info.hours') }}
          </p>
          <p class="flex items-center gap-2">
            <Icon icon="mdi:shield-check-outline" class="shrink-0 text-success" width="18" height="18" />
            {{ t('contact.info.responseTime') }}
          </p>
        </div>
      </div>

      <!-- Tarjeta derecha: formulario -->
      <div class="sc-section rounded-3xl bg-bg-second p-8 shadow-card md:flex-1">
        <h3 class="font-secondary text-deep-ink">{{ t('contact.form.title') }}</h3>

        <form class="mt-6 flex flex-col gap-4" @submit="onSubmit">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <VInput name="name" :label="t('contact.form.name')" :placeholder="t('contact.form.namePlaceholder')" />
            <VInput name="company" :label="t('contact.form.company')" :placeholder="t('contact.form.companyPlaceholder')" />
          </div>

          <VInput name="email" type="email" :label="t('contact.form.email')" :placeholder="emailPlaceholder" />

          <VSelect name="service" :label="t('contact.form.service')" :options="serviceOptions" />

          <button type="submit" class="btn-primary btn-block mt-2" :disabled="isSubmitting">
            {{ t('contact.form.submit') }}
            <Icon icon="mdi:send-outline" width="18" height="18" />
          </button>

          <p v-if="submitState === 'success'" class="text-center text-sm text-success-dark">
            {{ t('contact.form.success') }}
          </p>
          <p v-else-if="submitState === 'error'" class="text-center text-sm text-error">
            {{ t('contact.form.error') }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { Icon } from '@iconify/vue'
import { createContactSchema } from '../../schemas/contactSchema'
import type { SelectOption } from '../inputs/types'

const { t, locale } = useI18n()
const config = useRuntimeConfig()

// Literales con "@": fuera de i18n a proposito — el compilador de mensajes de
// vue-i18n lo interpreta como inicio de linked message y rompe el locale entero.
// El placeholder si varia por locale, asi que se resuelve con un mapa plano (sin pasar por t()).
const contactEmail = 'contacto@conecta.mx'
const emailPlaceholders: Record<string, string> = { es: 'tu@empresa.mx', en: 'you@company.com' }
const emailPlaceholder = computed(() => emailPlaceholders[locale.value] ?? emailPlaceholders.es)

// Values estables (no localizadas) para el value de cada opcion; el label si viaja con el locale.
const serviceValues = ['cryptography', 'payments', 'infrastructure', 'consulting', 'support']
const serviceLabels = useLocalizedStrings('contact.form.serviceOptions', serviceValues.length)
const serviceOptions = computed<SelectOption[]>(() =>
  serviceValues.map((value, i) => ({ value, label: serviceLabels.value[i] })),
)

const submitState = ref<'idle' | 'success' | 'error'>('idle')

const { isSubmitting, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createContactSchema(t)),
})

// Sin backend propio todavia: se envia al apiBaseUrl ya provisionado (nuxt.config runtimeConfig);
// el catch deja la UI en estado "error" en vez de fallar en silencio mientras no exista el endpoint real.
const onSubmit = handleSubmit(async (values) => {
  submitState.value = 'idle'
  try {
    await $fetch(`${config.public.apiBaseUrl}/contact`, { method: 'POST', body: values })
    submitState.value = 'success'
    resetForm()
  }
  catch {
    submitState.value = 'error'
  }
})
</script>

<!-- ContactSection.vue — Formulario de contacto (rediseno). Dos columnas:
     izquierda = heading con degradado + subtitulo + ilustracion; derecha =
     tarjeta de formulario (vee-validate + yup). El icono/relleno de los inputs
     que muestra el diseno queda para una pasada enfocada sobre el sistema de
     inputs (VInput/VSelect/VTextArea) — por ahora usan su estilo actual. -->
<template>
  <section class="sc-section w-full bg-[linear-gradient(180deg,_#F5F1E6_38.97%,_#FFFFFF_100%)] px-4 py-10 lg:px-8 lg-2:py-20">
    <div class="sc-article mx-auto flex w-full max-w-6xl flex-wrap items-center gap-10">
      <!-- Izquierda: heading + subtitulo + ilustracion -->
      <div class="sc-section min-w-[280px] grow basis-96">
        <h2 class="font-secondary text-deep-ink">
          {{ t('contact.headingPre') }}
          <span class="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">{{ t('contact.headingHighlight') }}</span>
          {{ t('contact.headingPost') }}
        </h2>
        <p class="mt-4 max-w-md text-ink-3">{{ t('contact.subtitle') }}</p>
        <img
          src="/images/chica.png"
          alt=""
          aria-hidden="true"
          class="mt-8 w-full max-w-lg object-contain"
        >
      </div>

      <!-- Derecha: tarjeta de formulario -->
      <div class="sc-section min-w-[300px] grow basis-96 rounded-3xl bg-bg-second p-6 shadow-card lg-2:p-8">
        <form class="flex flex-col gap-4" @submit="onSubmit">
          <VInput name="name" :label="t('contact.form.name')" :placeholder="t('contact.form.namePlaceholder')" />
          <VInput name="phone" :label="t('contact.form.phone')" :placeholder="t('contact.form.phonePlaceholder')" />
          <VInput name="email" type="email" :label="t('contact.form.email')" :placeholder="emailPlaceholder" />
          <VInput name="company" :label="t('contact.form.company')" :placeholder="t('contact.form.companyPlaceholder')" />
          <VSelect
            name="service"
            :label="t('contact.form.service')"
            :options="serviceOptions"
            :without-value="t('contact.form.servicePlaceholder')"
          />
          <VTextArea
            name="message"
            :label="t('contact.form.message')"
            :placeholder="t('contact.form.messagePlaceholder')"
            :rows="4"
          />

          <button
            type="submit"
            class="btn-custom btn-block mt-2"
            :style="{ '--btn-color': '#865BDA' }"
            :disabled="isSubmitting"
          >
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

// El placeholder de correo varia por locale; se resuelve con un mapa plano (sin t()).
const emailPlaceholders: Record<string, string> = { es: 'tu@empresa.mx', en: 'you@company.com' }
const emailPlaceholder = computed(() => emailPlaceholders[locale.value] ?? emailPlaceholders.es)

// Values estables (no localizadas) para el value de cada opcion; el label viaja con el locale.
const serviceValues = ['cryptography', 'payments', 'infrastructure', 'consulting', 'support']
const serviceLabels = useLocalizedStrings('contact.form.serviceOptions', serviceValues.length)
const serviceOptions = computed<SelectOption[]>(() =>
  serviceValues.map((value, i) => ({ value, label: serviceLabels.value[i] })),
)

const submitState = ref<'idle' | 'success' | 'error'>('idle')

const { isSubmitting, handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createContactSchema(t)),
})

// Sin backend propio todavia: se envia al apiBaseUrl ya provisionado; el catch deja
// la UI en estado "error" mientras no exista el endpoint real.
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

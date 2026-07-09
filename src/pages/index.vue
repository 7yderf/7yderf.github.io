<!-- index.vue — Página demo: ejercita Tailwind, i18n, SEO, formularios,
     Swiper Element y lightGallery. Sustituir por el contenido real de la landing. -->
<template>
  <div>
    <!-- Hero -->
    <section class="bg-text text-text-invert">
      <div class="mx-auto w-full max-w-6xl px-4 py-20 text-center">
        <h1 class="text-4xl font-semibold md:text-5xl">{{ t('hero.title') }}</h1>
        <p class="mx-auto mt-4 max-w-2xl font-secondary text-lg text-ink-3">
          {{ t('hero.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Carrusel (Swiper Element) -->
    <section class="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 class="mb-6 text-2xl font-semibold">{{ t('carousel.title') }}</h2>
      <swiper-container
        class="block overflow-hidden rounded-2xl shadow-card"
        slides-per-view="1"
        navigation="true"
        pagination="true"
        loop="true"
        autoplay-delay="4000"
      >
        <swiper-slide v-for="slide in slides" :key="slide.label">
          <div
            class="flex h-64 items-center justify-center text-3xl font-semibold md:h-80"
            :class="slide.class"
          >
            {{ slide.label }}
          </div>
        </swiper-slide>
      </swiper-container>
    </section>

    <!-- Galería (lightGallery) -->
    <section class="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 class="mb-6 text-2xl font-semibold">{{ t('gallery.title') }}</h2>
      <VLightgallery
        :settings="gallerySettings"
        class="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <a
          v-for="img in galleryImages"
          :key="img.id"
          :href="img.full"
          class="group block overflow-hidden rounded-xl shadow-flat"
        >
          <img
            :src="img.thumb"
            :alt="img.alt"
            class="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          >
        </a>
      </VLightgallery>
    </section>

    <!-- Formulario (vee-validate + yup) -->
    <section class="mx-auto w-full max-w-3xl px-4 py-12">
      <div class="rounded-2xl bg-bg-second p-6 shadow-card md:p-10">
        <h2 class="mb-6 text-2xl font-semibold">{{ t('form.title') }}</h2>
        <form class="grid gap-4" novalidate @submit="onSubmit">
          <VInput name="name" :label="t('form.name')" />
          <VInput name="email" type="email" :label="t('form.email')" />
          <VTextArea name="message" :label="t('form.message')" :rows="4" />

          <div>
            <VCheckbox name="terms" :label="t('form.terms')" />
            <p v-if="errors.terms" class="mt-1 text-sm text-error">
              {{ errors.terms }}
            </p>
          </div>

          <button
            type="submit"
            class="mt-2 justify-self-start rounded-full bg-primary px-8 py-3 font-secondary font-bold text-text-invert shadow-flat transition-shadow hover:shadow-card"
          >
            {{ t('form.submit') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

const { t } = useI18n()
const { toast } = useAlerts()

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
})

/* ---- Carrusel ---- */
const slides = [
  { label: 'Slide 1', class: 'bg-primary text-text-invert' },
  { label: 'Slide 2', class: 'bg-primary-light text-text-invert' },
  { label: 'Slide 3', class: 'bg-accent text-text-invert' },
  { label: 'Slide 4', class: 'bg-violet text-text-invert' },
]

/* ---- Galería ---- */
// licenseKey '0000-0000-000-0000' = uso bajo GPLv3 (ver docs de lightGallery)
const gallerySettings = {
  speed: 400,
  licenseKey: '0000-0000-000-0000',
  plugins: [lgThumbnail, lgZoom],
}

const galleryImages = [10, 1015, 1025, 1039].map((id) => ({
  id,
  full: `https://picsum.photos/id/${id}/1600/1000`,
  thumb: `https://picsum.photos/id/${id}/400/300`,
  alt: `Demo ${id}`,
}))

/* ---- Formulario ---- */
const validationSchema = computed(() =>
  toTypedSchema(
    yup.object({
      name: yup.string().required(t('validation.required')),
      email: yup
        .string()
        .required(t('validation.required'))
        .email(t('validation.email')),
      message: yup.string().required(t('validation.required')),
      terms: yup
        .boolean()
        .required(t('validation.terms'))
        .oneOf([true], t('validation.terms')),
    }),
  ),
)

const { handleSubmit, resetForm, errors } = useForm({ validationSchema })

const onSubmit = handleSubmit(() => {
  toast('success', t('form.success'))
  resetForm()
})
</script>

<!-- UnderConstructionSection.vue — misma piel visual que ContactSection.vue
     (marco superior + degradado crema-a-blanco), pero a una sola columna
     centrada: copy con gradiente + ilustracion, sin formulario. -->
<template>
  <section class="sc-section mt-3 w-full rounded-t-3xl bg-[linear-gradient(180deg,_#F5F1E6_38.97%,_#FFFFFF_100%)] px-4 py-10 text-center lg:px-8 lg-2:py-20">
    <div class="sc-section mx-auto flex w-full max-w-3xl flex-col items-center">
      <h1 class="text-center font-secondary bg-gradient-to-r from-[#865BDA] to-accent bg-clip-text text-transparent">
        {{ t('underConstruction.title') }}
      </h1>
      <img
        src="/images/under-construction.webp"
        alt=""
        aria-hidden="true"
        class="mt-10 w-full max-w-md object-contain"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

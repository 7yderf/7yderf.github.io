<!-- ContactSection.vue — Formulario de contacto. Dos columnas: izquierda =
     heading con degradado + subtitulo + ilustracion; derecha = formulario
     embebido de HubSpot (hs-form-frame).

     IMPORTANTE: hs-form-frame renderiza el formulario dentro de un IFRAME
     cross-origin — nuestro CSS no llega a los campos/labels/boton de adentro,
     solo al contenedor que lo envuelve. Los estilos internos (fuente, color
     primario, radio, boton) se configuran del lado de HubSpot: portal ->
     Marketing -> Forms -> este formulario -> pestana "Style". -->
<template>
  <section class="sc-section mt-3 w-full rounded-t-3xl bg-[linear-gradient(180deg,_#F5F1E6_38.97%,_#FFFFFF_100%)] px-4 py-10 lg:px-8 lg-2:py-20">
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

      <!-- Derecha: formulario de HubSpot -->
      <div
        class="sc-section min-w-[300px] grow basis-96 overflow-hidden rounded-3xl shadow-card"
        style="background: linear-gradient(0deg, #FFFFFF, #FFFFFF), radial-gradient(90% 120% at 0% 0%, rgba(109, 72, 255, 0.12) 0%, rgba(109, 72, 255, 0) 55%);"
      >
        <div
          class="hs-form-frame"
          data-region="na1"
          data-form-id="41732af6-9b90-40fb-8698-494a66fa6bf4"
          data-portal-id="50502045"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  script: [
    { src: 'https://js.hsforms.net/forms/embed/50502045.js', defer: true },
  ],
})
</script>

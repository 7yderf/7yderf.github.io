<!-- HsmSupport.vue — Zona 9. Banda full-width: la foto es el fondo de TODO el
     bloque (texto y fila de compromisos incluidos), con un velo oscuro encima
     que sostiene el contraste sin depender del recorte de la imagen.
     La fila de compromisos se separa con filetes blancos — uno horizontal
     arriba y uno vertical entre celdas, que solo aparece cuando las cinco
     caben en una sola fila; al envolver, un borde izquierdo colgaria suelto al
     inicio de la fila nueva. -->
<template>
  <section class="sc-section w-full flex-col">
    <div
      class="relative w-full bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: 'url(/images/seguimos-contigo.png)' }"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-deep-ink via-deep-ink/80 to-deep-ink/25" aria-hidden="true" />

      <div class="relative mx-auto flex w-full max-w-7xl flex-col px-4 lg:px-8">
        <div class="py-16 lg-2:py-24">
          <div class="flex max-w-lg flex-col items-start gap-5 text-left">
            <h2 class="font-secondary font-bold text-text-invert">{{ t('hsm.support.title') }}</h2>
            <p class="text-text-invert/80">{{ t('hsm.support.description') }}</p>
            <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
              {{ t('hsm.support.cta') }}
            </NuxtLink>
          </div>
        </div>

        <article class="sc-article flex-wrap border-t border-text-invert/25">
          <section
            v-for="(item, i) in items"
            :key="item.label"
            class="sc-section min-w-[12rem] grow basis-48 border-text-invert/25 px-5 py-8"
            :class="i > 0 ? 'lg-2:border-l' : ''"
          >
            <p class="text-center text-xs font-medium text-text-invert/85">{{ item.label }}</p>
          </section>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SupportText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const items = useLocalizedItems<SupportText>('hsm.support.items', 5, ['label'])
</script>

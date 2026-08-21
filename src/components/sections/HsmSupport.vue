<!-- HsmSupport.vue — Zona 9. Banda full-width: la foto es el fondo de TODO el
     bloque (texto y fila de compromisos incluidos), con un velo oscuro encima
     que sostiene el contraste sin depender del recorte de la imagen.
     La fila de compromisos se separa con filetes blancos — uno horizontal
     arriba y uno vertical entre celdas, que solo aparece cuando las cinco
     caben en una sola fila; al envolver, un borde izquierdo colgaria suelto al
     inicio de la fila nueva.

     El bloque de titulo+CTA se centra por debajo de 768 -items-center ademas
     de text-center: el reset global (style.scss) ya centra el TEXTO del h2/p
     ahi, pero no mueve la CAJA (items-start la dejaba pegada a la izquierda
     pese al texto centrado adentro). El corte usa min-[769px]: y NO md: -el
     reset global es max-width:768px (768 incluido), y md: de Tailwind es
     min-width:768px (768 TAMBIEN incluido): con md: los dos rangos se pisan
     exactamente en 768px, revirtiendo la caja a la izquierda un pixel antes
     de que el reset suelte el texto centrado, reproduciendo el mismo defecto
     partido a esa unica medida. min-[769px]: dispara recien en el primer
     pixel que el reset ya no toca. Los 5 items del riel usan el mismo corte
     para padding parejo (p-[16px], las 4 caras iguales) por debajo de 768;
     arriba se mantiene el px-5/py-8 original (asimetrico a proposito, mas
     alto que ancho). -->

<template>
  <section class="sc-section w-full flex-col">
    <div
      class="relative w-full bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: 'url(/images/seguimos-contigo.png)' }"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-deep-ink via-deep-ink/80 to-deep-ink/25" aria-hidden="true" />

      <div class="relative mx-auto flex w-full max-w-7xl flex-col px-4 lg:px-8">
        <div class="py-16 lg-2:py-24">
          <div class="flex max-w-lg flex-col items-center gap-5 text-center min-[769px]:items-start min-[769px]:text-left">
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
            class="sc-section min-w-[12rem] grow basis-48 border-text-invert/25 p-[16px] min-[769px]:px-5 min-[769px]:py-8"
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

<!-- HsmTechDiagram.vue — Zona 5. Panel lavanda con el diagrama de la capa
     criptografica, en tres bloques: columna de capacidades, centro y columna de
     capacidades. El CTA no entra al diagrama — pertenece al bloque de titulo.

     El centro es un contenedor relative: el fondo de conectores va en absolute
     inset-0 (se rige por ese relative, no por la seccion) y el HSM se apila
     encima. Asi las lineas escalan con la columna en vez de necesitar
     posiciones calculadas por breakpoint.

     Columnas laterales en 28rem, no 30rem: con el padding propio del panel
     (px-6/lg-2:px-12) restando al max-w-6xl, 30rem dejaba solo 8px de margen
     entre la demanda de basis+gap y el contenedor disponible — margen real
     pero demasiado fino, al borde de lo que un redondeo de pixel o una
     scrollbar puede consumir. 28rem sube ese margen a 48px, en linea con el
     resto de secciones de esta vista. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="mx-auto w-full max-w-6xl rounded-3xl bg-primary-soft px-6 py-12 lg-2:px-12 lg-2:py-16">
      <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('hsm.tech.title') }}</h2>
      <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('hsm.tech.subtitle') }}</p>

      <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
           y suelto en un bloque centrado se estira a barra completa. -->
      <div class="mt-6 flex w-full justify-center">
        <NuxtLink :to="localePath('/contact')" class="btn-primary btn-pill">
          {{ t('hsm.tech.cta') }}
        </NuxtLink>
      </div>

      <article class="sc-article mt-12 flex-col min-[900px]:flex-row min-[900px]:flex-nowrap items-stretch justify-center gap-6">
        <div class="sc-section flex min-w-[26rem] basis-[28rem] flex-col justify-between gap-6">
          <HsmTechCard
            v-for="item in leftItems"
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
          />
        </div>

        <div class="sc-section relative flex min-w-[24rem] min-[900px]:basis-[40rem] min-[900px]:max-[1189px]:basis-[20rem] items-center justify-center">
          <img
            src="/images/tecnologia/backgound-hsm.png"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          >
          <img
            src="/images/tecnologia/center-hsm.png"
            alt=""
            aria-hidden="true"
            class="relative w-full max-w-[34rem] object-contain"
            loading="lazy"
            decoding="async"
          >
        </div>

        <div class="sc-section flex min-w-[26rem] basis-[28rem] flex-col justify-between gap-6">
          <HsmTechCard
            v-for="item in rightItems"
            :key="item.label"
            :icon="item.icon"
            :label="item.label"
          />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TechText {
  label: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// public/images/tecnologia — el nombre codifica la posicion: t/b = top/bottom,
// l/r = lado, el numero es el orden dentro de la columna.
const icons = [
  '/images/tecnologia/tl1.png',
  '/images/tecnologia/l2.png',
  '/images/tecnologia/bl3.png',
  '/images/tecnologia/tr1.png',
  '/images/tecnologia/r2.png',
  '/images/tecnologia/br3.png',
]
const texts = useLocalizedItems<TechText>('hsm.tech.items', icons.length, ['label'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))

const leftItems = computed(() => items.value.slice(0, 3))
const rightItems = computed(() => items.value.slice(3))
</script>

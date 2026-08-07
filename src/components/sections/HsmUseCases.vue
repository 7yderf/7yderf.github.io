<!-- HsmUseCases.vue — Zona 6. Seis casos de uso en cards cuadradas. El riel es
     el de IndustriesGrid (flex-wrap + grow + basis-*): el numero de columnas lo
     decide el ancho disponible, no un breakpoint.
     Hover como el abanico de la zona 4 pero sin la opacidad: la card crece, el
     degradado se aclara a blanco y aparece la sombra. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('hsm.useCases.title') }}</h2>
    <p class="mx-auto mt-4 max-w-xl text-center text-ink-3">{{ t('hsm.useCases.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink
        :to="localePath('/contact')"
        class="btn-custom btn-pill"
        :style="{ '--btn-color': 'var(--color-primary)' }"
      >
        {{ t('hsm.useCases.cta') }}
      </NuxtLink>
    </div>

    <!-- El gap crece en lg: con el contenedor fijo, mas separacion deja menos
         ancho por card, y eso es lo que las acerca al cuadrado en escritorio. -->
    <article class="sc-article mx-auto mt-12 w-full max-w-5xl flex-wrap items-stretch gap-6 lg:gap-12">
      <section
        v-for="item in items"
        :key="item.title"
        class="use-case-card sc-section flex min-w-[24rem] grow basis-72 flex-col rounded-2xl p-7 text-left"
      >
        <img
          :src="item.icon"
          alt=""
          aria-hidden="true"
          class="h-16 w-16 shrink-0 object-contain"
          loading="lazy"
          decoding="async"
        >
        <h3 class="mt-6 font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ item.title }}</h3>
        <p class="mt-3 text-sm font-medium text-ink-3">{{ item.description }}</p>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
interface UseCaseText {
  title: string
  description: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// public/images/clientes — el numero es el orden de aparicion (izquierda a
// derecha, arriba a abajo), que es el contrato real del set: los nombres
// descriptivos del origen no coincidian con el contenido en 3 y 4.
const icons = [
  '/images/clientes/1.png',
  '/images/clientes/2.png',
  '/images/clientes/3.png',
  '/images/clientes/4.png',
  '/images/clientes/5.png',
  '/images/clientes/6.png',
]
const texts = useLocalizedItems<UseCaseText>('hsm.useCases.items', icons.length, ['title', 'description'])
const items = computed(() => texts.value.map((text, i) => ({ ...text, icon: icons[i] })))
</script>

<style scoped>
.use-case-card {
  background: linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%);
  transition:
    scale 180ms cubic-bezier(0.2, 0, 0, 1),
    background 180ms cubic-bezier(0.2, 0, 0, 1),
    box-shadow 180ms cubic-bezier(0.2, 0, 0, 1);
}

/* El hover conserva la FORMA de degradado (no un color plano) para que el
   navegador pueda interpolar entre ambos estados en vez de saltar. */
.use-case-card:hover {
  scale: 1.04;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  box-shadow: 0 16px 32px -10px rgba(23, 23, 20, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .use-case-card {
    transition: none;
  }
  .use-case-card:hover {
    scale: 1;
  }
}
</style>

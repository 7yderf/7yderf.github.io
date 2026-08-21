<!-- CaasOnePlaceCard.vue — Card de modulo de CaasOnePlace.vue, extraida para
     que el arreglo de escritorio y el carrusel movil (CaasOnePlaceCarousel)
     rendericen exactamente la misma pieza -mismo estado apagado/encendido,
     mismas pastillas- en vez de tener 2 versiones que puedan divergir.

     En reposo TODO va en gris: titulo, subtitulo, pastillas y enlace. Al hover
     la card se enciende — superficie lavanda, borde violeta de marca, tinta
     oscura y pastillas blancas. En touch (carrusel) no hay hover, asi que la
     card se ve siempre en su estado de reposo -el mismo que se ve en desktop
     antes de pasar el mouse, no una variante nueva.

     El apagado se logra con un color de texto heredado y no repitiendo la clase
     en cada hijo: los descendientes no declaran color propio, asi que basta con
     cambiarlo en la card para que todo el contenido cambie a la vez. -->
<template>
  <section class="module-card sc-section flex h-full flex-col rounded-3xl border border-transparent p-8 text-center">
    <h3 class="text-center font-secondary text-2xl font-bold leading-tight">{{ card.title }}</h3>
    <p v-if="card.subtitle" class="mt-1 text-center text-base font-medium">{{ card.subtitle }}</p>

    <ul class="mt-6 flex flex-col gap-3">
      <li v-for="(item, k) in card.items" :key="k" class="module-card__pill rounded-xl px-4 py-3">
        <span class="text-sm leading-snug">
          <template v-for="(seg, s) in item" :key="s">
            <strong v-if="s % 2" class="font-bold">{{ seg }}</strong>
            <template v-else>{{ seg }}</template>
          </template>
        </span>
      </li>
    </ul>

    <NuxtLink
      :to="localePath(card.href)"
      class="mt-auto self-center pt-8 text-xs font-bold hover:underline"
    >
      {{ card.link }} →
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  card: {
    title: string
    subtitle: string
    link: string
    href: string
    items: string[][]
  }
}>()

const localePath = useLocalePath()
</script>

<style scoped>
/* Se usan los nombres del bloque de tema (--color-*), no los del :root de SCSS:
   los tokens nuevos de esta vista solo existen con esa forma, y mezclar ambas
   familias dejaria variables inexistentes que fallan en silencio. */
.module-card {
  background-color: var(--color-surface-3);
  color: var(--color-ink-3);
  transition:
    background-color 200ms cubic-bezier(0.2, 0, 0, 1),
    border-color 200ms cubic-bezier(0.2, 0, 0, 1),
    color 200ms cubic-bezier(0.2, 0, 0, 1);
}

.module-card__pill {
  background-color: rgba(0, 0, 0, 0.04);
  transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1);
}

.module-card:hover {
  background-color: var(--color-brand-violet-soft);
  border-color: var(--color-brand-violet);
  color: var(--color-deep-ink);
}

.module-card:hover .module-card__pill {
  background-color: var(--color-bg-second);
}

@media (prefers-reduced-motion: reduce) {
  .module-card,
  .module-card__pill {
    transition: none;
  }
}
</style>

<!-- CaasOnePlace.vue — Zona 4. Tres modulos en cards con estado apagado y
     encendido.

     En reposo TODO va en gris: titulo, subtitulo, pastillas y enlace. Al hover
     la card se enciende — superficie lavanda, borde violeta de marca, tinta
     oscura y pastillas blancas. En la referencia una de las tres aparece
     encendida: ese es el estado hover, no un destacado permanente.

     El apagado se logra con un color de texto heredado y no repitiendo la clase
     en cada hijo: los descendientes no declaran color propio, asi que basta con
     cambiarlo en la card para que todo el contenido cambie a la vez.

     El nombre del modulo va en negrita dentro del propio texto traducible,
     marcado con dobles asteriscos y partido en segmentos alternos. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('caas.onePlace.title') }}</h2>
    <p class="mx-auto mt-4 max-w-3xl text-center text-ink-3">{{ t('caas.onePlace.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.onePlace.cta') }}
      </NuxtLink>
    </div>

    <article class="sc-article mx-auto mt-12 w-full max-w-6xl flex-wrap items-stretch gap-6">
      <section
        v-for="card in cards"
        :key="card.title"
        class="module-card sc-section flex min-w-[26rem] grow basis-80 flex-col rounded-3xl border border-transparent p-8 text-center"
      >
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
          :to="localePath('/contact')"
          class="mt-auto pt-8 text-xs font-bold hover:underline"
        >
          {{ card.link }} →
        </NuxtLink>
      </section>
    </article>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// Cantidad de pastillas por card. useLocalizedItems solo resuelve un nivel de
// indice; el anidado se arma con las mismas rutas t() indexadas que usa ese
// composable (tm() volcaria el AST compilado).
const pillsPerCard = [6, 5, 2]

const cards = computed(() =>
  pillsPerCard.map((count, i) => ({
    title: t(`caas.onePlace.cards.${i}.title`),
    subtitle: t(`caas.onePlace.cards.${i}.subtitle`),
    link: t(`caas.onePlace.cards.${i}.link`),
    items: Array.from({ length: count }, (_, j) =>
      t(`caas.onePlace.cards.${i}.items.${j}`).split('**'),
    ),
  })),
)
</script>

<style scoped>
/* Apagado por herencia: el color se declara una sola vez en la card y todo el
   contenido lo toma, asi que encender la card es cambiar una propiedad. */
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

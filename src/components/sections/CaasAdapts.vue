<!-- CaasAdapts.vue — Zona 5. Tabla comparativa de los dos modelos.

     Va en <table> real y no en una rejilla de divs: son datos tabulares con
     encabezado de columna y de fila, y un lector de pantalla necesita esa
     relacion para anunciar a que columna pertenece cada celda. La primera
     columna usa <th scope="row"> por lo mismo.

     El rayado alterno se resuelve con :nth-child sobre las filas y no con una
     clase por fila: asi agregar o quitar una fila del copy no obliga a
     reacomodar clases. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('caas.adapts.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('caas.adapts.subtitle') }}</p>

    <!-- El contenedor scrollea en horizontal por su cuenta: una tabla de tres
         columnas no puede encogerse indefinidamente sin volverse ilegible. -->
    <div class="mx-auto mt-12 w-full max-w-6xl overflow-x-auto">
      <table class="compare-table w-full min-w-[56rem] border-collapse text-center">
        <thead>
          <tr>
            <th class="w-1/3" />
            <th class="px-6 py-5 font-secondary text-lg font-bold text-deep-ink">{{ t('caas.adapts.colOwn') }}</th>
            <th class="px-6 py-5 font-secondary text-lg font-bold text-deep-ink">{{ t('caas.adapts.colCloud') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label">
            <th scope="row" class="px-6 py-5 text-center font-secondary text-lg font-bold text-deep-ink">{{ row.label }}</th>
            <td class="px-6 py-5 text-lg text-text">{{ row.own }}</td>
            <td class="px-6 py-5 text-lg text-text">{{ row.cloud }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-10 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('caas.adapts.cta') }}
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
interface RowText {
  label: string
  own: string
  cloud: string
}

const { t } = useI18n()
const localePath = useLocalePath()

const rows = useLocalizedItems<RowText>('caas.adapts.rows', 6, ['label', 'own', 'cloud'])
</script>

<style scoped>
/* Encabezado y filas impares en durazno; pares en crema. El alterno arranca en
   el encabezado, asi que la primera fila del cuerpo va clara. */
.compare-table thead tr {
  background-color: var(--color-accent-mid);
}

.compare-table tbody tr:nth-child(odd) {
  background-color: var(--color-cream-soft);
}

.compare-table tbody tr:nth-child(even) {
  background-color: var(--color-accent-mid);
}
</style>

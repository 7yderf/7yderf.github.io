<!-- CaasFaq.vue — Zona 10. Acordeon con <details>/<summary> nativos: el abrir y
     cerrar lo resuelve el navegador, sin estado ni JS propio. La primera
     pregunta arranca abierta, como en la referencia.

     NOTA: tercera vista con esta misma forma (HsmFaq, SpeiFaq y esta). Cada una
     lee su propia clave i18n fija, que es lo que impide reutilizarlas entre si.
     Con tres instancias ya conviene extraer un FaqAccordion que reciba la clave
     por prop; se deja señalado y no se hace aqui porque tocaria las dos vistas
     ya cerradas. -->
<template>
  <section class="sc-section w-full px-4 py-8 lg:px-8 lg-2:py-16">
    <div class="mx-auto w-full max-w-4xl">
      <h2 class="font-secondary font-bold text-deep-ink">{{ t('caas.faq.title') }}</h2>

      <div class="sc-article mt-8 w-full flex-col">
        <details
          v-for="(item, i) in items"
          :key="item.question"
          class="faq-item border-b border-line py-5"
          :open="i === 0"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
            <span class="text-base font-bold text-deep-ink">{{ item.question }}</span>
            <span class="faq-item__chevron flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line">
              <Icon icon="mdi:chevron-down" class="text-ink-3" width="22" height="22" />
            </span>
          </summary>
          <p class="mt-3 max-w-3xl text-base text-text">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface FaqText {
  question: string
  answer: string
}

const { t } = useI18n()

const items = useLocalizedItems<FaqText>('caas.faq.items', 8, ['question', 'answer'])
</script>

<style scoped>
/* Oculta el triangulo nativo en WebKit — la flecha propia vive en el summary */
.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item__chevron {
  transition: transform 140ms cubic-bezier(0.2, 0, 0, 1);
}

.faq-item[open] .faq-item__chevron {
  transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
  .faq-item__chevron {
    transition: none;
  }
}
</style>

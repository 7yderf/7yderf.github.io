<!-- SpeiIntelligence.vue — Zona 7. Carrusel de capacidades de automatizacion.
     Cada card lleva su ilustracion DENTRO — la card es la unidad.

     Carrusel con Swiper Element, la misma dependencia que ya usa
     SolutionsCarousel.vue del home (registrada en plugins/swiper.client.ts y
     declarada como custom element en nuxt.config.ts). NO se toma como
     referencia AlliancesCarousel: eso es una marquesina de scroll infinito,
     util para logos pero inservible para texto que hay que leer.

     slidesPerView fraccionario a proposito: la card siguiente se asoma cortada
     y eso es lo que anuncia que hay mas contenido. Las flechas (pedidas por
     Fredy 2026-08-26) son un segundo camino para el mismo gesto, no un
     reemplazo: el asomo sigue siendo la pista visual, arrastrar sigue
     funcionando igual, las flechas solo evitan depender solo del gesto tactil.

     El filete de frontera lo declara SIEMPRE la seccion que sigue (border-t),
     nunca la anterior: con un solo dueño por frontera no hay bordes dobles ni
     fronteras sin linea al reordenar la pagina. Esta es la que se ve bajo
     "¿Por que Hermes?" en la referencia. -->
<template>
  <section class="sc-section w-full border-t border-line px-4 py-8 lg:px-8 lg-2:py-16">
    <h2 class="mx-auto max-w-3xl text-center font-secondary font-bold text-deep-ink">{{ t('spei.intelligence.title') }}</h2>
    <p class="mx-auto mt-4 max-w-2xl text-center text-ink-3">{{ t('spei.intelligence.subtitle') }}</p>

    <!-- Flex container obligatorio: .btn-* es display:flex con max-width:inherit
         y suelto en un bloque centrado se estira a barra completa. -->
    <div class="mt-6 flex w-full justify-center">
      <NuxtLink :to="localePath('/contact')" class="btn-primary">
        {{ t('spei.intelligence.cta') }}
      </NuxtLink>
    </div>

    <div class="mx-auto mt-12 w-full max-w-7xl">
      <!-- slides-per-view="auto": Swiper toma el ancho de cada slide del CSS en
           vez de calcularlo. Asi el numero de cards visibles lo deciden los
           breakpoints del proyecto y no la configuracion propia de la libreria.

           Los booleanos van BINDEADOS (:loop) y no como cadena: Swiper define
           una propiedad por cada parametro, y Vue asigna propiedad —no
           atributo— cuando el nombre existe en el elemento. El setter de la
           propiedad guarda el valor crudo, sin pasar por la coercion que si
           aplica la ruta de atributos. loop="true" llegaria como la cadena
           "true"; funciona por ser truthy, pero por esa misma via un objeto
           llega sin parsear. Los kebab-case (slides-per-view, space-between)
           no coinciden con ninguna propiedad y si van como atributo.

           init="false" es la compuerta que la libreria expone para no arrancar
           sola: al conectarse comprueba este atributo y no toca el DOM. Sin el
           se autoinicializa en cuanto queda definida —antes de que Vue hidrate—
           y con recorrido circular duplica piezas en el marcado que entrego el
           servidor; Vue encuentra mas nodos de los que espera, los revierte y
           destruye lo que la libreria acababa de montar. El arranque va abajo,
           ya hidratado. -->
      <swiper-container
        ref="swiperEl"
        class="intel-swiper block"
        init="false"
        slides-per-view="auto"
        space-between="32"
        :loop="true"
        :keyboard="true"
        :speed="900"
        :autoplay="autoplay"
        :navigation="true"
      >
        <swiper-slide v-for="item in items" :key="item.title">
          <article class="intel-card flex h-full flex-col rounded-2xl p-10">
            <h3 class="font-secondary text-2xl font-bold leading-tight text-deep-ink">{{ item.title }}</h3>

            <!-- El copy marca el fragmento a resaltar con dobles asteriscos y se
                 parte en segmentos alternos (impar = resaltado). Evita meter
                 HTML en el archivo de textos y evita v-html. -->
            <p class="mt-4 text-sm font-medium text-ink-3">
              <template v-for="(seg, k) in item.segments" :key="k">
                <strong v-if="k % 2" class="font-bold text-deep-ink">{{ seg }}</strong>
                <template v-else>{{ seg }}</template>
              </template>
            </p>

            <!-- La ilustracion NECESITA tope propio: style.scss fuerza
                 img { width: 100% } de forma global, asi que sin max-width no
                 toma su tamaño natural sino que llena la card y la estira a lo
                 alto. 22rem sale de medir la referencia — la ilustracion ocupa
                 ~56% del ancho de la card. -->
            <figure class="sc-figure mt-8">
              <img
                :src="item.image"
                alt=""
                aria-hidden="true"
                class="mx-auto block w-full max-w-[22rem] object-contain"
                loading="lazy"
                decoding="async"
              >
            </figure>
          </article>
        </swiper-slide>
      </swiper-container>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IntelligenceText {
  title: string
  description: string
}

const { t } = useI18n()
const localePath = useLocalePath()

// Avance automatico pausado: la espera domina sobre el movimiento para que cada
// card se alcance a leer. Se pausa al pasar el mouse — sin eso, el texto se iria
// justo cuando alguien esta leyendolo — y no se cancela al arrastrar, para que
// el recorrido siga despues de que el visitante lo toque.
// Objeto constante y fuera del render: bindear un literal crearia una referencia
// nueva cada vez y el carrusel reaccionaria a un cambio que no ocurrio.
const AUTOPLAY = { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }

// Igual que el resto de las animaciones de estas vistas, el avance automatico se
// desactiva si el visitante pidio menos movimiento. Se resuelve al montar porque
// la consulta solo existe en el navegador.
const reduceMotion = ref(false)
const autoplay = computed(() => (reduceMotion.value ? false : AUTOPLAY))

// Arranque diferido hasta despues de la hidratacion, con una precedencia propia:
// la preferencia de movimiento tiene que quedar resuelta ANTES de arrancar, porque
// de ella depende autoplay y el carrusel lee su configuracion una sola vez. Va
// como parametro y no como un onMounted aparte para que esa precedencia se lea
// aca, en vez de quedar librada al orden en que se registren los ganchos.
const swiperEl = useSwiperInit({
  before: () => {
    reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
})

const images = [
  '/images/inteligencia/1.webp',
  '/images/inteligencia/2.webp',
  '/images/inteligencia/3.webp',
  '/images/inteligencia/4.webp',
]
const texts = useLocalizedItems<IntelligenceText>('spei.intelligence.items', images.length, ['title', 'description'])
const items = computed(() =>
  texts.value.map((text, i) => ({
    ...text,
    image: images[i],
    segments: text.description.split('**'),
  })),
)
</script>

<!-- Sin scope: Swiper mueve los slides a su propio arbol y el atributo de
     scoping no alcanza a los descendientes que el componente reubica. -->
<style>
.intel-card {
  background: linear-gradient(180deg, #e6f6ff 0%, #ffffff 100%);
}

/* height:auto estira todos los slides a la altura del mas alto y deja las cards
   parejas. El width es lo que gobierna cuantas caben: con slides-per-view="auto"
   Swiper lo lee de aqui, asi que los cortes son los del proyecto (535 / 768 /
   1200) y el ultimo porcentaje deja la card siguiente asomada. */
.intel-swiper swiper-slide {
  height: auto;
  width: 86%;
}

@media screen and (min-width: 535px) {
  .intel-swiper swiper-slide {
    width: 60%;
  }
}

@media screen and (min-width: 768px) {
  .intel-swiper swiper-slide {
    width: 44%;
  }
}

@media screen and (min-width: 1200px) {
  .intel-swiper swiper-slide {
    width: 30%;
  }
}

/* Navegadores laterales, pintados por ::part -la superficie que el componente
   expone- igual que en CaasAreas.vue: mismo tratamiento visual para que las
   flechas se lean como un patron del proyecto y no como un estilo propio de
   cada seccion. */
.intel-swiper {
  --swiper-navigation-size: 1.6rem;
}

.intel-swiper::part(button-prev),
.intel-swiper::part(button-next) {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 9999px;
  background-color: var(--color-primary-soft);
  color: var(--color-brand-violet);
}
</style>

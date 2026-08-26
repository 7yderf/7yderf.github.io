import { ref, onMounted, nextTick, type Ref } from 'vue'

// Arranque diferido de Swiper Element.
//
// El problema que resuelve: el componente web se autoinicializa en cuanto queda
// definido, y el plugin que lo registra (plugins/swiper.client.ts) corre antes de
// que Vue hidrate. Con recorrido circular la libreria duplica piezas en el marcado
// que entrego el servidor; Vue llega despues, encuentra mas nodos de los que su
// representacion espera y los revierte, destruyendo lo que la libreria acababa de
// montar. El sintoma enganna, porque es PARCIAL: arrastrar sigue funcionando —sus
// oyentes estan atados al contenedor, el unico nodo en que ambas partes coinciden—
// y las flechas no, porque las suyas quedaron en nodos reconstruidos.
//
// La correccion no es renderizar solo en cliente: eso cambia el defecto por perder
// el render de servidor, que en paginas de captacion es justo lo que interesa
// conservar. Se usa la compuerta que la propia libreria expone, init="false", y se
// arranca desde aqui una vez hidratado.
//
// QUIEN LO USA debe poner init="false" en el <swiper-container> y enlazar el ref
// devuelto. Sin el atributo, este composable no cambia nada: la libreria ya habra
// arrancado sola.

type SwiperContainer = HTMLElement & {
  initialize?: () => void
  swiper?: { update: () => void }
}

interface SwiperInitOptions {
  /**
   * Trabajo que debe quedar resuelto ANTES de arrancar el carrusel, tipicamente
   * un valor que solo existe en el navegador y del que depende su configuracion.
   *
   * Va como parametro, y no como un onMounted propio del componente, a proposito:
   * dos ganchos separados se ordenan por orden de registro, que es implicito y es
   * exactamente la clase de dependencia que este composable existe para eliminar.
   * Declarada aqui, la precedencia se lee en la llamada.
   */
  before?: () => void | Promise<void>
}

export function useSwiperInit(options: SwiperInitOptions = {}): Ref<SwiperContainer | null> {
  const el = ref<SwiperContainer | null>(null)

  onMounted(async () => {
    // El orden de estas cuatro lineas no es cosmetico y ninguna es intercambiable:
    // 1. se resuelve lo que dependa del navegador
    await options.before?.()
    // 2. se espera a que el componente exista, para no depender del orden en que
    //    corra el plugin que lo registra
    await customElements.whenDefined('swiper-container')
    // 3. se deja pasar un ciclo de render para que lo que haya cambiado en (1)
    //    viaje a las propiedades del elemento. initialize lee esas propiedades una
    //    sola vez: lo que no llego a tiempo arranca con el valor anterior y ya no
    //    se corrige, porque el cambio ocurrio antes de que hubiera quien lo observe
    await nextTick()
    // 4. recien ahora
    el.value?.initialize?.()
    // Bandera propia, en el elemento host (luz, no sombra): la libreria SI
    // marca su propio "inicializado", pero lo hace sobre el div interno de su
    // shadow DOM, inalcanzable desde una hoja de estilos externa. Un consumidor
    // que necesite CSS condicionado a "ya arranco" debe usar esta clase y no la
    // de la libreria. Sin ella, cualquier regla que oculte por defecto lo que
    // la libreria todavia no etiqueto ocultaria TODO durante el render de
    // servidor y la ventana previa a este arranque — el escenario que
    // useSwiperInit existe para evitar.
    el.value?.classList.add('is-ready')

    // 5. reasegurar el calculo de posicion una vez asentado el layout.
    //
    // Reportado en produccion (no reproducible en dev, si en un build estatico
    // real con la red retrasada a proposito): al llegar a un carrusel con loop
    // por navegacion de Vue Router (nunca con una carga completa), el recorrido
    // circular arrancaba centrado en la pieza equivocada y la pieza "anterior"
    // no aparecia -el boton de retroceso se veia deshabilitado, como si no
    // hubiera loop.
    //
    // Diagnostico verificado inspeccionando el propio swiper-wrapper en el
    // momento roto (no supuesto): su transform (translate3d) apuntaba a ~4.2
    // franjas de desplazamiento en vez de a la pieza 0 -Swiper arma los clones
    // del modo loop y calcula la posicion inicial UNA vez, en base al ancho de
    // slide que mide en ese instante (slidesPerViewDynamic, con
    // slides-per-view="auto"). Si ese instante cae antes de que la hoja de
    // estilos del carrusel (el ancho real de cada swiper-slide) haya terminado
    // de aplicarse -en SPA nav ese <link> puede llegar en un archivo separado
    // del chunk de JS de la ruta nueva, sin bloquear su ejecucion-, la medida
    // usada para armar los clones y la posicion inicial queda mal aunque el
    // ANCHO FINAL renderizado en pantalla despues si sea el correcto -son dos
    // calculos distintos, y solo el segundo se corrige solo.
    //
    // update() le pide a Swiper que vuelva a medir el DOM tal como esta AHORA y
    // recalcule posicion y clones contra eso -corrige el sintoma sin remontar
    // nada, asi que nunca hay una ventana sin carrusel. Es seguro llamarlo
    // siempre, no solo cuando algo salio mal: en el camino feliz (la mayoria)
    // no cambia nada visible.
    //
    // Varios intentos escalonados, no uno solo: no hay forma generica de saber
    // desde aca cuando termino de llegar el <link> de esa hoja de estilos
    // -depende de la red real de quien visita-, asi que un solo temporizador
    // fijo siempre puede correr antes de tiempo (probado: con el CSS retrasado
    // a proposito 800ms, un unico intento a los 300ms no alcanzaba a corregir
    // nada, porque todavia media contra el ancho viejo). Reintentar es barato
    // -update() no hace nada perceptible si ya estaba bien- asi que en vez de
    // adivinar EL numero correcto, se prueba en una serie que cubre desde una
    // red rapida hasta una notablemente lenta.
    for (const delay of [100, 300, 600, 1000]) {
      setTimeout(() => el.value?.swiper?.update(), delay)
    }
  })

  return el
}

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

type SwiperContainer = HTMLElement & { initialize?: () => void }

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
  })

  return el
}

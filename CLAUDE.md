## Eureka — reglas de este proyecto

> Complementa el bloque administrado de arriba. **No editar dentro de los marcadores
> `eure-k:method-activation`**: ese bloque es una constante que `project activate`
> regenera y sobrescribe. Todo lo propio va acá abajo.

### 1. Al abrir chat, o después de un autocompactado

Llamá `project_status` primero. Si hay tarea activa, **no abras `begin_task`**: se
continúa esa.

`project_status` devuelve el **conteo** de decisiones, no su contenido. Para
recuperarlas, leé `project-memory-v1.json` extrayendo **solo** `intent`, `decisions`
y `consultations` de la tarea activa (~5k tokens). **No leas el archivo entero**
(~19k tokens). Ahí está el porqué de todo lo ya decidido: no lo re-deduzcas, no lo
re-preguntes y no lo vuelvas a descubrir.

### 2. Durante el trabajo: consultar por actividad, nunca por tamaño

El protocolo administrado pone puerta al abrir y al cerrar, y **ninguna en medio**.
Estas son las de en medio, y son obligatorias:

- **La unidad es la ACTIVIDAD, no su tamaño.** Toda actividad con un objetivo
  identificable, artefactos afectados y un resultado abre puerta: da igual que sea
  maquetar una sección entera o ajustar un gap. Cualquier criterio de tamaño trae un
  umbral que juzga el mismo que debe atravesar la puerta, y siempre se juzga a favor
  de seguir de largo — por eso «esto es un ajuste chico» ya evadió la puerta dos
  veces sin que mediara la decisión de saltársela.
- **Cortar fino es el trabajo, no el preámbulo.** Entre más pequeña la actividad,
  mejor: descomponer el problema en partes chicas es lo que vuelve nítidas sus
  dependencias y responsabilidades, y eso es justo lo que el genoma puede contrastar.
  Consultar no es un costo a amortizar sobre trozos grandes.
- **Antes de cada actividad**, consultá el genoma por su tipo de problema.
- **Al terminar cada actividad**, registrá con `record_decision` lo que apareció, sin
  esperar a que te lo pidan.
- **Disparador — corregir dos veces lo mismo:** parar, consultar, registrar. La
  segunda corrección es la señal, no la coincidencia.
- **Disparador — un valor visible que no salga de medir la referencia:** verificarlo
  antes de escribirlo, no después.
- **«Esto ya lo sé» es señal de consultar, no de saltarse.** Es el sesgo que produce
  los defectos que el build no ve.

### 3. Cómo registrar

- `novel` → si la razón por la que funciona sobrevive sin Nuxt, sin este diseño y sin
  este cliente. **Siempre** con etiqueta estable en `projection`, con el formato
  `etiqueta: <slug-en-kebab>`. Es el mecanismo de conteo hacia promoción: la misma
  forma con dos redacciones distintas cuenta como dos formas que nunca llegan a
  umbral.
- `local` → solo si muere en este producto (paleta, token, convención del cliente).
  `local` es terminal: no llega nunca al genoma.
- Ante la duda entre los dos → `novel`.

### 4. Verificación de build: al cierre y a pedido — nunca por edición

No corras typecheck ni build después de cada edición. La regla es:

- **A pedido**, siempre que se pida.
- **Al cerrar la tarea**, antes de `submit_task`: ahí sí, verificación completa —
  entendida como **la validación que el proyecto tenga a la mano**, no una lista
  fija. En este repo eso es `npm run build` + `npm run lint`: no hay script
  `typecheck` ni `vue-tsc` instalado, así que no se exige. El equivalente en cada
  stack es el que exista ahí: `tsc` + build en Vue/React que lo tengan,
  compilación en Java, análisis estático en PHP.
- **Al cerrar una sección**, solo si esa sección tocó tipos, contratos o imports.
  Maquetado y estilos no lo ameritan. «Tocó imports» **no** incluye quitar un
  import junto con su único uso —eso es maquetado y no puede romper resolución—;
  es para dependencia nueva, export movido o renombrado, o frontera de módulo
  alterada. Ante la duda, no califica.

Por qué, medido en este proyecto: los seis defectos reales de esta vista —cuatro
transplantes de estructura hermana y dos roles visuales asumidos— **no los detectó
el build ni el linter**. Los detectó el humano al contrastar contra la referencia.
Correr el build en cada edición cuesta tiempo y da confianza falsa sobre la clase de
error que este trabajo produce. Lo que sí atrapa esa clase es la consulta por sección
del punto 2.

### 5. Cierre

`submit_task` **solo con OK humano explícito**. Después de `submit_task` ya no se
puede registrar ninguna decisión: todo lo aprendido debe estar registrado antes.
Luego `prepare_local_projection` por cada decisión que deba persistir como precedente,
presentar los proposals, esperar OK, y recién ahí `finalize_task`.

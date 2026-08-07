<!-- eure-k:method-activation:start -->
## Eureka — protocolo operativo local

Contrato administrado: `eure-k/method-activation/v1`.

1. Llama `project_status` antes de trabajar y abre `begin_task` antes del primer cambio material; declara `normal`, `late` o `retrospective` con honestidad.
2. Consulta el genoma cuando corresponda y registra solo receipts reales; registra decisiones con evidencia sin inventar targets ni metadata.
3. Ejecuta `submit_task`, presenta el resultado y espera el OK humano explícito. Solo después ejecuta `finalize_task` con esa aprobación.
4. Cierre, observation, review, exportación y curación son gates separados. Un OK de código no autoriza los siguientes y curar no cosecha ni promueve.
5. Respeta `expectedRevision`, rutas y receipts emitidos por Eureka. Git sigue el protocolo propio del proyecto, no el lifecycle de Eureka.
<!-- eure-k:method-activation:end -->

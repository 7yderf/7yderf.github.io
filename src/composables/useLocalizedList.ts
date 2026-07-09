// tm() de vue-i18n devuelve recursos de mensaje compilados (no strings planos) cuando
// el message compiler esta activo (default en @nuxtjs/i18n) — renderizarlos directo con
// {{ }} vuelca el AST compilado en pantalla. t() con rutas indexadas si resuelve a string
// final, por eso estos helpers iteran por indice fijo en vez de usar tm().

export function useLocalizedStrings(prefix: string, count: number) {
  const { t } = useI18n()
  return computed(() => Array.from({ length: count }, (_, i) => t(`${prefix}.${i}`)))
}

export function useLocalizedItems<T extends Record<string, string>>(
  prefix: string,
  count: number,
  fields: (keyof T)[],
) {
  const { t } = useI18n()
  return computed(() =>
    Array.from({ length: count }, (_, i) => {
      const item = {} as T
      for (const field of fields) {
        item[field] = t(`${prefix}.${i}.${String(field)}`) as T[typeof field]
      }
      return item
    }),
  )
}

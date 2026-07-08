// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

// Polyfill para Node 20 — Object.groupBy existe desde Node 21 y lo usa el
// tooling de @nuxt/eslint. Eliminar al actualizar a Node 22+.
if (typeof Object.groupBy !== 'function') {
  Object.defineProperty(Object, 'groupBy', {
    value: (items, callback) => {
      const result = Object.create(null)
      let i = 0
      for (const item of items) {
        const key = callback(item, i++)
        ;(result[key] ??= []).push(item)
      }
      return result
    },
    writable: true,
    configurable: true,
  })
}

export default withNuxt()

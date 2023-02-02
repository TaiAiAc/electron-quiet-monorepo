import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': 'src'
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts}'],
    globals: true,
    coverage: {
      provider: 'istanbul' // or 'c8'
    }
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'

import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [vue(), tsconfigPaths(), vueDevTools()],
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@app-views': resolve(__dirname, 'src', 'views'),
      '@app-components': resolve(__dirname, 'src', 'components'),
      '@app-lib': resolve(__dirname, 'src', 'lib'),
    },
  },
})

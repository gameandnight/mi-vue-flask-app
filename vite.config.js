import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/mi-vue-flask-app/',   // <-- Ruta base en GitHub Pages
  plugins: [vue()]
})

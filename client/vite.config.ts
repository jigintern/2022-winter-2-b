import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  build: {
    outDir: "../docs",
    assetsDir: "./assets"
  },
  plugins: [vue()]
})

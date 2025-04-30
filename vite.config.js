import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Main Pages
        main: resolve(__dirname, 'index.html'),
        pokemondb: resolve(__dirname, 'pokemon-db.html'),
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build:single` produit un seul fichier HTML (pratique pour un aperçu partageable).
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  base: './',
  // Modèles 3D (Spookie)
  assetsInclude: ['**/*.glb'],
  // three.js (la 3D) pèse ~870 Ko à lui seul : il est chargé à part, seulement sur l'accueil.
  build: mode === 'single' ? { outDir: 'dist-single', assetsInlineLimit: 100000000 } : { chunkSizeWarningLimit: 900 },
}))

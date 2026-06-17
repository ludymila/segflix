import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // <-- Corrigido aqui!
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/segflix/', // Já deixa pronto para o GitHub Pages
})
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL(',/src', import.meta.url))
    }
  },
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:3000', // Backend
            changeOrigin: true,
        },
    },
  },
})

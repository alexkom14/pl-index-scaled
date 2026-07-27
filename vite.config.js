import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pl-Index-scaled/',
  plugins: [react()],
  server: {
    proxy: {
      // any request from React to /api gets forwarded to Express
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})

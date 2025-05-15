import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    proxy: {
      '/image-url': 'http://localhost:3001',
      '/products': 'http://localhost:3001',
      '/delete': 'http://localhost:3001',
      '/new': 'http://localhost:3001',
      '/edit': 'http://localhost:3001',
      '/images': 'http://localhost:3001'
    }
  }
})

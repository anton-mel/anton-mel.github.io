import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().split('T')[0])
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 5002
  },
  resolve : {
    alias : {
      '@components' : '/src',
      '@utils' : '/src/utils',
    }
  }
})

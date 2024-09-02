import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

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
      '@' : path.resolve(__dirname, "src")
    }
  }
})

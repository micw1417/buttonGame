import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({
    emitError: true,
    emitWarning: true,
    failOnError: false,
    formatter: (res) => {
      console.log('eslint works...')
      return '';
    }
  })],
  base: "/buttonGame/"
})

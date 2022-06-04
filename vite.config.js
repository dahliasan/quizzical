import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/quizzical/', //This is the base url of your website
  plugins: [react()]
})

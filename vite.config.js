import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/chirag-portfolio/', // Change to '/' for username.github.io repo
})

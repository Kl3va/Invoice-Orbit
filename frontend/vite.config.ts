import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0', // Allow Vite to be accessible from Docker
    watch: {
      usePolling: true, // Enables polling to detect changes in Docker
    },
  },
})

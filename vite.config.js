import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// We change this to a function to access the 'command' argument
export default defineConfig(({ command }) => {
  // If running 'npm run build', use the repo name. If running 'npm run dev', use root.
  const base = command === 'build' ? '/my-portfolio/' : '/'

  return {
    base, 
    plugins: [
      react(),
      visualizer({
        filename: './dist/stats.html',
        open: true,
      }),
    ],
    build: {
      sourcemap: true,
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  }
})
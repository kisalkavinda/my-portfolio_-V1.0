import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// We change this to a function to access the 'command' argument
export default defineConfig(({ command }) => {
  // Use root base for Vercel, repo name for generic build (GitHub Pages), root for dev
  const base = process.env.VERCEL ? '/' : (command === 'build' ? '/my-portfolio/' : '/')

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
    },
  }
})
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// We change this to a function to access the 'command' argument
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Use root base for Vercel, repo name for generic build (GitHub Pages), root for dev
  const base = env.VERCEL ? '/' : (command === 'build' ? '/my-portfolio_-V1.0/' : '/')

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
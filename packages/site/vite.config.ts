import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

const plugins = [vike(), react({}), tailwindcss()]
if (process.env.NODE_ENV === 'production') {
  plugins.push(cloudflare())
}
export default defineConfig({
  plugins,
  build: {
    target: 'es2022',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})

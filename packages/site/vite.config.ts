import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

const plugins = [vike(), react({}), vanillaExtractPlugin(), tailwindcss()]
if (process.env.NODE_ENV === 'production') {
  plugins.push(cloudflare())
}
export default defineConfig({
  plugins,
  build: {
    target: 'es2022',
  },
})

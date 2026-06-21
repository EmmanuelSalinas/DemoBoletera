import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader';
import * as dotenv from "dotenv"

// https://vite.dev/config/
export default defineConfig(({mode})=>{

  	const env = dotenv.config({ path: `.env.${mode}` }).parsed || {}

  return{
    plugins: [
    vue(),
    vueDevTools(),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
			origin: env.VITE_SERVER_ORIGIN,
		},
		base: env.VITE_BASE_URL,
  }
})

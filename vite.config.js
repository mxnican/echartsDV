import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
$vw_base: 1920;
$vh_base: 1080;

@function vw($px) {
  @return calc($px / $vw_base) * 100vw;
}

@function vh($px) {
  @return calc($px / $vh_base) * 100vh;
}
`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})

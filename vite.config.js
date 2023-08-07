import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./public",
  server:{
    port: 3344,
    strictPort: true,
    https: false,
    open: "./index.html",
  }
})

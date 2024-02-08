import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path'
import svgr from 'vite-plugin-svgr'


export default defineConfig({
  plugins: [react(),svgr()],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@auth': path.resolve(__dirname, 'src/auth'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
});

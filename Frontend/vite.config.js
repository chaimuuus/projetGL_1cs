import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps for debugging
    minify: 'terser', // Use Terser for minification
    chunkSizeWarningLimit: 1600, // Warn for large chunks
  },
  css: {
    devSourcemap: true, // Enable CSS source maps
  },
});

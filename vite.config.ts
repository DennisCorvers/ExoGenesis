import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '',
  resolve: {
    alias: {
      '@game': path.resolve(__dirname, 'src/game'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    }
  },
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        preserveModulesRoot: 'src',
      },
    },
  },
});

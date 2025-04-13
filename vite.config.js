import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import transformerDirectives from '@unocss/transformer-directives'
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      transformers: [transformerDirectives()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    sourcemap: true
  }
});

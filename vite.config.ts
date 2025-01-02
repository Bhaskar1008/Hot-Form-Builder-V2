import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HotFormBuilder',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        '@reduxjs/toolkit',
        'zustand',
        'tailwindcss'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-redux': 'ReactRedux',
          'react-router-dom': 'ReactRouterDOM',
          '@reduxjs/toolkit': 'RTK',
          'zustand': 'zustand',
          'tailwindcss': 'tailwindcss'
        },
      },
    },
  },
});

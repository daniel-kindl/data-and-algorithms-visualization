import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

// Extract repository name from GITHUB_REPOSITORY (format: owner/repo)
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
// Use repo name as base path when building in GitHub Actions
const basePath = process.env.VITE_BASE_PATH
  ?? (process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/');

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
    }),
  ],
  css: {
    postcss: './config/postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@algorithms': path.resolve(__dirname, './src/algorithms'),
      '@dataStructures': path.resolve(__dirname, './src/dataStructures'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion'],
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.svg'],
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name && /\.(jpeg|jpg|png|svg)$/.test(assetInfo.name)) {
            return 'assets/[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: false,
      allow: ['..'],
    },
  },
});

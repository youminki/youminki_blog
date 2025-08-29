import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpeg', '**/*.jpg', '**/*.png', '**/*.svg'],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(jpeg|jpg|png|svg)$/.test(assetInfo.name)) {
            return `assets/[name].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
    },
  },
});

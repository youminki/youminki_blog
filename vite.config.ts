import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 정적 파일 서빙 설정
  publicDir: 'public',

  // 서버 설정
  server: {
    port: 5173,
    host: true,
  },

  // 빌드 설정
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },

  // 정적 파일 처리
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],

  // 경로 별칭 설정
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 깃허브 페이지스 배포를 위한 기본 경로 설정
  base: '/vite/',
})
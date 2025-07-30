import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // 明确指定public目录（关键：确保静态资源被复制）
  publicDir: 'public', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup.html'),
        background: path.resolve(__dirname, 'src/background.js'),
        content: path.resolve(__dirname, 'src/content.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') {
            return 'background.js'
          } else if (chunkInfo.name === 'content') {
            return 'content.js'
          }
          return 'assets/[name].[hash].js'
        }
      }
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  base: './', // 关键：使用相对路径，确保插件能正确加载资源
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/popup.html'),
        background: path.resolve(__dirname, 'src/background.js'),
        content: path.resolve(__dirname, 'src/content.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // 重要：popup的JS也需要固定文件名，否则HTML会找不到脚本
          if (['background', 'content', 'popup'].includes(chunkInfo.name)) {
            return '[name].js'; // 这三个关键文件保持固定名称
          }
          return 'assets/[name].[hash].js'; // 其他资源可以带哈希
        },
        // 确保HTML中的资源引用是相对路径
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // 禁用模块预加载，Chrome插件环境不支持
    modulePreload: {
      polyfill: false
    }
  }
})
    
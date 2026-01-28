import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 相対パスでビルド（サーバーのサブディレクトリでも動く）
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // 複数のHTMLページをビルド対象に含める
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        activities: resolve(__dirname, 'activities.html'),
        facility: resolve(__dirname, 'facility.html'),
        members: resolve(__dirname, 'members.html'),
        contact: resolve(__dirname, 'contact.html'),
        python: resolve(__dirname, 'python.html'),
        game: resolve(__dirname, 'game.html'),
        secret: resolve(__dirname, 'secret.html'),
        secret2: resolve(__dirname, 'secret2.html'),
        '3dcontest2025': resolve(__dirname, 'events/3dcontest2025.html'),
        '3dprinter2025': resolve(__dirname, 'events/3dprinter2025.html'),
        admin: resolve(__dirname, 'admin.html'),
      }
    }
  }
})

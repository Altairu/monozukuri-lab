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
        activities: resolve(__dirname, 'pages/activities.html'),
        facility: resolve(__dirname, 'pages/facility.html'),
        members: resolve(__dirname, 'pages/members.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        python: resolve(__dirname, 'pages/python.html'),
        game: resolve(__dirname, 'pages/game.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        admin: resolve(__dirname, 'admin/admin.html'),
        secret: resolve(__dirname, 'admin/secret.html'),
        secret2: resolve(__dirname, 'admin/secret2.html'),
        '3dcontest2025': resolve(__dirname, 'events/3dcontest2025.html'),
        '3dprinter2025': resolve(__dirname, 'events/3dprinter2025.html'),
      }
    }
  }
})

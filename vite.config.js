// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       'tailwindcss4': path.resolve(__dirname, './src')
//     }
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'tailwindcss4': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,           // 👈 Allow access via local IP (0.0.0.0)
    port: 5173,           // Optional: your default dev port
  },
})
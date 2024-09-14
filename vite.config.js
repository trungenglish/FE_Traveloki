import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'host-app',
            remotes: {
                remote_app: "https://wowo.htilssu.id.vn/assets/remoteEntry.js",
            },
  })
  ],
})

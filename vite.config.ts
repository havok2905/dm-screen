import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./core"),
      "@designSystem": path.resolve(__dirname, "./src/designSystem"),
      "@jestHelpers": path.resolve(__dirname, "./jestHelpers"),
      "@rules": path.resolve(__dirname, "./rules"),
      "@templates": path.resolve(__dirname, "./templates")
    }
  }
})

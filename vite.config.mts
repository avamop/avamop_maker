import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/avamop_maker/AvamopMaker.tsx"),
      formats: ["es", "cjs"],
      name: "avamop_maker",
      fileName: (format) => `avamop_maker.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "react-jsx",
        },
      },
    },
  },
});

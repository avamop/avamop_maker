import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   exclude: ["react"],
  // },
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/avamop_maker/AvamopMaker.tsx"),
      formats: ["es", "cjs"],
      name: "avamop_maker",
      fileName: "index",
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

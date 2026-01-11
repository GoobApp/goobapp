import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";
import { resolve } from "path";

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, "src/main.tsx"),
      },
    },
  },
  renderer: {
    root: ".",
    build: {
      rollupOptions: {
        input: resolve(__dirname, "index.html"),
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", { target: "19" }]],
        },
      }),
    ],
    define: {
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(
        process.env.npm_package_version
      ),
    },
  },
});

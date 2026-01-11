import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
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
});

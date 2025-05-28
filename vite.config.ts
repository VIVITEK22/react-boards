import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: process.env.PROD ? "/react-boards/" : "/",
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
});

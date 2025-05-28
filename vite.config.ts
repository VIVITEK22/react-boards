import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), tailwindcss()],
});

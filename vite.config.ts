import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ command }) => {
  const base = command === "build" ? "/react-boards/" : "/";
  
  return {
    base,
    plugins: [react(), viteTsconfigPaths(), tailwindcss()],
  };
});

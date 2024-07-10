import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/plany-app/",
  plugins: [react()],
  resolve: { alias: { "@": "/src" } },
});

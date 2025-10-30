import { defineConfig } from "rollup";
import TemplateLoader from "./plugins/vite-template-plugin";

export default defineConfig({
    server: {
        port: 3000,
        host: "0.0.0.0",
        hmr: true,
    },
    plugins: [
        TemplateLoader(),
    ],
});
import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	build: {
		sourcemap: true,
		emptyOutDir: true,
		outDir: resolve(__dirname, "dist"),
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					// Treat all mj-* tags as native MJML elements, not Vue components
					isCustomElement: (tag) => tag.startsWith("mj-"),
				},
			},
		}),
		...(mode === "email" ? [] : [vueDevTools()]),
	],
	resolve: {
		tsconfigPaths: true,
		extensions: [".js", ".ts", ".vue", ".json"],
		alias: {
			"@": resolve(__dirname, "src"),
			"@app-views": resolve(__dirname, "src", "views"),
			"@app-components": resolve(__dirname, "src", "components"),
			"@app-lib": resolve(__dirname, "src", "lib"),
		},
	},
}));

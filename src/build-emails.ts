import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import WelcomeEmail from "./emails/welcome.vue";
import { renderToHtml } from "./lib/renderToMjml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "dist", "emails");

interface EmailTemplate {
	name: string;
	component: Parameters<typeof renderToHtml>[0];
	props?: Record<string, unknown>;
}

const templates: EmailTemplate[] = [{ name: "welcome", component: WelcomeEmail }];

async function build() {
	await mkdir(outDir, { recursive: true });

	for (const template of templates) {
		console.log(`Building email: ${template.name}...`);

		const { html, errors } = await renderToHtml(template.component, template.props);

		if (errors.length > 0) {
			console.warn(`  MJML warnings for ${template.name}:`);
			for (const error of errors) console.warn(`    - ${error.formattedMessage}`);
		}

		const outputPath = resolve(outDir, `${template.name}.html`);
		await writeFile(outputPath, html, "utf-8");
		console.log(`  ✓ Written to ${outputPath}`);
	}

	console.log("\nDone! All emails built successfully.");
}

build().catch((err) => {
	console.error("Build failed:", err);
	process.exit(1);
});

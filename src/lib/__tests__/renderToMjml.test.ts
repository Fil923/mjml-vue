import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import { renderToHtml, renderToMjml } from "@/lib/renderToMjml";

describe("renderToMjml", () => {
	it("renders a basic mjml document", async () => {
		const EmailTemplate = defineComponent({
			setup() {
				return () =>
					h("mjml", null, [
						h("mj-body", null, [
							h("mj-section", null, [h("mj-column", null, [h("mj-text", null, "Hello World")])]),
						]),
					]);
			},
		});

		const mjml = await renderToMjml(EmailTemplate);
		expect(mjml).toContain("<mjml>");
		expect(mjml).toContain("<mj-body>");
		expect(mjml).toContain("<mj-text>Hello World</mj-text>");
		expect(mjml).toContain("</mjml>");
	});

	it("renders mjml with lang attribute", async () => {
		const EmailTemplate = defineComponent({
			setup() {
				return () => h("mjml", { lang: "en" }, [h("mj-body")]);
			},
		});

		const mjml = await renderToMjml(EmailTemplate);
		expect(mjml).toContain('<mjml lang="en">');
	});

	it("renders mj-button with kebab-case attributes", async () => {
		const EmailTemplate = defineComponent({
			setup() {
				return () =>
					h("mjml", null, [
						h("mj-body", null, [
							h("mj-section", null, [
								h("mj-column", null, [
									h(
										"mj-button",
										{
											href: "https://example.com",
											"background-color": "#346DB7",
											color: "white",
											"font-size": "16px",
											"border-radius": "4px",
										},
										["Click Me"],
									),
								]),
							]),
						]),
					]);
			},
		});

		const mjml = await renderToMjml(EmailTemplate);
		expect(mjml).toContain('background-color="#346DB7"');
		expect(mjml).toContain('color="white"');
		expect(mjml).toContain('font-size="16px"');
		expect(mjml).toContain('border-radius="4px"');
		expect(mjml).toContain('href="https://example.com"');
		expect(mjml).toContain(">Click Me</mj-button>");
	});
});

describe("renderToHtml", () => {
	it("produces valid email HTML from Vue components", async () => {
		const EmailTemplate = defineComponent({
			setup() {
				return () =>
					h("mjml", null, [
						h("mj-body", null, [
							h("mj-section", null, [
								h("mj-column", null, [
									h(
										"mj-button",
										{
											href: "https://example.com",
											"background-color": "#346DB7",
											color: "white",
										},
										["Click Me"],
									),
								]),
							]),
						]),
					]);
			},
		});

		const { html, errors } = await renderToHtml(EmailTemplate);

		expect(html).toContain("<!doctype html>");
		expect(html).toContain("<html");
		expect(html).toContain("</html>");
		expect(html).toContain("Click Me");
		expect(html).toContain("table");
		expect(errors).toEqual([]);
	});

	it("preserves Handlebars syntax through the pipeline", async () => {
		const EmailTemplate = defineComponent({
			setup() {
				return () =>
					h("mjml", null, [
						h("mj-body", null, [
							h("mj-section", null, [
								h("mj-column", null, [
									h("mj-text", null, "Hello, {{userName}}!"),
									h("mj-button", { href: "{{activationUrl}}" }, ["Activate"]),
								]),
							]),
						]),
					]);
			},
		});

		const { html, errors } = await renderToHtml(EmailTemplate);

		expect(html).toContain("{{userName}}");
		expect(html).toContain("{{activationUrl}}");
		expect(errors).toEqual([]);
	});
});

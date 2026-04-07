import mjml2html from "mjml";
import type { Component } from "vue";
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";

/**
 * Renders a Vue component tree to an MJML markup string.
 *
 * Uses Vue's SSR (`renderToString`) to serialize the component hierarchy
 * into MJML tags (e.g. `<mjml>`, `<mj-body>`, `<mj-button>`, etc.).
 */
export async function renderToMjml(
	component: Component,
	props?: Record<string, unknown>,
): Promise<string> {
	const app = createSSRApp(component, props);
	return renderToString(app);
}

export interface MjmlRenderResult {
	html: string;
	errors: Array<{ line: number; message: string; tagName: string; formattedMessage: string }>;
}

/**
 * Renders a Vue component tree to final email-safe HTML.
 *
 * 1. Serializes the Vue component tree to MJML markup via SSR
 * 2. Passes the MJML string to `mjml2html()` to produce responsive email HTML
 *
 * The resulting HTML preserves any Handlebars syntax (e.g. `{{variable}}`)
 * that was included as text content in the Vue components.
 */
export async function renderToHtml(
	component: Component,
	props?: Record<string, unknown>,
	mjmlOptions?: Record<string, unknown>,
): Promise<MjmlRenderResult> {
	const mjmlString = await renderToMjml(component, props);
	const result = mjml2html(mjmlString, {
		validationLevel: "soft",
		...mjmlOptions,
	});
	return {
		html: result.html,
		errors: result.errors,
	};
}

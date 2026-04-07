import { defineComponent, h, type PropType } from "vue";

export const Skeleton = defineComponent({
	name: "Skeleton",
	props: {
		title: { type: String as PropType<string>, required: true },
		preview: { type: String as PropType<string>, default: undefined },
		year: { type: Number as PropType<number>, default: () => new Date().getFullYear() },
	},
	setup(props, { slots }) {
		return () =>
			h("mjml", { lang: "en" }, [
				h("mj-head", null, [
					h("mj-title", null, props.title),
					...(props.preview ? [h("mj-preview", null, props.preview)] : []),
					h("mj-attributes", null, [h("mj-all", { "font-family": "Arial, sans-serif" })]),
					...(slots.head ? slots.head() : []),
				]),
				h("mj-body", { "background-color": "#f4f4f4" }, [
					...(slots.default ? slots.default() : []),
					h("mj-section", { padding: "10px" }, [
						h("mj-column", null, [
							...(slots.footer
								? slots.footer()
								: [
										h(
											"mj-text",
											{ "font-size": "12px", color: "#999999", align: "center" },
											`\u00A9 ${props.year} Your Company. All rights reserved.`,
										),
									]),
						]),
					]),
				]),
			]);
	},
});

export default Skeleton;

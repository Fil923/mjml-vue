import { defineComponent, h } from "vue";

export default defineComponent({
	name: "MjmlComponent",
	render() {
		return h("mjml", {
			default: () => {},
		});
	},
});

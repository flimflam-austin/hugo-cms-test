// JS Goes here - ES6 supported
import { initHomeSlider } from "./modules/homeslider";
import { initCustomScrollbar } from "./modules/scrollbars";

initHomeSlider();
//initCustomScrollbar();

if (window.netlifyIdentity) {
	window.netlifyIdentity.on("init", (user) => {
		if (!user) {
			window.netlifyIdentity.on("login", () => {
				document.location.href = "/admin/";
			});
		}
	});
}

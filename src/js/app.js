// JS Goes here - ES6 supported
import { initHomeSlider } from "./modules/homeslider";
import { initReloadToTop } from "./modules/totoponreload";
import { initCustomScrollbar } from "./modules/scrollbars";
import { initCardFlip } from "./modules/cardflip";
import { initNavDrawer } from "./modules/sitenav";
import { initBreakingDropdown } from "./modules/breakingdropdown";

initReloadToTop();
initHomeSlider();
initCardFlip();
initNavDrawer();
initBreakingDropdown();
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

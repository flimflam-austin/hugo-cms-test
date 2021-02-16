import "overlayscrollbars";

export const initCustomScrollbar = () => {
	document.addEventListener("DOMContentLoaded", () => {
		const instances = OverlayScrollbars(
			document.querySelectorAll(".l-sidescroll"),
			{ className: ".os-theme-thin-dark" }
		);
	});
};

export const initNavDrawer = () => {
	const debounceTime = 100;
	const hamburgerWrapper = document.querySelector(".hamburger");

	const navDrawer = document.querySelector(".sitenav");

	hamburgerWrapper.addEventListener("mouseup", (event) => {
		if (navDrawer.classList.contains("sitenav--active")) {
			setTimeout(() => {
				navDrawer.classList.remove("sitenav--active");
			}, debounceTime);
		} else {
			setTimeout(() => {
				navDrawer.classList.add("sitenav--active");
			}, debounceTime);
		}
	});
};

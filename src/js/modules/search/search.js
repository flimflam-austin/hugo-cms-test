import { SEARCH_CONFIG } from "./config";
import { asyncInitFuseSearch } from "./scripts/loadsearch";
import { unboundRenderResults } from "./scripts/render";

const ff = require("../helpers/ff");

/* Modal Actions */
/* const unboundCloseSearchModal = (searchModal) => () => {
	searchModal.classList.remove(SEARCH_CONFIG.modal.openClass);
	searchModal.setAttribute("aria-hidden", true);
}; */

const launchSearch = async (searchModal) => {
	//const fuse = await asyncInitFuseSearch();

	const contentWrapper = document.getElementById(
		SEARCH_CONFIG.results.wrapperId
	);

	const renderResults = unboundRenderResults(contentWrapper);

	const defaultContent = contentWrapper.innerHTML;

	asyncInitFuseSearch().then((fuse) => {
		const searchInput = document.getElementById(
			SEARCH_CONFIG.searchInput.id
		);

		searchInput.focus();

		searchInput.addEventListener("keyup", (_) => {
			const inputValue = searchInput.value;

			if (!inputValue) {
				contentWrapper.innerHTML = defaultContent;
			} else {
				const results = fuse.search(inputValue);
				renderResults(results);
			}
		});

		console.log(`fuse`);
		console.log(fuse);
	});
};

/* Big Loops */
export const initSearchBar = () => {
	const searchContainer = document.getElementById(SEARCH_CONFIG.container.id);
	if (!searchContainer) return null;

	launchSearch(searchContainer);

	/* const closeSearch = unboundCloseSearch(searchModal);
	const closeButton = document.getElementById(SEARCH_CONFIG.closeButton.id);
	closeButton.addEventListener("mouseup", closeSearch); */
};

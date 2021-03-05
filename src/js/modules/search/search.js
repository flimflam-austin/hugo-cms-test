import { SEARCH_CONFIG } from "./config";
import { asyncInitFuseSearch } from "./scripts/loadsearch";
import { unboundRenderResults } from "./scripts/render";

const ff = require("../helpers/ff");

/* Modal Actions */
const unboundCloseSearchModal = (searchModal) => () => {
	searchModal.classList.remove(SEARCH_CONFIG.modal.openClass);
	searchModal.setAttribute("aria-hidden", true);
};

const unboundLaunchSearchModal = (searchModal) => async () => {
	searchModal.classList.add(SEARCH_CONFIG.modal.openClass);
	searchModal.setAttribute("aria-hidden", false);

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
const launchSearch = (searchButton) => {
	const searchModal = document.getElementById(SEARCH_CONFIG.modal.id);
	if (!searchModal) return null;

	const launchSearchModal = unboundLaunchSearchModal(searchModal);
	searchButton.addEventListener("mouseup", launchSearchModal);

	const closeSearchModal = unboundCloseSearchModal(searchModal);
	const closeButton = document.getElementById(SEARCH_CONFIG.closeButton.id);
	closeButton.addEventListener("mouseup", closeSearchModal);
};

/* Export */
export const initSearchBar = () => {
	const { searchButtonClass } = SEARCH_CONFIG;

	const searchButtons = document.querySelectorAll(
		ff.addDot(searchButtonClass)
	);
	if (!searchButtons) return null;

	searchButtons.forEach(launchSearch);

	return;
};

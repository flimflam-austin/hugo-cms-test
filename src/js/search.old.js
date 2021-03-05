import Fuse from "fuse.js";

/* HELPERS */

const inspect = (value) => {
	console.group(`|-inspecting--------------`);
	console.log(value);
	console.log("\n");
	console.groupEnd();
	return value;
};

/* CONFIGS */

const CONFIG_SEARCH_OPTIONS = Object.freeze({
	includeScores: true,
	keys: [
		{
			name: "title",
			weight: 2,
		},
		"author.firstName",
	],
});

const loadSearchEngine = (jsonIndex, options) => new Fuse(jsonIndex, options);

const asyncResponseToJson = async (response) => {
	try {
		return response.json();
	} catch (err) {
		console.group(`Failed to convert response to JSON:`);
		console.error(err.message);
		console.endGroup();
		return null;
	}
};

const initFuseSearch = async () => {
	const indexPath = "/index.json";

	const response = await fetch(indexPath);
	const jsonIndex = await asyncResponseToJson(response);
	const searchEngine = loadSearchEngine(jsonIndex, CONFIG_SEARCH_OPTIONS);

	inspect(searchEngine.search("texas"));

	return searchEngine;
};

const buildResultsHtml = (results) => {
	const resultHtmlElements = results.reduce((accumulator, currentValue) => {
		const newResultElement = `
		<li class="searchbar__result">
			<a href="${currentValue.link}">
				<h1>${currentValue.title}</h1>
				<p>${currentValue.content}</p>
			</a>
		</li>`;

		return `${accumulator} ${newResultElement}`;
	}, "");

	return resultHtmlElements;
};

const addHighlightClass = (stringToWrap) =>
	`<span class="searchbar__highlighted">${stringToWrap}</span>`;

const highlightTerm = (termToHighlight, stringToHighlight) => {
	// https://bitsofco.de/a-one-line-solution-to-highlighting-search-matches/
	const termRegEx = new RegExp(termToHighlight, "gi"); // 'g' for global, 'i' for case-insensitive
	inspect(stringToHighlight);
	return stringToHighlight.replace(termRegEx, addHighlightClass);
};

const renderHtml = (parentElement, htmlString) => {
	parentElement.innerHTML = htmlString;
};

const revealDropdown = (dropdownElement) => {
	dropdownElement.setAttribute("aria-hidden", false);
	dropdownElement.classList.add("searchbar__dropdown--open");
};

const hideDropdown = (dropdownElement) => {
	dropdownElement.setAttribute("aria-hidden", true);
	dropdownElement.classList.remove("searchbar__dropdown--open");
};

const doSearch = () => {
	const searchBarContainer = document.getElementById(`js-searchbar`);
	if (!searchBarContainer) return null;

	const searchDropdownContainer = document.getElementById(
		"js-searchdropdown"
	);

	const searchResultsContainer = document.getElementById(`js-searchresults`);

	searchBarContainer.addEventListener(
		"mousedown",
		async () => {
			revealDropdown(searchDropdownContainer);

			const fuse = await initFuseSearch();

			const inputElement = document.getElementById("js-searchinput");
			inputElement.addEventListener("keyup", (_) => {
				const inputValue = inputElement.value;
				const results = fuse.search(inputValue);

				const outputData = [...Array(5)]
					.map((entry, index) => {
						if (!results[index]) return null;
						return Object({
							link: results[index].item.permalink,
							title: results[index].item.title,
							content: results[index].item.contents,
						});
					})
					.filter((entry) => !!entry);

				console.group("results:");
				console.log(outputData);
				console.groupEnd();

				const resultsHtml = buildResultsHtml(outputData);
				const highlitHtml = highlightTerm(inputValue, resultsHtml);
				renderHtml(searchResultsContainer, highlitHtml);
			});

			console.log(fuse.search("texas"));
		},
		{ once: false }
	);
};

export const initSearchBar = () => {
	doSearch();
};

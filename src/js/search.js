import Fuse from "fuse.js";

/* import Fuse from "fuse.js";

const indexedData = [
	{
		title: "",
		author: {
			firstName: "",
			lastName: "",
		},
	},
];

// weight defaults to 1
const options = {
	includeScores: true,
	keys: [
		{
			name: "title",
			weight: 2,
		},
		"author.firstName",
	],
};

const fuse = new Fuse(indexedData, options);

const inputPattern = "jon";

const result = fuse.search(inputPattern); */

/* Helpers */

const inspect = (value) => {
	console.group(`|-inspecting--------------`);
	console.log(value);
	console.log("\n");
	console.groupEnd();
	return value;
};

/* Main */

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
	const indexPath = "/search.json";

	const response = await fetch(indexPath);
	const jsonIndex = await asyncResponseToJson(response);
	const searchEngine = loadSearchEngine(jsonIndex, CONFIG_SEARCH_OPTIONS);

	inspect(searchEngine.search("texas"));

	return searchEngine;

	/* return await fetch(indexPath)
		.then((response) => {
			console.log(`Starting test.`);

			if (response.status !== 200) {
				throw new Error(
					`Response status wasn't 200: ${response.status}`
				);
			}

			return response;
		})
		.then((data) => {
			let jsonIndex;
			try {
				jsonIndex = data.json();
			} catch (err) {
				throw new Error(
					`Error converting fetched index into json. ${err}`
				);
			}

			return jsonIndex;
		})
		.then(inspect)
		.then((data) => {
			console.log(`Data passed: ${data[0]}`);
			const fuseSearch = loadSearch(data, CONFIG_SEARCH_OPTIONS);
			console.log(`Fuse search: ${fuseSearch}`);
			return fuseSearch;
		})
		.then(inspect)
		.catch((err) => {
			console.error(err.message);
			return null;
		}); */
};

const doSearch = () => {
	const searchBarContainer = document.getElementById(`fastSearch`);

	if (!searchBarContainer) return null;

	searchBarContainer.addEventListener(
		"mousedown",
		async () => {
			const fuse = await initFuseSearch();

			const inputElement = document.getElementById("searchInput");
			inputElement.addEventListener("keyup", (event) => {
				const inputValue = inputElement.value;
				const results = fuse.search(inputValue);
				console.group("results:");
				console.log(results[0].item.title);
				console.log(results[1].item.title);
				console.log(results[2].item.title);
				console.groupEnd();
			});

			console.log(fuse.search("texas"));
		},
		{ once: false }
	);
};

export const initSearchBar = () => {
	doSearch();
};

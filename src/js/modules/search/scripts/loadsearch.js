import Fuse from "fuse.js";
import { SEARCH_CONFIG } from "../config";
const ff = require("../../helpers/ff");

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

const asyncFetchIndex = async () => {
	const response = await fetch(SEARCH_CONFIG.index.path);
	const jsonIndex = await asyncResponseToJson(response);

	return jsonIndex;
};

const loadSearchEngine = (jsonIndex, options) => new Fuse(jsonIndex, options);

export const asyncInitFuseSearch = async () => {
	const searchIndexJson = await asyncFetchIndex();
	const searchEngine = loadSearchEngine(
		searchIndexJson,
		CONFIG_SEARCH_OPTIONS
	);

	ff.inspect(searchEngine.search("texas"));

	return searchEngine;
};

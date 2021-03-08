import { SEARCH_CONFIG } from "../config";
import { getResultHtml } from "./resultHtml";

const reduceToHtml = (accumulator, currentResult) =>
	`${accumulator} ${getResultHtml(currentResult)}`;

const hasItems = (arrayToCheck) => !!arrayToCheck[0];

const noResultsHtml = () =>
	`<span class="searchresult__no-result-text">Oops! We couldn't find any results. Maybe try: politics, texas, technology.</span>`;

const processIntoHtml = (results) =>
	hasItems(results) ? results.reduce(reduceToHtml, "") : noResultsHtml();

const getTopResults = (results) =>
	results.length > SEARCH_CONFIG.results.maxNumber
		? results.slice(0, SEARCH_CONFIG.results.maxNumber)
		: results;

const processTopResults = (results) => processIntoHtml(getTopResults(results));

export const unboundRenderResults = (contentWrapper) => (results) => {
	contentWrapper.innerHTML = `${results}`;
	const processedHtml = processTopResults(results);

	console.group(`----- processed -----`);
	console.log(processedHtml);
	console.groupEnd();

	contentWrapper.innerHTML = processedHtml;
};

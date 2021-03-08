import { truncateString } from "./../../truncate";

const buildBody = (result) => {
	const summary = result.item.summary
		? `<p class="searchresult__summary">${truncateString(
				result.item.summary,
				300,
				10
		  )}</p>`
		: "";
	const date = result.item.date
		? `<p class="searchresult__date">${result.item.date}</p>`
		: "";

	return `<div class="searchresult__description-items">${summary}${date}</div>`;
};

const buildHeader = (result) => {
	const title = result.item.title
		? `<h1 class="searchresult__title">${result.item.title}</h1>`
		: "";
	const contentType = result.item.section
		? `<p class="searchresult__contenttype">${result.item.section}</p>`
		: "";

	return `<header class="searchresult__header">${contentType}${title}</header>`;
};

const buildWrapper = (result) =>
	`<article class="searchresult">
		<a class="searchresult__link-wrapper" href="${result.item.permalink}">
		${buildHeader(result)}${buildBody(result)}
		</a>
	</article>`;

export const getResultHtml = (result) => {
	return buildWrapper(result);
};

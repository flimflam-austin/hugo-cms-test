const buildBody = (result) => {
	const summary = `<p>${result.item.summary || ""}</p>`;
	const date = `<p>${result.item.date || ""}</p>`;

	return `<div>${summary}${date}</div>`;
};

const buildHeader = (result) => {
	const title = `<h1>${result.item.title || ""}</h1>`;
	const contentType = `<p>${result.item.section || ""}</p>`;

	return `<header>${title}${contentType}</header>`;
};

const buildWrapper = (result) =>
	`<article><a href="${result.item.permalink}>${buildHeader(
		result
	)}${buildBody(result)}</a></article>`;

export const getResultHtml = (result) => {
	return buildWrapper(result);
};

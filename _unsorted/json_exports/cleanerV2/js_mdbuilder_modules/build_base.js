const urlize = require("urlize").urlize;
const toSentenceCase = require("to-sentence-case");

/*  */

const getPublishedDate = (jsonData) => jsonData.datePublished.trim();

const getModifiedDate = (jsonData) =>
	!!jsonData.dateModified ? jsonData.dateModified.trim() : null;

const getModifiedIfDifferent = (jsonData) =>
	getModifiedDate(jsonData) !== getPublishedDate(jsonData)
		? getModifiedDate(jsonData)
		: "";
/*  */

const padNumber = (number) =>
	number.toString().length < 2 ? `0${number}` : number;

const getDate = (jsonData) =>
	new Date(jsonData.dateModified || jsonData.datePublished);

const getFormattedDate = (jsonData) => {
	const date = getDate(jsonData);

	const year = date.getFullYear();
	const month = padNumber(date.getMonth());
	const day = padNumber(date.getDate());

	return `${year}${month}${day}`;
};

/*  */

const removeDomainFromUrl = (url) =>
	url
		.replace(`http://`, "")
		.replace(`https://`, "")
		.replace(`www.`, "")
		.replace(`smarthernews.com/`, "")
		.trim();

const cleanOldUrl = (jsonData) =>
	urlize(removeDomainFromUrl(jsonData.canonical));

const getFileName = (jsonData) =>
	`${getFormattedDate(jsonData)}-${cleanOldUrl(jsonData)}.md`;

/*  */

const getBody = (jsonData) => jsonData.body;

/*  */

const getAliasUrl = (jsonData) => removeDomainFromUrl(jsonData.canonical);

/*  */

const cleanTitle = (title) =>
	title.trim().toLowerCase().replace(`- smarther news`, "").trim();

const getTitle = (jsonData) => cleanTitle(jsonData.ogTitle);

/*  */

const getDescription = (jsonData) =>
	toSentenceCase(jsonData.ogDescription.trim());

/*  */

const getFrontmatter = (jsonData) =>
	Object.freeze({
		title: getTitle(jsonData),
		description: getDescription(jsonData),
		aliases: [getAliasUrl(jsonData)],
		published: true,
		date: getPublishedDate(jsonData),
		publishDate: getPublishedDate(jsonData),
		lastmod: getModifiedIfDifferent(jsonData),
		tags: [],
		post_author: [],
	});

const getCombinedFrontmatter = (jsonData, additionalFrontmatter) =>
	Object.freeze({ ...getFrontmatter(jsonData), ...additionalFrontmatter });

exports.buildData = (jsonData, additionalFrontmatter) => {
	const out = Object.freeze({
		fileName: getFileName(jsonData),
		frontmatter: getCombinedFrontmatter(jsonData, additionalFrontmatter),
		body: getBody(jsonData),
	});

	return out;
};

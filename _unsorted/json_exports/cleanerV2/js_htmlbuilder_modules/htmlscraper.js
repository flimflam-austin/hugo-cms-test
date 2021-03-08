const cardstackScraper = require("./sectionscraper_card");
const quickquotesScraper = require("./sectionscraper_quickquotes");
const fastfactsScraper = require("./sectionscraper_fastfacts");
const videosScraper = require("./sectionscraper_videos");

/*  */
const heavyTrim = (string) =>
	string
		.trim()
		.replace(`"`, "")
		.replace(`"`, "")
		.replace(`"`, "")
		.replace(`"`, "")
		.trim()
		.replace(`”`, "")
		.replace(`“`, "")
		.trim();
/*  */

const getModifiedDate = (dom) => {
	// Check Meta tags first
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="published_time"]`
	);
	if (fromMetaTag) return fromMetaTag.getAttribute("content");

	// Pull from SEO script as fall-back
	const regEx = /dateModified":"(.*?)"/g;
	const fromScriptScrape = dom.window.document
		.querySelector("html")
		.innerHTML.match(regEx);
	if (fromScriptScrape)
		return fromScriptScrape[0]
			.replace(`dateModified":"`, "")
			.replace(`"`, "");

	console.error("Failed to find modified date.");
	return "";
};

const getPublishedDate = (dom) => {
	// Check Meta tags first
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="published_time"]`
	);
	if (fromMetaTag) return fromMetaTag.getAttribute("content");

	// Pull from SEO script as fall-back
	const regEx = /datePublished":"(.*?)"/g;
	const fromScriptScrape = dom.window.document
		.querySelector("html")
		.innerHTML.match(regEx);
	if (fromScriptScrape)
		return fromScriptScrape[0]
			.replace(`datePublished":"`, "")
			.replace(`"`, "");

	throw new Error("Failed to find published date.");
};

const getSectionName = (dom) => {
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="article:section"]`
	);
	if (fromMetaTag) return fromMetaTag.getAttribute("content").toLowerCase();

	console.error("Failed to find article section.");
	return "";
};

const getCanonicalUrl = (dom) => {
	const fromMetatag = dom.window.document.querySelector(
		`link[rel="canonical"]`
	);
	if (fromMetatag) return fromMetatag.href;

	console.error("Failed to find canonical url.");
	return "";
};

const getOgImage = (dom) => {
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="og:image"]`
	);
	if (fromMetaTag) return fromMetaTag.getAttribute("content");

	//console.error("Failed to find og:image.");
	return "";
};

const getOgUrl = (dom) => {
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="og:url"]`
	);
	if (fromMetaTag) return fromMetaTag.getAttribute("content");

	console.error("Failed to find og:url.");
	return "";
};

const getOgTitle = (dom) => {
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="og:title"]`
	);
	if (fromMetaTag)
		return heavyTrim(fromMetaTag.getAttribute("content").toLowerCase());

	console.error("Failed to find og:title.");
	return "";
};

const getOgDescription = (dom) => {
	const fromMetaTag = dom.window.document.querySelector(
		`meta[property~="og:description"]`
	);
	if (fromMetaTag) {
		const content = fromMetaTag.getAttribute("content");
		return heavyTrim(content.toLowerCase());
	}

	console.error("Failed to find og:description.");
	return "";
};

const getContentTypeSpecificItems = (dom) => {
	const sectionName = getSectionName(dom).toLowerCase();

	const isCardStack = dom.window.document.querySelector(".card");
	if (isCardStack) {
		return cardstackScraper.getCardData(dom);
	}

	const isQuickquote = sectionName === "quick quotes";
	if (isQuickquote) {
		return quickquotesScraper.getQuickQuoteData(dom);
	}

	const isFastFact = sectionName === "fast facts";
	if (isFastFact) {
		return fastfactsScraper.getFastFactData(dom);
	}

	const isVideoPost =
		sectionName === "spotlight" || sectionName === "coffee talk";
	if (isVideoPost) {
		return videosScraper.getVideoData(dom);
	}

	console.log("Failed to identify content section.");
	return null;
};

const buildScrapeData = (dom) => {
	const contentSpecificItems = getContentTypeSpecificItems(dom);
	if (!contentSpecificItems) return null;

	return Object.freeze({
		canonical: getCanonicalUrl(dom),
		ogUrl: getOgUrl(dom),
		ogTitle: getOgTitle(dom),
		ogDescription: getOgDescription(dom),
		ogImage: getOgImage(dom),
		datePublished: getPublishedDate(dom),
		dateModified: getModifiedDate(dom),
		articleSection: getSectionName(dom),
		...contentSpecificItems,
	});
};
exports.scrapeHtmlToJson = (dom) => buildScrapeData(dom);

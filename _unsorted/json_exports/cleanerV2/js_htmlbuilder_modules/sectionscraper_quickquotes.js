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

const getTitle = (dom) =>
	dom.window.document
		.querySelector(".article-content")
		.querySelector("h1")
		.textContent.trim();
/* 
const trimStartQuote = (string) =>
	string[0] === `"` ? string.substring(1) : string;

const trimEndQuote = (string) =>
	string[string.length - 1] === `"` ? string.slice(0, -1) : string; */

const getTrimmedTitle = (dom) => heavyTrim(getTitle(dom));

const getSummary = (dom) =>
	dom.window.document.querySelector(".post-excerpt").textContent.trim();

const getBody = (dom) =>
	dom.window.document.querySelector(".article-post").innerHTML.trim();

const getFeaturedImage = (dom) => {
	const featuredImage = dom.window.document
		.querySelector(".featured-image")
		.querySelector("img");
	if (featuredImage) {
		return Object.freeze({
			imageUrl: featuredImage.src,
			alt: featuredImage.alt,
		});
	} else {
		return {};
	}
};

exports.getQuickQuoteData = (dom) =>
	Object.freeze({
		quote: getTrimmedTitle(dom),
		summary: getSummary(dom),
		featured_image: getFeaturedImage(dom),
		body: getBody(dom),
		contentType: "quickquotes",
	});

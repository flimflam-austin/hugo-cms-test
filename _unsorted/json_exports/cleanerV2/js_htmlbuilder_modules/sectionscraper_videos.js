const getBody = require("./getEmbedIds").getBody;

const getTitle = (dom) =>
	dom.window.document.querySelector(".article-content").querySelector("h1")
		.innerContent;

const getSummary = (dom) =>
	dom.window.document.querySelector(".post-excerpt").textContent.trim();

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

exports.getVideoData = (dom) =>
	Object.freeze({
		heading: getTitle(dom),
		summary: getSummary(dom),
		featured_image: getFeaturedImage(dom),
		body: getBody(dom),
		contentType: "videoposts",
	});

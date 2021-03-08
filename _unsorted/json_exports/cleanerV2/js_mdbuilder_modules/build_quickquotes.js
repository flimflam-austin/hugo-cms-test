const baseBuilder = require("./build_base");

const getQuote = (jsonData) => jsonData.quote;

const getSummary = (jsonData) => jsonData.summary;

const getImageUrl = (jsonData) => jsonData.featured_image.imageUrl;

const getImageAlt = (jsonData) => jsonData.featured_image.alt;

const getImageObject = (jsonData) =>
	Object.freeze({
		image: getImageUrl(jsonData) || "",
		alt: getImageAlt(jsonData) || "",
	});

const getQuickreadsFrontmatter = (jsonData) =>
	Object.freeze({
		section: "quickquotes",
		is_breaking: false,
		featured_image: getImageObject(jsonData),
		featured_quote: {
			quote: getQuote(jsonData),
			summary: getSummary(jsonData),
			citation: "",
		},
	});

exports.process = (jsonData) =>
	baseBuilder.buildData(jsonData, getQuickreadsFrontmatter(jsonData));

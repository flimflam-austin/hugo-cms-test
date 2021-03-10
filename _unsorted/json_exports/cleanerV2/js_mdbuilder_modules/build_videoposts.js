const baseBuilder = require("./build_base");

const getQuote = (jsonData) => jsonData.quote;

const getSummary = (jsonData) => jsonData.summary;

const getImageUrl = (jsonData) => jsonData.featured_image.imageUrl;

const getImageAlt = (jsonData) => jsonData.featured_image.alt;

const getCategory = (jsonData) => jsonData.articleSection || "";

const getImageObject = (jsonData) =>
	Object.freeze({
		image: getImageUrl(jsonData) || "",
		alt: getImageAlt(jsonData) || "",
	});

const getQuickreadsFrontmatter = (jsonData) =>
	Object.freeze({
		section: "videoposts",
		video_series: getCategory(jsonData),
		is_breaking_slider: false,
		is_breaking_dropdown: false,
		featured_image: getImageObject(jsonData),
		summary: getSummary(jsonData),
	});

exports.process = (jsonData) =>
	baseBuilder.buildData(jsonData, getQuickreadsFrontmatter(jsonData));

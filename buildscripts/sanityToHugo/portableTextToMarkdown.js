const toMarkdown = require("@sanity/block-content-to-markdown");
const getYouTubeId = require("get-youtube-id");
const ff = require("./ffhelpers");

const serializers = {
	types: {
		youtube: (node) => `{{< youtube id="${getYouTubeId(node.url)}" >}}`,
	},
};

const portableTextToMarkdown = (portableText) => {
	if (!portableText) {
		console.log("Could not parse portable text, value is falsey.");
		return null;
	}

	const translatedText = toMarkdown(portableText, { serializers });

	return ff.isValue(translatedText) ? translatedText : " ";
};

module.exports = portableTextToMarkdown;

const baseBuilder = require("./build_base");

const getCardData = (jsonData) => {
	let cards = {};
	let i = 1;

	while (i <= 10) {
		const cardName = `card_${i}`;
		if (cardName in jsonData) {
			cards[cardName] = {
				card_text: jsonData[cardName].cardText || "",
				card_citation: jsonData[cardName].card_citation || "",
			};
		}

		i += 1;
	}

	return cards;
};

const getQuickreadsFrontmatter = (jsonData) =>
	Object.freeze({
		section: "quickreads",
		card_series: jsonData.category,
		color_palette_classname: jsonData.colorClass,
		background_image: jsonData.background_image,
		...getCardData(jsonData),
	});

exports.process = (jsonData) =>
	baseBuilder.buildData(jsonData, getQuickreadsFrontmatter(jsonData));

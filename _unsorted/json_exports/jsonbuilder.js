const fs = require("fs");
const jsdom = require("jsdom");
const TurndownService = require("turndown");
const yaml = require("js-yaml");
const turndown = new TurndownService();

const getCardTemplate = () =>
	Object({
		frontMatter: [
			{ title: "" },
			{ tags: [] },
			{
				meta: {
					date_published: "",
					date_modified: "",
					card_category: "",
				},
			},
			{ color_palette_classname: "" },
			{
				background_image: {
					alt: "",
					attribution: "",
					image: "",
				},
			},
			{
				card_1: {
					card_text: "",
					card_citation: "",
				},
			},
			{
				card_2: {
					card_text: "",
					card_citation: "",
				},
			},
		],
		body: "",
		path: "",
		filename: "",
	});

const CONFIG = Object({
	cardClass: "card",
	cardContentTag: "article",
	sourcesClass: "sources",
	checkmarkClass: "checkmark",
});

exports.processCardsToJSON = (dom, filename) => {
	let cardTemplate = {};
	const cards = dom.window.document.querySelectorAll(`.${CONFIG.cardClass}`);
	if (cards[0]) {
		cards.forEach((card, index) => {
			const maybeCheckmark = card.querySelector(
				`.${CONFIG.checkmarkClass}`
			);
			if (maybeCheckmark) {
				maybeCheckmark.parentElement.removeChild(maybeCheckmark);
			}

			const isLast =
				cards.length > 1 && index === cards.length - 1 ? true : false;

			const cardNumber = isLast ? 10 : index + 1;

			const cardContent = card.querySelector(`article`);
			if (cardContent) {
				const footNote = cardContent.querySelector(".sticky");

				if (footNote) {
					const cardCitation = footNote.innerHTML;

					cardTemplate[`card_${cardNumber}`] = {
						card_citation: cardCitation,
					};

					cardContent.removeChild(footNote);
				}

				const cardText = cardContent.innerHTML;

				cardTemplate[`card_${cardNumber}`] = {
					card_text: turndown.turndown(cardText),
				};
			}
		});

		console.log(cards[0]);
		const cardColor = [...cards[0].classList].filter((className) =>
			className.startsWith("card-color")
		);

		cardTemplate.color_palette_classname = cardColor[0].replace(
			"card-color-",
			""
		);

		const cardCategory = dom.window.document.querySelector(".card-header");
		cardTemplate.meta = {};
		cardTemplate.meta.card_category =
			cardCategory.textContent || cardCategory.innerText;

		const maybeDate = dom.window.document.querySelector(
			"meta[property='article:published_time']"
		);
		if (maybeDate) {
			cardTemplate.meta.date_published = maybeDate.getAttribute(
				"content"
			);
		}

		const maybeImage = dom.window.document.querySelector(
			".card-inner-overlay"
		);
		if (maybeImage) {
			try {
				const imgUrl = maybeImage.style.backgroundImage || "";
				cardTemplate.background_image.image = imgUrl;
			} catch (error) {
				console.error(error);
			}
		}

		const pageTitle = dom.window.document.querySelector("title").innerHTML;
		cardTemplate.title = pageTitle;

		const preparedJson = cardTemplate;

		const sources = dom.window.document.querySelector(".sources")
			? dom.window.document.querySelector(".sources").innerHTML
			: "";

		const outputContent =
			"---\n" +
			yaml.dump(yaml.load(JSON.stringify(preparedJson))) +
			"---\n" +
			turndown.turndown(sources);

		return outputContent;
	} else {
		console.log("skipping: no cards present.");
		return null;
	}
};

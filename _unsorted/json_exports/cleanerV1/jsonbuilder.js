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
		/* Card Title */
		const pageTitle = dom.window.document.querySelector("title").innerHTML;
		cardTemplate.title = pageTitle;

		/* Card Section */
		cardTemplate.section = "quickreads";

		/* start meta */
		cardTemplate.meta = {};

		/* Card Date */
		const maybeDate = dom.window.document.querySelector(
			"meta[property='article:published_time']"
		);
		if (maybeDate) {
			cardTemplate.meta.date_published = maybeDate.getAttribute(
				"content"
			);
		}

		/* Card Category */
		const cardCategory = dom.window.document.querySelector(".card-header");

		cardTemplate.meta.card_category =
			cardCategory.textContent || cardCategory.innerText;

		/* Card Color */
		const cardColor = [...cards[0].classList].filter((className) =>
			className.startsWith("card-color")
		);
		if (cardColor) {
			cardTemplate.color_palette_classname = cardColor[0]
				.replace("card-color-", "")
				.replace("grey", "gray");
		} else {
			cardTemplate.color_palette_classname = "light-blue";
		}

		/* Card Image */
		cardTemplate.background_image = {};
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

		/* Card Content */
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

		const preparedJson = cardTemplate;
		/* ========= finish front matter ========= */

		/* page content */
		const sources = dom.window.document.querySelector(".sources")
			? dom.window.document.querySelector(".sources").innerHTML
			: "";

		/* ========= output ========= */
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

const TurndownService = require("turndown");
const turndown = new TurndownService();

const getCheckmark = (cardElement) => cardElement.querySelector(`.checkmark`);

const trimCheckmark = (cardElement) => {
	const checkmark = getCheckmark(cardElement);

	if (checkmark) {
		checkmark.parentElement.removeChild(checkmark);
	}

	return cardElement;
};

const getCardContent = (cardElement, cardIndex) => {
	let cardData = {};

	trimCheckmark(cardElement);

	const cardContent = cardElement.querySelector(`article`);
	if (cardContent) {
		cardData.cardText = turndown.turndown(cardContent.innerHTML.trim());

		const footNote = cardContent.querySelector(".sticky");
		if (footNote) {
			const cardCitation = footNote.innerHTML.trim();
			cardData.card_citation = cardCitation;

			cardContent.removeChild(footNote);
		}
	}

	return cardData;
};

const getCardElements = (dom) => dom.window.document.querySelectorAll(`.card`);

const combineCards = (accumulator, currentCard, currentIndex, array) => {
	const cardNumber = currentIndex < array.length - 1 ? currentIndex + 1 : 10;
	const cardName = `card_${cardNumber}`;

	accumulator[cardName] = currentCard;
	return accumulator;
};

const getCards = (dom) =>
	[...getCardElements(dom)].map(getCardContent).reduce(combineCards, {});

const removeSourcesHeading = (sources) =>
	sources.replace("<h1>Sources</h1>", "");

const getSources = (dom) => dom.window.document.querySelector(".sources");

const getCardSources = (dom) =>
	getSources(dom)
		? removeSourcesHeading(getSources(dom).innerHTML.trim())
		: "";

const getCardBgImage = (dom) => {
	const maybeImage = dom.window.document.querySelector(".card-inner-overlay");
	if (maybeImage)
		return maybeImage.style.backgroundImage
			.replace("url(", "")
			.replace(")", "")
			.trim();

	//console.error("Failed to find bg image.");
	return "";
};

const getCardColor = (dom) => {
	const colorClassName = [
		...dom.window.document.querySelector(".card").classList,
	].filter((classname) => classname.startsWith("card-color"))[0];
	if (colorClassName) {
		const normalizedColorClassName = colorClassName
			.replace("card-color-", "")
			.replace("grey", "gray");
		return normalizedColorClassName.trim();
	}

	console.error("Failed to find card color.");
	const fallbackColorClass = "light-blue";
	return fallbackColorClass;
};

const getCardCategory = (dom) =>
	dom.window.document
		.querySelector(".card-header")
		.textContent.toLowerCase()
		.trim();

exports.getCardData = (dom) =>
	Object.freeze({
		contentType: "quickreads",
		category: getCardCategory(dom),
		colorClass: getCardColor(dom),
		background_image: getCardBgImage(dom),
		...getCards(dom),
		body: getCardSources(dom),
	});

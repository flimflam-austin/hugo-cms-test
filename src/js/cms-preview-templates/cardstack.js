import React from "react";
import remark from "remark";
import remarkHTML from "remark-html";
import parse from "html-react-parser";

const toHTML = (value) =>
	parse(remark().use(remarkHTML).processSync(value).toString());

const createCard = (props, cardIndex) => {
	const cardNumber = cardIndex++;

	const htmlContent = toHTML(
		props.entry.getIn(["data", `card_${cardNumber}`, "card_text"])
	);
	const checkmarkContent =
		cardNumber === "10" ? `<div class="stackcard__checkmark"></div>` : "";

	const needsImage = cardNumber === 1 ? true : false;
	const hasImage = needsImage
		? props.getAsset(
				props.entry.getIn(["data", "background_image", "image"])
		  )
		: false;
	const imageContent = !!hasImage
		? parse(`<img class="stackcard__bgimage" src="${hasImage}" alt="" />`)
		: false;

	return (
		<div class="stackcard">
			<div class="stackcard__frame">
				<div class="stackcard__body">
					{imageContent}
					<div class="stackcard__borderwrapper">
						<div class="stackcard__borderelements">
							<span class="stackcard__borderpiece"></span>
							<h3 class="stackcard__category">
								{props.entry.getIn([
									"data",
									"meta",
									"card_category",
								])}
							</h3>
							<span class="stackcard__borderpiece"></span>
						</div>

						<div class="stackcard__content">
							{checkmarkContent}
							<div class="stackcard__text">{htmlContent}</div>
							<p class="stackcard__citation">
								{props.entry.getIn([
									"data",
									`card_${cardNumber}`,
									"card_citation",
								])}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div
				class="stackcard__frame stackcard__frame--lower"
				aria-hidden="true"
			>
				<div class="stackcard__body stackcard__body--lower">
					{imageContent}
					<div class="stackcard__borderwrapper">
						<div class="stackcard__borderelements stackcard__borderelements--lower">
							<span class="stackcard__borderpiece"></span>
							<div class="stackcard__logo"></div>
							<span class="stackcard__borderpiece"></span>
						</div>

						<div class="stackcard__content">
							{checkmarkContent}
							<div class="stackcard__text">{htmlContent}</div>
							<p class="stackcard__citation">
								{props.entry.getIn([
									"data",
									`card_${cardNumber}`,
									"card_citation",
								])}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default class CardPreview extends React.Component {
	render() {
		const entry = this.props.entry;
		const getAsset = this.props.getAsset;
		const widgetFor = this.props.widgetFor;

		let colorClass = `cardstack cardstack--spread cardstack--${entry.getIn([
			"data",
			"color_palette_classname",
		])}`;

		/* let image = getAsset(
			entry.getIn(["data", "background_image", "image"])
		); */

		console.log("running card render.");

		const asMarkdown = entry.getIn(["data", "card_01", "card_text"]);
		const asHTML = toHTML(asMarkdown);

		return (
			<div>
				<main class="l-grid-container l-grid-container--navoffset cardtest-main">
					<article class={colorClass}>
						<section class="cardstack__cards">
							{createCard(this.props, 0)}
							{createCard(this.props, 1)}
							{createCard(this.props, 2)}
							{createCard(this.props, 3)}
							{createCard(this.props, 4)}
							{createCard(this.props, 5)}
							{createCard(this.props, 6)}
							{createCard(this.props, 7)}
							{createCard(this.props, 8)}
							{createCard(this.props, 9)}
						</section>
						<section class="cardstack__details">
							<p class="cardstack__date"></p>
							<a class="cardstack__link" href="/">
								sources
							</a>
						</section>
					</article>
				</main>
			</div>
		);
	}
}

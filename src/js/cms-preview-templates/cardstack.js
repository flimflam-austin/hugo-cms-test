import React from "react";
import remark from "remark";
import remarkHTML from "remark-html";
import parse from "html-react-parser";

const toHTML = (value) =>
	parse(remark().use(remarkHTML).processSync(value).toString());

const createCard = (props, cardNumber) => {
	const htmlContent = toHTML(
		props.entry.getIn(["data", `card_${cardNumber}`, "card_text"])
	);
	const checkmarkContent =
		cardNumber === 10 ? parse(`<div class="stackcard__checkmark"></div>`) : "";

	const needsImage = cardNumber === 1 ? true : false;
	const hasImage = needsImage
		? props.getAsset(props.entry.getIn(["data", "background_image"]))
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
								{props.entry.getIn(["data", "card_series"])}
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
			<div class="stackcard__frame stackcard__frame--lower" aria-hidden="true">
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

const createCardWrapper = (props, cardComponent) => {
	let colorClass = `cardstack cardstack--spread cardstack--${props.entry.getIn([
		"data",
		"color_palette_classname",
	])}`;

	return (
		<div>
			<main class="l-page__container l-page__container--navoffset cardtest-main">
				<article class="post">
					<section class="page-content page-content--card">
						<article class={colorClass}>
							<section class="cardstack__cards">
								{cardComponent(props, 1)}
								{cardComponent(props, 2)}
								{cardComponent(props, 3)}
								{cardComponent(props, 4)}
								{cardComponent(props, 5)}
								{cardComponent(props, 6)}
								{cardComponent(props, 7)}
								{cardComponent(props, 8)}
								{cardComponent(props, 9)}
								{cardComponent(props, 10)}
							</section>
							<section class="cardstack__details">
								<p class="cardstack__date"></p>
								<a class="cardstack__link" href="/">
									sources
								</a>
							</section>
						</article>
					</section>
					<section class="page-content">
						<header class="headrule headrule--sticky">
							<h2 class="headrule__title">Sources</h2>
						</header>
						<div class="page-content__body page-content__body--pad-top">
							{props.entry.getIn(["data", `body`])}
						</div>
					</section>
				</article>
			</main>
		</div>
	);
};

export default class CardPreview extends React.Component {
	render() {
		return createCardWrapper(this.props, createCard);
	}
}

import React from "react";

export default class CardPreview extends React.Component {
	render() {
		const entry = this.props.entry;
		const getAsset = this.props.getAsset;
		const widgetFor = this.props.widgetFor;

		let colorClass = `cardstack cardstack--${entry.getIn([
			"data",
			"color_palette_classname",
		])}`;

		let image = getAsset(
			entry.getIn(["data", "background_image", "image"])
		);

		// Bit of a nasty hack to make relative paths work as expected as a background image here
		if (image && !image.fileObj) {
			image =
				window.parent.location.protocol +
				"//" +
				window.parent.location.host +
				image;
		}

		/* const renderBgImage = ({ props }) => {
			try {
				let imageGet = props.entry.getIn([
					"data",
					"background_image",
					"bg_image",
				]);

				let bgImage = imageGet ? props.getAsset(imageGet) : null;

				if (bgImage) {
					return (
						<img
							class="stackcard__bgimage"
							src={bgImage}
							alt={props.entry.getIn([
								"data",
								"background_image",
								"alt",
							])}
						/>
					);
				} else {
					return null;
				}
			} catch (error) {
				return null;
			}
		}; */

		return (
			<div>
				<main class="l-grid-container l-grid-container--navoffset cardtest-main">
					<article /*class={colorClass}*/>
						<section class="cardstack__cards">
							<div class="stackcard">
								<div class="stackcard__frame">
									<div class="stackcard__body">
										<img
											class="stackcard__bgimage"
											src={image}
											alt={entry.getIn([
												"data",
												"background_image",
												"alt",
											])}
										/>
										<div class="stackcard__borderwrapper">
											<div class="stackcard__borderelements">
												<span class="stackcard__borderpiece"></span>
												<h3 class="stackcard__category">
													{entry.getIn([
														"data",
														"meta",
														"card_category",
													])}
												</h3>
												<span class="stackcard__borderpiece"></span>
											</div>

											<div class="stackcard__content">
												<div class="stackcard__text">
													{entry.getIn([
														"data",
														"card_01",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_01",
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
										<img
											class="stackcard__bgimage"
											src={image}
											alt={entry.getIn([
												"data",
												"background_image",
												"alt",
											])}
										/>
										<div class="stackcard__borderwrapper">
											<div class="stackcard__borderelements stackcard__borderelements--lower">
												<span class="stackcard__borderpiece"></span>
												<div class="stackcard__logo"></div>
												<span class="stackcard__borderpiece"></span>
											</div>

											<div class="stackcard__content">
												<div class="stackcard__text">
													{entry.getIn([
														"data",
														"card_01",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_01",
														"card_citation",
													])}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="stackcard">
								<div class="stackcard__frame">
									<div class="stackcard__body">
										<div class="stackcard__borderwrapper">
											<div class="stackcard__borderelements">
												<span class="stackcard__borderpiece"></span>
												<h3 class="stackcard__category">
													{entry.getIn([
														"data",
														"meta",
														"card_category",
													])}
												</h3>
												<span class="stackcard__borderpiece"></span>
											</div>

											<div class="stackcard__content">
												<div class="stackcard__text">
													{entry.getIn([
														"data",
														"card_02",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_02",
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
										<div class="stackcard__borderwrapper">
											<div class="stackcard__borderelements stackcard__borderelements--lower">
												<span class="stackcard__borderpiece"></span>
												<div class="stackcard__logo"></div>
												<span class="stackcard__borderpiece"></span>
											</div>

											<div class="stackcard__content">
												<div class="stackcard__text">
													{entry.getIn([
														"data",
														"card_02",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_02",
														"card_citation",
													])}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
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

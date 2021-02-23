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

		console.log("running card render.");

		return (
			<div>
				<main class="l-grid-container l-grid-container--navoffset cardtest-main">
					<article class={colorClass}>
						<section class="cardstack__cards">
							<div class="stackcard">
								<div class="stackcard__frame">
									<div class="stackcard__body">
										{image && (
											<img
												class="stackcard__bgimage"
												src={image}
												alt={entry.getIn([
													"data",
													"background_image",
													"alt",
												])}
											/>
										)}

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
										{image && (
											<img
												class="stackcard__bgimage"
												src={image}
												alt={entry.getIn([
													"data",
													"background_image",
													"alt",
												])}
											/>
										)}
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
														"card_03",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_03",
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
														"card_03",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_03",
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
														"card_04",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_04",
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
														"card_04",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_04",
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
														"card_05",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_05",
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
														"card_05",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_05",
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
														"card_06",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_06",
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
														"card_06",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_06",
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
														"card_07",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_07",
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
														"card_07",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_07",
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
														"card_08",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_08",
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
														"card_08",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_08",
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
														"card_09",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_09",
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
														"card_09",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_09",
														"card_citation",
													])}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="stackcard">
								<div class="stackcard__frame stackcard__frame--upper">
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
												<div class="stackcard__checkmark"></div>

												<div class="stackcard__text">
													{entry.getIn([
														"data",
														"card_10",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_10",
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
												<div class="stackcard__checkmark"></div>

												<div class="stackcard__text">
													{entry.getIn([
														"data",
														"card_10",
														"card_text",
													])}
												</div>
												<p class="stackcard__citation">
													{entry.getIn([
														"data",
														"card_10",
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

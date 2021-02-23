const cardFlip = () => {
	const flipDuration = 750;
	const cardStackClass = "cardstack";
	const cardClass = "stackcard";
	const frameClass = "stackcard__frame";
	//
	const clickedClass = `${cardClass}--clicked`;
	const activatedClass = `${cardClass}--activated`;
	const hiddenClass = `${cardClass}--hidden`;
	//
	const cardStacks = document.querySelectorAll(`.${cardStackClass}`);

	cardStacks.forEach((cardStack) => {
		const cards = cardStack.querySelectorAll(`.${cardClass}`);
		if (!cards) return undefined;

		cardStack.addEventListener("mouseup", (event) => {
			if (event.target.classList.contains(frameClass)) {
				if (event.target.classList.contains(`${frameClass}--lower`)) {
					const currentCard = event.target.parentNode;
					const nextCard = currentCard.nextElementSibling;
					/* const quantityCards =
                        currentCard.parentNode.children.length; */
					if (
						nextCard != null &&
						window.getComputedStyle(nextCard).display != "none"
					) {
						currentCard.classList.add(clickedClass);
						nextCard.classList.add(activatedClass);

						setTimeout(() => {
							currentCard.classList.add(hiddenClass);
							currentCard.classList.remove(activatedClass);
							currentCard.classList.remove(clickedClass);
							nextCard.classList.remove(activatedClass);
							nextCard.classList.remove(clickedClass);
							return currentCard;
						}, flipDuration);
					}
				} else if (
					event.target.classList.contains(`${frameClass}--upper`)
				) {
					const currentCard = event.target.parentNode;
					const nextCard = currentCard.previousElementSibling;

					if (nextCard != null) {
						console.log("upper click class swap.");
						currentCard.classList.add(`${clickedClass}--previous`);
						nextCard.classList.add(`${activatedClass}--previous`);
						nextCard.classList.remove(hiddenClass);

						setTimeout(() => {
							currentCard.classList.remove(
								`${activatedClass}--previous`
							);
							currentCard.classList.remove(
								`${clickedClass}--previous`
							);
							nextCard.classList.remove(`${activatedClass}`);
							nextCard.classList.remove(`${clickedClass}`);
							return currentCard;
						}, flipDuration);
					}
				} else {
					return false;
				}
			}
		});
	});
};

export const initCardFlip = () => {
	document.addEventListener("DOMContentLoaded", () => {
		cardFlip();
	});
};

import { truncateString } from "./truncate";
import {
	setLsWithExpiry,
	getLsWithExpiry,
	hasLocalStorageValue,
} from "./lsFunctions";

const DROPDOWN_CONFIG = Object.freeze({
	lsKey: "breakingViewed",
	dropdownId: "js-breaking-dropdown",
	closeButtonClass: "js-breaking-dropdown-close",
	dropdownOpenClass: "breakingheader--open",
	bodyHasDropdownClass: "l-body--has-breaking-dropdown",
	messageClass: "breakingheader__message",
	localStorageLifetimeInHours: 0.01,
});

const revealBreakingDropdown = (breakingDropdown) => {
	const { dropdownOpenClass, bodyHasDropdownClass } = DROPDOWN_CONFIG;

	breakingDropdown.classList.add(dropdownOpenClass);
	breakingDropdown.setAttribute("aria-hidden", false);

	document.querySelector(`body`).classList.add(bodyHasDropdownClass);
};

const hideBreakingDropdown = (breakingDropdown) => {
	const { dropdownOpenClass, bodyHasDropdownClass } = DROPDOWN_CONFIG;

	breakingDropdown.classList.remove(dropdownOpenClass);
	breakingDropdown.setAttribute("aria-hidden", true);

	document.querySelector(`body`).classList.remove(bodyHasDropdownClass);
};

export const initBreakingDropdown = () => {
	const {
		dropdownId,
		closeButtonClass,
		messageClass,
		lsKey,
		localStorageLifetimeInHours,
	} = DROPDOWN_CONFIG;

	console.log(`destructured: ${dropdownId}`);
	console.log(`checked: ${getLsWithExpiry(DROPDOWN_CONFIG.lsKey)}`);

	const breakingDropdown = document.getElementById(dropdownId);
	if (!breakingDropdown) {
		console.log(`Could not find dropdown element.`);
		return;
	}

	const closeButton = breakingDropdown.querySelector(`.${closeButtonClass}`);
	if (!closeButton) {
		console.error(`Could not find close button for breaking dropdown.`);
		return;
	}

	const lsValue = breakingDropdown.querySelector(`.${messageClass}`)
		.textContent;
	if (!lsValue) {
		console.error(`Breaking dropdown has no message to display.`);
		return;
	}

	const shouldShowDropdown = !hasLocalStorageValue(lsKey, lsValue);

	if (shouldShowDropdown) {
		revealBreakingDropdown(breakingDropdown);

		closeButton.addEventListener("mouseup", (_) => {
			hideBreakingDropdown(breakingDropdown);
			setLsWithExpiry(lsKey, lsValue, localStorageLifetimeInHours);
		});
	} else {
		return;
	}
};

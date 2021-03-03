/* 

Functions for manipulating local storage

*/

/* 
Helper Funcations
*/

const reduceStringToSum = (accumulator, currentValue) => {
	try {
		const convertedChar = currentValue.charCodeAt(0);
		accumulator += !!convertedChar ? convertedChar : 0;
		return accumulator;
	} catch (error) {
		console.error(error);
		return accumulator;
	}
};

const abstractStringToNumber = (inputString) =>
	inputString.split("").reduce(reduceStringToSum, 0);

const hoursToMilliseconds = (hours) => hours * 3600000;

/* 
Export Functions
*/

/**
 * Sets a local storage variable with an expiration date value
 * @param {string} key - local storage key
 * @param {*} value - value to be stored
 * @param {number} ttlInHours - hours until value should expire
 * @return {} void
 */
export const setLsWithExpiry = (key, value, ttlInHours) => {
	const now = new Date();
	const expirationTime = now.getTime() + hoursToMilliseconds(ttlInHours);

	const abstractedValue = abstractStringToNumber(value);

	const item = {
		value: abstractedValue,
		expiry: expirationTime,
	};

	localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Looks up a value while respecting a set expiration date
 * @param {string} key - local storage key
 * @return {*} - returns value if present or hasn't expired. Otherwise returns null.
 */
export const getLsWithExpiry = (key) => {
	const itemString = localStorage.getItem(key);
	console.log(`item string: ${itemString}`);
	if (!itemString) return null;

	const { value, expiry } = JSON.parse(itemString);
	const now = new Date();

	if (now.getTime() > expiry) {
		localStorage.removeItem(key);
		return null;
	} else {
		return value;
	}
};

/**
 * Informs if a value can be found for a key, respecting its expiration date.
 * @param {string} key
 * @param {*} valueToMatch
 * @return {boolean}
 */
export const hasLocalStorageValue = (key, valueToMatch) =>
	getLsWithExpiry(key) === abstractStringToNumber(valueToMatch);

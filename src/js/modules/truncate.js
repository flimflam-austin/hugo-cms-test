const isString = (maybeString) =>
	typeof maybeString === "string" &&
	Object.prototype.toString.call(maybeString) === "[object String]";

const appendEllipsis = (inputString) => `${inputString} ...`;

const clipStringToIndex = (inputString, cutIndex) =>
	inputString.substring(0, cutIndex);

const clipAndAppendEllipsis = (inputString, cutIndex) =>
	appendEllipsis(clipStringToIndex(inputString, cutIndex));

const cutToNearestSpace = (stringInput, maxClippedChars) => {
	const lastStringIndex = stringInput.length - 1;

	if (stringInput[lastStringIndex] === " ")
		return stringInput[lastStringIndex - 1];

	for (let currentIndex = lastStringIndex; currentIndex > 0; currentIndex--) {
		const numsClipped = lastStringIndex - currentIndex;

		if (numsClipped > maxClippedChars) return appendEllipsis(stringInput);

		if (stringInput[currentIndex] === " ") {
			return clipAndAppendEllipsis(stringInput, currentIndex);
		}

		numsClipped++;
	}

	console.error(`Failed to process input: ${stringInput}`);
	return stringInput;
};

export const truncateString = (inputString, maxLength, maxClippedChars) => {
	if (!isString(inputString)) {
		console.error(`Value cannot be truncated: is not a string.`);
		return null;
	}

	if (inputString.length <= maxLength) return inputString;

	const roughTruncatedString = inputString.substring(0, maxLength - 1);
	const finalTruncatedString = cutToNearestSpace(
		roughTruncatedString,
		maxClippedChars
	);

	return finalTruncatedString;
};

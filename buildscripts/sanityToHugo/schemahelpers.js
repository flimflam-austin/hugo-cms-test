const ff = require("./ffhelpers");

const getFlatPair = (
	key,
	value,
	fallback = null,
	valueTransformer = ff.identity
) => {
	if (ff.isMissingValue(key)) {
		console.error(`Failed to get key for the pair '${key} : ${value}.`);
		return null;
	}

	if (ff.isMissingValue(value) && ff.isMissingValue(fallback)) {
		console.log(`No value or fallback found for the key: ${key}`);
		return null;
	}

	const valueToUse = ff.isValue(value) ? value : fallback;

	const transformedValue = valueTransformer(valueToUse);

	// already validated one must exist
	return ff.isValue(transformedValue) ? { [key]: transformedValue } : null;
};

const getArrayPair = (key, arrayValue) => {
	if (ff.isMissingValue(key)) {
		console.error(
			`Failed to get key for the pair '${key} : ${arrayValue}. Returning null.`
		);
		return null;
	}

	if (ff.notArray(arrayValue)) {
		console.log(`Value '${arrayValue}' is not a valid array of aliases.`);
		return null;
	}

	const validatedArrayValues = ff.getValidArrayValues(arrayValue);

	return ff.isValue(validatedArrayValues)
		? { [key]: validatedArrayValues }
		: null;
};

const getBoolPair = (key, value) => {
	if (ff.isMissingValue(key)) {
		console.error(
			`Failed to get key for the pair '${key} : ${value}. Returning null.`
		);
		return null;
	}

	const validatedBool = value ? true : false;

	return { [key]: validatedBool };
};

exports.getFlatPair = getFlatPair;

exports.getArrayPair = getArrayPair;

exports.getBoolPair = getBoolPair;

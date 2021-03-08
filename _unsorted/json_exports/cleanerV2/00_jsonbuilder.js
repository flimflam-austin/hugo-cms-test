const fs = require("fs");
const csvtojson = require("csvtojson");

const CONFIG = Object.freeze({
	src: `${__dirname}/00_output_rawscrapecsv/rawscrape_cards.csv`,
	dest: `${__dirname}/01_output_rawjson/`,
	idColumn: "Page_Title",
	htmlField: "Raw_Html",
	type: "card",
});

/* const CONFIG = Object({
	src: `${__dirname}/00_output_rawscrapecsv/rawscrape_articles.csv`,
	dest: `${__dirname}/01_output_rawjson/`,
	idColumn: "Page_Title",
	htmlField: "Raw_Html",
	type: "article",
}); */

// ==========================
// State Handlers
// ==========================
const handleError = (err) => console.log(err);

const onParseError = (err) => {
	console.group(`line error`);
	handleError(err);
	console.groupEnd();
};

const onParseComplete = (value) => {
	console.group(`Parse Complete:`);
	console.log(value);
	console.groupEnd();
};

// ==========================
// Files to place row in context of entire file
// ==========================
const initCounter = (startValue = 0) => (doTick = true) => {
	if (doTick) {
		startValue += 1;
	}
	return startValue;
};

const initDuplicateRowChecker = () => {
	let pageTitlesUsed = [];

	return (rowData) => {
		if (pageTitlesUsed.includes(rowData[CONFIG.idColumn])) {
			return true;
		} else {
			pageTitlesUsed.push(rowData[CONFIG.idColumn]);
			return false;
		}
	};
};

// ==========================
// Program Functions
// ==========================
const counter = initCounter();

const isDuplicatePageTitle = initDuplicateRowChecker();

const writeToFile = (jsonData, filename) =>
	fs.writeFileSync(
		`${CONFIG.dest}/${filename}`,
		JSON.stringify(jsonData),
		"utf-8",
		(err) => {
			if (err) console.log(err);
		}
	);

const addLineNumberToJson = (jsonData, lineNumber) =>
	Object.freeze({ ...jsonData, csvlinenumber: lineNumber });

const addUniqueIdToJson = (jsonData, uniqueId) =>
	Object.freeze({ ...jsonData, uniqueId: uniqueId });

const modifyJsonValues = (jsonData, lineNumber, uniqueId) =>
	addUniqueIdToJson(addLineNumberToJson(jsonData, lineNumber), uniqueId);

const buildOutputFilename = (uniqueArticleId) =>
	`${CONFIG.type}_${uniqueArticleId}.json`;

const convertCsvRowToJsonFile = (jsonData, lineNumber) => {
	const isDuplicateRow = isDuplicatePageTitle(jsonData);

	if (isDuplicateRow) {
		console.log(`Skipping Duplicate.`);
	} else {
		const uniqueRowId = counter();

		//add linenumber to json for later reference
		const exportJson = modifyJsonValues(jsonData, lineNumber, uniqueRowId);

		writeToFile(exportJson, buildOutputFilename(uniqueRowId));

		console.log(`Output: line ${lineNumber}, entry ${uniqueRowId} `);
	}
};

const convertFiles = async () =>
	await csvtojson()
		.on("error", handleError)
		.fromFile(CONFIG.src)
		.subscribe(convertCsvRowToJsonFile, onParseError, onParseComplete);

/* Run Command */
convertFiles();

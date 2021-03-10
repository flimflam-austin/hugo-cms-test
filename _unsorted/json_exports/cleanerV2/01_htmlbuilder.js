const fs = require("fs");
const JSDOM = require("jsdom").JSDOM;
const minifyHTML = require("html-minifier").minify;
const scrapeHtmlToJson = require("./js_htmlbuilder_modules/htmlscraper")
	.scrapeHtmlToJson;

const minifyConfig = Object({
	collapseWhitespace: true,
	conservativeCollapse: true,
});

const mini = (html) => minifyHTML(html, minifyConfig);

const CONFIG = Object.freeze({
	src: `${__dirname}/01_output_rawjson/`,
	dest: `${__dirname}/02_output_processedjson/`,
});

// ======================
// ======================

const getFilePath = (fileName) => `${CONFIG.src}/${fileName}`;

const readFile = (fileName) =>
	fs.readFileSync(`${getFilePath(fileName)}`, "utf8", (err, data) => {
		if (err) {
			console.log("File read Failed", err);
			return null;
		}

		return data;
	});

const normalizeToStringifiedData = (data) => JSON.stringify(data);

const parseJsonFromFile = (fileName) => {
	const jsonString = readFile(fileName);
	// I have to double stringify to accomodate the scraped data, and so parse twice.
	return JSON.parse(JSON.parse(normalizeToStringifiedData(jsonString)));
};

const getHtmlField = (jsonObject) => jsonObject.Raw_Html;

const getHtmlDom = (jsonObject) => new JSDOM(mini(getHtmlField(jsonObject)));

const scrapeHtml = (jsonObject) => {
	const dom = getHtmlDom(jsonObject);
	if (!dom) {
		console.log(`Failed to get Dom`);
		return null;
	}

	const scrapeData = scrapeHtmlToJson(dom);
	dom.window.close();
	return scrapeData;
};

const isError = (e) =>
	e &&
	e.stack &&
	e.message &&
	typeof e.stack === "string" &&
	typeof e.message === "string";

const writeFile = (filename, jsonData) => {
	const writableData = JSON.stringify(jsonData, null, 2);
	fs.writeFileSync(`${CONFIG.dest}${filename}`, writableData, (err) => {
		if (err) throw err;
		console.log("data written | ", filename);
	});
};

const processFiles = (fileName) => {
	//console.log(`+++++++++++++ ${fileName}`);
	const json = parseJsonFromFile(fileName);
	if (!json) {
		console.log(`Json failed`);
		return null;
	}

	const html = getHtmlField(json);
	if (!html) {
		//console.log("=====================================\n", fileName);
		//console.log("no html found");
		return null;
	}

	const scrapedHtml = scrapeHtml(json);
	if (isError(scrapedHtml)) {
		console.log(scrapedHtml.message, "| ", fileName);
	}
	if (!scrapedHtml) {
		console.log(`Failure to scrape HTML | ${fileName}`);
		console.log(scrapedHtml);
		return;
	}

	//console.log(scrapedHtml);
	const outputFileName = `${scrapedHtml.contentType}_${json.uniqueId}.json`;
	writeFile(outputFileName, scrapedHtml);

	return scrapedHtml;
};

/*  */

const getAllFileNames = () => fs.readdirSync(CONFIG.src);

const filterCards = (fileName) => fileName[0] === "c";

const filterArticles = (fileName) => fileName[0] === "a";

/*  */

const chunkify = (a, n, balanced = false) => {
	if (n < 2) return [a];

	var len = a.length,
		out = [],
		i = 0,
		size;

	if (len % n === 0) {
		size = Math.floor(len / n);
		while (i < len) {
			out.push(a.slice(i, (i += size)));
		}
	} else if (balanced) {
		while (i < len) {
			size = Math.ceil((len - i) / n--);
			out.push(a.slice(i, (i += size)));
		}
	} else {
		n--;
		size = Math.floor(len / n);
		if (len % size === 0) size--;
		while (i < size * n) {
			out.push(a.slice(i, (i += size)));
		}
		out.push(a.slice(size * n));
	}

	return out;
};

const chunkIntoThirds = (array) => chunkify(array, 3);

const processSegment = (filterFunction, chunk) =>
	chunkIntoThirds(getAllFileNames().filter(filterFunction))[chunk].map(
		processFiles
	);

/*  */

//const processCards01 = processSegment(filterCards, 2);

const processCards01 = processSegment(filterCards, 0);

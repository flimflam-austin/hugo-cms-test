const fs = require("fs");
const yaml = require("js-yaml");
const TurndownService = require("turndown");
const { pathToFileURL } = require("url");
const turndown = new TurndownService();
//
const quickquoteBuilder = require("./js_mdbuilder_modules/build_quickquotes");
const quickreadsBuilder = require("./js_mdbuilder_modules/build_quickreads");
const videopostsBuilder = require("./js_mdbuilder_modules/build_videoposts");

/*  */

const CONFIG = Object.freeze({
	src: `${__dirname}/02_output_processedjson/`,
	dest: {
		quickreads: `${__dirname}/03_output_processedmd/quickreads/`,
		quickquotes: `${__dirname}/03_output_processedmd/quickquotes/`,
		videoposts: `${__dirname}/03_output_processedmd/videoposts/`,
	},
});

/*  */

const inspect = (value, index) => {
	console.log(`index ${index} | ${value}`);
	return value;
};

const inspectLength = (array) => {
	console.log(`length: ${array.length}`);
	return array;
};
/*  */

const convertToYaml = (json) => yaml.dump(yaml.load(JSON.stringify(json)));

const trimOpenQuote = (markdown) => {
	const string = markdown.trim();
	const hasOpenQuote = string[0] === `"`;
	if (hasOpenQuote) {
		return string.substring(1).trim();
	}
	return string;
};

const trimCloseQuote = (markdown) => {
	const string = markdown.trim();
	const hasCloseQuote = string[markdown.length - 1] === `"`;
	if (hasCloseQuote) {
		return string.substring(0, markdown.length - 1).trim();
	}
	return string;
};

const trimQuotes = (markdown) => trimOpenQuote(trimCloseQuote(markdown));

const convertToMarkdown = (string) =>
	trimQuotes(turndown.turndown(JSON.stringify(string).trim()));

/* const buildOutput = (jsonFrontmatter) =>
	`---\n${convertToYaml(jsonFrontmatter.frontmatter).replace(
		/([\\]*)/g,
		""
	)}\n---\n${convertToMarkdown(jsonFrontmatter.body)}`; */

const scrubSymbols = (string) =>
	string
		.replace(/(\\")/g, "")
		.replace(/(\\_)/g, "_")
		.replace(/(a\\\\u001c)/g, "")
		.replace(/(a\\\\u001d)/g, "")
		.replace(/(a\\x1C)/g, "‘")
		.replace(/(a\\x1D)/g, "’")
		.replace(/(a\\x19)/g, "’")
		.replace(/(a\\\\u0018)/g, "“")
		.replace(/(a\\\\u0019)/g, "”")
		.replace(/(a\\\\u0014)/g, "—");

const buildOutput = (jsonFrontmatter) =>
	scrubSymbols(
		`---\n${convertToYaml(
			jsonFrontmatter.frontmatter
		)}\n---\n${convertToMarkdown(jsonFrontmatter.body)}`
	);

const writeMd = (jsonFrontmatter) => {
	const bundleName = jsonFrontmatter.fileName;

	const bundlePath = `${
		CONFIG.dest[jsonFrontmatter.frontmatter.section]
	}${bundleName}`;

	// create bundle directory if it doesn't exist
	if (!fs.existsSync(bundlePath)) {
		fs.mkdirSync(bundlePath);
	}

	const fileName = `${bundlePath}/index.md`;

	fs.writeFileSync(fileName, buildOutput(jsonFrontmatter), (err) => {
		if (err) throw err;
	});
};
/*  */

const getFilePath = (fileName) => `${CONFIG.src}/${fileName}`;

const readFile = (fileName) =>
	fs.readFileSync(`${getFilePath(fileName)}`, "utf8", (err, data) => {
		if (err) {
			console.log("File read Failed", err);
			return null;
		}

		return data;
	});

const getJsonFromFile = (fileName) =>
	JSON.parse(JSON.parse(JSON.stringify(readFile(fileName))));

const getAllFileNames = () => fs.readdirSync(CONFIG.src);

const processAndWrite = (fileName) => {
	const json = getJsonFromFile(fileName);

	const quickquotes =
		json.contentType === "quickquotes"
			? quickquoteBuilder.process(json)
			: null;
	const quickreads =
		json.contentType === "quickreads"
			? quickreadsBuilder.process(json)
			: null;
	const videoposts =
		json.contentType === "videoposts"
			? videopostsBuilder.process(json)
			: null;

	const dataToWrite = quickquotes || quickreads || videoposts;

	if (!dataToWrite) {
		console.log(`file: ${fileName} failed to produce frontmatter.`);
		return;
	}

	writeMd(dataToWrite);
	return "success";
};

const processFiles = (filterFunction) =>
	getAllFileNames().filter(filterFunction).forEach(processAndWrite);

/*  */

const filterQuickquotes = (fileName) => fileName.includes("quickquotes");
const filterQuickreads = (fileName) => fileName.includes("quickreads");
const filterVideoposts = (fileName) => fileName.includes("videoposts");
const all = (filename) => true;

processFiles(all);

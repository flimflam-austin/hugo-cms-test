const yaml = require("js-yaml");

const convertToYaml = (json) => yaml.dump(yaml.load(JSON.stringify(json)));

const buildMd = (jsonFrontmatter) =>
	"---\n" +
	convertToYaml(jsonFrontmatter.frontmatter) +
	"\n---\n" +
	(jsonFrontmatter.body || " ");

const convertJsonToMd = (jsonData) => {
	const jsonToWrite = Object.freeze({
		...jsonData,
		path: `${__dirname}`,
		fileName: "index.md",
	});

	const builtMd = buildMd(jsonToWrite);

	console.log(`id '${jsonData.frontmatter._id}' translated into Markdown =)`);

	const returnData = Object.freeze({
		markdown: builtMd,
		type: jsonData.frontmatter.type,
		slug: jsonData.frontmatter.slug,
	});

	return returnData;
};

const convertFilesToMd = (objectArray) => objectArray.map(convertJsonToMd);

module.exports = convertFilesToMd;

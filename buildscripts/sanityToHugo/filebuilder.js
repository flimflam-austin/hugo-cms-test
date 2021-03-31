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

  //console.log(`id '${jsonData.frontmatter._id}' translated into Markdown =)`);

  const returnData = Object.freeze({
    markdown: builtMd,
    type: jsonData.frontmatter.type,
    slug: jsonData.frontmatter.slug,
  });

  return returnData;
};

const filterMissingFalseyData = (data) => {
  if (!data) {
    console.error(
      'Removing entry from write pipeling at "convertFilesToMd" because json data was falsy.'
    );
    return false;
  }
  return true;
};

const convertFilesToMd = (objectArray) =>
  objectArray.filter(filterMissingFalseyData).map(convertJsonToMd);

module.exports = convertFilesToMd;

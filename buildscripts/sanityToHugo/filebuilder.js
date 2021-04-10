const yaml = require('js-yaml');
const inspect = require('./inspect')

const convertToYaml = json => yaml.dump(yaml.load(JSON.stringify(json)));

const buildMd = jsonFrontmatter => {
    try {
        const convertedFrontmatter = `---\n${convertToYaml(jsonFrontmatter.frontmatter)}\n---\n${jsonFrontmatter.body || ' '}`;

        return convertedFrontmatter
    } catch (err) {
        inspect.errorRed(Error(`Error in buildMd in filebuilder.js: ${err}`))
        return null
    }

}

const convertJsonToMd = jsonData => {
    const jsonToWrite = Object.freeze({
        ...jsonData,
        path: `${__dirname}`,
        fileName: 'index.md'
    });

    const builtMd = buildMd(jsonToWrite);


    try {

        const returnData = Object.freeze({
            markdown: builtMd,
            type: jsonData.frontmatter.type,
            slug: jsonData.frontmatter.slug
        });

        return returnData;
    } catch (err) {
        inspect.errorRed(`Error in convertJsonToMd in filebuilder.js reading '${JSON.stringify(jsonToWrite.slug)}': ${err}`)
        return null
    }
};

const filterMissingFalseyData = data => {
    if (!data) {
        console.error(
            'Removing entry from write pipeling at "convertFilesToMd" because json data was falsy.'
        );
        return false;
    }
    return true;
};

const convertFilesToMd = objectArray =>
    objectArray.filter(filterMissingFalseyData).map(convertJsonToMd);

module.exports = convertFilesToMd;

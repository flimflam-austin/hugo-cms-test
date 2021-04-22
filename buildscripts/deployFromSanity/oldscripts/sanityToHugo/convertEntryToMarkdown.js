const yaml = require('js-yaml');

const convertToYaml = json => yaml.dump(yaml.load(JSON.stringify(json)));

const buildMd = jsonFrontmatter => {
    try {
        const convertedFrontmatter = `---\n${convertToYaml(jsonFrontmatter.frontmatter)}\n---\n${jsonFrontmatter.body || ' '}`;

        return convertedFrontmatter
    } catch (err) {
        throw new Error(`Error at buildMd in filebuilder.js. Error: ${err.message}`)
    }

}

const convertJsonToMd = jsonData => {

    /* const jsonToWrite = Object.freeze({
        ...jsonData,
        path: `${__dirname}`,
        fileName: 'index.md'
    }); */

    /* const builtMd = buildMd(jsonToWrite); */

    try {
        const builtMd = buildMd(jsonData);

        const returnData = Object.freeze({
            markdown: builtMd,
            type: jsonData.frontmatter.type,
            slug: jsonData.frontmatter.slug
        });

        return returnData;
    } catch (err) {
        throw new Error(`Error in convertJsonToMd in filebuilder.js reading '${JSON.stringify(jsonData.slug)}': ${err.message}`)
    }
};

/* const filterMissingFalseyData = data => {
    if (!data) {
        console.error(
            'Removing entry from write pipeling at "convertFilesToMd" because json data was falsy.'
        );
        return false;
    }
    return true;
}; */

const convertEntryToMarkdown = entry => convertJsonToMd(entry)

module.exports = convertEntryToMarkdown;

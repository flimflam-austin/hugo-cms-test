const ff = require('./../ffhelpers');
const inspect = require('./../inspect')

const toMarkdown = require('@sanity/block-content-to-markdown');

const cardTextToMarkdown = portableText => {
    if (!portableText) {
        inspect.errorRed('Could not parse portable text, value is falsey.');
        return null;
    }

    try {
        const result = toMarkdown(portableText);

        return ff.isValue(result) ? result : ' ';
    } catch (err) {
        throw Error(`Failed converting portable text to markdown at cardTextToMarkdown in cardTextToMarkdown.js. Error:\n\t${err}`)
    }
};

module.exports = cardTextToMarkdown;

const ff = require('./ffhelpers');
const inspect = require('./inspect')

// const client = require('./clientMaker');

const toMarkdown = require('@sanity/block-content-to-markdown');


/* const BlockRenderer = props => {
    const { style } = props.node || 'normal'

    console.log('~~~~~~~~~~~~~~~~~~~', style)

    if (style === 'alignleft') {
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        return
    }

    // Fall back to default handling
    return toMarkdown.defaultSerializers.types.block(props)
}
 */


const cardTextToMarkdown = portableText => {
    if (!portableText) {
        inspect.errorRed('Could not parse portable text, value is falsey.');
        return null;
    }

    try {
        const result = toMarkdown(portableText);

        return ff.isValue(result) ? result : ' ';
    } catch (err) {
        inspect.errorRed(Error(`Failed converting portable text to markdown at cardTextToMarkdown in cardTextToMarkdown.js. Error:\n\t${err}`))

        return ' '
    }


};

module.exports = cardTextToMarkdown;

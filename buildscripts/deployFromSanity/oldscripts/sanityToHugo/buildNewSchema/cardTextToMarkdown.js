const ff = require('./../ffhelpers');
const inspect = require('./../inspect')

const toMarkdown = require('@sanity/block-content-to-markdown');

const blocksToHtml = require('@sanity/block-content-to-html')
const client = require('./../clientMaker')

const TurndownService = require('turndown')

const turndownService = new TurndownService()




const getLastChar = str => str[str.length - 1]

const scrubTrailingSpaces = text => {
    if (!text) {
        return text
    }

    const lastChar = getLastChar(text)

    /* if (lastChar === ' ') {
        return scrubTrailingSpaces(text.slice(0, -1))
    } */

    return text
}

// Fixes bug where trailing space at end of line breaks conversion to markdown. ex **Text **
const scrubTrailingSpacesInPortableText = portableText => portableText.map(block => {
    const children = block.children

    if (!children) {
        return block
    }

    const scrubbedChildren = children.map(child => {
        const text = child.text

        if (!text) {
            return child
        }

        return { ...child, text: scrubTrailingSpaces(text) }
    })

    return { ...block, children: scrubbedChildren }
})

const groomPortableText = portableText => ff.pipe(scrubTrailingSpacesInPortableText)(portableText)

const cardTextToMarkdown = portableText => {
    if (!portableText) {
        throw new Error('Error parsing portable text for card, no portable text found.')
    }

    // console.log(JSON.stringify(portableText, null, '\t'))

    try {
        const groomedPortableText = groomPortableText(portableText)
        //const result = toMarkdown(groomedPortableText);

        const result = blocksToHtml({ blocks: portableText })

        //const md = turndownService.turndown(result)

        return ff.isValue(result) ? result : ' ';
    } catch (err) {
        throw new Error(`Failed converting portable text to markdown at cardTextToMarkdown in cardTextToMarkdown.js. Error:\n\t${err}`)
    }
};

module.exports = cardTextToMarkdown;

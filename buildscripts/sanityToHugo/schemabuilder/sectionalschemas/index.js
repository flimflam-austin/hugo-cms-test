const schemaQuickQuotes = require('./quickquotes')
const schemaQuickReads = require('./quickreads')
const schemaVideoPosts = require('./videoposts')
const schemaProducts = require('./products')
const schemaAuthors = require('./authors')


const getSectionalSchemas = data => {
    const quickQuoteFields =
        data._type === 'quickquotes' ? schemaQuickQuotes(data) : null
    const quickReadsFields =
        data._type === 'cardstack' ? schemaQuickReads(data) : null
    const videoPostsFields =
        data._type === 'videoposts' ? schemaVideoPosts(data) : null
    const productsFields =
        data._type === 'products' ? schemaProducts(data) : null
    const authorsFields =
        data._type === 'author' ? schemaAuthors(data) : null

    const sectionalFields =
        quickQuoteFields ||
        quickReadsFields ||
        videoPostsFields ||
        productsFields ||
        authorsFields

    if (!sectionalFields) {
        console.error(
            `Could not find field parser for type '${sectionalFields}'`
        )
        return null
    }

    return sectionalFields
}

module.exports = getSectionalSchemas

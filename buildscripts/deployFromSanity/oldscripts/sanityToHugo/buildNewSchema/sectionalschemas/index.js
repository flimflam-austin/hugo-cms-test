const schemaQuickQuotes = require('./quickquotes')
const schemaQuickReads = require('./quickreads')
const schemaVideoPosts = require('./videoposts')
const schemaProducts = require('./products')
const schemaAuthors = require('./authors')
const schemaAbout = require('./about')
const schemaLegal = require('./legal')


const getSectionalSchemas = data => {
    try {
        if (!data._type) {
            throw new Error(
                `Error finding getting type for data "${JSON.stringify(data)}" at getSectionSchemas in index.js of sectionalSchemas.`
            )
        }

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
        const aboutFields =
            data._type === 'about' ? schemaAbout(data) : null
        const legalFields =
            data._type === 'legal' ? schemaLegal(data) : null

        const sectionalFields =
            quickQuoteFields ||
            quickReadsFields ||
            videoPostsFields ||
            productsFields ||
            authorsFields ||
            aboutFields ||
            legalFields

        if (!sectionalFields) {
            throw new Error(
                `Error finding parser for type "${data._type}" at getSectionSchemas in index.js of sectionalSchemas.`
            )
        }

        return sectionalFields
    } catch (err) {
        throw new Error(`\nError trying to get sectional schemas at getSectionalSchemas in sectionschemas/index.js: ${err.message}`)
    }
}

module.exports = getSectionalSchemas

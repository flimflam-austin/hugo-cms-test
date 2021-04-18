const schemaHelpers = require('./schemaHelpers')

const quickreads = require('./documents/quickreads')
const quickquotes = require('./documents/quickquotes')
const videoposts = require('./documents/videoposts')
const products = require('./documents/products')
const author = require('./documents/author')

const card = require('./components/card')
const featuredquote = require('./components/featuredquote')

const schemas = [quickreads, quickquotes, videoposts, card, featuredquote, author, products]

module.exports = { schemas, schemaHelpers }

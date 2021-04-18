const schemaHelpers = require('./schemaHelpers')

const quickreads = require('./documents/quickreads')
const quickquotes = require('./documents/quickquotes')
const videoposts = require('./documents/videoposts')

const card = require('./components/card')
const featuredquote = require('./components/featuredquote')

const schemas = [quickreads, quickquotes, videoposts, card, featuredquote]

module.exports = { schemas, schemaHelpers }

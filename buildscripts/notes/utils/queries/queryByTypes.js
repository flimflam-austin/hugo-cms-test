const ff = require('./../../ff')

const addQuotes = array => array.map(value => `"${value}"`)

const joinWithComma = array => array.join(', ')

const toCommaSeparatedString = array =>
    ff.pipe(
        addQuotes,
        joinWithComma
    )(array)

const queryTypes = typeArray => `*[_type in [${toCommaSeparatedString(typeArray)}]]`

const queryOrdering = orderField => ` | order(${orderField} desc)`

const queryFields = fieldArray => `{${joinWithComma(fieldArray)}}`

const querySampleSize = sampleSize => `[0..${sampleSize}]`

/**
 * Builds a GROQ query using a list of types (_type)
 * @param {Object} options Options for building the query
 * @param {String[]} options.typeArray Types (_type) to query. ex. ['post', 'author']
 * @param {String} options.orderField How to order results. ex. "_updatedAt desc"
 * @param {String} options.fieldsArray Fields to return. Returns all if undefined. ex. ['...', 'mainimage{asset->{url}, alt}, 'title']
 * @param {Number} options.sampleSize How many results to return. Returns all if undefined.
 * @returns {string} a groq query
 */
const queryByTypes = ({ typeArray, orderField, fieldsArray, sampleSize }) => {
    const queryFragments = [
        queryTypes(typeArray),
        orderField && queryOrdering(orderField),
        sampleSize && querySampleSize(sampleSize),
        fieldsArray && queryFields(fieldsArray)
    ]

    return queryFragments.join('')
}

module.exports = queryByTypes

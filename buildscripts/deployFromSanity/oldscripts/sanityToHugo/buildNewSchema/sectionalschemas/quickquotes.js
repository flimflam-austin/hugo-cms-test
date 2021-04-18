const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')

const isQuoteMark = character =>
    character === '"' ||
    character === '“' ||
    character === '”' ||
    character === '‘' ||
    character === '’'

const trimFirstQuotemark = string =>
    (isQuoteMark(string[0]) ? string.slice(1) : string)

const trimLastQuotemark = string => (isQuoteMark(string[string.length - 1]) ? string.slice(0, -1) : string)

const trimEndQuotes = string => trimFirstQuotemark(trimLastQuotemark(string))

const getScrubbedQuote = data => {
    const quote = sh.getFlatPair(
        'quote',
        data.featured_quote ? data.featured_quote.quote : null
    )

    return quote ? Object.freeze({ quote: trimEndQuotes(quote.quote) }) : null
}

const getQuickQuotesFields = data => {
    try {

        const featuredQuoteFields = [
            getScrubbedQuote(data),
            sh.getFlatPair(
                'citation',
                data.featured_quote ? data.featured_quote.citation : null
            )
        ]

        const generalFields = [
            sh.getBoolPair('is_breaking', data.is_breaking, false),
            sh.getFlatPair('summary', data.summary)
        ]

        return Object.freeze({
            ...ff.compileValidArrayValues(generalFields),
            featured_quote: ff.compileValidArrayValues(featuredQuoteFields)
        })
    } catch (err) {
        throw new Error('Error getting quickquotes fields at getQuickQuotesFields in quickquotes.js Error:', err)
    }
}

module.exports = getQuickQuotesFields

const { arr, pipe } = require('./../helpers')


const joinWithComma = array => array.join(', ')

const wrapInBrackets = value => `{${value}}`

const buildQueryBody = schema => {
    const allFieldsExpression = '...'
    const mutations = schema.queryMutations
    const queryFragments = mutations ? arr.addToHead(mutations, allFieldsExpression) : [allFieldsExpression]

    const body = pipe(
        joinWithComma,
        wrapInBrackets
    )(queryFragments)

    return body
}

const buildQueryHead = schema => `*[_type == "${schema.name.sanity}"]`

const buildSample = sampleSize => (sampleSize ? `[0..${sampleSize - 1}]` : '')

const buildQuery = schema => [
    buildQueryHead(schema),
    buildSample(),
    buildQueryBody(schema)
].join('')

module.exports = buildQuery

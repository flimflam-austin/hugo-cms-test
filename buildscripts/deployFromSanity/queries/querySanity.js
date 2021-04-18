const client = require('./../client')

const querySanity = async query => {
    const response = await client.fetch(query)

    return Object.freeze({
        response,
        query
    })
}

module.exports = querySanity

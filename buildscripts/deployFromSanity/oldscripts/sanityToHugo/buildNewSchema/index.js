const sh = require('./schemahelpers')
const ff = require('./../ffhelpers')
const portableTextToMarkdown = require('./portableTextToMarkdown')

const inspect = require('./../inspect')

const sectionalSchemas = require('./sectionalschemas')
const universalSchemas = require('./universalschemas')

const getSectionalSchemas = data => {
    try {
        return sectionalSchemas(data)
    } catch (err) {
        console.error(err.message)
        throw new Error(err)
    }
}

const getUniversalSchemas = data => {
    try {
        return universalSchemas(data)
    } catch (err) {
        console.error(err.message)
        throw new Error(err)
    }
}

const getJsonFromSanityData = data => {

    // console.log(data)
    if (!data) {
        throw new Error(
            'There was an uncaught error fetching from sanity! =(\n\tConversion failed: Cannot parse empty dataset. Skipping and returning Null. Caught by guard clase at entry to getJsonFromSanityData'
        )
    }

    if (!data.slug) {
        throw new Error(
            `Skipping item with id: ${data._id}. Reason: No slug was found.`
        )
    }

    if (!data.title) {
        throw new Error(
            `Skipping item with id: ${data._id}. Reason: No title was found.`
        )
    }

    if (!data._type) {
        throw new Error(
            `Skipping item with id: ${data._id}. Reason: No type was found.`
        )
    }


    const sectionalFields = getSectionalSchemas(data)

    if (!sectionalFields) {
        throw new Error(
            `Skipping item with id: ${data._id}. Reason: No sectional fields produced.`
        )
    }

    const universalFields = getUniversalSchemas(data)

    if (!universalFields) {
        throw new Error(
            `Skipping item with id: ${data._id}. Reason: No universal fields produced.`
        )
    }

    const builtBody = sh.getFlatPair(
        'body',
        data.body,
        null,
        portableTextToMarkdown
    )

    const validatedBody = builtBody ? builtBody : ' '

    const builtPage = Object.freeze({
        frontmatter: {
            ...universalFields,
            ...sectionalFields
        },
        ...validatedBody
    })

    if (!builtPage.frontmatter) {
        throw new Error(
            `Skipping item with id: ${data._id}. Reason: Failed to create frontmatter.`
        )
    }


    return builtPage
}

/* const tryGetJsonFromSanityData = data => {
    try {
        const convertedData = getJsonFromSanityData(data)

        return convertedData
    } catch (err) {
        console.error(err.message)

        console.log(JSON.stringify(data, null, '\t'))
        throw new Error('Error for object above at getJsonFromSanityData in index.js of buildNewSchema:', err.message)
    }
} */

const buildNewSchema = responseData => getJsonFromSanityData(responseData)

module.exports = buildNewSchema

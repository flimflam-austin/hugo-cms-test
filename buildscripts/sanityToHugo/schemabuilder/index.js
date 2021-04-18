const sh = require('./schemahelpers')
const ff = require('./../ffhelpers')
const portableTextToMarkdown = require('./portableTextToMarkdown')

const inspect = require('./../inspect')

const sectionalSchemas = require('./sectionalschemas')
const universalSchemas = require('./universalschemas')

const getJsonFromSanityData = data => {
    if (!data) {
        console.error(
            'There was an uncaught error fetching from sanity! =(\n\tConversion failed: Cannot parse empty dataset. Skipping and returning Null. Caught by guard clase at entry to getJsonFromSanityData'
        )
        return null
    }

    if (!data.slug) {
        console.error(
            `Skipping item with id: ${data._id}. Reason: No slug was found.`
        )
        return null
    }

    if (!data.title) {
        console.error(
            `Skipping item with id: ${data._id}. Reason: No title was found.`
        )
        return null
    }

    if (!data._type) {
        console.error(
            `Skipping item with id: ${data._id}. Reason: No type was found.`
        )
        return null
    }


    const sectionalFields = sectionalSchemas(data)

    if (!sectionalFields) {
        console.error(
            `Skipping item with id: ${data._id}. Reason: No sectional fields produced.`
        )
        return null
    }

    const universalFields = universalSchemas(data)

    if (!universalFields) {
        console.error(
            `Skipping item with id: ${data._id}. Reason: No universal fields produced.`
        )
        return null
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
        console.error(
            `Skipping item with id: ${data._id}. Reason: Failed to create frontmatter.`
        )
        return null
    }


    return builtPage
}

const tryGetJsonFromSanityData = data => {
    try {
        const convertedData = getJsonFromSanityData(data)

        return convertedData
    } catch (err) {
        console.log(JSON.stringify(data, null, '\t'))
        throw Error('Error for object above at getJsonFromSanityData in index.js of schemaBuilder:', err)
    }
}

const buildSchemaFromResponse = responseData => responseData.map(tryGetJsonFromSanityData)

module.exports = buildSchemaFromResponse

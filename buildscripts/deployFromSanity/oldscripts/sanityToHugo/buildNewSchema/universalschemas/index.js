const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')
const getImageUrl = require('./../handleimage')

const translateTypeName = type => {
    if (!type) {
        console.error(
            "Type missing for entry at 'translateTypeName'. Returning null."
        )
        return null
    }

    const outputTypes = Object.freeze({
        cardstack: 'quick_reads',
        quickquotes: 'quick_quotes',
        videoposts: 'video_posts',
        products: 'products',
        author: 'author'
    })

    const translatedType = outputTypes[type]

    if (!translatedType) {
        console.error(
            `Failed to translate 'type' of entry. The type '${type}' is not valid. Returning null.`
        )
        return null
    }

    return translatedType
}

const removeIdPrefix = id => {
    const unprefixedId = id.replace('draft.', '')

    return unprefixedId
}

const isDraft = id => id.toLowerCase().slice(0, 5) === 'draft'

const getTags = tags => {
    if (!ff.isFilledArray(tags)) {
        return null
    }

    const tagValues = tags.map(tag => tag.value || null)

    return ff.getValidArrayValues(tagValues)
}

const getFeaturedImage = imageFigure => {
    const imageSource = getImageUrl(imageFigure)

    if (imageSource) {
        const fields = [
            sh.getFlatPair('alt', imageFigure.alt),
            sh.getFlatPair('caption', imageFigure.caption),
            sh.getFlatPair('url', imageSource)
        ]

        return ff.compileValidArrayValues(fields)
    }


    return null
}

const getSlug = slug => slug.replace('article', '')

const getUniversalFields = data => {
    try {


        const universalFields = [
            sh.getFlatPair('title', data.title),
            sh.getFlatPair(
                'slug',
                data.slug ? data.slug.current : null,
                null,
                getSlug
            ),
            sh.getFlatPair('_id', data._id, null, removeIdPrefix),
            sh.getFlatPair('_rev', data._rev),
            sh.getFlatPair('type', data._type, null, translateTypeName),
            sh.getFlatPair('draft', data._id, null, isDraft),
            sh.getArrayPair('aliases', data.aliases),
            sh.getFlatPair('_createdAt', data._createdAt),
            sh.getFlatPair('_updatedAt', data._updatedAt),
            sh.getFlatPair('date', data.datePublished, data._createdAt),
            sh.getFlatPair('lastmod', data.lastModified, data.datePublished),
            sh.getFlatPair('weight', data.weight, 50),
            sh.getFlatPair('tags', data.tags, null, getTags),
            sh.getFlatPair('summary', data.summary),
            sh.getFlatPair(
                'featured_image',
                data.mainimage,
                null,
                getFeaturedImage
            ),
            sh.getFlatPair('authorReference', data.author ? data.author._ref : null)
        ]

        return ff.compileValidArrayValues(universalFields)
    } catch (err) {
        throw Error(`Error getting universal fields at getUniversalFields in unviversalschemas/index.js\nError: ${err.message}\n`)
    }
}

module.exports = getUniversalFields

const sh = require('./schemahelpers')
const ff = require('./ffhelpers')
const portableTextToMarkdown = require('./portableTextToMarkdown')
const cardTextToMarkdown = require('./cardTextToMarkdown')
const inspect = require('./inspect')

/*
const { ModuleFilenameHelpers } = require('webpack')
*/

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
    const fields = [
        sh.getFlatPair('alt', imageFigure.alt),
        sh.getFlatPair('caption', imageFigure.caption),
        sh.getFlatPair('url', imageFigure.asset ? imageFigure.asset.url : null)
    ]

    return ff.compileValidArrayValues(fields)
}

// //////////////////////////////////////////////
/*               QUICK QUOTES                 */
// //////////////////////////////////////////////
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
}

// //////////////////////////////////////////////
/*               QUICK READS                  */
// //////////////////////////////////////////////

const getCards = cards => {
    if (ff.notArray(cards)) {
        inspect.errorRed(Error(`No cards found in value: '${cards}'.`))
        return null
    }

    const builtCards = cards.map((card, index) => {
        if (ff.isMissingValue(card)) {
            return null
        }

        const translatedBody = card.body
            ? cardTextToMarkdown(card.body)
            : null

        return Object.freeze({
            order: index,
            ...(translatedBody && { body: translatedBody }),
            ...(card.citation && { citation: card.citation }),
            ...(card._key && { _key: card._key })
        })
    })

    return ff.getValidArrayValues(builtCards)
}

// *[_type == 'cardstack']  | order(_updatedAt desc) [0]
// {..., mainimage{asset->{url}, caption, alt}, series->{title}}
const getQuickReadsFields = data => {
    const quickReadsFields = [
        sh.getFlatPair(
            'card_series',
            data.series ? data.series.title : 'SmartHER News'
        ),
        sh.getFlatPair('colorpaletteclassname', data.colorpaletteclassname),
        sh.getFlatPair('cards', data.cards, null, getCards)
    ]

    return ff.compileValidArrayValues(quickReadsFields)
}

// //////////////////////////////////////////////
/*         VIDEO POSTS                        */
// //////////////////////////////////////////////

const getVideoPostsFields = data => {
    const fields = [
        sh.getFlatPair(
            'video_series',
            data.series ? data.series.title : 'spotlight'
        ),
        sh.getFlatPair('is_breaking', data.is_breaking, false),
        sh.getFlatPair(
            'is_breaking_dropdown',
            data.is_breaking_dropdown,
            false
        ),
        sh.getFlatPair('is_featured', data.is_featured, false)
    ]

    return ff.compileValidArrayValues(fields)
}

// //////////////////////////////////////////////
/*         PRODUCTS                           */
// //////////////////////////////////////////////

const getProductsFields = data => {
    const fields = [
        sh.getFlatPair('product_series', data.productSeries),
        sh.getFlatPair('price', data.price),
        sh.getFlatPair('discounted_from_price', data.discountedFromPrice),
        sh.getFlatPair('storeLink', data.storeLink)
    ]

    return ff.compileValidArrayValues(fields)
}

// //////////////////////////////////////////////
/*         AUTHORS                            */
// //////////////////////////////////////////////

const getAuthorSocialLinks = links => {
    const fields = [
        sh.getFlatPair('facebook', links.facebook),
        sh.getFlatPair('instagram', links.instagram),
        sh.getFlatPair('linkedin', links.linkedin),
        sh.getFlatPair('medium', links.medium),
        sh.getFlatPair('tiktok', links.tiktok),
        sh.getFlatPair('twitter', links.twitter)
    ]

    return ff.compileValidArrayValues(fields)
}

const getAuthorsFields = data => {
    const fields = [
        sh.getFlatPair('subtitle', data.subtitle),
        sh.getFlatPair('email', data.email),
        sh.getFlatPair('personal_site', data.personal_site),
        sh.getFlatPair('storeLink', data.storeLink),
        sh.getFlatPair(
            'social_links',
            data.social_links,
            null,
            getAuthorSocialLinks
        )
    ]

    return ff.compileValidArrayValues(fields)
}

// //////////////////////////////////////////////
/*         HANDLE SECTIONAL DATA              */
// //////////////////////////////////////////////

const getSectionalFields = data => {
    const quickQuoteFields =
        data._type === 'quickquotes' ? getQuickQuotesFields(data) : null
    const quickReadsFields =
        data._type === 'cardstack' ? getQuickReadsFields(data) : null
    const videoPostsFields =
        data._type === 'videoposts' ? getVideoPostsFields(data) : null
    const productsFields =
        data._type === 'products' ? getProductsFields(data) : null
    const authorsFields =
        data._type === 'author' ? getAuthorsFields(data) : null

    const sectionalFields =
        quickQuoteFields ||
        quickReadsFields ||
        videoPostsFields ||
        productsFields ||
        authorsFields

    if (!sectionalFields) {
        console.error(
            `Could not find field parser for type '${sectionalFields}'`
        )
        return null
    }

    return sectionalFields
}

// //////////////////////////////////////////////
/*         HANDLE UNIVERSAL DATA              */
// //////////////////////////////////////////////

const getSlug = slug => slug.replace('article', '')

const getUniversalFields = data => {
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
}

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


    const sectionalFields = getSectionalFields(data)

    if (!sectionalFields) {
        console.error(
            `Skipping item with id: ${data._id}. Reason: No sectional fields produced.`
        )
        return null
    }

    const universalFields = getUniversalFields(data)

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

const buildSchemaFromResponse = responseData => responseData.map(getJsonFromSanityData)

module.exports = buildSchemaFromResponse

const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')


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
    try {

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
    } catch (err) {
        throw Error('Error getting product fields at getProductsFields in products.js Error:', err)
    }
}

module.exports = getAuthorsFields

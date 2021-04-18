const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')

const getVideoPostsFields = data => {
    try {

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
    } catch (err) {
        throw Error('Error getting videoposts fields at getVideoPostsFields in videoposts.js Error:', err)
    }
}

module.exports = getVideoPostsFields

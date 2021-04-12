const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')

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

module.exports = getVideoPostsFields

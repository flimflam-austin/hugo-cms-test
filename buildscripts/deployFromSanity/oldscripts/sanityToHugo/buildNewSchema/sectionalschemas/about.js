const ff = require('./../../ffhelpers');

const taglineField = data => Object.freeze({ tagline: data.tagline })

const fields = data => [
    taglineField(data)
]

const buildAbout = data => ff.compileValidArrayValues(fields(data))

module.exports = buildAbout

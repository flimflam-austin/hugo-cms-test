const str = require('./str')

const isoTimestamp = () => new Date().toISOString()


const fileFriendlyTimestamp = () => str.removeChars(isoTimestamp(), ['-', ':', '.'])


module.exports = { isoTimestamp, fileFriendlyTimestamp }

const config = require('./config')

const getLogPath = name => `${config.path}/${name}`

module.exports = { getLogPath }

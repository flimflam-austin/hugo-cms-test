const asyncGetRequest = require('./getAndProcess')

const asyncRebuild = async () => await asyncGetRequest()

asyncRebuild()

module.exports = asyncRebuild

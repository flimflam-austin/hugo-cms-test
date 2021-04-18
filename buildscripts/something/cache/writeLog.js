const fs = require('fs-extra')
const config = require('./config')
const { jsn } = require('./../helpers')
const { getLogPath } = require('./helpers')

const { time } = require('./../helpers')

const generateLogName = () => config.fileprefix + time.fileFriendlyTimestamp()

const generateLogPath = () => getLogPath(generateLogName())

const writeLog = jsonData => {
    try {
        const path = generateLogPath()
        const outputData = jsn.prettyStringify(jsonData)

        fs.writeFileSync(path, outputData)
    } catch (err) {
        throw Error('Error writing cache file at writeToFile in writeLogs. Error:', err, 'Data:', jsonData)
    }
}

module.exports = { writeLog }

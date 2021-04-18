const fs = require('fs-extra')
const config = require('./config')
const { getLogPath } = require('./helpers')

const sortAlphabetically = (a, b) => {
    if (a === b) {
        return 0
    }

    return a > b ? -1 : 1
}

const sortArrayAlphabetically = array => [...array].sort(sortAlphabetically)


const getCacheFilesList = () => fs.readdirSync(config.path, (err, files) => {
    if (err) {
        throw Error('Error reading files at getCacheFilesList in /cache:', err.message)
    }

    return files
})

const getCacheFilesListSorted = () => sortArrayAlphabetically(getCacheFilesList())

const getNthRecentCacheFilePath = nth => getLogPath(getCacheFilesListSorted()[nth])

const pathToLastLog = () => getNthRecentCacheFilePath(0)

const pathToNextToLastLog = () => getNthRecentCacheFilePath(1)

const loadLog = path => fs.readFileSync(path, (err, data) => {
    if (err) {
        throw Error(`Error reading log path at: ${path}. at loadLog in /cache. Error:`, err.message)
    }

    return data
})

const loadLogAsJson = path => {
    try {
        return JSON.parse(loadLog(path))
    } catch (err) {
        throw Error(`Failed to convert cache log with path: ${path} to JSON at loadLogAsJson in /cache. Error:`, err)
    }
}

const getLastLog = () => loadLogAsJson(pathToLastLog())

const getNextToLastLog = () => loadLogAsJson(pathToNextToLastLog())

module.exports = { getLastLog, getNextToLastLog }

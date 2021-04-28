const path = require('path')

const unboundFilterUnusedOldPaths = (oldPaths) => (newPath) => !oldPaths.includes(newPath)

const buildOldPath = (oldPath) => (
    oldPath.file.includes('.')
        ? path.resolve(__dirname, '../../../content', oldPath.dirName)
        : path.resolve(__dirname, '../../../content', oldPath.dirName, oldPath.file)
)
const buildOldPaths = oldPaths => oldPaths.map(buildOldPath)

const buildNewPath = newPath => path.resolve(__dirname, '../../../content', newPath)
const buildNewPaths = newPaths => newPaths.pathsWritten.map(buildNewPath)

const markUnusedAsDraft = async (oldDirs, newDirs) => {
    const builtOldPaths = buildOldPaths(oldDirs)
    const builtNewPaths = buildNewPaths(newDirs)

    console.log(builtOldPaths[101])
    console.log(builtNewPaths[101])
    console.log(builtOldPaths.length, builtNewPaths.length)

    const filterUnusedOldPaths = unboundFilterUnusedOldPaths(builtOldPaths)

    const unusedPaths = builtNewPaths.filter(filterUnusedOldPaths)

    const test = builtOldPaths.filter(oldPath => { return !builtNewPaths.includes(oldPath) })

    console.log('unused paths')
    console.log(unusedPaths)
    console.log(test)

    return unusedPaths
}

module.exports = markUnusedAsDraft
const fsextra = require('fs-extra');
const inspect = require('./inspect')

// /////////////////

const filterDotFiles = fileObject => fileObject.subDir[0] !== '.' || fileObject.file[0] !== '.'

// ////////////////

const generatePossibleMatch = (slug1, slug2) => {

    const dontMatch = slug1 === slug2 || slug1 === `draft.${slug2}`

    /* if (!dontMatch) {
        console.log(`${slug1} | ${slug2}`)
    } */

    return slug1 === slug2 || slug1 === `draft.${slug2}`
}


const missingSlugFilter = (fileSlug, entrySlugs) => {
    const maybeMatching = entrySlugs.filter(entrySlug => generatePossibleMatch(fileSlug, entrySlug))

    if (maybeMatching && maybeMatching.length > 0) {
        return false
    }

    return true
}

const unboundGetMissingSlugs = entrySlugs => fileSlugs => fileSlugs.filter(fileSlug => missingSlugFilter(fileSlug.file, entrySlugs))

// ////////////////

const filterNamesWithPeriod = name => name && name[0] && !name.includes('.')

const getRootDirectories = async rootDir => await new Promise(async (resolve, reject) => await fsextra.readdir(rootDir, (err, fileNames) => {
    if (err) {
        reject(err)
    } else {
        resolve(fileNames.filter(filterNamesWithPeriod).map(file => Object({ root: rootDir, subDir: file })))
    }
}))

const getEntryDirectories = async rootDirs => await Promise.all(
    rootDirs.map(
        async subDir => await new Promise(
            (resolve, reject) => fsextra.readdir(`${subDir.root}${subDir.subDir}`, (err, fileNames) => {
                if (err) {
                    reject(Error(`Error in getEntryDirectories in cacheCheck.js: ${err}`))
                } else {
                    resolve(fileNames.map(file => Object({ dirName: `${subDir.root}/${subDir.subDir}`, file })))
                }
            }))))

// ////////////////

const arrayFlattenerReducer = (acc, array) => [...acc, ...array]

const flattenResults = arrayArray => arrayArray.reduce(arrayFlattenerReducer, [])

// /////////////////

const getEntrySlugs = entries => entries.map(entry => entry.slug)

// //////////////////

const deleteDir = async dir => {
    const path = `${dir.dirName}/${dir.file}`

    try {
        const deleteMessages = await new Promise((resolve, reject) => fsextra.rmdir(path, { recursive: true }, err => {
            if (err) {
                reject(Error(`Error unlinking file in cacheCheck.js: ${err}`))
            } else {
                resolve(`Successfully unlinked ${path}`)
            }
        }))

        return deleteMessages;
    } catch (err) {
        inspect.errorRed(Error(`Error at deleteDir in carcheCheck.js: ${err}`))
        return null
    }
}

const deleteDirectoryList = async dirList => await dirList.map(deleteDir)

const cacheCheck = async newEntries => {

    const boundGetMissingSlugs = unboundGetMissingSlugs(getEntrySlugs(newEntries))

    const rootDir = `${__dirname}/../../content/`;

    await getRootDirectories(rootDir).then(getEntryDirectories).then(flattenResults).then(boundGetMissingSlugs).then(deleteDirectoryList).catch(inspect.red)

    return newEntries
}

module.exports = cacheCheck

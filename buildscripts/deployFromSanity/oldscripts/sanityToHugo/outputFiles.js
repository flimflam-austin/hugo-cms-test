const fsextra = require('fs-extra')
const ff = require('./ffhelpers')
const fetch = require('node-fetch')
const ffregex = require('./ffregex')
const { schemas } = require('./../../schemas')

const { asyncMap } = require('./../../helpers')

let imageCounter = 0

/*
Handle Image Urls
*/
/* const getImageNameFromUrl = imageUrl =>
    imageUrl.match(/([^?\/]+)(?=\?|$)/)[0]; */

const getEverythingAfterLastSlash = string => string.substr(string.lastIndexOf('/') + 1)

const removeAll = (string, toRemove) => string.split(toRemove).join('')

const removeCharsFromString = (string, chars) => chars.reduce((newString, currentChar) => (removeAll(newString, currentChar)), string)

const reverseAtChar = (string, char) => string.split(char).reverse().join('')

const removeExtraneousPunctuation = string => removeCharsFromString(string, ['-', ',', '=', '_', ''])

/* const removeEqualSigns = string => removeAll(string, '=')

const removeLowDashes = string => removeAll(string, '_')

const removeHyphens = string => removeAll(string, '-')

const removeCommas = string => removeAll(string, ',') */

const lowerCase = string => string.toLowerCase()

const reverseStringAtQuestionMark = string => (string.includes('?') ? reverseAtChar(string, '?') : string)

const moveImageSuffixToPrefix = imageUrl => ff.pipe(
    removeExtraneousPunctuation,
    reverseStringAtQuestionMark
)(imageUrl)

const buildImageNameFromUrl = imageUrl => ff.pipe(
    getEverythingAfterLastSlash,
    moveImageSuffixToPrefix,
    lowerCase
)(imageUrl)

const getImageNameFromUrl = imageUrl => buildImageNameFromUrl(imageUrl)

const getAllUrls = text => text.match(ffregex.allUrlsWithCommas)

const getImageUrls = text => {

    // Get every Url in document
    const allUrls = getAllUrls(text)


    if (!allUrls) {
        return null
    }

    // Filter out only the URLs which contain image extensions -- lazy 'get image urls'
    const imageExtensions = ['.png', '.jpeg', '.jpg', '.gif', '.webp', '.svg', '.eps', '.bmp', '.tiff', '.apng', '.avif', '.ico']
    const imageUrls = allUrls.filter(url => imageExtensions.some(extension => url.toLowerCase().includes(extension)))

    return imageUrls
}

const replaceImageUrls = bodyText => {
    const imageUrls = getImageUrls(bodyText)


    // Keep only non-repeats
    const uniqueUrls = imageUrls ? imageUrls.filter(ff.filterUniqueValues) : null;


    // Temp for new markdown that will have the updated image URLs
    let relinkedMarkdown = '';

    if (uniqueUrls) {
        let newBodyText = bodyText;

        // For each image URL, replace its instance in the mardown with only the image name
        uniqueUrls.forEach(url => {
            const renamedImage = getImageNameFromUrl(url)

            /* if (url !== renamedImage) {
                console.log('---')
                console.log(url)
                console.log(renamedImage)
                console.log('---')
            } */

            newBodyText = newBodyText.replace(url, renamedImage);
        });

        relinkedMarkdown = newBodyText;
    } else {
        relinkedMarkdown = bodyText;
    }

    const outputMarkdown = relinkedMarkdown ? relinkedMarkdown : bodyText

    // return the relinked markdown with image names only, and the original imageURLs to be downloaded later
    return Object.freeze({
        outputMarkdown,
        imageUrls: uniqueUrls
    });
};

/*
Shortcodes
*/
const scrubShortcodes = data => {
    const cleanedShortcodes = data.replace(/(?<={{<).*?(?=>}})/g, match => match.replace(/\\/g, '"'));

    const cleanedTitle = cleanedShortcodes.replace('title=" ', '');

    return cleanedTitle;
};


/*
Writing
*/
const fetchRetry = async (url, retries = 3, backoff = 300) => {
    const retryCodes = [408, 500, 502, 504, 522, 524]

    const isStatusError = status => retryCodes.includes(status)

    return await fetch(url)
        .then(async res => {
            if (res.ok) {
                return res
            }

            if (retries > 0 && isStatusError(res.status)) {
                console.error(`Retrying fetch of "${url}"... ${retries - 1} retries remaining.`)
                await setTimeout(() => fetchRetry(url, retries - 1, backoff * 2), backoff)
            }

            if (retries === 0 && isStatusError(res.status)) {
                throw new Error(`Error fetching "${url}" at fetchRetry in outputFiles.js. Error: no retries remaining. Last response: ${JSON.stringify(res)}`)
            }
        })
        .catch(err => {
            throw new Error(`Error fetching asset with url: "${url}" on retry "${retries}". Error: ${err.message}`)
        })
}

const writeFile = async dataObj => {
    const { type, markdown, slug } = dataObj;

    if (!type) {
        throw new Error(`No type received at writeFile in outputFiles.js. Type: ${type}; Slug: ${slug}`)
    }

    if (!markdown) {
        throw new Error(`No markdown received at writeFile in outputFiles.js. Type: ${type}; Slug: ${slug}`)
    }

    if (!slug) {
        throw new Error(`No slug received at writeFile in outputFiles.js. Type: ${type}; Slug: ${slug}`)
    }

    // /////////////

    const { outputMarkdown, imageUrls } = replaceImageUrls(markdown);

    if (!outputMarkdown) {
        throw new Error(`No relinked markdown produced for ${slug} at writeFile in outputFiles.js.`)
    }

    const readyToWriteIndexData = scrubShortcodes(outputMarkdown);

    // /////////////////

    const currentSchema = schemas.find(schema => schema.name.hugo === type)


    const isSingleton = currentSchema?.singleton || false


    // TODO: better path resolution
    const contentDirectory = `${__dirname}/../../../../content`

    const outputPath = isSingleton ? `${contentDirectory}/${slug}` : `${contentDirectory}/${type}/${slug}`
    const recordPath = isSingleton ? `${slug}` : `${type}/${slug}`

    /* const outputPath = isSingleton ? `${__dirname}/../../../content`: `${__dirname}/../../../../content/${type}/${slug}` */

    const indexPath = `${outputPath}/index.md`

    if (type === 'about') {
        console.log(outputPath)
    }

    // //////////////////

    await fsextra.outputFile(indexPath, readyToWriteIndexData)
        .catch(err => {
            throw new Error(`Error writing index file with path ${indexPath} at writeFile in outputFiles.js.\nError: ${err.message}\n`)
        })

    if (imageUrls) {

        await asyncMap(imageUrls, async url => {
            const path = `${outputPath}/${getImageNameFromUrl(url)}`

            const isAlreadyDownloaded = await fsextra.pathExists(path)
                .catch(err => {
                    throw new Error(`Error checking if path: "${path}" exists at writeFile in outputFile.js.\nError: ${err.message}\n`)
                })

            if (isAlreadyDownloaded) {
                return false
            }

            const response = await fetchRetry(url)
                .catch(err => {
                    throw new Error(`Error fetching image url "${url}" for path "${path}" at writeFile in outputFile.js.\nError: ${err.message}\n`)
                })

            const buffer = await response.buffer()

            await fsextra.outputFile(path, buffer)
                .catch(err => {
                    throw new Error(`Error writing image file to path "${path}" at writeFile in outputFile.js.\nError: ${err.message}\n`)
                })

            imageCounter += 1


        })
    }

    return recordPath
};


const outputFiles = async mdData => {

    try {
        const pathWritten = await writeFile(mdData)

        return Object.freeze({ dataWritten: mdData, imagesWritten: imageCounter, pathWritten: pathWritten })
    } catch (err) {
        throw new Error(`Error writing files at outputFiles in outputFiles.js.\nError: ${err.message}\n`)
    }
}

/* const writeFilesAndLogToConsole = async dataForFiles => await writeFiles(dataForFiles).then(data => {
    inspect.strong(`(${writeCounter.written}) new files written. (${writeCounter.updated}) files updated. (${writeCounter.images}) images written.`)
    return data
}
) */

module.exports = outputFiles;

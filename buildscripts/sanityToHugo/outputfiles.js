const fsextra = require('fs-extra');
const ff = require('./ffhelpers');
const fetch = require('node-fetch');
const inspect = require('./inspect')
const ffregex = require('./ffregex')

const writeCounter = { written: 0, updated: 0, images: 0 }

/*
Handle Image Urls
*/
/* const getImageNameFromUrl = imageUrl =>
    imageUrl.match(/([^?\/]+)(?=\?|$)/)[0]; */

const getEverythingAfterLastSlash = string => string.substr(string.lastIndexOf('/') + 1)

const removeAll = (string, toRemove) => string.split(toRemove).join('')

const reverseAtChar = (string, char) => string.split(char).reverse().join('')

const removeEqualSigns = string => removeAll(string, '=')

const removeCommas = string => removeAll(string, ',')

const lowerCase = string => string.toLowerCase()

const reverseStringAtQuestionMark = string => (string.includes('?') ? reverseAtChar(string, '?') : string)

const moveImageSuffixToPrefix = imageUrl => ff.pipe(
    removeCommas,
    removeEqualSigns,
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

    /* if (!(imageUrls && imageUrls[0])) {
        return null
    } */


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
Logging
*/
const logSuccessfulFileWrite = slug => {
    inspect.bland(`New file written: ${slug}`);
};

/*
Writing
*/
const writeFile = dataObj => {
    const { type, markdown, slug } = dataObj;

    if (!type) {
        inspect.errorRed(Error(`No type received at writeFile in outputFiles.js. Type: ${type}; Slug: ${slug}`))
        return null
    }

    if (!markdown) {
        inspect.errorRed(Error(`No markdown received at writeFile in outputFiles.js. Type: ${type}; Slug: ${slug}`))
        return null
    }

    if (!slug) {
        inspect.errorRed(Error(`No slug received at writeFile in outputFiles.js. Type: ${type}; Slug: ${slug}`))
        return null
    }

    // /////////////
    if (slug === '20210401-covid-and-your-mental-health') {
        inspect.strong(markdown)
    }

    const { outputMarkdown, imageUrls } = replaceImageUrls(markdown);

    if (!outputMarkdown) {
        inspect.errorRed(Error(`No relinked markdown produced for ${slug} at writeFile in outputFiles.js`))
        return null
    }

    const scrubbedShortcodes = scrubShortcodes(outputMarkdown);

    // TODO: better path resolution
    const outputPath = `${__dirname}/../../site/content/${type}/${slug}`;

    const indexPath = `${outputPath}/index.md`

    fsextra.pathExists(indexPath, (err, exists) => {
        if (err) {
            inspect.errorRed(`Failed to check if path exists at '${indexPath}' at writeFile in outputfiles.js. Will still attempt write but it may fail or succeed silently. See error below:\n\t${err}`)
        }

        fsextra.outputFile(indexPath, scrubbedShortcodes, err => {
            if (err) {
                inspect.errorRed(`Failed to write file with slug ${type}/${slug}.`);
                return null;
            }

            if (!exists) {
                writeCounter.written += 1
                logSuccessfulFileWrite(slug);
            }

            if (exists) {
                writeCounter.updated += 1
            }


            if (imageUrls) {
                imageUrls.forEach(async imageUrl => {

                    console.log(imageUrl)

                    const path = `${outputPath}/${getImageNameFromUrl(imageUrl)}`;

                    console.log(path)

                    return await fsextra.pathExists(path, async (err, exists) => {
                        if (err) {
                            inspect.errorRed(`Failed to check if file exists at: ${path}`);
                            return null;
                        }

                        if (exists) {
                            return null;
                        }

                        const response = await fetch(imageUrl)
                            .then(response => response)
                            .catch(err => {
                                inspect.errorRed(`Error fetching image with path: ${imageUrl}`);
                                return null;
                            });

                        if (!response) {
                            return null;
                        }

                        const buffer = await response.buffer();

                        return await fsextra.outputFile(path, buffer, err => {
                            if (err) {
                                console.error(`Failed to download image '${imageUrl}'`);
                                return null;
                            }

                            writeCounter.images += 1

                        });
                    });
                });
            }

            return null;
        });
    })
};

const writeFiles = async dataForFiles => {
    await dataForFiles.map(async data => await writeFile(data))

    return dataForFiles
}

const writeFilesAndLogToConsole = async dataForFiles => await writeFiles(dataForFiles).then(data => {
    inspect.strong(`(${writeCounter.written}) new files written. (${writeCounter.updated}) files updated. (${writeCounter.images}) images written.`)
    return data
}
)

module.exports = writeFilesAndLogToConsole;

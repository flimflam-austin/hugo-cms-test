const fsextra = require('fs-extra');
const ff = require('./ffhelpers');
const fetch = require('node-fetch');
const inspect = require('./inspect')

const writeCounter = { written: 0, updated: 0, images: 0 }

const getImageNameFromUrl = imageUrl =>
    imageUrl.match(/([^?\/]+)(?=\?|$)/)[0];

const replaceImageUrls = bodyText => {
    const imageUrls = bodyText.match(
        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g
    );

    const uniqueUrls = imageUrls ? imageUrls.filter(ff.filterUniqueValues) : null;

    let relinkedMarkdown = '';

    if (uniqueUrls) {
        let newBodyText = bodyText;

        uniqueUrls.forEach(url => {
            newBodyText = newBodyText.replace(url, getImageNameFromUrl(url));
        });

        relinkedMarkdown = newBodyText;
    } else {
        relinkedMarkdown = bodyText;
    }

    return Object.freeze({
        relinkedMarkdown,
        imageUrls
    });
};

const scrubShortcodes = data => {
    const cleanedShortcodes = data.replace(/(?<={{<).*?(?=>}})/g, match => match.replace(/\\/g, '"'));

    const cleanedTitle = cleanedShortcodes.replace('title=" ', '');

    return cleanedTitle;
};

const logSuccessfulFileWrite = slug => {
    inspect.bland(`New file written: ${slug}`);
};

const writeFile = dataObj => {
    const { type, markdown, slug } = dataObj;

    const { relinkedMarkdown, imageUrls } = replaceImageUrls(markdown);

    const scrubbedShortcodes = scrubShortcodes(relinkedMarkdown);

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
                    const path = `${outputPath}/${getImageNameFromUrl(imageUrl)}`;

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

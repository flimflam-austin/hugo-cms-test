const { thenify } = require('./helpers')
const { buildQuery, querySanity, handleQueryResponse } = require('./queries')
const { schemas, schemaHelpers: sh } = require('./schemas')
const { validateSchema } = require('./validation')
const { buildNewSchema, convertEntryToMarkdown, outputFiles } = require('./oldscripts')


const counter = {
    filesSuccessful: 0,
    filesFailed: 0,
    totalFiles: 0,
    imagesWritten: 0
}

const run = async _ => {

    // const lastLog = getLastLog()
    const documentSchemas = sh.filterDocumentSchemas(schemas)

    await thenify(documentSchemas)
        .then(async schemaList =>
            Promise.all(schemaList.map(async schema => thenify(schema)
                .then(buildQuery)
                .then(querySanity)
                .then(handleQueryResponse)
                .then(async entries => {
                    counter.totalFiles += entries.length

                    return await Promise.all(entries.map(async entry => thenify(entry)
                        .then(validateSchema)
                        .then(buildNewSchema)
                        .then(convertEntryToMarkdown)
                        .then(outputFiles)
                        .then(result => {
                            const { imagesWritten } = result

                            if (imagesWritten) {
                                counter.imagesWritten += imagesWritten
                            }

                            return result.dataWritten
                        })
                        .then(result => {
                            counter.filesSuccessful += 1
                        })
                        .catch(err => {
                            counter.filesFailed += 1
                            console.error(`\nFailed to process entry with {type: ${entry._type}, id: ${entry._id}, slug: ${entry.slug?.current}} at mainProgram. Error: ${err.message}`)
                            return false
                        })))
                })
                .catch(err => {
                    console.error(`Error processing schema ${schema}`)
                    return false
                })


            ))
        )
        .catch(err => {
            console.error(`Aborting. Top level error in main program. Error: ${err.message}`)
        })
        .finally(() => {
            console.log('Final tally:')
            console.log(`Total files: ${counter.totalFiles}`)
            console.log(`Files successful: ${counter.filesSuccessful}`)
            console.log(`Files failed: ${counter.filesFailed}`)
            console.log(`Images downloaded: ${counter.imagesWritten}`)
        })

    return true
}

run()

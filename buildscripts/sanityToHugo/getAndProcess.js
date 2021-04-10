const client = require('./clientMaker')
const writeFiles = require('./outputfiles')
const convertFilesToMd = require('./filebuilder')
const buildlog = require('./buildlog.js')
const buildSchemaFromResponse = require('./schemabuilder')
const cacheCheck = require('./cacheCheck')
const inspect = require('./inspect')

/* const buildQuery = sinceDate =>
    `*[_type in ["quickquotes", "videoposts", "cardstack", "products", "author"] && _updatedAt > "${sinceDate}" ]  | order(_updatedAt desc) {..., mainimage{asset->{url}, caption, alt}, series->{title}}`
 */
const buildQuery = sinceDate => '*[_type in ["quickquotes", "videoposts", "cardstack", "products", "author"]]  | order(_updatedAt desc) {..., mainimage{asset->{url}, caption, alt}, series->{title}}'

const buildQueryParams = (params = {}) => params

const handleResponse = response => {
    inspect.strong(`Response length:\n-\t${response.length}\n\n`)

    if (typeof response === Error) {
        throw Error(response)
    }

    if (!response[0]) {
        throw Error('Response was empty.')
    }

    return response
}

const logStartMessage = (query, params) => {
    inspect.strong(
        '\n\n########################################\n-\tSanity.io Query Beginning\n########################################\n\n'
    )
    inspect.bland(
        `\nSending the following query:\n-\t${query}\n\nParams:\n-\t${JSON.stringify(
            params,
            null,
            2
        )}\n`
    )
}

const getLastBuildTime = async () => await buildlog.getLastLog()

const queryFromLastBuildLog = async () => await buildQuery(await getLastBuildTime())

const asyncGetRequest = async () => {
    const query = await queryFromLastBuildLog()

    const params = buildQueryParams()

    logStartMessage(query, params)

    const completeStatus = await client
        .fetch(query, params)
        .then(handleResponse)
        .then(buildSchemaFromResponse)

        /* .then(input => {
            inspect.bland(JSON.stringify(input, null, 2))
            return input
        }) */
        .then(convertFilesToMd)
        .then(writeFiles)
        .then(buildlog.logBuild)
        .then(cacheCheck)
        .then(() => '- Done')
        .catch(
            err =>
                `Done: Process quit before completion:\n-\tEither there is nothing new to download, or there was a failure.\n-\tPlease see message below for reason:\n-\t${err}`
        )

    const status = await `${completeStatus}\n\n########################################\n-\tSanity.io Query Complete\n########################################\n\n`

    inspect.strong(status)

    return status
}

module.exports = asyncGetRequest

const ff = require('./ff')

const handleQueryResponse = () => {

    // handle response from query
}

// ////////////////////////////////////


/*
================================================
****************  Item  ************************
================================================
*/
const normalize = item => item

const writeFile = item => item

const writeAssets = item => item

const report = item => item

const handleItemError = item => item

const buildItem = item =>
    ff.pipe(
        normalize,
        writeFile,
        writeAssets,
        handleItemError,
        report
    )(item)

const buildItems = items => items.map(buildItem)

/*
================================================
****************  _  *********************
================================================
*/

const processQueryResults = query =>
    query
        .fetch()
        .then(handleQueryResponse)
        .then(routeToSchemaCompiler)
        .then(buildItems)
        .catch(queryError)
        .finally(queryReport)

/*
================================================
****************  Program  *********************
================================================
*/

const queries = []

queries
    .map(processQueryResults)
    .map(handleErrors)
    .map(report)

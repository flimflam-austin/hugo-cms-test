const client = require('./../client')

const getAllQuickQuotesQuery = '*[_type == "videoposts"]'

const querySanity = async (query, params = {}) => await client.fetch(query, params)

const handleFetchError = err => {
    throw Error('Couldn\'t fetch')
}

const getDocumentIds = docs => docs.map(val => val._id)

const identity = x => x

const applyFunc = f => x => {
    f(x)
    return x
}

const inspect = applyFunc(console.log)

// throttler for api limits
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchData = async (query, params) =>
    querySanity(query, params)
        .then(getDocumentIds)
        .catch(handleFetchError)

const patchDoc = async docId => {
    console.log(docId)

    await wait(100)

    return await client
        .patch(docId)
        .set({
            is_breaking: false,
            is_featured: false,
            is_breaking_dropdown: false
        })
        .commit()
        .then(identity)
        .catch(err => console.error(err))
}

const patchDocs = async docIds => {
    for (let count = 0; count < docIds.length; count++) {
        await patchDoc(docIds[count])
    }

    return true
}


const patch = async () => {
    const docIds = await fetchData(getAllQuickQuotesQuery)

    console.log('got docIds')
    console.log('ready to patch')

    const docs = await patchDocs(docIds)
}

patch()

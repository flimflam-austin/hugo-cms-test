const handleQueryResponse = responseData => {
    const { response, query } = responseData

    if (!response) {
        throw Error(`Empty response received for query: ${query}`)
    }

    if (response.error) {
        throw Error(`Error received in response for query: ${query}; Error:`, response.error)
    }

    return response
}

module.exports = handleQueryResponse

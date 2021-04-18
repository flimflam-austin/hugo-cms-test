// eslint-disable-next-line no-console
const print = value => console.log(value)

const prettyPrintJson = jsonData => JSON.stringify(jsonData, null, '\t')

const simple = value => {
    print(value)
    return value
}

const json = value => {
    print(prettyPrintJson(value))
    return value
}

module.exports = { simple, json }

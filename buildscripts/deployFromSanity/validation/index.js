const { schemas } = require('./../schemas')

const findSchema = name => {
    const maybeMatch = schemas.filter(schema => schema.name.sanity === name)

    if (maybeMatch && maybeMatch[0]) {
        return maybeMatch[0]
    }

    throw Error(`Error finding matching schema for entry with name/type "${name}".`)
}

const compareEntryToSchema = (entry, schema) => {
    try {

        const schemaKeys = Object.keys(schema)
        const result = schemaKeys.map(key => {
            const schemaValue = schema[key]
            const entryValue = entry[key]

            if (!entry) {
                throw Error('FAILED VALIDATION: entry is missing, null, or undefined.')
            }

            if (schema[key].required && !entryValue) {
                throw Error(`FAILED VALIDATION: entry with {type: ${entry._type}, id: ${entry._id}, slug: ${entry.slug}} is missing the required field: ${key}`)
            }

            return true
        })

        return result
    } catch (err) {
        throw Error('FAILED VALIDATION:', err)
    }
}

const validateSchema = entry => {
    const schemaType = entry._type
    const schema = findSchema(schemaType)

    const result = compareEntryToSchema(entry, schema)

    return entry
}

module.exports = { validateSchema }

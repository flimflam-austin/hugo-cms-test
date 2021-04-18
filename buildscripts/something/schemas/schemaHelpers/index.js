const schemaIsDocument = schema => schema.type === 'document'

const filterDocumentSchemas = schemas => schemas.filter(schemaIsDocument)

const schemaIsComponent = schema => schema.type === 'component'

const filterComponentSchemas = schemas => schemas.filter(schemaIsComponent)


module.exports = {
    schemaIsDocument,
    filterDocumentSchemas,
    schemaIsComponent,
    filterComponentSchemas
}

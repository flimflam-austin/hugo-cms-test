const products = Object.freeze({
    type: 'document',
    name: {
        sanity: 'products',
        hugo: 'products'
    },
    fields: {
        _type: {
            required: true,
            newName: 'type'
        },
        _id: {
            required: true
        },
        _rev: {
            required: true
        },
        _createdAt: {
            required: true
        },
        _updatedAt: {
            required: false
        },
        slug: {
            required: true
        }
    }
})

module.exports = products

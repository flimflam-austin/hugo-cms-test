const author = Object.freeze({
    type: 'document',
    singleton: false,
    name: {
        sanity: 'author',
        hugo: 'author'
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

module.exports = author

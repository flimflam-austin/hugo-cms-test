const legal = Object.freeze({
    type: 'document',
    singleton: false,
    name: {
        sanity: 'legal',
        hugo: 'legal'
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
        },
        title: {
            required: true
        },
        body: {
            required: true
        },
        effectiveDate: {
            required: false
        },
        showInFooter: {
            required: true
        }
    }
})

module.exports = legal

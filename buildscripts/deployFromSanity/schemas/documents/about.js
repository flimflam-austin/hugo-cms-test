const about = Object.freeze({
    type: 'document',
    singleton: true,
    name: {
        sanity: 'about',
        hugo: 'about'
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
        tagline: {
            required: false
        },
        mainimage: {
            required: true
        },
        body: {
            required: true
        }
    }
})

module.exports = about

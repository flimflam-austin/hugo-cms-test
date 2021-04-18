const quickquotes = Object.freeze({
    type: 'document',
    name: {
        sanity: 'quickquotes',
        hugo: 'quick_quotes'
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
        datePublished: {
            required: true,
            rename: 'date'
        },
        lastModified: {
            required: false,
            rename: 'lastmod'
        },
        author: {
            required: false
        },
        title: {
            required: true
        },
        tags: {
            required: false
        },
        mainimage: {
            required: false,
            type: 'figure'
        },
        summary: {
            required: false
        },
        aliases: {
            required: false
        },
        body: {
            required: false,
            type: 'blockContent'
        },
        weight: {
            required: false,
            default: 50
        },
        featured_quote: {
            required: true,
            type: 'featuredquote'
        },
        is_breaking: {
            required: false,
            default: false
        }
    }
})

module.exports = quickquotes

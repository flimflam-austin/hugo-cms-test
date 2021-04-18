const quickreads = Object.freeze({
    type: 'document',
    name: {
        sanity: 'cardstack',
        hugo: 'quick_reads'
    },
    queryMutations: ['series->{title}'],
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
        series: {
            required: true,
            rename: 'card_series'
        },
        cards: {
            required: true,
            type: ['cards']
        },
        colorpaletteclassname: {
            required: true
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
        }
    }
})

module.exports = quickreads

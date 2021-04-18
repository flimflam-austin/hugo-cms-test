const videoposts = Object.freeze({
    type: 'document',
    name: {
        sanity: 'videoposts',
        hugo: 'video_posts'
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
        series: {
            required: false,
            rename: 'video_series'
        },
        is_featured: {
            required: false,
            default: false
        },
        is_breaking: {
            required: false,
            default: false
        },
        is_breaking_dropdown: {
            required: false,
            default: false
        }
    }
})

module.exports = videoposts

const baseSchema = Object.freeze({
    _id: {
        type: String,
        required: true
    },
    _rev: {
        type: String,
        required: false
    },
    draft: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    aliases: {
        type: Array,
        required: false
    },
    _createdAt: {
        type: String,
        parsable: 'timestamp',
        required: true
    },
    _updatedAt: {
        type: String,
        parsable: 'timestamp',
        required: false
    },
    date: {
        type: String,
        parsable: 'timestamp',
        required: true
    },
    lastmod: {
        type: String,
        parsable: 'timestamp',
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    tags: {
        type: Array,
        required: false
    },
    summary: {
        type: String,
        required: false
    },
    featuredImage: {
        type: Object,
        fields: {
            url: {
                type: String,
                required: false
            },
            alt: {
                type: String,

            }
        }
        url: '',
        alt: '',
        caption: ''
    },
    authorReference: ''
})


const getRequiredField = ()


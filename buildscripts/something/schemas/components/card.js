const card = Object.freeze({
    type: 'component',
    name: {
        sanity: 'card'
    },
    fields: {
        showCheckmark: {
            required: false
        },
        body: {
            required: true,
            type: 'cardContent'
        },
        citation: {
            required: false
        }
    }
})

module.exports = card

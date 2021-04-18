const sh = require('./../schemahelpers')
const ff = require('./../../ffhelpers')

const getProductsFields = data => {
    try {

        const fields = [
            sh.getFlatPair('product_series', data.productSeries),
            sh.getFlatPair('price', data.price),
            sh.getFlatPair('discounted_from_price', data.discountedFromPrice),
            sh.getFlatPair('storeLink', data.storeLink)
        ]

        return ff.compileValidArrayValues(fields)
    } catch (err) {
        throw Error('Error getting product fields at getProductsFields in products.js Error:', err)
    }
}

module.exports = getProductsFields

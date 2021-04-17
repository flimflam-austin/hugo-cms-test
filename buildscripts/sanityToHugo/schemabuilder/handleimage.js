const client = require('./../clientMaker')
const imageUrlBuilder = require('@sanity/image-url')

// takes in an Image object, applies crop & hotspot, and returns the download url.

/*

const ImageObject = {
    asset: {
        url: ' '
    },
    alt: ' ',
    caption: ' ',
    crop: {
        _type: 'sanity.imageCrop',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    hotspot: {
        _type: 'sanity.imageHotspot',
        height: 0,
        width: 0,
        x: 0,
        y: 0
    }
}

*/

const builder = imageUrlBuilder(client)

const urlFor = source => builder.image(source).url()

const getImageUrl = imageObject => (imageObject ? urlFor(imageObject) : null)

module.exports = getImageUrl

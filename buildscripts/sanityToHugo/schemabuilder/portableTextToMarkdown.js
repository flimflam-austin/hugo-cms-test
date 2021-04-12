const toMarkdown = require('@sanity/block-content-to-markdown');

// const getYouTubeId = require('get-youtube-id');
const ff = require('./../ffhelpers');
const getVideoId = require('get-video-id');
const imageUrlBuilder = require('@sanity/image-url');
const client = require('./../clientMaker');
const inspect = require('./../inspect')

const builder = imageUrlBuilder(client);

// TODO: Implement instagram feed plugin with api key: https://github.com/stevenschobert/instafeed.js/wiki/Managing-Access-Tokens
// /(?<=instagram\.com\/).*?(?=\/\?)/gi
const instagramIdRegex = /(?<=instagram\.com\/.*\/).*?(?=\/\?)/gi;

const getInstagramId = url => url.match(instagramIdRegex);

const serializers = {
    types: {
        image: node => {
            const asset = node.asset || node.node.asset;
            const alt = node.alt || node.node.alt || 'article image';

            if (!asset) {
                inspect.errorRed(Error(`Could not extract image ref from node: ${JSON.stringify(node)}.`))
                return '';
            }

            const imageSource = builder.image(asset);

            const imageUrl = imageSource.url();

            if (!imageUrl) {
                inspect.errorRed(
                    Error(`Failed to extract image url from node: ${JSON.stringify(node)}`)
                );
                return '';
            }

            return `{{< figure src="${imageUrl}" alt="${alt}" >}}`;
        },
        youtube: node => {
            const url = node.url || node.node.url;

            if (!url) {
                throw Error(`Could not extract Youtube id from node: ${JSON.stringify(
                    node
                )} at url: ${url}`)
            }

            const { id, service } = getVideoId(url);

            // return `{{< youtube id="${getYouTubeId(url)}" >}}`;
            return `{{< youtube id="${id}" >}}`;
        },
        vimeo: node => {
            const { url } = node;

            if (!url) {
                throw Error(`Could not get url from node: ${JSON.stringify(
                    node
                )} at url: ${url}`);
            }

            const { id, service } = getVideoId(node);

            if (!id) {
                throw Error(`Could not get id from node: ${JSON.stringify(
                    node
                )} at url: ${url}`)
            }

            if (service === 'vimeo') {
                return `{{< vimeo id="${id}" >}}`;
            }
            return `{{< youtube id="${id}" >}}`;

        },
        instagramPost: node => {
            const { url } = node;

            if (!url) {
                throw Error(`Could not get url from node: ${JSON.stringify(
                    node
                )} at url: ${url}`)
            }

            const idArray = getInstagramId(url);

            if (!idArray || !idArray[0]) {
                throw Error(`Could not extract instagram post id from node: ${JSON.stringify(
                    node
                )} at url: ${url}`)
            }

            return `{{< instapost id="${idArray[0]}" >}}`;
        }
    }
};

const portableTextToMarkdown = portableText => {
    if (!portableText) {
        inspect.errorRed('Could not parse portable text, value is falsey.');
        return null;
    }

    const translatedText = toMarkdown(portableText, { serializers });

    return ff.isValue(translatedText) ? translatedText : ' ';
};

module.exports = portableTextToMarkdown;

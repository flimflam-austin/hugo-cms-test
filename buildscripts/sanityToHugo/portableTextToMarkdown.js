const toMarkdown = require("@sanity/block-content-to-markdown");
const getYouTubeId = require("get-youtube-id");
const ff = require("./ffhelpers");
const getVideoId = require("get-video-id");

// TODO: Implement instagram feed plugin with api key: https://github.com/stevenschobert/instafeed.js/wiki/Managing-Access-Tokens
// /(?<=instagram\.com\/).*?(?=\/\?)/gi
const instagramIdRegex = /(?<=instagram\.com\/.*\/).*?(?=\/\?)/gi;

const getInstagramId = (url) => url.match(instagramIdRegex);

const serializers = {
  types: {
    youtube: (node) => {
      const { url } = node;
      if (!url)
        throw `Could not extract Youtube id from node: ${JSON.stringify(
          node
        )} at url: ${url}`;

      return `{{< youtube id="${getYouTubeId(node.url)}" >}}`;
    },
    vimeo: (node) => {
      const { url } = node;
      if (!url)
        throw `Could not get url from node: ${JSON.stringify(
          node
        )} at url: ${url}`;

      const { id, service } = getVideoId(node);
      if (!id)
        throw `Could not get id from node: ${JSON.stringify(
          node
        )} at url: ${url}`;

      if (service === "vimeo") {
        return `{{< vimeo id="${id}" >}}`;
      } else {
        return `{{< youtube id="${id}" >}}`;
      }
    },
    instagramPost: (node) => {
      const { url } = node;
      if (!url)
        throw `Could not get url from node: ${JSON.stringify(
          node
        )} at url: ${url}`;

      const idArray = getInstagramId(url);
      if (!idArray || !idArray[0])
        throw `Could not extract instagram post id from node: ${JSON.stringify(
          node
        )} at url: ${url}`;

      return `{{< instapost id="${idArray[0]}" >}}`;
    },
  },
};

const portableTextToMarkdown = (portableText) => {
  if (!portableText) {
    console.log("Could not parse portable text, value is falsey.");
    return null;
  }

  const translatedText = toMarkdown(portableText, { serializers });

  return ff.isValue(translatedText) ? translatedText : " ";
};

module.exports = portableTextToMarkdown;

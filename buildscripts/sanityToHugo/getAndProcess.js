//https://baldbeardedbuilder.com/blog/using-netlify-functions-to-add-comments-to-gridsome/
//https://www.stackbit.com/blog/jamstack-api-zapier-webhooks-2/
//https://time2hack.com/jamstack-showing-top-github-repositories-netlify-functions/

/* const { Octokit } = require('@octokit/rest');
const querystring = require('querystring');
const yaml = require('js-yaml'); */

///////////////////////////////////////////

/* const { GITHUB_USERNAME, GITHUB_AUTHTOKEN, GITHUB_REPO } = process.env;

const octokit = new Octokit({ auth: GITHUB_AUTHTOKEN }); */
///////////////////////////////////////////
const OUTPUT_CONFIG = Object.freeze({});
///////////////////////////////////////////

const sanityClient = require("@sanity/client");
const sh = require("./schemahelpers");

const writeFiles = require("./outputfiles");
const ff = require("./ffhelpers");
const convertFilesToMd = require("./filebuilder");
const log = require("./buildlog");
const schema = require("./schemabuilder");
const shortcodeFix = require("./fixShortcode");

const sanityToken =
  "skT56bQ7gH63mOrsGUHTwh9hO6Hfx6npXXboZQMp4gdkt4JqkZCcn8mUtRvkMAhj82hIqcvf23asmaHbVlAgeXmJjqenA8KrEnXTwMVLhFIDVp7FJwNxAtjznqoRoMvVP86bksCeIbAV8MeapCTczWEstIzLF5ch3uQgWARLDIy3fG506ga2";
const client = sanityClient({
  projectId: "zhir6k5d",
  dataset: "public",
  token: sanityToken, // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
});

const buildQuery = (sinceDate) =>
  `*[_type in ["quickquotes", "videoposts", "cardstack", "products", "author"] && _updatedAt > "${sinceDate}" ]  | order(_updatedAt desc) {..., mainimage{asset->{url}, caption, alt}, series->{title}}`;

/* const buildQuery = (sinceDate) =>
	`*[_type in ["author"] && _updatedAt > "${sinceDate}" ]  | order(_updatedAt desc) {..., mainimage{asset->{url}, caption, alt}, series->{title}}`; */

const buildQueryParams = (params = {}) => params;

const buildSchemaFromResponse = (responseData) =>
  responseData.map(schema.getJsonFromSanityData);

const handleResponse = (response) => {
  console.log(`Response length:\n-\t${response.length}\n\n`);

  if (typeof response === "error") throw response;

  if (!response[0]) throw "Response was empty.";

  return response;
};

const startMessage =
  "\n\n########################################\n-\tSanity.io Query Beginning\n########################################\n\n";

const endMessage =
  "\n\n########################################\n-\tSanity.io Query Complete\n########################################\n\n";

const asyncGetRequest = async () => {
  console.log(startMessage);

  const lastBuildTime = log.getLastLog();
  const articlesSinceDate = lastBuildTime;

  const query = buildQuery(articlesSinceDate);
  const params = buildQueryParams();

  console.log(
    `\nSending the following query:\n-\t${query}\n\nParams:\n-\t${JSON.stringify(
      params,
      null,
      2
    )}\n`
  );

  const completeStatus = await client
    .fetch(query, params)
    .then(handleResponse)
    .then(buildSchemaFromResponse)
    .then(convertFilesToMd)
    .then(writeFiles)
    .then(log.logBuild)
    .then(() => {
      return "- Done";
    })
    .catch(
      (err) =>
        `Done: No changes made to content:\n-\tEither there is nothing new to download, or there was a failure.\n-\tPlease see message below for reason:\n-\t${err}`
    );

  shortcodeFix.scrubShortcodes();

  return completeStatus + endMessage;
};

module.exports = asyncGetRequest;

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

const sh = require("./schemahelpers");
const client = require("./clientMaker");
const writeFiles = require("./outputfiles");
const ff = require("./ffhelpers");
const convertFilesToMd = require("./filebuilder");
const log = require("./buildlog");
const schema = require("./schemabuilder");
const shortcodeFix = require("./fixShortcode");

/* const sanityToken =
  "skxpyFFigQN4rUKuoXeGFnmWR0uEbk4NU0gcioVGbSsWSMrjcKvvGGseNLpNgY1gu6nVe8ryeRDRrSmllb2OsJ1OZMhfcNuouI5o1Ih4RFsgR4NEDjotEaDldAYRHincV5GTAB7oxwCG1gxVByWFFLY6bowUkiLXHHZyVkSpjlEFzkurfKw6";

const client = sanityClient({
  projectId: "zhir6k5d",
  dataset: "public",
  token: sanityToken, // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2021-03-20",
});
 */
const buildQuery = (sinceDate) =>
  `*[_type in ["quickquotes", "videoposts", "cardstack", "products", "author"] && _updatedAt > "${sinceDate}" ]  | order(_updatedAt desc) {..., mainimage{asset->{url}, caption, alt}, series->{title}}`;

/* const buildQuery = (sinceDate) =>
	`*[_type in ["author"] && _updatedAt > "${sinceDate}" ]  | order(_updatedAt desc) {..., mainimage{asset->{url}, caption, alt}, series->{title}}`; */

const buildQueryParams = (params = {}) => params;

const buildSchemaFromResponse = (responseData) =>
  responseData.map(schema.getJsonFromSanityData);

const handleResponse = (response) => {
  console.log(`Response length:\n-\t${response.length}\n\n`);

  if (typeof response === Error) throw response;

  if (!response[0]) throw "Response was empty.";

  return response;
};

const logStartMessage = (query, params) => {
  console.log(
    "\n\n########################################\n-\tSanity.io Query Beginning\n########################################\n\n"
  );
  console.log(
    `\nSending the following query:\n-\t${query}\n\nParams:\n-\t${JSON.stringify(
      params,
      null,
      2
    )}\n`
  );
};

const inspect = (data) => {
  console.log(JSON.stringify(data, null, 2));
  return data;
};

const asyncGetRequest = async () => {
  const lastBuildTime = log.getLastLog();
  const articlesSinceDate = lastBuildTime;

  const query = buildQuery(articlesSinceDate);

  const params = buildQueryParams();

  logStartMessage(query, params);

  const completeStatus = await client
    .fetch(query, params)
    .then(handleResponse)
    //.then(inspect)
    .then(buildSchemaFromResponse)
    .then(convertFilesToMd)
    .then(writeFiles)
    .then(log.logBuild)
    .then(() => {
      return "- Done";
    })
    .catch(
      (err) =>
        `Done: Process quit before completion:\n-\tEither there is nothing new to download, or there was a failure.\n-\tPlease see message below for reason:\n-\t${err}`
    );

  return await (completeStatus +
    "\n\n########################################\n-\tSanity.io Query Complete\n########################################\n\n");
};

module.exports = asyncGetRequest;

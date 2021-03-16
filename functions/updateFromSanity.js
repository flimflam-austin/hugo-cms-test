//https://baldbeardedbuilder.com/blog/using-netlify-functions-to-add-comments-to-gridsome/
//https://www.stackbit.com/blog/jamstack-api-zapier-webhooks-2/
//https://time2hack.com/jamstack-showing-top-github-repositories-netlify-functions/

const { Octokit } = require("@octokit/rest");
const querystring = require("querystring");
const yaml = require("js-yaml");

const { GITHUB_USERNAME, GITHUB_AUTHTOKEN, GITHUB_REPO } = process.env;

const octokit = new Octokit({ auth: GITHUB_AUTHTOKEN });

console.log(GITHUB_USERNAME, GITHUB_AUTHTOKEN, GITHUB_REPO);

const sanityClient = require('@sanity/client');

const sanityToken =
    'skxpyFFigQN4rUKuoXeGFnmWR0uEbk4NU0gcioVGbSsWSMrjcKvvGGseNLpNgY1gu6nVe8ryeRDRrSmllb2OsJ1OZMhfcNuouI5o1Ih4RFsgR4NEDjotEaDldAYRHincV5GTAB7oxwCG1gxVByWFFLY6bowUkiLXHHZyVkSpjlEFzkurfKw6';

const client = sanityClient({
    projectId: 'zhir6k5d',
    dataset: 'public',
    token: sanityToken, // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: '2021-03-20'
});

module.exports = client

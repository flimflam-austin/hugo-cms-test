const sanityClient = require('@sanity/client');

const sanityToken =
    'skBfhVq8Z1uJIQXetPfC5YlHTn2KHzxpqmJAXl1w2Expv1tuKYWEveECzmtkrruTjLtnZGjgiHrIDIysqUtQRalfFLgW3gFwsTnTh5Iecl5n1Ss6gIrl8aEAEbhBZcP4MnWSvv4Diwajcdzu5ScMHxH66tRCUNSOSfpho0XqXjQricSAkEmf';

const client = sanityClient({
    projectId: 'zhir6k5d',
    dataset: 'public',
    token: sanityToken, // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
    apiVersion: '2021-03-20'
});

module.exports = client;

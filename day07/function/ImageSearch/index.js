const axios = require('axios');
const AUTH_HEADER = 'Client-ID ' + process.env.UNSPLASH_KEY;

module.exports = async function (context, req) {
    context.log('About to search for images.');

    if (req.query.text) {

        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: req.query.text, per_page: 3 },
            headers: {
                Authorization: AUTH_HEADER
            }
        });

        var imageArray = [];
        if (response.data && response.data.results) {
            imageArray = response.data.results.map(entry => {
                var img = {};

                img.id = entry.id;
                img.urls = {
                    regular: entry.urls.regular
                };
                img.alt_description = entry.alt_description;

                return img;
            });
        }

        context.res = {
            body: imageArray
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a text param on the query string"
        };
    }
};
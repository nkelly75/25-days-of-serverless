const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

let key = process.env['COMPUTER_VISION_SUBSCRIPTION_KEY'];
let endpoint = process.env['COMPUTER_VISION_ENDPOINT'];

let computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

// Formats the image categories
function formatCategories(categories) {
    categories.sort((a, b) => b.score - a.score);
    return categories.map(cat => `${cat.name} (${cat.score.toFixed(2)})`).join(', ');
}

function formatTags(tags) {
    return tags.map(tag => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && req.body.url) {
        let result = {};
        let describeURL = req.body.url;

        console.log('Analyzing URL image to describe...', describeURL.split('/').pop());
        let result1 = await computerVisionClient.describeImage(describeURL);
        if (result1.captions && result1.captions.length > 0) {
            let caption = result1.captions[0];
            result.caption = `${caption.text} (${caption.confidence.toFixed(2)} confidence)`;
            // console.log(`This may be ${caption.text} (${caption.confidence.toFixed(2)} confidence)`);    
        }

        let result2 = await computerVisionClient.analyzeImage(describeURL, {
            visualFeatures: ['Tags', 'Categories']
        });

        if (result2.categories) {
            let categories = result2.categories;
            result.categories = formatCategories(categories);
            // console.log(`Categories: ${formatCategories(categories)}`);
        }
        if (result2.tags) {
            let tags = result2.tags;
            result.tags = formatTags(tags);
            // console.log(`Tags: ${formatTags(tags)}`);
        }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: result
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
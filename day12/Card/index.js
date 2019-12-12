const redis = require("redis");
const bluebird = require("bluebird");
const Gists = require('gists');
const gists = new Gists({});
const showdown = require('showdown');
const emoji = require('../shared/emoji');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(6380,
    process.env.REDISCACHEHOSTNAME, {
    auth_pass: process.env.REDISCACHEKEY,
    tls: { servername: process.env.REDISCACHEHOSTNAME }
});

let converter = null;

module.exports = async function (context, req) {
    context.log('Retrieving a card');

    if (req.params.id) {
        let id = req.params.id;

        // Check redis
        var html = await client.getAsync(id);

        if (!html) {
            // Not cached, try to retrieve from gist, render etc.
            html = await retrieveAndRender(id, context);
            if (html) {
                // Save for next time
                await client.setAsync(id, html);
            }
        }

        if (html) {
            context.res = {
                body: html,
                headers: {
                    "Content-Type": "text/html"
                }
            };
        } else {
            context.res = {
                status: 500,
                body: "Internal error"
            };    
        }
    } else {
        context.res = {
            status: 400,
            body: "Please pass a valid ID"
        };
    }
};

retrieveAndRender = async function (id, context) {
    // Get map of emoji names to image links from github API (may already have it)
    await emoji.getSupportedEmojis();

    if (!converter) {
        converter = new showdown.Converter({
            extensions: [emoji.convertEmojis]
        });
    }

    let html = null;
    let res = await gists.get(id);

    if (res.body && res.body.files) {
        let fileEntries = Object.entries(res.body.files);
        if (fileEntries.length > 0) {
            context.log('Filename: ' + fileEntries[0][0]);
            let fileDetails = fileEntries[0][1];
            if (fileDetails.content) {
                html = converter.makeHtml(fileDetails.content);
            }
        }
    }

    return html;
}
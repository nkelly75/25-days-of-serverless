const redis = require("redis");
const bluebird = require("bluebird");

const Gists = require('gists');
const showdown  = require('showdown');
// const showdownEmoji = require('showdown-emoji');
// const emojiConverter = require('./emojiConverter');

var regexEmoji = require("regex-emoji"),
    matchAll = require("match-all"),
    barbe = require("barbe");

const supportedEmojis = {
    "heart_eyes": "https://github.githubassets.com/images/icons/emoji/unicode/1f60d.png?v8",
    "santa": "https://github.githubassets.com/images/icons/emoji/unicode/1f385.png?v8",
    "helicopter": "https://github.githubassets.com/images/icons/emoji/unicode/1f681.png?v8"
};

function emojer(message, template, supportedEmojis) {
    var emojis = matchAll(message, regexEmoji()).toArray(),
        objEmojis = {};

    emojis.forEach(supportedEmojis ? function (c) {
        if (!supportedEmojis[c]) {
            return;
        }
        let path = supportedEmojis[c];
        objEmojis[c] = barbe(template, ["__", "__"], { EMOJI_NAME: c, EMOJI_PATH: path });
    } : function (c) {
        objEmojis[c] = barbe(template, ["__", "__"], { EMOJI_NAME: c });
    });

    return barbe(message, [":", ":"], objEmojis);
};

function convertEmojis() {
    return [
    {
        type: "output",
        filter: function filter(text) {
            return emojer(text, "<img src=\"__EMOJI_PATH__\" alt=\":__EMOJI_NAME__:\" title=\":__EMOJI_NAME__:\" class=\"emoji-img emoji\">", supportedEmojis);
        }
    }];
};


const converter = new showdown.Converter({
    extensions: [convertEmojis]
});

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(6380,
    process.env.REDISCACHEHOSTNAME, {
    auth_pass: process.env.REDISCACHEKEY,
    tls: { servername: process.env.REDISCACHEHOSTNAME }
});

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log("Cache response : " + await client.pingAsync());
    context.log("Cache response : " + await client.getAsync("Message"));
    context.log("Cache response : " + await client.setAsync("Message",
        "Hello! The cache is working from Node.js!"));
    context.log("Cache response : " + await client.getAsync("Message"));

    // aiden b403f6575ff632db92f98fa518ad8de4
    // emma 5dc67aee3a35d403b020034358610a90

    // https://api.github.com/gists/b403f6575ff632db92f98fa518ad8de4
    // https://api.github.com/gists/5dc67aee3a35d403b020034358610a90
    // https://api.github.com/emojis

    const gists = new Gists({});
    gists.list('nkelly75').then(res => {
        context.log(res);
    }).catch(err => {
        context.log("Error with gist");
    });

    gists.get('b403f6575ff632db92f98fa518ad8de4').then(res => {
        if (res.body && res.body.files) {
            let fileEntries = Object.entries(res.body.files);
            if (fileEntries.length > 0) {
                context.log('Filename: ' + fileEntries[0][0]);
                let fileDetails = fileEntries[0][1];
                if (fileDetails.content) {
                    context.log('Content: ' + fileDetails.content);
                    let html = converter.makeHtml(fileDetails.content);
                    context.log('Html: ' + html);
                }
            }
        }
    }).catch(err => {
        context.log("Error with gist", err);
    });


    if (req.query.name) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};
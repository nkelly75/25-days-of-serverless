const Gists = require('gists');
const gists = new Gists({});
const showdown = require('showdown');
const emoji = require('../shared/emoji');

module.exports = async function (context, req) {
    context.log('Retrieving a card');

    await emoji.getSupportedEmojis();

    const converter = new showdown.Converter({
        extensions: [emoji.convertEmojis]
    });

    if (req.params.id) {
        let html = null;
        let res = await gists.get(req.params.id);

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
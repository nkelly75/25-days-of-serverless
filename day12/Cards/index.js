const handlebars = require('handlebars');
const Gists = require('gists');
const gists = new Gists({});

const htmlSrc =
    '<html><head><title>List of Cards</title></head>' +
    '<body><ul>' +
    '{{#each cards}}' +
    '<li><a href="/api/Card/{{this.id}}">{{this.filename}}<a></li>' +
    '{{/each}}' +
    '</ul></body></html>';

let template = handlebars.compile(htmlSrc);

module.exports = async function (context, req) {
    context.log('Looking for cards.');

    let cards = [];
    let res = await gists.list('nkelly75');
    context.log('Got result length: ' + res.body.length);

    if (res.body && res.body.length > 0) {
        cards = res.body.map(obj => {
            var rObj = {};
            if (obj.id) {
                rObj.id = obj.id;
            }
            if (obj.files) {
                let fileEntries = Object.entries(obj.files);
                if (fileEntries.length > 0 && fileEntries[0].length > 0) {
                    rObj.filename = fileEntries[0][0];
                }
            }
            return rObj;
        }).filter(obj => {
            return (obj.id && obj.filename);
        });
    }

    let html = template({
        cards: cards
    });

    context.res = {
        body: html,
        headers: {
            "Content-Type": "text/html"
        }
    };
};
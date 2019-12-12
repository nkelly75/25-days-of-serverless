const axios = require("axios"),
    regexEmoji = require("regex-emoji"),
    matchAll = require("match-all"),
    barbe = require("barbe");

let supportedEmojis = null;

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

module.exports.getSupportedEmojis = async function () {
    if (!supportedEmojis) {
        var githubEmojis = await axios.get('https://api.github.com/emojis');
        supportedEmojis = githubEmojis.data;
    }
}

module.exports.convertEmojis = function () {
    return [{
        type: "output",
        filter: function filter(text) {
            return emojer(text,
                "<img src=\"__EMOJI_PATH__\" alt=\":__EMOJI_NAME__:\" title=\":__EMOJI_NAME__:\" class=\"emoji-img emoji\">",
                supportedEmojis);
        }
    }];
};

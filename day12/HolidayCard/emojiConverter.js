"use strict";

var emojer = require("emojer"),
    emojis = require("github-api-emojis/lib/map");

module.exports = function showdownEmoji() {
    return [{
        type: "output",
        filter: function filter(text) {
            return emojer(text, "<img src=\"https://github.githubassets.com/images/icons/emoji/unicode/__EMOJI_NAME__.png?v8\" alt=\":__EMOJI_NAME__:\" title=\":__EMOJI_NAME__:\" class=\"emoji-img emoji\">", emojis);
        }
    }];
};
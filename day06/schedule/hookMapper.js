const qs = require("querystring");
const chrono = require('chrono-node');

module.exports = function (req) {
    var payload = null;
    var bodyAsJson = qs.parse(req.rawBody);

    if (req && req.rawBody) {
        if (bodyAsJson && bodyAsJson.text) {
            payload = {
                message: bodyAsJson.text
            };

            var referenceDate = new Date();
            var parsed = chrono.parse(bodyAsJson.text, referenceDate, { forwardDate: true });
            if (parsed.length > 0 && parsed[0].start) {
                var startDate = parsed[0].start.date()

                payload.startDate = startDate;
            }
        }
    }

    return payload;
};
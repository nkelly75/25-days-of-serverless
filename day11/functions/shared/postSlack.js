const axios = require('axios');

module.exports = async function(context, messageText) {
    const notification = {
        text: messageText
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    let res = await axios.post(process.env.SLACK_HOOK, notification, { headers: headers });

    context.log(`Status code: ${res.status}`);
};
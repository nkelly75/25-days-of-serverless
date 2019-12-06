const df = require("durable-functions");
const hookMapper = require('./hookMapper');
const postSlack = require('../shared/postSlack');

module.exports = async function (context, req) {
    context.log(`About to attempt to schedule`);
    var payload = hookMapper(req);

    context.log(`After parsing, payload = '${payload}'`);

    if (payload && payload.startDate) {
        const client = df.getClient(context);

        const instanceId = await client.startNew('scheduleOrchestrator', undefined, payload);
        context.log(`Started orchestration with ID = '${instanceId}'.`);

        await postSlack(context, 'Scheduled as requested:> ' + payload.message);
    
        // return client.createCheckStatusResponse(context.bindingData.req, instanceId);
    } else {
        var errMsg = 'Unable to schedule:> ';
        if (payload && payload.message) {
            errMsg += payload.message;
        }
        await postSlack(context, errMsg);
    }
};
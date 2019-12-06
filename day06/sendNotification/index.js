const postSlack = require('../shared/postSlack');

/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 */
module.exports = async function (context) {
    const { message, startDate } = context.bindings.payload;

    context.log(`About to send notification: '${message}'`);
    await postSlack(context, 'Reminder as scheduled:> ' + message);

    return message;
};

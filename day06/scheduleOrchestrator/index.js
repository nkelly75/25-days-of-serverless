const df = require("durable-functions");

/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 */

 module.exports = df.orchestrator(function* (context) {
    const input = context.df.getInput();

    context.log(`Orchestrator: before createTimer`);
    yield context.df.createTimer(new Date(input.startDate));
  
    context.log(`Orchestrator: before callActivity`);
    return yield context.df.callActivity('sendNotification', input);
});
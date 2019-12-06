const df = require("durable-functions");

/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 */

 module.exports = df.orchestrator(function* (context) {
    const input = context.df.getInput();

    // TODO -- 1
    yield context.df.createTimer(new Date(input.startAt))
  
    return yield context.df.callActivity('sendMail', input);
});
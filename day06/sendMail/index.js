const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env['SENDGRID_API_KEY']);

/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 */
module.exports = async function (context) {
    const { email, title, startAt, description } = context.bindings.payload;

    const msg = {
        to: email,
        from: { email: 'nkelly75@gmail.com', name: 'Durable Functions' },
        subject: `Test: ${title}`,
        html: `<h4>${title} @ ${startAt}</h4> <p>${description}</p>`
    };
    sgMail.send(msg);

    return msg;
};
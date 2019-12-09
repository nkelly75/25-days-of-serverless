module.exports = async function (context, req, services) {
    context.res.body = services;
};
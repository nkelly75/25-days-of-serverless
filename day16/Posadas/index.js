const posadas = require('./posadas');

module.exports = async function (context, req) {
    context.res = {
        body: posadas
    };
};
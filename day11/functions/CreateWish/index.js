const uuidv1 = require('uuid/v1');

module.exports = async function (context, req) {
    context.log('About to create wish');

    if (req.body && req.body.description && req.body.kidName &&
        req.body.address && req.body.wishType) {

        let wish = ({ description, kidName, address, wishType } = req.body);
        wish.id = uuidv1();

        context.bindings.wishDocument = JSON.stringify(wish);

        context.res = {
            body: wish
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a valid wish"
        };        
    }
};
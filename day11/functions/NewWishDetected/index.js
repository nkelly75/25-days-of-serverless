const postSlack = require('../shared/postSlack');

module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {

        let parsedWish = ({ description, kidName, address, wishType } = documents[0]);

        context.log(`About to send notification for: '${parsedWish.kidName}'`);
        await postSlack(context, 'New wish from: ' + parsedWish.kidName
            + '. Type=' + parsedWish.wishType
            + '. Description=' + parsedWish.description
            + '. See DB for address');
    }
}

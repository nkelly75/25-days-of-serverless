const uuidv1 = require('uuid/v1');

module.exports = async function (context, req) {
    context.log('About to create dish');

    if (req.body && req.body.name && req.body.friend) {

        let dish = ({ name, friend } = req.body);
        dish.id = uuidv1();

        context.bindings.dishDocument = JSON.stringify(dish);

        context.res = {
            body: dish
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a valid dish"
        };
    }
};
module.exports = async function (context, req) {
    context.log('About to change dish');

    if (req.body && req.body.name && req.body.friend) {

        let dish = ({ name, friend } = req.body);
        dish.id = req.params.id;

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
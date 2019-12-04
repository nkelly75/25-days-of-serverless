module.exports = async function (context, req) {
    context.log('About to get dishes.');

    var dishes = context.bindings.dishes;
    var results = [];

    dishes.forEach(inputDish => {
        let dish = {};

        dish.id = inputDish.id;
        dish.name = inputDish.name;
        dish.friend = inputDish.friend;

        results.push(dish);
    });

    context.res = {
        body: results
    };
};
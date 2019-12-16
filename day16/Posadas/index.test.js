const httpFunction = require('./index');
const context = {
    log: jest.fn()
};
const request = {
    query: {}
};

test('should return an array with at least one posada', async() => {
    await httpFunction(context, request);

    expect(context.res.body.length).toBeGreaterThan(0);
});

test('first posada on 16th should be hosted by Xanath in Centro', async() => {
    await httpFunction(context, request);

    expect(context.res.body[0].host).toBe('Xanath');
    expect(context.res.body[0].location).toBe('Centro');
    expect(context.res.body[0].day).toBe(16);
});

test('each element should have consistent format', async() => {
    await httpFunction(context, request);

    for (let i = 0; i < context.res.body.length; ++i) {
        let element = context.res.body[i];
        expect(element).toHaveProperty('host');
        expect(typeof element.host).toBe('string');
        expect(element).toHaveProperty('location');
        expect(typeof element.location).toBe('string');
        expect(element).toHaveProperty('day');
        expect(typeof element.day).toBe('number');
    }
});
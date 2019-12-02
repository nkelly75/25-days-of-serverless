const httpFunction = require('./index');
const context = require('../testing/defaultContext');

test('should return an expected dreidel', async() => {
    const request = {
        query: {}
    };

    await httpFunction(context, request);

    expect(['נ', 'ג', 'ה', 'ש']).toContain(context.res.body.symbol);
    expect(['Nun', 'Gimmel', 'Hay', 'Shin']).toContain(context.res.body.name);
});

test('each side should show up after several spins, also no surprises', async() => {
    const request = {
        query: {}
    };

    var counts = {
        nun: 0,
        gimmel: 0,
        hay: 0,
        shin: 0,
        surprises: 0
    };

    for (var i = 0; i < 20; ++i) {
        await httpFunction(context, request);
        switch (context.res.body.name) {
            case 'Nun':
                counts.nun++;
                break;
            case 'Gimmel':
                counts.gimmel++;
                break;
            case 'Hay':
                counts.hay++;
                break;
            case 'Shin':
                counts.shin++;
                break;
            default:
                counts.surprises++;
        }
    }

    expect(counts.surprises).toBe(0);
    expect(counts.nun).toBeGreaterThan(0);
    expect(counts.gimmel).toBeGreaterThan(0);
    expect(counts.hay).toBeGreaterThan(0);
    expect(counts.shin).toBeGreaterThan(0);
});
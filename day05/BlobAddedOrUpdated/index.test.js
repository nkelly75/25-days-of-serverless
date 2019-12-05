const blobFunction = require('./index');
const fs = require('fs');

var testContext = {
    log: jest.fn(),
    bindingData: {
        blobTrigger: null
    },
    bindings: {       
    }
};

test('should handle json', async() => {
    var content = fs.readFileSync('letters.json', 'utf8');

    await blobFunction(testContext, content);

    expect(testContext.log.mock.calls.length).toBe(1);

    console.dir(testContext.bindings.outputBlob);
    expect(testContext.bindings.outputBlob.length).toBeGreaterThan(10);
    // console.log(JSON.stringify(testContext.log.mock.calls, null, 2));
});



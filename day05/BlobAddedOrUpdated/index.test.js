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

    var results = JSON.parse(testContext.bindings.outputBlob)
    expect(results[0].kid).toBe('Adam');
    expect(results[0].verdict).toBe('naughty');
});



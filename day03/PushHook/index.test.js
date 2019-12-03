const httpFunction = require('./index');
const context = require('../testing/defaultContext');

test('should handle a commit', async () => {
    const request = {
        body: {
            "commits": [
                {
                    "id": "ad4c22d2c663953ab72d2e12411314662c404d81",
                    "author": {
                        "name": "Niall Kelly"
                    },
                    "committer": {
                        "name": "Niall Kelly"
                    },
                    "added": [
                        "day03/test/file.txt",
                        "day03/test/puppy.png"
                    ],
                    "removed": [],
                    "modified": [
                        "day03/test/kitten.png",
                        "day03/test/goldfish.png",
                    ]
                }
            ]
        }
    };

    await httpFunction(context, request);

    expect(context.res.body).toBe('Processed');
    expect(context.bindings.outputTable.length).toBe(3);
    expect(context.bindings.outputTable[0].ImageURL).toBe('day03/test/puppy.png');
    expect(context.bindings.outputTable[0].RowKey).toBe('ad4c22d2c663953ab72d2e12411314662c404d81a0');
    expect(context.bindings.outputTable[1].ImageURL).toBe('day03/test/kitten.png');
    expect(context.bindings.outputTable[1].RowKey).toBe('ad4c22d2c663953ab72d2e12411314662c404d81m0');
    expect(context.bindings.outputTable[2].ImageURL).toBe('day03/test/goldfish.png');
    expect(context.bindings.outputTable[2].RowKey).toBe('ad4c22d2c663953ab72d2e12411314662c404d81m1');
});

test('should handle a different webhook', async () => {
    const request = {
        body: {
            "hook": {
                "type": "Repository"
            }
        }
    };

    await httpFunction(context, request);

    expect(context.res.body).toBe('Processed');
    expect(context.bindings.outputTable.length).toBe(0);
});

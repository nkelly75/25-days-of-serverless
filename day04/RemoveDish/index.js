const cosmos = require("@azure/cosmos");
const CosmosClient = cosmos.CosmosClient;
const client = new CosmosClient(process.env.MyAccount_COSMOSDB);

async function deleteDish(context, id) {
    // need partition key (i.e. friend) for delete so query that first
    const querySpec = {
        query: 'SELECT VALUE r.friend FROM root r WHERE r.id = @id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    };
    const { resources: results } = await client.database('potluck').container('MyCollection').items.query(querySpec).fetchAll();
    if (results.length > 0) {
        var friendName = results[0];
        await client.database('potluck').container('MyCollection').item(id, friendName).delete();
        context.log(`Deleted item:\n${id}\n`);
    }
}

module.exports = async function (context, req) {
    context.log('About to remove dish.');

    if (req.params && req.params.id) {
        await deleteDish(context, req.params.id);

        context.res = {
            status: 204
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a dish id"
        };
    }
};
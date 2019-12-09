module.exports = async function (context, documents) {
    const updates = documents.map(service => ({
        target: 'updated',
        arguments: [service]
    }));

    context.bindings.signalRMessages = updates;
    context.done();
}
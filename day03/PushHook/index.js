module.exports = async function (context, req) {

    context.bindings.outputTable = [];

    if (req.body && req.body.commits && req.body.commits.length > 0) {
        var commits = req.body.commits;
        commits.forEach(commit => {
            var commitId = commit.id;

            if (commit.added && commit.added.length > 0) {
                var fileNames = commit.added;
                processChanges(fileNames, 'a', context, commitId);
            }

            if (commit.modified && commit.modified.length > 0) {
                var fileNames = commit.modified;
                processChanges(fileNames, 'm', context, commitId);
            }
        });
    }

    context.res = {
        body: "Processed"
    };
};

function processChanges(fileNames, prefix, context, commitId) {
    var inc = 0;
    fileNames.forEach(fileName => {
        if (fileName.endsWith('.png')) {
            context.bindings.outputTable.push({
                PartitionKey: "Part01",
                RowKey: commitId + prefix + inc++,
                ImageURL: fileName
            });
        }
    });
}


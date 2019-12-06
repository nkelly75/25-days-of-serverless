const hookMapper = require('./hookMapper');

test('should handle a good slack command', async() => {
    const request = {
        rawBody: "token=QKiFzUE9eykaP0ylsjdDGY6c&team_id=TRFFQGNKG&team_domain=knatech&channel_id=CR1R8F5LK&channel_name=serverless&user_id=UR5BBKQSV&user_name=nkelly75&command=%2Fschedule&text=be+nice+tomorrow+at+9%3A00&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FTRFFQGNKG%2F863347752640%2FhFAvJDrcaAseCfmn4iFwiy8B&trigger_id=851880553635.865534566662.76a45ecd940c4b71f76a7040467feedb"
    };

    var payload = hookMapper(request);

    expect(payload.message).toBe('be nice tomorrow at 9:00');
    expect(payload.startDate.getHours()).toBe(9);
    expect(payload.startDate.getMinutes()).toBe(0);
    expect(payload.startDate.getSeconds()).toBe(0);
});

test('should handle empty request', async() => {
    const request = {};

    var payload = hookMapper(request);

    expect(payload).toBeNull();
});

test('should handle garbage body', async() => {
    const request = {
        rawBody: 'DGY6c&team_id=TRFFQ'
    };

    var payload = hookMapper(request);

    expect(payload).toBeNull();
});

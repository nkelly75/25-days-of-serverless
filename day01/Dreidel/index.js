module.exports = async function (context, req) {
    // Function that randomly returns one of following
    //  נ (Nun), ג (Gimmel), ה (Hay), or ש (Shin)
    const sides = [
        { symbol: 'נ', name: 'Nun'},
        { symbol: 'ג', name: 'Gimmel'},
        { symbol: 'ה', name: 'Hay'},
        { symbol: 'ש', name: 'Shin'}
    ];

    const rand = Math.floor(Math.random() * 4);
    context.res = {
        body: sides[rand]
    }
};
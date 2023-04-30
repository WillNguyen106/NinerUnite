const searchFunctions = require('./searchFunctions/searchFunctions');


function testSearchFunctions() {
    test('Title of java should return java object', () => {
        const results = searchFunctions('java');
        results.forEach(result => {
            expect(result.title.toLowerCase()).toContain('java');
        });
    });

    test('Author of java should return java object', () => {
        const results = searchFunctions('Robin Kunde');
        results.forEach(result => {
            expect(result.author.toLowerCase()).toContain('Robin Kunde');
        });
    });

    test('ISBN search should return correct object', () => {
        const results = searchFunctions('978-056-9874-2');
        results.forEach(result => {
            expect(result.ISBN).toContain('978-056-9874-2');
        })

    });

    test('Invalid search should return empty array', () => {
        const results = searchFunctions('invalid');
        expect(results.length).toBe(0);
    });
}

testSearchFunctions();
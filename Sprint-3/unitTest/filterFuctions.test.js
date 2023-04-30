const filterFunctions = require('./filterFunctions/filterFunctions');

function testFilterFunctions() {
    // Test for Price only
    test('Price of 1-20 should return all the objects in price range 1 to 20', () => {
        const results = filterFunctions('1-20');
        results.forEach(result => {
            expect(result.price).toBeGreaterThanOrEqual(1);
            expect(result.price).toBeLessThanOrEqual(20);
        });
    });

    test('Price of 20-50 should return all the objects in price range 20 to 50', () => {
        const results = filterFunctions('20-50');
        results.forEach(result => {
            expect(result.price).toBeGreaterThanOrEqual(20);
            expect(result.price).toBeLessThanOrEqual(50);
        });
    });

    test('Price of 50-100 should return all the objects in price range 50 to 100', () => {
        const results = filterFunctions('50-100');
        results.forEach(result => {
            expect(result.price).toBeGreaterThanOrEqual(50);
            expect(result.price).toBeLessThanOrEqual(100);
        });
    });

    test('Price of 100+ should return all the objects in price greater than 100+', () => {
        const results = filterFunctions('100+');
        results.forEach(result => {
            expect(result.price).toBeGreaterThan(100);
        });
    });

    // Test for Subject only
    test('Accounting of subject field should return all the objects in that field', () => {
        const results = filterFunctions('accounting');
        results.forEach(result => {
            expect(result.subject.toLowerCase()).toContain('accounting');
        });
    });

    test('Marketing of subject field should return all the objects in that field', () => {
        const results = filterFunctions('marketing');
        results.forEach(result => {
            expect(result.subject.toLowerCase()).toContain('marketing');
        });
    });

    test('Philosophy of subject field should return all the objects in that field', () => {
        const results = filterFunctions('philosophy');
        results.forEach(result => {
            expect(result.subject.toLowerCase()).toContain('philosophy');
        });
    });

    test('Biology of subject field should return all the objects in that field', () => {
        const results = filterFunctions('biology');
        results.forEach(result => {
            expect(result.subject.toLowerCase()).toContain('biology');
        });
    });

    test('Computer Science of subject field should return all the objects in that field', () => {
        const results = filterFunctions('computer science');
        results.forEach(result => {
            expect(result.subject.toLowerCase()).toContain('computer science');
        });
    });

    // Test for both Price and Subject
    test('Price range of 1-20 and accounting of subject of should return a specific object', () => {
        const results = filterFunctions('1-20','computer science');
        results.forEach(result => {
            expect(result.price).toBeGreaterThanOrEqual(1);
            expect(result.price).toBeLessThanOrEqual(20);
            expect(result.subject.toLowerCase()).toContain('computer science');
        });
    });

    test('Price range of 20-50 and accounting of subject of should return a specific object', () => {
        const results = filterFunctions('20-50','philosophy');
        results.forEach(result => {
            expect(result.price).toBeGreaterThanOrEqual(20);
            expect(result.price).toBeLessThanOrEqual(50);
            expect(result.subject.toLowerCase()).toContain('philosophy');
        });
    });
}

testFilterFunctions();
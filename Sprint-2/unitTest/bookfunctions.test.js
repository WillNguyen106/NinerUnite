const searchBook = require('./bookFunctions/bookfunctions');

function test1(){
    const books = searchBook('java');
    books.forEach(book=>{
        test('Title of java should return java object',()=>{
            expect(book.title.toLowerCase()).toContain('java')
        });
    })
}
test1();


// test('Author should be Robin Kunde',()=>{
//     expect(searchBook('Robin Kunde')).toContain('Robin Kunde');
// });


// test('ISBN should be 978-056-9874-2',()=>{
//     expect(searchBook('978-056-9874-2')).toContain('978-056-9874-2');
// });

// test('Title should be python',()=>{
//     expect(searchBook('python')).toContain('python')
// });

// test('Author should be James Kunde',()=>{
//     expect(searchBook('James Kunde')).toContain('James Kunde');
// });

// test('ISBN should be 978-056-9874-2',()=>{
//     expect(searchBook('978-123-4567-2')).toContain('978-123-4567-2');
// });
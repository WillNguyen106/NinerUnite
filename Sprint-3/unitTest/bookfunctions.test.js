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

function test2(){
    const books = searchBook('Robin Kunde');
    books.forEach(book=>{
        test('Author should be Robin Kunde',()=>{
            expect(book.author).toContain('Robin Kunde');
        });
    })
}
test2();


function test3(){
    const books = searchBook('978-056-9874-2');
    books.forEach(book=>{
        test('ISBN should be 978-056-9874-2',()=>{
            expect(book.ISBN).toContain('978-056-9874-2');
        });
    })
}
test3();
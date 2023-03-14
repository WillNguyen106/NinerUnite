const searchBook = require('./bookFunctions/bookfunctions');

test('Title should be java',()=>{
    expect(searchBook('java')).toContain('java')
});

test('Author should be Robin Kunde',()=>{
    expect(searchBook('Robin Kunde')).toContain('Robin Kunde');
});


test('ISBN should be 978-056-9874-2',()=>{
    expect(searchBook('978-056-9874-2')).toContain('978-056-9874-2');
});

test('Title should be python',()=>{
    expect(searchBook('python')).toContain('python')
});

test('Author should be James Kunde',()=>{
    expect(searchBook('James Kunde')).toContain('James Kunde');
});

test('ISBN should be 978-056-9874-2',()=>{
    expect(searchBook('978-123-4567-2')).toContain('978-123-4567-2');
});
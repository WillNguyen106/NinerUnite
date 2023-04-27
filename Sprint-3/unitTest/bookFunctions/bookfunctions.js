const books =[
    {
        title: "java",
        author: "Robin Kunde",
        ISBN: "978-056-9874-1"
    },
    {
        title: "python",
        author: "James Kunde",
        ISBN: "978-123-4567-2"
    },
    {
        title: "Think like a programmer",
        author: "Erika Kunde",
        ISBN: "978-345-6789-3"
    },
    {
        title: "JavaScript",
        author: "Morgan Kunde",
        ISBN: "978-056-9874-2"
    },
];

function searchBook(search){
    let results = [];
    if(search){
        let ISBN = books.filter((book)=>book.ISBN === search);
        let author = books.filter(book=>book.author.toLowerCase().includes(search.toLowerCase()));
        let title = books.filter(book=>book.title.toLowerCase().includes(search.toLowerCase()));
        
        ISBN.forEach(book => {
            results.push(book);
        });
        
        author.forEach(book => {
            results.push(book);
        });

        title.forEach(book => {
            results.push(book);
        });
    }
    return results;
}

module.exports = searchBook;
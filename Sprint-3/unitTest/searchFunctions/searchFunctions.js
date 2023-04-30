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

function searchFunctions(search){
    let results = [];
    if(search){
        let results = [];
        books.forEach(book=>{
            if(book.author.toLowerCase().includes(search.toLowerCase())
                || book.title.toLowerCase().includes(search.toLowerCase())
                || book.ISBN.includes(search))
                {
                    results.push(book);
                }
        });
    }
    return results;
}

module.exports = searchFunctions;
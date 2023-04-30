const books =[
    {
        subject: "Computer Science",
        price: 5.99
    },
    {
        subject: "Marketing",
        price: 11.99
    },
    {
        subject: "Accounting",
        price: 70.99
    },
    {
        subject: "Philosophy",
        price: 25.99
    },
    {
        subject: "Biology",
        price: 125
    },
];

// Create Object of functions to filter based on Price range and subject
const filterOptions ={
    // key : queries
    // value: functions
    '1-20' : book=>book.price >=1 && book.price <= 20,
    '20-50' : book=>book.price > 20 && book.price <= 50,
    '50-100' : book=>book.price > 50 && book.price <= 100,
    '100+' : book=>book.price > 100,
    'accounting': book=>book.subject.toLowerCase().includes('accounting'),
    'computer science': book=>book.subject.toLowerCase().includes('computer science'),
    'marketing': book=>book.subject.toLowerCase().includes('marketing'),
    'biology': book=>book.subject.toLowerCase().includes('biology'),
    'philosophy': book=>book.subject.toLowerCase().includes('philosophy'),
}


function filterFunctions(filterByPrice, filterBySubject){
    let filterFunctions = [];
    if(filterByPrice && filterOptions[filterByPrice]){
        filterFunctions.push(filterOptions[filterByPrice]);
    }

    if(filterBySubject && filterOptions[filterBySubject]){
        filterFunctions.push(filterOptions[filterBySubject]);
    }

    if(filterFunctions.length > 0){
        const bookLists = books.filter(book=>filterFunctions.every(filterForCheck=>filterForCheck(book)));
        // Sort the results in order of price
        results = bookLists.sort((min,max)=>min.price-max.price);
    }
    console.log(filterFunctions);
    return results;
}

module.exports = filterFunctions;







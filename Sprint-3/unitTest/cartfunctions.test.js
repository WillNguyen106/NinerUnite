const totalPriceOfItems = require('./cartFunctions/cartFunctions');



const bookCartItems = [
    {

      bookId: {
        _id: "642742e353583cb0a7bc19b8",
        title: 'Some Good Book',
        condition: 'it is super cool',
        isbn: '8364758884',
        author: 'J.D Kocker',
        price: 25.99,
        user: "641f3ed5e6f602c88e2aa90b",
        createdAt: "2023-03-31T20:30:27.161Z",
        updatedAt: "2023-03-31T20:30:27.161Z",
        __v: 0
      },
      techId: null,
      category: 'book',
      createdAt: "2023-03-31T20:31:20.270Z",
      updatedAt: "2023-03-31T20:31:20.270Z",
      __v: 0
    },
  
    {

      bookId: {
        _id: "642742e353583cb0a7bc19a7",
        title: 'The Great Game',
        condition: 'kjfnjbfhjasdbfjhdsbhf',
        isbn: '8364758884',
        author: 'J.D Kocker',
        price: 30.99,
        user: "641f3ed5e6f602c88e2aa90b",
        createdAt: "2023-03-31T20:30:27.161Z",
        updatedAt: "2023-03-31T20:30:27.161Z",
        __v: 0
      },
      techId: null,
      category: 'book',
      createdAt: "2023-03-31T20:31:20.270Z",
      updatedAt: "2023-03-31T20:31:20.270Z",
      __v: 0
    }
  
  ]
  
  const techCartItems = [
    {

      techId: null,
      bookId: null,
      category: 'tech',
      createdAt: "2023-03-31T21:14:22.653Z",
      updatedAt: "2023-03-31T21:14:22.653Z",
      __v: 0
    },
    {

      techId: {
        _id: "64274cf96167ee336739661c",
        brand: 'Beats By Dre',
        description: 'these are really good headphones lol',
        condition: 'burrito juice to the maximum ',
        price: 400,
        user: "641f3ed5e6f602c88e2aa90b",
        createdAt: "2023-03-31T21:13:29.532Z",
        updatedAt: "2023-03-31T21:13:29.532Z",
        __v: 0
      },
      bookId: null,
      category: 'tech',
      createdAt: "2023-04-01T01:08:16.578Z",
      updatedAt: "2023-04-01T01:08:16.578Z",
      __v: 0
    }
  ]

it("Should add all prices from tech and book items in cart to equal 456.98", () => {

    const sum = totalPriceOfItems(bookCartItems, techCartItems);
    expect(sum).toBe(456.98);

})
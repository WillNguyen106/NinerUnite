//const modelBook = require('../models/book');;
const Book = require('../models/book');

exports.search = (req, res, next) => {
  const searchTerm = req.query.q;

  Book.find({ $text: { $search: searchTerm } })
    .then((books) => {
      res.render('search', { books, searchTerm });
    })
    .catch(next);
}

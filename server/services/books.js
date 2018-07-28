var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'librafydb',
    user: 'librafy',
    password: 'l1br44u'
});

/* /api/v1/books */
var all_books_query = 'SELECT titulo, isbn_10, isbn_13, valoracion, autor,id  FROM public.book';

function getAllBooks(req, res, next) {
  const books = req.body;
    db.any(all_books_query)
      .then(function (books) {
        res.status(200)
          .json(books);
      })
      .catch(function (err) {
        return next(err);
      });
}

/* /api/v1/books/search/:search */
var books_by_title = 'SELECT titulo, isbn_10, isbn_13, valoracion, autor,id FROM public.book WHERE to_tsvector(titulo) @@ to_tsquery($1) = true';

function getBooksByTitle(req, res, next) {
  const books = req.body;
  var paramsSearch = req.params.search;

  //replace '+' to ' & '
  var querySeparator = ' & '
  terms = '\'' + paramsSearch.split('+').join(querySeparator) + '\'';

  db.any(books_by_title, terms)
    .then(function (books) {
      res.status(200)
        .json(books);
    })
    .catch(function (err) {
      return next(err);
    });
}



  /* /api/v1/books/:id */
  var single_book_query = 'SELECT titulo, isbn_10, isbn_13, valoracion, autor,id  FROM public.book WHERE id = $1';

  function getSingleBook(req, res, next) {
    var bookID = parseInt(req.params.id);
      db.any(single_book_query, bookID)
        .then(function (data) {
          res.status(200)
            .json({
              status: 'success',
              data: data,
              message: 'Retrieved ONE book'
            });
        })
        .catch(function (err) {
          return next(err);
        });
    }

    /* /api/v1/books */
    var create_book_query = 'INSERT INTO public.book (titulo, isbn_10, isbn_13, valoracion, autor)' +
                            ' values(${titulo}, ${isbn_10}, ${isbn_13}, ${valoracion}, ${autor})';

    function createBook(req, res, next) {
      const book = req.body;
      req.body.valoracion = parseInt(req.body.valoracion);
      db.none(create_book_query, req.body)
        .then(function () {
          res.status(200)
            .json(book);
        })
        .catch(function (err) {
          return next(err);
        });
    }
    
    /* /api/v1/books/:id */
    //var update_book_query = 'UPDATE public.book set titulo=$1, isbn_10=$2, isbn_13=$3, valoracion=$4, autor=$5 WHERE id=$6';
    var update_book_query = 'UPDATE public.book set titulo=${titulo}, isbn_10=${isbn_10}, isbn_13=${isbn_13}, valoracion=${valoracion}, autor=${autor} WHERE id=${id}';

    function updateBook(req, res, next) {
      req.body.id = parseInt(req.body.id);
      db.none(update_book_query,req.body)
        .then(function () {
          res.status(200)
            .json({
              status: 'success',
              message: 'Updated book'
            });
        })
        .catch(function (err) {
          return next(err);
        });
    }

    /* /api/v1/books/:id */
    var remove_book_query = 'DELETE FROM public.book WHERE id=$1';

    function removeBook(req, res, next) {
      var bookID = parseInt(req.params.id);
      db.result(remove_book_query, bookID)
        .then(function (result) {
          /* jshint ignore:start */
          res.status(200)
            .json(result.rowCount); // 1 -> removed || 0 -> not removed
          /* jshint ignore:end */
        })
        .catch(function (err) {
          return next(err);
        });
    }
    
    
    

module.exports = {
  getAllBooks: getAllBooks,
  getBooksByTitle: getBooksByTitle,
  getSingleBook: getSingleBook,
  createBook: createBook,
  updateBook: updateBook,
  removeBook: removeBook
};

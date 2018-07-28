var express = require('express');
var router = express.Router();

/* SERVICES */
var books = require('../services/books');
// var users = require('../services/users');

/* GET all books */
router.get('/api/v1/books', books.getAllBooks);
/* GET books by name */
router.get('/api/v1/books/search/:search', books.getBooksByTitle);
/* GET single book */
router.get('/api/v1/books/:id', books.getSingleBook);
/* POST create book */
router.post('/api/v1/books', books.createBook);
/* PUT update book*/
router.put('/api/v1/books/:id', books.updateBook);
/* DELETE remove book*/
router.delete('/api/v1/books/:id', books.removeBook);

/* LOGIN users */
// router.post('/api/v1/login', users.loginUser);

module.exports = router;

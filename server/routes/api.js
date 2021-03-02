var express = require('express');
var router = express.Router();

/* SERVICES */
var users = require('../services/users');
var posts = require('../services/posts');

/* GET all posts */
router.get('/api/v1/posts', posts.getAllPosts);
/* GET post by id */
router.get('/api/v1/posts/:id', posts.getPostById);
/* POST create book */
router.post('/api/v1/posts', posts.createPost);
/* PUT update book*/
// router.put('/api/v1/books/:id', books.updateBook);
/* DELETE remove book*/
// router.delete('/api/v1/books/:id', books.removeBook);

/* LOGIN users */
// router.post('/api/v1/login', users.loginUser);
router.get('/api/v1/users/:name', users.getUserByName);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const db = require('../db/db');
const { requiresAuth } = require('express-openid-connect');
const { authorizer } = require('../auth');

// Initialize the database before handling any requests
db.initDb((err, _) => {
  if (err) {
    console.error('Error initializing database:', err);
  } else {
    console.log('Database initialized successfully');
  }
});

router.use(authorizer);

// GET /books - Retrieve all books
router.get('/', requiresAuth(), (req, res, next) => {
  controller.getAllBooks(req, res)
    .catch(next);
});

// POST /books - Add a new book
router.post('/', requiresAuth(), controller.addBook);

// PUT /books/:id - Update a book
router.put('/:id', requiresAuth(), controller.updateBook);

// DELETE /books/:id - Delete a book
router.delete('/:id', requiresAuth(), controller.deleteBook);

module.exports = router;

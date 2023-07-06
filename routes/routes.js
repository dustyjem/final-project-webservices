const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const { requiresAuth } = require('express-openid-connect');

// GET /books - Retrieve all books
router.get('/', requiresAuth(), async (req, res, next) => {
  try {
    await controller.getAllBooks(req, res);
  } catch (error) {
    next(error);
  }
});

// POST /books - Add a new book
router.post('/', requiresAuth(), async (req, res, next) => {
  try {
    await controller.addBook(req, res);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', requiresAuth(), async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { title, author, genre } = req.body;
    await controller.updateBook(bookId, title, author, genre);
    res.send('Book updated successfully');
  } catch (error) {
    next(error);
  }
});

// DELETE /books/:id - Delete a book
router.delete('/:id', requiresAuth(), async (req, res, next) => {
  try {
    const bookId = req.params.id;
    await controller.deleteBook(bookId);
    res.send('Book deleted successfully');
  } catch (error) {
    next(error);
  }
});
module.exports = router;

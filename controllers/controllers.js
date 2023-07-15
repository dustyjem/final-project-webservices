const { getDb } = require('../db/db');
const mongodb = require('mongodb');

// GET /books - Get all books
const getAllBooks = async (req, res) => {
  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    const books = await booksCollection.find().toArray();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

// POST /books - Add a new book
const addBook = async (req, res) => {
  const { title, author, genre, year, pages, publisher, languages } = req.body;

  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.insertOne({ title, author, genre, year, pages, publisher, languages });
    res.send('Book added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

// PUT /books/:id - Update a book
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre, year, pages, publisher, languages } = req.body;

  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.updateOne(
      { _id: new mongodb.ObjectId(bookId) },
      { $set: { title, author, genre, year, pages, publisher, languages } }
    );
    res.send('Book updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

// DELETE /books/:id - Delete a book
const deleteBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.deleteOne({ _id: new mongodb.ObjectId(bookId) });
    res.send('Book deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};

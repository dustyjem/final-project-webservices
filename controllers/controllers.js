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
  const { title, author, genre } = req.body;

  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.insertOne({ title, author, genre });
    res.send('Book added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};


// PUT /books/:id - Update a book
const updateBook = async (bookId, title, author, genre) => {
  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.updateOne(
      { _id: new mongodb.ObjectId(bookId) },
      { $set: { title, author, genre } }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE /books/:id - Delete a book
const deleteBook = async (bookId) => {
  try {
    const db = getDb();
    const booksCollection = db.collection('books');
    await booksCollection.deleteOne({ _id: new mongodb.ObjectId(bookId) });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
};

const db = require('../db/db');

// GET /books - Get all books
const getAllBooks = async (req, res) => {
  try {
    const booksCollection = db.getDb().collection('books');
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
    const booksCollection = db.getDb().collection('books');
    await booksCollection.insertOne({ title, author, genre });
    res.send('Book added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
};

// PUT /books/:id - Update a book
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, genre } = req.body;

  try {
    const booksCollection = db.getDb().collection('books');
    await booksCollection.updateOne(
      { _id: bookId },
      { $set: { title, author, genre } }
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
    const booksCollection = db.getDb().collection('books');
    await booksCollection.deleteOne({ _id: bookId });
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

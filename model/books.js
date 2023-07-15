const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
  },
  year: {
    type: Number,
    required: [true, 'Genre is required'],
  },
  pages: {
    type: Number,
    required: [true, 'Add number of pages'],
  },
  publisher: {
    type: String,
    required: [true, 'Publisher is required'],
  },
  languages: {
    type: String,
    required: [true, 'Languages is required'],
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

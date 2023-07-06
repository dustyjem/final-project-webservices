const mongodb = require('mongodb');
const dotenv = require('dotenv').config();

const MongoClient = mongodb.MongoClient;
const url = process.env.MONGODB_URI;

let _db;

const initDb = async () => {
  if (_db) {
    console.log('Database is already initialized!');
    return _db;
  }
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    _db = client.db('bookstore'); // Select the "bookstore" database
    console.log('Database initialized successfully');
    return _db;
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized!');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};

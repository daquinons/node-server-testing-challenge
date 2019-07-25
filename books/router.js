const express = require('express');
const Books = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
  const books = Books.find();
  res.json(books);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const book = Books.findById(id);
  res.json(book);
});

router.post('/', (req, res) => {
  const { id, title, author } = req.body;
  const newBook = Books.insert({ id, title, author });
  res.status(201).json(newBook);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const deletedId = Books.delete(id);
  res.status(200).json(deletedId);
});

module.exports = router;

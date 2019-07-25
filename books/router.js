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

module.exports = router;

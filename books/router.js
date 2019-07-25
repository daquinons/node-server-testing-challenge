const express = require('express');
const Books = require('./model');
const router = express.Router();

router.get('/', (req, res) => {
  const books = Books.find();
  res.json(books);
});

module.exports = router;

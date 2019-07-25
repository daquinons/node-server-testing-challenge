const db = require('../data/db')('books');
const seeds = [
  { title: '1984', author: 'George Orwell' },
  { title: 'Maps of Meaning', author: 'Jordan B. Peterson' },
  { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche' }
];

db.data = seeds;

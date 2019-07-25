const db = require('../data/db')('books');
const seeds = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'Maps of Meaning', author: 'Jordan B. Peterson' },
  { id: 3, title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche' }
];

db.data = seeds;

exports.find = () => {
  return db.data;
};

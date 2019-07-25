const db = require('../data/db')('books');

exports.db = db;

exports.find = () => {
  return db.data;
};

exports.findById = id => {
  const item = db.data.find(item => item.id === Number(id));
  return item;
};

exports.insert = newBook => {
  db.data.push(newBook);
  const book = this.findById(newBook.id);
  return book;
};

exports.delete = id => {
  let toReturn;
  db.data.forEach((element, index) => {
    if (element.id === Number(id)) {
      toReturn = Number(id);
      db.data.splice(index, 1);
    }
  });

  return toReturn;
}

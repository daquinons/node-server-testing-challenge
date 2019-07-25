const express = require('express');
const router = require('./router');
const request = require('supertest');
const Books = require('./model');

const app = express();
app.use(express.json());
app.use('/', router);

beforeEach(() => {
  const seeds = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'Maps of Meaning', author: 'Jordan B. Peterson' },
    { id: 3, title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche' }
  ];

  Books.db.data = seeds;
  console.log(Books.db.data);
});

it('should return 200 when get /', async () => {
  const expectedStatusCode = 200;
  const response = await request(app).get('/');
  expect(response.status).toEqual(expectedStatusCode);
});

it('should return a list of books when get /', async () => {
  const response = await request(app).get('/');
  const books = response.body;
  expect(Array.isArray(books)).toBe(true);
});

it('should return 200 when get /1', async () => {
  const expectedStatusCode = 200;
  const response = await request(app).get('/1');
  expect(response.status).toEqual(expectedStatusCode);
});

it('should return a book with id 1 when get /1', async () => {
  const response = await request(app).get('/1');
  expect(response.body.id).toEqual(1);
});

it('should add a new book when post /', async () => {
  const newBook = { id: 99, title: 'Test Book', author: 'Jest' };
  const response = await request(app)
    .post('/')
    .send(newBook);
  expect(response.status).toEqual(201);
  expect(response.body).toEqual(newBook);
});

it('should delete a book of id 1 when delete /1', async () => {
  const previousLength = Books.find().length;
  const response = await request(app).delete('/1');
  expect(response.status).toEqual(200);
  expect(response.body).toEqual(1);
  const newLength = Books.find().length;
  expect(newLength).toEqual(previousLength - 1);
});

it('should update a book of id 1 when put /1', async () => {
  const updatedBook = { id: 1, title: 'Updated Title', author: 'Jest' };
  const response = await request(app).put('/1').send(updatedBook);
  expect(response.status).toEqual(200);
  const book = Books.findById(1);
  console.log(Books.db);
  expect(book.title).toEqual(updatedBook.title);
});

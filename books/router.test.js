const express = require('express');
const router = require('./router');
const request = require('supertest');
const Books = require('./model')
const seeds = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'Maps of Meaning', author: 'Jordan B. Peterson' },
  { id: 3, title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche' }
];

Books.db.data = seeds;

const app = express();
app.use(express.json());
app.use("/", router);

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
  const newBook = {id: 99, title: 'Test Book', author: 'Jest'};
  const response = await request(app).post('/').send(newBook);
  expect(response.status).toEqual(201);
  expect(response.body).toEqual(newBook);
  Books.db.data = seeds;
});

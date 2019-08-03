const express = require('express');
const router = require('./books/router');
const server = express();

server.use(express.json());
server.use("/books", router);

server.listen(4000, () => console.log("Server listening at 4000"));

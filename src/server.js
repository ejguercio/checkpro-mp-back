const express = require('express');
const cors = require("cors")
const morgan = require("morgan");
const paymentRouter = require("./router/payment")
const booksRouter = require("./router/books")

//INSTANCIA
const server = express();

//MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

//ROUTERS
server.use("/payment", paymentRouter)
server.use("/books", booksRouter)

module.exports = server;

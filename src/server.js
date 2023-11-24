const express = require('express');
const cors = require("cors")
const morgan = require("morgan");
const paymentRouter = require("./router/payment")

//INSTANCIA
const server = express();

//MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/", paymentRouter)

module.exports = server;

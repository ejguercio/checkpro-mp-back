const express = require('express');
const cors = require("cors")
const morgan = require("morgan");
const server = express();

//MIDDLEWARES
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
    res.send("Server listening")
})

module.exports = server;

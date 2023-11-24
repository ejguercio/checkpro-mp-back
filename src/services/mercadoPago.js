const mercadopago = require("mercadopago");
require("dotenv").config();
const { MP_ACCESS_TOKEN } = process.env;

mercadopago.configure({
    access_token: MP_ACCESS_TOKEN
})

module.exports = mercadopago;

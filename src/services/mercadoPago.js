const mercadopago = require("mercadopago");
require("dotenv").config();
const { MP_ACCESS_TOKEN, INTEGRATOR_ID } = process.env;

mercadopago.configure({
    integrator_id: INTEGRATOR_ID,
    access_token: MP_ACCESS_TOKEN
})

module.exports = mercadopago;

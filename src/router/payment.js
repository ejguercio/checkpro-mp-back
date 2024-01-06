const { Router } = require("express");
const mercadopago = require("../services/mercadoPago");
require('dotenv').config()
//const { URL_BASE_LOCAL } = process.env;
const { URL_BASE_MAIN } = process.env;

const router = Router();

router.post("/create-order", (req, res) => {
    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            "success": `${URL_BASE_MAIN}payment/feedback`,
            "failure": `${URL_BASE_MAIN}payment/feedback`,
            "pending": `${URL_BASE_MAIN}payment/feedback`
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.status(200).json({ response });
        })
        .catch(function (error) { console.log(error) });
})

router.get("/feedback", (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
})


module.exports = router;
